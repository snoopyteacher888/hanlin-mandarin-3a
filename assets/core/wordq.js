/* 把字詞資料轉成作答題（給 runQuestions 用）。
   每題有三層提示 hints：h1 給方法、h2 給線索（都不說答案）、teach 第 3 次錯才說答案和原因。 */
(function (root, factory) {
  var m = factory(root.H3A && root.H3A.quizgen || (typeof require === 'function' ? require('./quizgen.js') : null),
    root.H3A && root.H3A.locate || (typeof require === 'function' ? require('./locate.js') : null),
    root.H3A && root.H3A.speechcheck || (typeof require === 'function' ? require('./speechcheck.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = m;
  else { root.H3A = root.H3A || {}; root.H3A.wordq = m; }
})(this, function (quizgen, locator, speechcheck) {
  function shuffled(texts, correct, r, extra) {
    var order = quizgen.shuffle(texts, r);
    return { options: order.map(function (t) { var o = { text: t }; for (var k in extra) o[k] = extra[k]; return o; }), answer: order.indexOf(correct) };
  }
  function framed(s, r) {
    var order = quizgen.shuffle(s.options, r);
    return { options: order.map(function (c) { return { text: s.frame.replace('＿', c), mark: c }; }), answer: order.indexOf(s.answer) };
  }
  function blankSay(s) { return s.replace('＿', '什麼'); }

  function hanziQuestion(h, r) {
    var s = shuffled(h.options, h.char, r, { big: true });
    return { id: h.id, prompt: h.cloze, say: h.say, img: h.img, autoSay: h.say, options: s.options, answer: s.answer,
      hints: { h1: { text: '再聽一次，想想看是哪一個字。', say: h.say }, h2: { text: '提示：' + h.clue }, teach: { text: h.explain } } };
  }
  function vocabQuestion(v, kind, r) {
    var s = shuffled(v.options, v.word, r, {});
    var q = { id: v.id, options: s.options, answer: s.answer };
    var teach = { text: '答案是「' + v.word + '」，意思是：' + v.meaning };
    var h2 = { text: '提示：' + v.example, say: '提示：' + v.example.replace(/＿+/, '什麼') };
    if (kind === 'pic') {
      q.prompt = '圖片上是哪一個語詞？'; q.img = v.img;
      q.hints = { h1: { text: '再仔細看看圖片，想想看它是什麼？' }, h2: h2, teach: teach };
    } else {
      q.prompt = '哪一個語詞的意思是：「' + v.meaning + '」'; q.say = '哪一個語詞的意思是：' + v.meaning; q.autoSay = v.meaning;
      q.hints = { h1: { text: '提示：' + v.meaning, say: v.meaning }, h2: h2, teach: teach };
    }
    return q;
  }
  /* 生字語詞：看句子選語詞，選項裡的生字標顏色 */
  function charWordQuestion(c, r, chars) {
    var order = quizgen.shuffle(c.options, r);
    var options = order.map(function (t) {
      var ch = (chars || [c.char]).filter(function (x) { return t.indexOf(x) >= 0; })[0];
      return { text: t, mark: ch, markClass: 'char-mark' };
    });
    var say = c.example.replace(/＿+/, '什麼');
    return { id: c.id, prompt: c.example, say: say, autoSay: say, options: options, answer: order.indexOf(c.word),
      hints: { h1: { text: '再讀一次句子，想一想哪一個語詞放進去最通順。', say: say },
        h2: { text: '提示：要找的語詞，意思是「' + c.meaning + '」' },
        teach: { text: '答案是「' + c.word + '」。「' + c.word + '」的意思是：' + c.meaning } } };
  }
  /* 部件組字：「墨 ＝ 黑 ＋ ？」選出缺的部件。部首念名稱（阝念「耳朵旁」） */
  var PART_NAME = { '阝': '耳朵旁', '艹': '草字頭', '刂': '立刀旁', '氵': '三點水', '扌': '提手旁', '辶': '辵字旁', '亻': '單人旁' };
  function partSay(x) { return x === '？' ? '什麼' : PART_NAME[x] || x; }
  function buildQuestion(hz, r) {
    var b = hz.build;
    var order = quizgen.shuffle(b.options, r);
    var say = b.show.map(partSay).join('，加上') + '，會變成「' + hz.char + '」？';
    return { id: 'b-' + hz.char, prompt: hz.char + ' ＝ ' + b.show.join(' ＋ '), say: say, quiet: true, promptClass: 'build-prompt', optionsClass: 'parts-opts',
      options: order.map(function (x) { return { text: x, say: PART_NAME[x] || x, big: true }; }), answer: order.indexOf(b.answer),
      hints: { h1: { text: '聽聽看：' + hz.say + '。想一想，這個字的意思跟什麼有關？', say: '聽聽看：' + hz.say + '。想一想，這個字的意思跟什麼有關？' },
        h2: { text: '提示：' + (b.clue || hz.clue) }, teach: { text: hz.story } } };
  }
  /* 生字變成語：排字（把打亂的字排成成語）、情境題（這是哪一個成語？） */
  function idiomOrderQuestion(it, r) {
    var chars = it.idiom.split(''), tiles = chars;
    for (var k = 0; k < 10 && tiles.join('') === it.idiom; k++) tiles = quizgen.shuffle(chars, r);
    var say = '把字排一排，變成成語。意思是：' + it.meaning;
    return { type: 'order', id: 'io-' + it.idiom, prompt: '「' + it.meaning + '」', say: say, autoSay: say,
      tiles: tiles, answer: it.idiom, mark: it.char,
      hints: { h1: { text: '本課的生字「' + it.char + '」也在這個成語裡，想想看它排在第幾個。' },
        h2: { text: '提示：第一個字是「' + chars[0] + '」。' },
        teach: { text: '答案是「' + it.idiom + '」。意思是：' + it.meaning } } };
  }
  /* 排完字接著出：兩個新的句子，哪一句適合填入這個成語？ */
  function idiomFillQuestion(it, r) {
    var q = first({ id: 'if-' + it.idiom, options: it.fill.options }, '哪一句適合填入「' + it.idiom + '」？', null, r);
    q.say = '哪一句適合填入' + it.idiom + '？';
    q.options.forEach(function (o) { o.say = o.text.replace(/＿+/, it.idiom); });
    q.list = true;
    q.hints = { h1: { text: '提示：「' + it.idiom + '」的意思是：' + it.meaning }, h2: { text: it.fill.clue }, teach: { text: it.fill.explain } };
    return q;
  }
  function idiomSituationQuestion(it, all, r) {
    var others = quizgen.shuffle(all.filter(function (x) { return x.id !== it.id; }), r).slice(0, 2).map(function (x) { return x.idiom; });
    var s = shuffled([it.idiom].concat(others), it.idiom, r, {});
    return { id: 'is-' + it.idiom, prompt: it.situation + '\n這可以用哪一個成語來說？', say: it.situation + '這可以用哪一個成語來說？',
      options: s.options, answer: s.answer, list: true,
      hints: { h1: { text: '再讀一次，想想這個人做了什麼。', say: it.situation },
        h2: { text: '提示：要找的成語，意思是「' + it.meaning + '」' },
        teach: { text: '答案是「' + it.idiom + '」。意思是：' + it.meaning } } };
  }
  /* 有 frame（例如「真＿糕」）時，選項是整個詞（真糟糕／真槽糕／真遭糕），不一樣的那個字標顏色 */
  function similarQuestion(s, r) {
    var x = s.frame ? framed(s, r) : shuffled(s.options, s.answer, r, { big: true });
    return { id: s.id, prompt: s.sentence, say: blankSay(s.sentence), options: x.options, answer: x.answer, optionsClass: s.frame ? 'frame-opts' : undefined,
      hints: { h1: { text: '再讀一次句子，想想這個詞是什麼意思。', say: blankSay(s.sentence) }, h2: { text: s.clue }, teach: { text: s.explain } } };
  }
  function listenQuestion(l, r) {
    var order = quizgen.shuffle(l.options.map(function (_, i) { return i; }), r);
    var right = l.options[l.answer].text;
    return { id: l.id, prompt: l.text, say: l.text, hideText: true, autoSay: l.text,
      options: order.map(function (i) { return l.options[i]; }), answer: order.indexOf(l.answer),
      hints: { h1: { text: '再仔細聽一次。', say: l.text }, h2: { text: '看著文字，再聽一次。', say: l.text, showText: true, slow: true },
        teach: { text: '答案是「' + right + '」，因為句子說：「' + l.text + '」' } } };
  }
  /* 閱讀題：h1 告訴在第幾段、h2 把相關句子亮起來、teach 才說答案和依據 */
  function readingHints(lesson, q) {
    var loc = locator.locate(lesson, q.evidence);
    var where = loc.paras.length ? '答案在課文第 ' + loc.paras.join('、') + ' 段。' : '回到課文找找看。';
    return {
      h1: { text: '再想想看。' + where, para: { paras: loc.paras, sentIds: loc.sentIds, highlight: false } },
      h2: { text: '再找找看，注意亮起來的句子。', para: { paras: loc.paras, sentIds: loc.sentIds, highlight: true } },
      teach: { text: '答案是「' + q.options[q.answer].text + '」。因為課文說：「' + q.evidence + '」' }
    };
  }
  /* ---------- B 批：短語短句、句型、修辭 ---------- */
  function first(item, prompt, extra, r) {
    var s = shuffled(item.options, item.options[0], r, extra || {});
    return { id: item.id, prompt: prompt, options: s.options, answer: s.answer };
  }
  function phrasePickQuestion(p, r) {
    var q = first(p, '＿＿＿的' + p.noun, null, r);
    q.say = '什麼樣的' + p.noun; q.img = p.img;
    q.hints = { h1: { text: '再看看圖片，它是什麼顏色、什麼樣子？' }, h2: { text: p.clue }, teach: { text: p.explain } };
    return q;
  }
  /* meaning：語詞的意思（第一層提示用）；選項裡的語詞用顏色標出來（mark） */
  function chooseQuestion(c, r, meaning) {
    var q = first(c, '哪一句的「' + c.word + '」用得對？', { mark: c.word }, r);
    q.hints = { h1: { text: meaning ? '提示：「' + c.word + '」的意思是：' + meaning : '兩個句子都聽一次，想想「' + c.word + '」是什麼意思。' },
      h2: { text: c.clue }, teach: { text: c.explain } };
    q.list = true;
    return q;
  }
  function matchQuestion(m, r) {
    var q = first(m, m.front + '……', null, r);
    q.say = m.front;
    q.hints = { h1: { text: '想一想，做了前面的事以後，會有什麼結果？' }, h2: { text: m.clue }, teach: { text: m.explain } };
    q.list = true;
    q.promptClass = 'pt-cond'; q.optionsClass = 'pt-res';
    return q;
  }
  function conjQuestion(c, r) {
    var q = first(c, c.sentence, null, r);
    q.say = c.sentence.replace(/＿+/g, '什麼');
    q.hints = { h1: { text: '把句子念一次，想想前後兩句是什麼關係。' }, h2: { text: c.clue }, teach: { text: c.explain } };
    q.list = true;
    q.optionsClass = 'pt-conj';
    return q;
  }
  /* 把句型例句切成「條件（cond）／結果（res1、res2）」，關聯詞標 conj，給畫面上色用 */
  function patternClauses(text, key) {
    var words = speechcheck.PATTERNS[key], clauses = [], cur = '';
    for (var i = 0; i < text.length; i++) {
      cur += text[i];
      if (text[i] === '，' && i < text.length - 1) { clauses.push(cur); cur = ''; }
    }
    if (cur) clauses.push(cur);
    return clauses.map(function (c, n) {
      var parts = [], rest = c;
      while (rest) {
        var best = -1, w = null;
        words.forEach(function (k) { var at = rest.indexOf(k); if (at >= 0 && (best < 0 || at < best)) { best = at; w = k; } });
        if (best < 0) { parts.push({ text: rest, conj: false }); break; }
        if (best > 0) parts.push({ text: rest.slice(0, best), conj: false });
        parts.push({ text: w, conj: true });
        rest = rest.slice(best + w.length);
      }
      return { kind: n === 0 ? 'cond' : n === 1 ? 'res1' : 'res2', parts: parts };
    });
  }
  /* 綜合挑戰：二選一（正確的修辭＋隨機一個別的） */
  function rhetoricQuestion(x, cards, r) {
    var others = quizgen.shuffle(cards.filter(function (c) { return c.name !== x.answer; }), r);
    var order = quizgen.shuffle([x.answer, others[0].name], r);
    var say = x.sentence + '。這句話用了什麼修辭？';
    return { id: x.id, prompt: '「' + x.sentence + '」\n用了什麼修辭？', say: say, autoSay: say,
      options: order.map(function (n) { return { text: n }; }), answer: order.indexOf(x.answer),
      reveal: { target: 'prompt', text: x.sentence, marks: rhetoricMarks((cards.filter(function (c) { return c.name === x.answer; })[0] || {}).key, x.sentence, x.mark) },
      hints: { h1: { text: '想一想：這句話是把東西寫得像人、把東西比成別的東西、有重複的字，還是用問句？' }, h2: { text: x.clue }, teach: { text: x.explain } } };
  }
  /* 本身就是名詞的疊字（星星、媽媽），不算修辭的疊字 */
  var NOUN_AA = ['星星', '猩猩', '媽媽', '爸爸', '哥哥', '姊姊', '姐姐', '弟弟', '妹妹', '爺爺', '奶奶', '公公', '婆婆',
    '寶寶', '娃娃', '叔叔', '伯伯', '姑姑', '舅舅', '太太', '蛐蛐', '狒狒'];
  /* 公布答案時要圈起來的地方：疊字圈重複的字、譬喻圈「像……」、設問圈問句；擬人用資料裡的 mark */
  function rhetoricMarks(key, text, manual) {
    if (manual && manual.length) return manual.filter(function (m) { return text.indexOf(m) >= 0; });
    var out = [], m;
    if (key === 'redup') {
      var re = /([\u4e00-\u9fff])\1/g;
      while ((m = re.exec(text))) if (out.indexOf(m[0]) < 0 && NOUN_AA.indexOf(m[0]) < 0) out.push(m[0]);
    } else if (key === 'simile') {
      /* 譬喻：關鍵詞（像、好像、如同、彷彿）圈起來，後面被比成的東西畫底線 */
      m = /(好像|如同|彷彿|像)(.*?)(一樣|一般|，|。|！|？|、|$)/.exec(text);
      if (m) { out.push(m[1]); if (m[2]) out.push({ text: m[2], kind: 'line' }); }
    } else if (key === 'question') {
      var q = text.indexOf('？'); if (q > 0) out.push(text.slice(0, q + 1));
    }
    return out;
  }
  /* 修辭闖關：是不是？（⭕ 在前、❌ 在後，不打亂） */
  /* 疊字、類疊說「有沒有」「哪一句有」；其他修辭說「是不是」「哪一句用了」 */
  function isRedup(card) { return card.key === 'redup' || card.key === 'repeat'; }
  function rhYesNoQuestion(y, card) {
    var ask = isRedup(card) ? '有沒有' : '是不是', yes = isRedup(card) ? '有' : '是', no = isRedup(card) ? '沒有' : '不是';
    /* 問句換到第二行；自動念時連問句一起念 */
    var say = y.sentence + '。這句話' + ask + card.name + '？';
    return { id: y.id, prompt: '「' + y.sentence + '」\n' + ask + card.name + '？', say: say, autoSay: say,
      options: [{ text: '⭕', say: yes + card.name, big: true }, { text: '❌', say: no + card.name, big: true }], answer: y.answer ? 0 : 1, fixedOrder: true,
      reveal: y.answer ? { target: 'prompt', text: y.sentence, marks: rhetoricMarks(card.key, y.sentence, y.mark) } : undefined,
      hints: { h1: { text: '想一想：' + card.name + '是' + card.meaning }, h2: { text: y.clue }, teach: { text: y.explain } } };
  }
  /* 修辭闖關：哪一句是？（第一個選項是對的） */
  function rhPickQuestion(p, card, r) {
    var q = first(p, '哪一句' + (isRedup(card) ? '有' : '用了') + card.name + '？', null, r);
    q.list = true;
    q.reveal = { target: 'answer', text: p.options[0], marks: rhetoricMarks(card.key, p.options[0], p.mark) };
    q.hints = { h1: { text: '想一想：' + card.name + '是' + card.meaning }, h2: { text: p.clue }, teach: { text: p.explain } };
    return q;
  }
  var PATTERN_WORDS = { zhiyao: '「只要」和「就」', ruguo: '「如果」、「不但」、「還」' };
  function speakMethod(rule) {
    if (rule.kind === 'phrase') return '先說它是什麼樣子，再說「的」，最後說它是什麼。';
    if (rule.kind === 'word') return '記得句子裡要說到「' + rule.word + '」，而且要說完整的一句話喔。';
    if (rule.kind === 'free') return '想一想課文說了什麼，再用一句完整的話說出你自己的想法。';
    return '記得要用' + PATTERN_WORDS[rule.key] + '喔。';
  }
  /* 說說看：h1 給方法、h2 給線索、teach 示範一句後讓學生自己再說一次 */
  function speakQuestion(item, rule, prompt) {
    var model = (item.front || '') + item.model;
    return { type: 'speak', id: item.id, prompt: prompt, img: item.img, front: item.front, rule: rule, model: model,
      hints: { h1: { text: speakMethod(rule) }, h2: { text: item.clue }, teach: { text: '老師示範：「' + model + '」。換你說說看！' } } };
  }

  function findWordQuestion(w, id, r) {
    var pick = function (list) { return (list || []).filter(function (x) { return x.id === id; })[0]; };
    var x;
    if ((x = pick(w.hanzi))) return hanziQuestion(x, r);
    if ((x = pick(w.vocab))) return vocabQuestion(x, x.noPic || r() < 0.5 ? 'meaning' : 'pic', r);
    if ((x = pick(w.similar))) return similarQuestion(x, r);
    var idm = (w.idioms || []).filter(function (y) { return ['io-', 'is-', 'if-'].some(function (p) { return p + y.idiom === id; }); })[0];
    if (idm) return id.indexOf('io-') === 0 ? idiomOrderQuestion(idm, r) : id.indexOf('if-') === 0 ? idiomFillQuestion(idm, r) : idiomSituationQuestion(idm, w.idioms, r);
    var bz = (w.hanzi || []).filter(function (y) { return y.build && 'b-' + y.char === id; })[0];
    if (bz) return buildQuestion(bz, r);
    if ((x = pick(w.charwords))) return charWordQuestion(x, r, (w.hanzi || []).map(function (y) { return y.char; }));
    if ((x = pick(w.listen))) return listenQuestion(x, r);
    if (w.phrase && (x = pick(w.phrase.pick))) return phrasePickQuestion(x, r);
    if (w.phrase && (x = pick(w.phrase.choose))) {
      var pw = (w.phrase.words || []).filter(function (y) { return y.word === x.word; })[0];
      return chooseQuestion(x, r, pw && pw.meaning);
    }
    for (var i = 0; i < (w.pattern || []).length; i++) {
      if ((x = pick(w.pattern[i].match))) return matchQuestion(x, r);
      if ((x = pick(w.pattern[i].conj))) return conjQuestion(x, r);
    }
    if (w.rhetoric && (x = pick(w.rhetoric.quiz))) return rhetoricQuestion(x, w.rhetoric.cards, r);
    for (var j = 0; w.rhetoric && j < w.rhetoric.cards.length; j++) {
      var card = w.rhetoric.cards[j];
      if ((x = pick(card.yesno))) return rhYesNoQuestion(x, card);
      if ((x = pick(card.pick))) return rhPickQuestion(x, card, r);
    }
    return null;
  }
  return { hanziQuestion: hanziQuestion, vocabQuestion: vocabQuestion, charWordQuestion: charWordQuestion, buildQuestion: buildQuestion, idiomOrderQuestion: idiomOrderQuestion, idiomSituationQuestion: idiomSituationQuestion, idiomFillQuestion: idiomFillQuestion, similarQuestion: similarQuestion,
    listenQuestion: listenQuestion,
    phrasePickQuestion: phrasePickQuestion, chooseQuestion: chooseQuestion, matchQuestion: matchQuestion, conjQuestion: conjQuestion,
    rhetoricQuestion: rhetoricQuestion, rhetoricMarks: rhetoricMarks, rhYesNoQuestion: rhYesNoQuestion, rhPickQuestion: rhPickQuestion, patternClauses: patternClauses, speakQuestion: speakQuestion, readingHints: readingHints, findWordQuestion: findWordQuestion };
});

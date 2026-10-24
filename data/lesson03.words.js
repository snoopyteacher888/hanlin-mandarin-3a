/* 第 3 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qe: 'extract', qf: 'extract', qd: 'infer', qg: 'infer',
      qh: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    hanzi: [
      { id: 'h-統', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['充', 's', '']]}, char: '統', zhuyin: 'ㄊㄨㄥˇ', radical: '糸', strokes: 12, words: ['統計', '傳統'], say: '統，統計的統', cloze: '傳＿', img: 'count-votes.png', options: ['統', '充', '銃', '流'], clue: '這個字的左邊，是糸字旁。', explain: '答案是「統」，左邊是糸字旁；「充」沒有糸字旁，「流」的左邊是三點水。', parts: ['糸', '充'], story: '左邊是糸字旁，就是絲線；右邊的「充」念起來像「統」。把很多條絲線集合在一起，就是「統」；把東西集合起來算一算，就是「統計」。', sentence: '老師統計大家喜歡的水果。', build: { layout: 'lr', show: ['？', '充'], answer: '糸', options: ['糸', '金', '氵', '木'], clue: '想一想：很多絲線集合在一起，左邊放什麼？' } },
      { id: 'h-票', combo: {'layout': 'tb', 'parts': [['覀', 's', ''], ['示', 'm', '告訴']]}, char: '票', zhuyin: 'ㄆㄧㄠˋ', radical: '示', strokes: 11, words: ['公車票', '門票'], say: '票，門票的票', cloze: '門＿', img: 'bus-ticket.png', options: ['票', '栗', '粟', '漂'], clue: '這個字的下面，是「示」。', explain: '答案是「票」，下面是「示」；「栗」的下面是「木」，「粟」的下面是「米」。', parts: ['覀', '示'], story: '上面像一個蓋子，下面是「示」。拿出來給人看、證明你可以進去的小紙卡，就是「票」。', sentence: '去動物園要先買門票。', build: { layout: 'tb', show: ['覀', '？'], answer: '示', options: ['示', '木', '米', '小'], clue: '想一想：「栗」的下面是木，「粟」的下面是米，這個字的下面不一樣。' } },
      { id: 'h-角', combo: {'type': '象形字', 'pict': '很久以前的「角」，是畫一隻牛角，上面尖尖的，中間還有一條一條的紋路。'}, char: '角', zhuyin: 'ㄐㄧㄠˇ', radical: '角', strokes: 7, words: ['三角板', '牛角'], say: '角，三角形的角', cloze: '牛＿', img: 'triangle-ruler.png', options: ['角', '用', '解', '魚'], clue: '這個字的上面像一個尖尖的頭，下面像「用」。', explain: '答案是「角」；「用」的上面沒有尖尖的頭，「解」的左邊才是它。', parts: ['角'], story: '很久以前的「角」是畫牛角，上面尖尖的。三條線圍起來，有三個尖尖的地方，就是「三角形」。', sentence: '這頭牛的角又長又彎。' },
      { id: 'h-板', combo: {'layout': 'lr', 'parts': [['木', 'm', '木頭'], ['反', 's', '']]}, char: '板', zhuyin: 'ㄅㄢˇ', radical: '木', strokes: 8, words: ['三角板', '黑板'], say: '板，黑板的板', cloze: '黑＿', img: 'triangle-ruler.png', options: ['板', '扳', '版', '飯'], clue: '這個字的左邊，是木字旁。', explain: '答案是「板」，左邊是「木」；「扳」的左邊是提手旁，「版」的左邊是「片」。', parts: ['木', '反'], story: '左邊是「木」，右邊的「反」念起來像「板」。木頭切成又平又薄的一片，就是「木板」。', sentence: '老師在黑板上寫字。', build: { layout: 'lr', show: ['？', '反'], answer: '木', options: ['木', '扌', '片', '食'], clue: '想一想：很久以前的黑板，是用樹做成的，左邊放什麼？' } },
      { id: 'h-業', combo: {'type': '象形字', 'pict': '很久以前的「業」，像一塊掛樂器的木架，上面有一排豎起來的小柱子。後來做的事、讀的書都叫「業」。'}, char: '業', zhuyin: 'ㄧㄝˋ', radical: '木', strokes: 13, words: ['作業本', '畢業'], say: '業，作業的業', cloze: '畢＿', img: 'homework-book.png', options: ['業', '葉', '對', '叢'], clue: '這個字的上面像一排豎起來的小柱子，下面像「木」。', explain: '答案是「業」；「葉」是樹葉的葉，上面是草字頭。', parts: ['業'], story: '「業」像一塊木架，上面有一排小柱子。學生每天要做的功課，就叫「作業」。', sentence: '哥哥今年國小畢業了。' },
      { id: 'h-本', combo: {'type': '指事字', 'pict': '「木」是一棵樹，下面多一短橫，指著樹根的地方，就是「本」。所以有「根本、本來」的意思。'}, char: '本', zhuyin: 'ㄅㄣˇ', radical: '木', strokes: 5, words: ['作業本', '本來'], say: '本，本來的本', cloze: '＿來', img: 'homework-book.png', options: ['本', '木', '未', '末'], clue: '這個字是「木」的下面，多了一短橫。', explain: '答案是「本」；「未」是上面多一短橫，「末」是上面多一長橫。', parts: ['木', '一'], story: '「木」是一棵樹，在下面加一短橫，指著樹根，就是「本」。樹根是樹最開始的地方，所以「本來」是一開始的意思。', sentence: '我本來想去公園。' },
      { id: 'h-該', combo: {'layout': 'lr', 'parts': [['言', 'm', '說話'], ['亥', 's', '']]}, char: '該', zhuyin: 'ㄍㄞ', radical: '言', strokes: 13, words: ['該', '應該'], say: '該，應該的該', cloze: '應＿', img: 'time-go-home.png', options: ['該', '刻', '孩', '核'], clue: '這個字的左邊，是言字旁。', explain: '答案是「該」，左邊是「言」；「孩」的左邊是「子」，「刻」的右邊是立刀旁。', parts: ['言', '亥'], story: '左邊是「言」，就是說話；右邊的「亥」念起來有點像「該」。照道理說要這樣做，就是「應該」。', sentence: '我們應該遵守交通規則。', build: { layout: 'lr', show: ['？', '亥'], answer: '言', options: ['言', '子', '木', '刂'], clue: '想一想：「應該」是說出來的道理，左邊放跟說話有關的部首。' } },
      { id: 'h-喊', combo: {'layout': 'lr', 'parts': [['口', 'm', '嘴巴'], ['咸', 's', '']]}, char: '喊', zhuyin: 'ㄏㄢˇ', radical: '口', strokes: 12, words: ['喊', '大喊'], say: '喊，大喊的喊', cloze: '大＿', img: 'shout-name.png', options: ['喊', '減', '感', '鹹'], clue: '這個字的左邊，是口字旁。', explain: '答案是「喊」，左邊是「口」；「減」的左邊是兩點，「感」的下面是「心」。', parts: ['口', '咸'], story: '左邊是「口」，就是嘴巴；右邊的「咸」念起來像「喊」。張大嘴巴，很大聲的叫，就是「喊」。', sentence: '他在山上大喊。', build: { layout: 'lr', show: ['？', '咸'], answer: '口', options: ['口', '冫', '心', '木'], clue: '想一想：大聲的叫，要用身體的哪個部分？' } },
      { id: 'h-文', combo: {'type': '象形字', 'pict': '很久以前的「文」，是畫一個人，胸前有花紋。後來寫在紙上的字，也叫「文」。'}, char: '文', zhuyin: 'ㄨㄣˊ', radical: '文', strokes: 4, words: ['文具', '中文'], say: '文，中文的文', cloze: '中＿', img: 'stationery.png', options: ['文', '交', '父', '又'], clue: '這個字上面是一點一橫，下面是交叉的兩筆。', explain: '答案是「文」；「交」的中間多了兩點，「父」的上面是兩點。', parts: ['文'], story: '很久以前的「文」是畫一個人身上有花紋。後來寫在紙上的字，也叫「文」，像「中文」。', sentence: '我會用中文寫名字。' },
      { id: 'h-具', combo: {'type': '會意字', 'pict': '上面像一個煮東西的鍋子，下面像兩隻手捧著。用手捧著的器具，就是「具」。'}, char: '具', zhuyin: 'ㄐㄩˋ', radical: '八', strokes: 8, words: ['文具', '玩具'], say: '具，玩具的具', cloze: '玩＿', img: 'stationery.png', options: ['具', '真', '且', '貝'], clue: '這個字的下面有兩點，上面的框裡有三橫。', explain: '答案是「具」；「真」的上面多了「十」，「貝」的框裡只有兩橫。', parts: ['且', '八'], story: '上面像一個鍋子，下面像兩隻手捧著。可以拿來用的東西，像鉛筆、尺，叫做「文具」。', sentence: '弟弟把玩具收好。' },
      { id: 'h-理', combo: {'layout': 'lr', 'parts': [['王', 'm', '玉'], ['里', 's', '']]}, char: '理', zhuyin: 'ㄌㄧˇ', radical: '玉', strokes: 11, words: ['整理', '道理'], say: '理，整理的理', cloze: '道＿', img: 'tidy-bag.png', options: ['理', '里', '埋', '狸'], clue: '這個字的左邊是斜玉旁，右邊是「里」。', explain: '答案是「理」，左邊是斜玉旁；「里」沒有斜玉旁，「埋」的左邊是「土」。', parts: ['王', '里'], story: '左邊是斜玉旁，右邊的「里」念起來像「理」。把玉石照著紋路磨得整整齊齊，就是「理」；把東西收好，就是「整理」。', sentence: '老師說的話很有道理。', build: { layout: 'lr', show: ['？', '里'], answer: '王', options: ['王', '土', '犭', '木'], clue: '想一想：這個字的左邊，和「玩」、「球」的左邊一樣。' } },
      { id: 'h-此', combo: {'layout': 'lr', 'parts': [['止', 'm', '停下來的腳'], ['匕', 'p', '']]}, char: '此', zhuyin: 'ㄘˇ', radical: '止', strokes: 6, words: ['因此', '從此'], say: '此，因此的此', cloze: '從＿', img: 'rain-postpone.png', options: ['此', '比', '些', '北'], clue: '這個字的左邊是「止」，右邊是「匕」。', explain: '答案是「此」；「比」的左右都是「匕」，「些」的下面多了「二」。', parts: ['止', '匕'], story: '左邊的「止」像一隻腳停下來，右邊的「匕」像一個人。人停在這裡，就是「此」，有「這裡、這個」的意思。', sentence: '他學會游泳，從此天天都去游泳池。' },
      { id: 'h-餘', combo: {'layout': 'lr', 'parts': [['食', 'm', '吃'], ['余', 's', '']]}, char: '餘', zhuyin: 'ㄩˊ', radical: '食', strokes: 16, words: ['有餘', '多餘'], say: '餘，多餘的餘', cloze: '多＿', img: 'leftover-food.png', options: ['餘', '除', '徐', '途'], clue: '這個字的左邊是食字旁，右邊是「余」。', explain: '答案是「餘」，左邊是食字旁；「除」的左邊是耳朵旁，「徐」的左邊是雙人旁。', parts: ['食', '余'], story: '左邊是食字旁，跟吃東西有關；右邊的「余」念起來像「餘」。吃不完、剩下來的，就是「餘」。', sentence: '把多餘的紙拿去回收。' },
      { id: 'h-備', combo: {'type': '形聲字', 'pict': '左邊是單人旁，右邊像一個裝箭的袋子。人先把箭裝好，等著要用，就是「備」。'}, char: '備', zhuyin: 'ㄅㄟˋ', radical: '人', strokes: 12, words: ['準備', '預備'], say: '備，準備的備', cloze: '預＿', img: 'get-ready.png', options: ['備', '佩', '偏', '倫'], clue: '這個字的左邊是單人旁，右邊的上面像草字頭。', explain: '答案是「備」；「偏」的右邊是「扁」，「佩」的右邊是「凡」和「巾」。', parts: ['亻', '𤰇'], story: '左邊是單人旁，右邊像一個裝箭的袋子。先把要用的東西裝好，就是「準備」。', sentence: '明天要郊遊，我先準備好背包。' },
      { id: 'h-易', combo: {'layout': 'tb', 'parts': [['日', 'p', ''], ['勿', 'p', '']]}, char: '易', zhuyin: 'ㄧˋ', radical: '日', strokes: 8, words: ['容易', '輕易'], say: '易，容易的易', cloze: '輕＿', img: 'easy-math.png', options: ['易', '場', '湯', '陽'], clue: '這個字的上面是「日」，下面是「勿」。', explain: '答案是「易」；「場」、「湯」、「陽」的左邊都多了別的部首。', parts: ['日', '勿'], story: '上面是「日」，下面是「勿」。很久以前的「易」像一隻會變顏色的小蜥蜴，變來變去很簡單，所以有「容易」的意思。', sentence: '這題好容易，我一下子就寫完了。', build: { layout: 'tb', show: ['日', '？'], answer: '勿', options: ['勿', '月', '木', '十'], clue: '想一想：「請不要」的「不要」，可以寫成哪一個字？' } }
    ],
    vocab: [
      { id: 'v-統計', cloze: true, clozeOptions: ['統計', '丟掉', '畫畫', '唱歌'], word: '統計', meaning: '把東西一個一個數清楚，算出總共有多少。', example: '老師＿＿全班喜歡吃什麼水果，蘋果最多人選。', img: 'count-votes.png', options: ['統計', '整理', '準備', '因此'] },
      { id: 'v-公車票', word: '公車票', meaning: '坐公車時要用的票。', example: '上車前，我先拿出＿＿＿。', img: 'bus-ticket.png', options: ['公車票', '三角板', '作業本', '文具'] },
      { id: 'v-三角板', word: '三角板', meaning: '有三個角，可以畫直線、量角度的尺。', example: '老師請我們拿出＿＿＿，畫一個直角。', img: 'triangle-ruler.png', options: ['三角板', '公車票', '作業本', '情況'] },
      { id: 'v-作業本', word: '作業本', meaning: '寫回家功課用的本子。', example: '我把功課寫在＿＿＿上。', img: 'homework-book.png', options: ['作業本', '三角板', '公車票', '文具'] },
      { id: 'v-情況', word: '情況', meaning: '事情發生的樣子。', example: '醫生問媽媽，弟弟生病的＿＿怎麼樣。', img: 'doctor-ask.png', options: ['情況', '文具', '有餘', '因此'] },
      { id: 'v-匆忙', cloze: true, clozeOptions: ['匆忙', '安靜', '悠閒', '輕鬆'], word: '匆忙', meaning: '很急、很趕的樣子。', example: '快遲到了，哥哥＿＿的跑出門。', img: 'rush-out.png', options: ['匆忙', '容易', '有餘', '整理'] },
      { id: 'v-該', word: '該', meaning: '照道理要這樣做。', example: '時間到了，我們＿回家了。', img: 'time-go-home.png', options: ['該', '喊', '情況', '有餘'] },
      { id: 'v-喊', cloze: true, clozeOptions: ['喊', '聽', '看', '睡'], word: '喊', meaning: '用很大的聲音叫。', example: '弟弟在操場上大＿我的名字。', img: 'shout-name.png', options: ['喊', '該', '整理', '準備'] },
      { id: 'v-文具', word: '文具', meaning: '讀書寫字要用的東西，像鉛筆、橡皮擦和尺。', example: '我把鉛筆、橡皮擦這些＿＿放進鉛筆盒。', img: 'stationery.png', options: ['文具', '作業本', '公車票', '情況'] },
      { id: 'v-整理', cloze: true, clozeOptions: ['整理', '弄亂', '丟掉', '吃掉'], word: '整理', meaning: '把亂亂的東西收拾好。', example: '睡覺前，我先＿＿好書包。', img: 'tidy-bag.png', options: ['整理', '準備', '統計', '喊'] },
      { id: 'v-因此', cloze: true, clozeOptions: ['因此', '可是', '如果', '雖然'], word: '因此', meaning: '所以。', example: '今天下大雨，＿＿運動會改到明天。', img: 'rain-postpone.png', options: ['因此', '容易', '有餘', '匆忙'] },
      { id: 'v-有餘', cloze: true, clozeOptions: ['有餘', '不夠', '沒有', '太少'], word: '有餘', meaning: '多出來一些，用都用不完。', example: '媽媽煮了一大鍋湯，全家喝完還＿＿。', img: 'leftover-food.png', options: ['有餘', '因此', '容易', '匆忙'] },
      { id: 'v-準備', cloze: true, clozeOptions: ['準備', '忘記', '弄壞', '丟掉'], word: '準備', meaning: '先把要用的東西弄好。', example: '明天要去郊遊，我今天先＿＿好背包。', img: 'get-ready.png', options: ['準備', '整理', '統計', '該'] },
      { id: 'v-容易', cloze: true, clozeOptions: ['容易', '困難', '麻煩', '辛苦'], word: '容易', meaning: '不難，很快就能做好。', example: '這一題很＿＿，我一下子就算出來了。', img: 'easy-math.png', options: ['容易', '匆忙', '有餘', '因此'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-統', char: '統', img: 'cw-tradition.png', charMeaning: '集合在一起；一直傳下來。', word: '傳統', meaning: '從很久以前一直傳下來的習慣。', example: '過年吃年夜飯，是我們的＿＿。', options: ['傳統', '門票', '黑板', '玩具'] },
      { id: 'cw-票', char: '票', img: 'cw-ticket.png', charMeaning: '證明可以進去、可以坐車的小紙卡。', word: '門票', meaning: '進去參觀時要用的票。', example: '去動物園要先買＿＿。', options: ['門票', '畢業', '道理', '多餘'] },
      { id: 'cw-角', char: '角', img: 'cw-ox-horn.png', charMeaning: '動物頭上尖尖硬硬的東西；尖尖的地方。', word: '牛角', meaning: '牛頭上長出來、尖尖彎彎的角。', example: '這頭牛的＿＿又長又彎。', options: ['牛角', '中文', '本來', '輕易'] },
      { id: 'cw-板', char: '板', img: 'cw-blackboard.png', charMeaning: '又平又薄的一片。', word: '黑板', meaning: '教室前面寫字用的大板子。', example: '老師在＿＿上寫下今天的功課。', options: ['黑板', '牛角', '傳統', '從此'] },
      { id: 'cw-業', char: '業', img: 'cw-graduate.png', charMeaning: '學生要做的功課；工作。', word: '畢業', meaning: '讀完學校的課程，離開學校。', example: '哥哥今年國小＿＿了。', options: ['畢業', '應該', '玩具', '預備'] },
      { id: 'cw-本', char: '本', img: 'cw-change-plan.png', charMeaning: '一開始的、原來的。', word: '本來', meaning: '原本、一開始。', example: '我＿＿想去公園，後來去了圖書館。', options: ['本來', '大喊', '門票', '黑板'] },
      { id: 'cw-該', char: '該', img: 'cw-crosswalk.png', charMeaning: '照道理要這樣做。', word: '應該', meaning: '照道理要這樣做。', example: '過馬路時，我們＿＿走斑馬線。', options: ['應該', '傳統', '多餘', '畢業'] },
      { id: 'cw-喊', char: '喊', img: 'cw-mountain-shout.png', charMeaning: '大聲叫。', word: '大喊', meaning: '用很大的聲音叫出來。', example: '爬到山頂，他開心的＿＿：「我做到了！」', options: ['大喊', '道理', '牛角', '輕易'] },
      { id: 'cw-文', char: '文', img: 'cw-write-name.png', charMeaning: '寫出來的字。', word: '中文', meaning: '我們平常說的話、寫的字。', example: '我會用＿＿寫我的名字。', options: ['中文', '黑板', '本來', '預備'] },
      { id: 'cw-具', char: '具', img: 'cw-toys.png', charMeaning: '可以拿來用的東西。', word: '玩具', meaning: '拿來玩的東西。', example: '弟弟把＿＿收進箱子裡。', options: ['玩具', '門票', '應該', '從此'] },
      { id: 'cw-理', char: '理', img: 'cw-teacher-explain.png', charMeaning: '對的說法；把東西弄整齊。', word: '道理', meaning: '對的說法，應該要懂的事。', example: '老師說的話很有＿＿。', options: ['道理', '大喊', '畢業', '牛角'] },
      { id: 'cw-此', char: '此', img: 'cw-swim-pool.png', charMeaning: '這裡、這個時候。', word: '從此', meaning: '從這個時候開始。', example: '他學會游泳以後，＿＿每個夏天都去游泳池。', options: ['從此', '中文', '傳統', '多餘'] },
      { id: 'cw-餘', char: '餘', img: 'cw-extra-paper.png', charMeaning: '剩下來、多出來的。', word: '多餘', meaning: '多出來、用不到的。', example: '把＿＿的紙拿去回收。', options: ['多餘', '玩具', '黑板', '應該'] },
      { id: 'cw-備', char: '備', img: 'cw-race-start.png', charMeaning: '先弄好。', word: '預備', meaning: '先準備好，等著開始。', example: '跑步比賽要開始了，大家站好，＿＿！', options: ['預備', '道理', '門票', '本來'] },
      { id: 'cw-易', char: '易', img: 'cw-easy-lift.png', charMeaning: '不難。', word: '輕易', meaning: '很輕鬆、一點都不費力。', example: '大力士＿＿的就把箱子搬起來了。', options: ['輕易', '從此', '中文', '畢業'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-天涯海角', situationImg: 'id-far-away.png', idiom: '天涯海角', char: '角', meaning: '非常非常遠的地方。', example: '不管你在天涯海角，我們都是好朋友。', situation: '好朋友搬到了很遠很遠的國家，可是她們每個星期都視訊聊天。',
        fill: { options: ['就算你跑到＿＿＿＿，我也會想念你。', '學校就在我家旁邊，真是＿＿＿＿。'], clue: '提示：哪一句說的是很遠很遠的地方？', explain: '第一句用得對：跑到很遠的地方，也會想念你。學校在家旁邊，非常近，剛好相反。' } },
      { id: 'i-安居樂業', situationImg: 'id-happy-town.png', idiom: '安居樂業', char: '業', meaning: '大家住得很安穩，也很喜歡自己的工作。', example: '這個小鎮的人們安居樂業，每天都過得很開心。', situation: '小鎮上，麵包師傅開心的烤麵包，農夫開心的種菜，大家住得安安穩穩。',
        fill: { options: ['這裡的人都＿＿＿＿，生活過得很幸福。', '颱風把房子吹壞了，大家都＿＿＿＿。'], clue: '提示：哪一句的人住得很安穩、很開心？', explain: '第一句用得對：大家生活得很幸福。房子被吹壞了，剛好相反。' } },
      { id: 'i-本末倒置', situationImg: 'id-decorate-first.png', idiom: '本末倒置', char: '本', meaning: '把重要的事和不重要的事弄反了。', example: '只顧著把封面畫漂亮，卻沒寫內容，真是本末倒置。', situation: '小明要交作業，他花了一整個晚上把封面畫得好漂亮，裡面的題目卻一題也沒寫。',
        fill: { options: ['只顧著包書套，卻沒有讀書，真是＿＿＿＿。', '他先寫完功課再去玩，真是＿＿＿＿。'], clue: '提示：哪一句把重要的事放到後面，先做不重要的事？', explain: '第一句用得對：讀書比包書套重要，卻先包書套。先寫功課再玩，順序是對的。' } },
      { id: 'i-每況愈下', situationImg: 'id-wilting-plant.png', idiom: '每況愈下', char: '況', meaning: '情形越來越糟糕。', example: '這盆花沒人照顧，每況愈下，葉子都黃了。', situation: '這盆花好幾天沒有澆水，第一天葉子有點垂，第二天葉子變黃，第三天花瓣都掉了。',
        fill: { options: ['他天天熬夜，身體＿＿＿＿。', '他每天運動，身體越來越好，真是＿＿＿＿。'], clue: '提示：哪一句的情形越來越糟糕？', explain: '第一句用得對：天天熬夜，身體越來越差。每天運動身體越來越好，剛好相反。' } },
      { id: 'i-文質彬彬', situationImg: 'id-polite-boy.png', idiom: '文質彬彬', char: '文', meaning: '說話、做事都很有禮貌，看起來很斯文。', example: '新來的同學文質彬彬，見到人都會微笑問好。', situation: '新來的大哥哥穿得整整齊齊，說話輕聲細語，見到老師還會鞠躬問好。',
        fill: { options: ['他說話很有禮貌，看起來＿＿＿＿。', '他大吼大叫、亂丟東西，真是＿＿＿＿。'], clue: '提示：哪一句的人很有禮貌、很斯文？', explain: '第一句用得對：說話有禮貌，很斯文。大吼大叫、亂丟東西，剛好相反。' } },
      { id: 'i-心安理得', situationImg: 'id-return-wallet.png', idiom: '心安理得', char: '理', meaning: '做的事是對的，所以心裡很踏實，一點也不擔心。', example: '他把撿到的錢包交給警察，心安理得的回家了。', situation: '小華在路上撿到一個錢包，馬上交給警察叔叔，回家的時候心裡好輕鬆。',
        fill: { options: ['他把撿到的錢還給失主，覺得很＿＿＿＿。', '他偷拿了別人的東西，晚上睡不著，一點也不＿＿＿＿，好害怕。'], clue: '提示：哪一句的人做了對的事，心裡很踏實？', explain: '第一句用得對：還錢給失主，心裡很踏實。偷拿東西會害怕、睡不著，所以不能心安理得。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-統', char: '統', wrong: '充', sentence: '老師統計大家喜歡的水果。', options: ['統', '充', '流'], clue: '這裡是說數一數、算出總數，想一想，哪一個字的左邊是糸字旁？', explain: '要改成「統」。數一數、算出總數是「統計」，左邊是糸字旁；「充」沒有糸字旁。' },
      { id: 'fx-票', char: '票', wrong: '栗', sentence: '去動物園要先買門票。', options: ['票', '栗', '粟'], clue: '這裡說的是進去要用的小紙卡，想一想，哪一個字的下面是「示」？', explain: '要改成「票」。進去要用的紙卡是「門票」，下面是「示」；「栗」是栗子的栗。' },
      { id: 'fx-角', char: '角', wrong: '用', sentence: '這頭牛的角又長又彎。', options: ['角', '用', '解'], clue: '這裡說的是牛頭上尖尖的東西，想一想，哪一個字的上面像一個尖尖的頭？', explain: '要改成「角」。牛頭上尖尖的是「角」；「用」的上面沒有尖尖的頭。' },
      { id: 'fx-板', char: '板', wrong: '扳', sentence: '老師在黑板上寫字。', options: ['板', '扳', '飯'], clue: '這裡說的是教室前面寫字的地方，想一想，哪一個字的左邊是木字旁？', explain: '要改成「板」。寫字的地方是「黑板」，左邊是「木」；「扳」的左邊是提手旁。' },
      { id: 'fx-業', char: '業', wrong: '葉', sentence: '哥哥今年國小畢業了。', options: ['業', '葉', '對'], clue: '這裡說的是讀完學校的課，跟樹葉沒有關係。', explain: '要改成「業」。讀完學校是「畢業」；「葉」是樹葉的葉。' },
      { id: 'fx-本', char: '本', wrong: '木', sentence: '我本來想去公園。', options: ['本', '木', '末'], clue: '這裡是說一開始、原先，想一想，哪一個字的下面多了一短橫？', explain: '要改成「本」。一開始是「本來」；「木」的下面少了一短橫。' },
      { id: 'fx-該', char: '該', wrong: '刻', sentence: '我們應該遵守交通規則。', options: ['該', '刻', '孩'], clue: '這裡是說照道理要這樣做，想一想，哪一個字的左邊是言字旁？', explain: '要改成「該」。照道理要這樣做是「應該」，左邊是「言」；「刻」的右邊是立刀旁。' },
      { id: 'fx-喊', char: '喊', wrong: '減', sentence: '他在山頂上開心的大喊。', options: ['喊', '減', '感'], clue: '這裡是說很大聲的叫，想一想，哪一個字的左邊是口字旁？', explain: '要改成「喊」。很大聲的叫是「喊」，左邊是「口」；「減」是減少的減。' },
      { id: 'fx-文', char: '文', wrong: '交', sentence: '我會用中文寫名字。', options: ['文', '交', '父'], clue: '這裡說的是我們寫的字，想一想，哪一個字的中間沒有兩點？', explain: '要改成「文」。我們寫的字是「中文」；「交」的中間多了兩點。' },
      { id: 'fx-具', char: '具', wrong: '真', sentence: '弟弟把玩具收好。', options: ['具', '真', '貝'], clue: '這裡說的是拿來玩的東西，想一想，哪一個字的上面沒有「十」？', explain: '要改成「具」。拿來玩的是「玩具」；「真」的上面多了「十」。' },
      { id: 'fx-理', char: '理', wrong: '里', sentence: '老師說的話很有道理。', options: ['理', '里', '埋'], clue: '這裡說的是對的說法，想一想，哪一個字的左邊是斜玉旁？', explain: '要改成「理」。對的說法是「道理」，左邊是斜玉旁；「里」沒有斜玉旁。' },
      { id: 'fx-此', char: '此', wrong: '比', sentence: '他學會游泳，從此天天都去游泳池。', options: ['此', '比', '些'], clue: '這裡是說從這個時候開始，想一想，哪一個字的左邊是「止」？', explain: '要改成「此」。從這時候開始是「從此」，左邊是「止」；「比」是比賽的比。' },
      { id: 'fx-餘', char: '餘', wrong: '除', sentence: '把多餘的紙拿去回收。', options: ['餘', '除', '途'], clue: '這裡是說多出來、用不到的，想一想，哪一個字的左邊是食字旁？', explain: '要改成「餘」。多出來的是「多餘」，左邊是食字旁；「除」的左邊是耳朵旁。' },
      { id: 'fx-備', char: '備', wrong: '佩', sentence: '明天要郊遊，我先準備好背包。', options: ['備', '佩', '偏'], clue: '這裡是說先把東西弄好，想一想，哪一個字的右邊上面像草字頭？', explain: '要改成「備」。先把東西弄好是「準備」；「佩」的右邊不一樣。' },
      { id: 'fx-易', char: '易', wrong: '場', sentence: '這題好容易，我一下子就寫完了。', options: ['易', '場', '湯'], clue: '這裡是說不難，想一想，哪一個字的左邊沒有別的部首？', explain: '要改成「易」。不難是「容易」；「場」的左邊多了「土」。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿計」是數一數，算出總數。', sentence: '老師＿計全班的人數。', frame: '＿計', options: ['統', '充'], answer: '統', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「統」；「充」是充滿的充。' },
      { id: 's2', meaning: '「＿滿」是裝得滿滿的。', sentence: '氣球裡＿滿了空氣。', frame: '＿滿', options: ['充', '統'], answer: '充', clue: '提示：這句話在說裝滿，這個字沒有糸字旁。', explain: '答案是「充」；「統」是統計的統。' },
      { id: 's3', meaning: '「門＿」是進去參觀要用的小紙卡。', sentence: '進動物園要買門＿。', frame: '門＿', options: ['票', '栗'], answer: '票', clue: '提示：這個字的下面是「示」。', explain: '答案是「票」；「栗」的下面是「木」。' },
      { id: 's4', meaning: '「＿子」是外面有刺殼、裡面香甜的果實。', sentence: '秋天到了，可以吃香香的＿子。', frame: '＿子', options: ['栗', '票'], answer: '栗', clue: '提示：這句話在說可以吃的果實，這個字的下面是「木」。', explain: '答案是「栗」；「票」是門票的票。' },
      { id: 's5', meaning: '「黑＿」是教室前面寫字的地方。', sentence: '老師在黑＿上寫字。', frame: '黑＿', options: ['板', '扳'], answer: '板', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「板」；「扳」的左邊是提手旁。' },
      { id: 's6', meaning: '「花＿」是東西上面的圖案。', sentence: '這件衣服的花＿好漂亮。', frame: '花＿', options: ['紋', '文'], answer: '紋', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「紋」；「文」是中文的文。' },
      { id: 's7', meaning: '「＿子」是會叮人、讓人很癢的小蟲。', sentence: '夏天晚上，＿子嗡嗡的飛來飛去。', frame: '＿子', options: ['蚊', '紋'], answer: '蚊', clue: '提示：這個字的左邊是虫字旁。', explain: '答案是「蚊」；「紋」是花紋的紋。' },
      { id: 's8', meaning: '「＿忙」是很急、很趕。', sentence: '他＿忙的跑出門。', frame: '＿忙', options: ['匆', '勿'], answer: '匆', clue: '提示：這個字的裡面多了一點。', explain: '答案是「匆」；「勿」是不要的意思。' },
      { id: 's9', meaning: '「請＿」是請不要。', sentence: '圖書館裡請＿大聲說話。', frame: '請＿', options: ['勿', '匆'], answer: '勿', clue: '提示：這句話在說「不要」，這個字的裡面沒有那一點。', explain: '答案是「勿」；「匆」是匆忙的匆。' },
      { id: 's10', meaning: '「＿福」是說好話，希望別人幸福。', sentence: '我們＿福你生日快樂。', frame: '＿福', options: ['祝', '況'], answer: '祝', clue: '提示：這個字的左邊是示字旁。', explain: '答案是「祝」；「況」是情況的況。' },
      { id: 's11', meaning: '「工＿」是做事時用的東西。', sentence: '鐵鎚是一種工＿。', frame: '工＿', options: ['具', '真'], answer: '具', clue: '提示：這個字的上面沒有「十」。', explain: '答案是「具」；「真」的上面多了「十」。' }
    ],
    listen: [
      { id: 'l1', text: '坐公車的時候，要拿出來的小卡片。', answer: 0, options: [{ text: '公車票', img: 'bus-ticket.png' }, { text: '三角板', img: 'triangle-ruler.png' }, { text: '作業本', img: 'homework-book.png' }, { text: '文具', img: 'stationery.png' }] },
      { id: 'l2', text: '有三個尖尖的角，可以畫出直角的尺。', answer: 0, options: [{ text: '三角板', img: 'triangle-ruler.png' }, { text: '公車票', img: 'bus-ticket.png' }, { text: '文具', img: 'stationery.png' }, { text: '作業本', img: 'homework-book.png' }] },
      { id: 'l3', text: '寫回家功課用的本子。', answer: 0, options: [{ text: '作業本', img: 'homework-book.png' }, { text: '公車票', img: 'bus-ticket.png' }, { text: '三角板', img: 'triangle-ruler.png' }, { text: '情況', img: 'doctor-ask.png' }] },
      { id: 'l4', text: '鉛筆、橡皮擦、尺，都是讀書寫字要用的東西。', answer: 0, options: [{ text: '文具', img: 'stationery.png' }, { text: '作業本', img: 'homework-book.png' }, { text: '公車票', img: 'bus-ticket.png' }, { text: '有餘', img: 'leftover-food.png' }] },
      { id: 'l5', text: '快遲到了，頭髮沒梳就衝出門。', answer: 0, options: [{ text: '匆忙', img: 'rush-out.png' }, { text: '容易', img: 'easy-math.png' }, { text: '整理', img: 'tidy-bag.png' }, { text: '統計', img: 'count-votes.png' }] },
      { id: 'l6', text: '張大嘴巴，很大聲的叫人的名字。', answer: 0, options: [{ text: '喊', img: 'shout-name.png' }, { text: '整理', img: 'tidy-bag.png' }, { text: '準備', img: 'get-ready.png' }, { text: '匆忙', img: 'rush-out.png' }] },
      { id: 'l7', text: '把書和鉛筆一樣一樣收好，放進書包。', answer: 0, options: [{ text: '整理', img: 'tidy-bag.png' }, { text: '喊', img: 'shout-name.png' }, { text: '容易', img: 'easy-math.png' }, { text: '因此', img: 'rain-postpone.png' }] },
      { id: 'l8', text: '這一題好簡單，一下子就寫完了。', answer: 0, options: [{ text: '容易', img: 'easy-math.png' }, { text: '匆忙', img: 'rush-out.png' }, { text: '統計', img: 'count-votes.png' }, { text: '有餘', img: 'leftover-food.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看誰是不做什麼的。',
      /* 短語一：誰＋是不＋做什麼事＋的（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '機器人是不怕累的', img: 'pr-robot.png',
        parts: [{ text: '機器人', role: '誰' }, { text: '是不' }, { text: '怕累', role: '不做什麼事' }, { text: '的' }],
        explain: '先說是誰，再說「是不」，接著說他不做的事，最後加上「的」，表示他一直都不會這樣做。' },
      pick: [
        { id: 'ph1', img: 'pr-eat-veg.png', before: '姐姐是不', noun: '的', join: '', ask: '姐姐是不做什麼的', look: '再看看圖片，姐姐把青菜都吃光了嗎？', options: ['挑食', '吃飯', '喝水', '洗碗'], clue: '提示：她什麼菜都吃，一點都不挑。', explain: '答案是「挑食」，姐姐什麼菜都吃，所以「姐姐是不挑食的」。' },
        { id: 'ph2', img: 'pr-honest.png', before: '小明是不', noun: '的', join: '', ask: '小明是不做什麼的', look: '再看看圖片，小明打破了杯子，有沒有說實話？', options: ['說謊', '說話', '讀書', '唱歌'], clue: '提示：小明打破杯子，馬上承認了。', explain: '答案是「說謊」，小明會說實話，所以「小明是不說謊的」。' },
        { id: 'ph3', img: 'pr-quiet-dog.png', before: '這隻小狗是不', noun: '的', join: '', ask: '這隻小狗是不做什麼的', look: '再看看圖片，客人來了，小狗有沒有汪汪叫？', options: ['亂叫', '吃飯', '睡覺', '跑步'], clue: '提示：客人來了，小狗乖乖的坐著。', explain: '答案是「亂叫」，小狗很安靜，所以「這隻小狗是不亂叫的」。' },
        { id: 'ph4', img: 'pr-no-litter.png', before: '弟弟是不', noun: '的', join: '', ask: '弟弟是不做什麼的', look: '再看看圖片，弟弟把紙屑丟到哪裡？', options: ['亂丟垃圾', '撿垃圾', '倒垃圾', '掃垃圾'], clue: '提示：弟弟把紙屑丟進垃圾桶。', explain: '答案是「亂丟垃圾」，弟弟會把垃圾丟進垃圾桶，所以「弟弟是不亂丟垃圾的」。' },
        { id: 'ph5', img: 'pr-red-light.png', before: '爸爸是不', noun: '的', join: '', ask: '爸爸是不做什麼的', look: '再看看圖片，紅燈亮了，爸爸怎麼做？', options: ['闖紅燈', '開車', '走路', '停車'], clue: '提示：紅燈亮了，爸爸把車停下來等。', explain: '答案是「闖紅燈」，爸爸會停下來等，所以「爸爸是不闖紅燈的」。' },
        { id: 'ph6', img: 'pr-practice.png', before: '哥哥是不', noun: '的', join: '', ask: '哥哥是不做什麼的', look: '再看看圖片，哥哥是不是每天都認真練習？', options: ['偷懶', '讀書', '運動', '吃飯'], clue: '提示：哥哥每天都認真練習，一天也沒有休息。', explain: '答案是「偷懶」，哥哥很認真，所以「哥哥是不偷懶的」。' },
        { id: 'ph7', img: 'pr-grandpa-sleep.png', before: '爺爺是不', noun: '的', join: '', ask: '爺爺是不做什麼的', look: '再看看圖片，天才剛黑，爺爺在做什麼？', options: ['熬夜', '睡覺', '吃飯', '散步'], clue: '提示：爺爺每天很早就上床，從來不晚睡。', explain: '答案是「熬夜」，爺爺很早就睡，所以「爺爺是不熬夜的」。' },
        { id: 'ph8', img: 'pr-shoes-tidy.png', before: '妹妹是不', noun: '的', join: '', ask: '妹妹是不做什麼的', look: '再看看圖片，妹妹的鞋子放在哪裡？', options: ['亂放鞋子', '穿鞋子', '買鞋子', '洗鞋子'], clue: '提示：鞋子都整整齊齊的放在鞋櫃裡。', explain: '答案是「亂放鞋子」，妹妹會把鞋子放好，所以「妹妹是不亂放鞋子的」。' }
      ],
      say: [],
      /* 第二個短語：不＋做什麼＋就不＋什麼結果（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '不吃早餐就不會有力氣', img: 'pz-breakfast.png',
          parts: [{ text: '不' }, { text: '吃早餐', role: '做什麼' }, { text: '就不' }, { text: '會有力氣', role: '什麼結果' }],
          explain: '先說「不」做什麼事，再說「就不」，最後說會有什麼結果。前面的事不做，後面的結果就不會出現。' },
        fill: [
          { id: 'pz1', img: 'pz-practice-piano.png', parts: ['不', '練習', '就不', '會進步'] },
          { id: 'pz2', img: 'pz-dry-flower.png', parts: ['不', '澆水', '就不', '會開花'] },
          { id: 'pz3', img: 'pz-bus-line.png', parts: ['不', '排隊', '就不', '能上車'] },
          { id: 'pz4', img: 'pz-exercise.png', parts: ['不', '運動', '就不', '會健康'] },
          { id: 'pz5', img: 'pz-reading.png', parts: ['不', '讀書', '就不', '會認字'] }
        ]
      },
      words: [
        { word: '來不及', meaning: '時間不夠，趕不上。', img: 'pz-miss-bus.png' },
        { word: '足夠', meaning: '夠用，不會缺少。', img: 'pz-enough-water.png' }
      ],
      choose: [
        { id: 'pw1', word: '來不及', options: ['睡過頭了，我差一點來不及上學。', '我很早就到學校了，真是來不及。'], clue: '提示：想一想，「來不及」是時間夠，還是不夠？', explain: '第一句用得對：睡過頭，時間不夠了。很早就到學校，時間很夠，不是來不及。' },
        { id: 'pw2', word: '足夠', options: ['我帶了足夠的水，喝一整天都夠。', '我的水很足夠，所以我好渴。'], clue: '提示：想一想，水足夠的話，還會口渴嗎？', explain: '第一句用得對：水夠喝一整天。水足夠就不會好渴，第二句說不通。' }
      ],
      make: [
        { id: 'pm1', word: '來不及', clue: '提示：想想看，什麼時候你差一點趕不上？', model: '公車開走了，我來不及上車。' },
        { id: 'pm2', word: '足夠', clue: '提示：想想看，什麼東西你準備得很夠？', model: '我存了足夠的錢，可以買一本新書。' }
      ]
    },
    pattern: [
      { key: 'rang', id: 'rg', title: '……，讓……', img: 'rang.png',
        meaning: '前面的事發生了，就讓後面的情形跟著出現。',
        examples: ['一場大雨，讓操場變得濕答答的。'],
        match: [
          { id: 'pt-rg-m1', img: 'pt-warm-sun.png', front: '暖暖的太陽，', options: ['讓人覺得好舒服。', '讓魚飛上天。', '讓書包會說話。'], clue: '提示：曬著暖暖的太陽，身體覺得怎麼樣？', explain: '答案是「讓人覺得好舒服」：暖暖的太陽讓人很舒服。' },
          { id: 'pt-rg-m2', img: 'pt-joke.png', front: '弟弟說的笑話，', options: ['讓大家都笑了。', '讓天空變綠色。', '讓桌子跳舞。'], clue: '提示：看看圖片，大家聽了笑話，表情怎麼樣？', explain: '答案是「讓大家都笑了」：好笑的笑話讓大家笑了。' },
          { id: 'pt-rg-m3', img: 'pt-tidy-find.png', front: '把房間整理乾淨，', options: ['讓我很快就找到東西。', '讓冰箱變成汽車。', '讓太陽下山。'], clue: '提示：房間整齊了，找東西會變得怎麼樣？', explain: '答案是「讓我很快就找到東西」：房間整齊，東西就好找。' }
        ],
        conj: [
          { id: 'pt-rg-c1', full: '早點出門，讓我有時間慢慢走到學校。', img: 'pt-walk-school.png', sentence: '早點出門，＿我有時間慢慢走到學校。', options: ['……，讓……', '因為……所以……', '為了……'], clue: '提示：早點出門以後，帶來什麼結果？數數看有幾個空格。', explain: '答案是「……，讓……」：早點出門，讓我有時間慢慢走到學校。' },
          { id: 'pt-rg-c2', full: '同學的掌聲，讓妹妹更有信心了。', img: 'pt-applause-girl.png', sentence: '同學的掌聲，＿妹妹更有信心了。', options: ['……，讓……', '因為……所以……', '為了……'], clue: '提示：同學拍手以後，妹妹變得怎麼樣？數數看有幾個空格。', explain: '答案是「……，讓……」：同學的掌聲，讓妹妹更有信心了。' },
          { id: 'pt-rg-c3', full: '涼涼的風，讓大家都不覺得熱了。', img: 'pt-cool-breeze.png', sentence: '涼涼的風，＿大家都不覺得熱了。', options: ['……，讓……', '因為……所以……', '為了……'], clue: '提示：風吹來以後，大家覺得怎麼樣？數數看有幾個空格。', explain: '答案是「……，讓……」：涼涼的風，讓大家都不覺得熱了。' }
        ],
        half: [
          { id: 'pt-rg-h1', front: '下了一整天的雨，', clue: '提示：雨下了一整天，路上會變成怎麼樣？記得要說「讓」。', model: '讓路上都是水坑。' },
          { id: 'pt-rg-h2', front: '每天練習寫字，', clue: '提示：每天練習，字會變得怎麼樣？記得要說「讓」。', model: '讓我的字越來越漂亮。' }
        ],
        whole: [
          { id: 'pt-rg-w1', clue: '提示：先說一件事，再用「讓」說它帶來什麼結果。想想看：好朋友送你一份禮物，你覺得怎麼樣？', model: '好朋友送我的禮物，讓我開心了一整天。' }
        ] },
      { key: 'yinsuo', id: 'ys', title: '因為……所以……', img: 'yinsuo.png',
        meaning: '先用「因為」說原因，再用「所以」說結果。',
        examples: ['因為我每天早睡早起，所以上課很有精神。'],
        match: [
          { id: 'pt-ys-m1', img: 'pt-sneeze.png', front: '因為昨天淋了雨，', options: ['所以今天感冒了。', '所以今天長高了。', '所以我變成小鳥。'], clue: '提示：看看圖片，他淋了雨以後怎麼了？', explain: '答案是「所以今天感冒了」：淋了雨，所以感冒了。' },
          { id: 'pt-ys-m2', img: 'pt-shoot-ball.png', front: '因為哥哥每天練習投籃，', options: ['所以投得好準。', '所以不會走路了。', '所以變成籃球了。'], clue: '提示：每天練習，投籃會變得怎麼樣？', explain: '答案是「所以投得好準」：每天練習，所以投得很準。' },
          { id: 'pt-ys-m3', img: 'pt-wet-boy.png', front: '因為忘了帶雨傘，', options: ['所以全身都淋濕了。', '所以肚子好飽。', '所以天氣變晴了。'], clue: '提示：下雨天沒帶傘，會怎麼樣？', explain: '答案是「所以全身都淋濕了」：忘了帶傘，所以淋濕了。' }
        ],
        conj: [
          { id: 'pt-ys-c1', full: '因為天氣很冷，所以我戴上了毛帽和手套。', img: 'pt-winter-hat.png', sentence: '＿＿天氣很冷，＿＿我戴上了毛帽和手套。', options: ['因為……所以……', '……，讓……', '為了……'], clue: '提示：先說原因，再說結果。數數看有幾個空格。', explain: '答案是「因為……所以……」：因為天氣很冷，所以我戴上了毛帽和手套。' },
          { id: 'pt-ys-c2', full: '因為弟弟吃太多糖，所以牙齒蛀掉了。', img: 'pt-tooth-ache.png', sentence: '＿＿弟弟吃太多糖，＿＿牙齒蛀掉了。', options: ['因為……所以……', '……，讓……', '為了……'], clue: '提示：先說原因，再說結果。數數看有幾個空格。', explain: '答案是「因為……所以……」：因為弟弟吃太多糖，所以牙齒蛀掉了。' },
          { id: 'pt-ys-c3', full: '因為大家一起打掃，所以教室很快就乾淨了。', img: 'pt-clean-together.png', sentence: '＿＿大家一起打掃，＿＿教室很快就乾淨了。', options: ['因為……所以……', '……，讓……', '為了……'], clue: '提示：先說原因，再說結果。數數看有幾個空格。', explain: '答案是「因為……所以……」：因為大家一起打掃，所以教室很快就乾淨了。' }
        ],
        half: [
          { id: 'pt-ys-h1', front: '因為今天是我的生日，', clue: '提示：生日那天，會發生什麼事？記得要說「所以」。', model: '所以媽媽買了蛋糕。' },
          { id: 'pt-ys-h2', front: '因為我很早就出門，', clue: '提示：很早出門，會有什麼結果？記得要說「所以」。', model: '所以沒有遲到。' }
        ],
        whole: [
          { id: 'pt-ys-w1', clue: '提示：先用「因為」說原因，再用「所以」說結果。想想看：你為什麼喜歡你最好的朋友？', model: '因為他很會說笑話，所以我喜歡跟他玩。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「匆匆忙忙」、「慌慌張張」。',
          show: { sentence: '弟弟急急忙忙的跑出門。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '妹妹把鞋子擺得整整齊齊。', answer: true, clue: '提示：這句話裡，有沒有同一個字連在一起？', explain: '是疊字：「整整齊齊」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '妹妹把鞋子擺好了。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['早上大家忙忙碌碌的。', '早上大家都很忙。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「忙忙碌碌」是疊字。' },
            { id: 'rh-re-p2', options: ['我把書包收得好好的。', '我收好書包了。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「好好」是疊字。' },
            { id: 'rh-re-p3', options: ['他慌慌張張的找鉛筆。', '他在找鉛筆。', '他找鉛筆像在尋寶。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「慌慌張張」是疊字。' },
            { id: 'rh-re-p4', options: ['老師慢慢的喝咖啡。', '老師在喝咖啡。', '咖啡像一小杯深色的湖水。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「慢慢」是疊字。' },
            { id: 'rh-re-p5', options: ['桌上乾乾淨淨的。', '桌上沒有東西。', '桌子像一片草原。', '桌子在等我寫字。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「乾乾淨淨」是疊字。' },
            { id: 'rh-re-p6', options: ['大家開開心心的出門。', '大家一起出門。', '出門像去探險。', '門口在對我們揮手。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「開開心心」是疊字。' }
          ] },
        { key: 'question', name: '設問', meaning: '先問一個問題，引起你的好奇，再說出答案。', example: '課文裡，爸爸先問櫻櫻為什麼總是那麼急，後面再說出原因。',
          show: { sentence: '為什麼要先整理書包呢？因為這樣早上才不會忘東西。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '為什麼要早點睡呢？因為睡飽了才有精神。', answer: true, clue: '提示：這句話是不是先問一個問題，後面再說出答案？', explain: '是設問：先問「為什麼要早點睡呢？」，再告訴你答案。' },
            { id: 'rh-qu-y2', sentence: '我每天晚上九點就睡覺。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有先問問題。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['什麼東西有腳卻不會走路？答案是桌子。', '桌子有四隻腳。'], clue: '提示：哪一句先問問題，再說答案？', explain: '「什麼東西有腳卻不會走路？答案是桌子」是設問。' },
            { id: 'rh-qu-p2', options: ['你知道鬧鐘有什麼用嗎？它可以叫我們起床。', '鬧鐘響了。'], clue: '提示：哪一句有問題，也有答案？', explain: '「你知道鬧鐘有什麼用嗎？它可以叫我們起床」是設問。' },
            { id: 'rh-qu-p3', options: ['為什麼要排隊呢？因為這樣對大家才公平。', '大家排好隊了。', '隊伍像一條長龍。'], clue: '提示：哪一句先問問題，再說答案？', explain: '「為什麼要排隊呢？因為這樣對大家才公平」是設問。' },
            { id: 'rh-qu-p4', options: ['誰每天最早起床？是我的爺爺。', '爺爺很早就起床了。', '爺爺起得像公雞一樣早。'], clue: '提示：找找看，哪一句有問號，後面還有回答？', explain: '「誰每天最早起床？是我的爺爺」是設問。' },
            { id: 'rh-qu-p5', options: ['出門前要檢查什麼？要看看東西有沒有帶齊。', '出門前我會檢查書包。', '書包像一個大肚子。', '書包在跟我說話。'], clue: '提示：哪一句先問問題，再說答案？', explain: '「出門前要檢查什麼？要看看東西有沒有帶齊」是設問。' },
            { id: 'rh-qu-p6', options: ['為什麼要提早準備？因為這樣才不會手忙腳亂。', '我今天提早準備了。', '時間像飛走的小鳥。', '時鐘在催我快點走。'], clue: '提示：找找看，哪一句有問號，後面還有回答？', explain: '「為什麼要提早準備？因為這樣才不會手忙腳亂」是設問。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，重複說兩次以上，讀起來有節奏。', example: '課文裡，櫻櫻一直問東西在哪裡，把「我的……呢」重複說。',
          show: { sentence: '我的帽子呢？我的水壺呢？我的外套呢？', mark: ['我的'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '星期一忘了帶筆，星期二忘了帶書。', answer: true, mark: ['忘了帶'], clue: '提示：找找看，有沒有同一個詞說了好幾次？', explain: '是類疊：「忘了帶」說了兩次。' },
            { id: 'rh-rp-y2', sentence: '我這個星期常常忘記東西。', answer: false, clue: '提示：這句話裡，有沒有同一個詞說了好幾次？', explain: '不是類疊：這句話沒有重複說同一個詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['快一點'], options: ['快一點，快一點，車子要開了！', '車子快要開了。'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「快一點」說了兩次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['我的'], options: ['我的鞋子呢？我的襪子呢？', '我找不到鞋子和襪子。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「我的」說了兩次，是類疊。' },
            { id: 'rh-rp-p3', mark: ['來不及了'], options: ['來不及了，來不及了，我要遲到了！', '我快要遲到了。', '時間像火箭一樣快。'], clue: '提示：哪一句有同一句話，說了兩次？', explain: '「來不及了」說了兩次，是類疊。' },
            { id: 'rh-rp-p4', mark: ['整理'], options: ['整理書包，整理文具，整理衣服。', '我把東西都收好了。', '書包像一個百寶箱。'], clue: '提示：哪一句有同一個詞，說了好幾次？', explain: '「整理」說了好幾次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['不'], options: ['不慌，不忙，不出錯。', '我做事很小心。', '我像一隻冷靜的貓。', '時鐘在對我點頭。'], clue: '提示：哪一句有同一個字，隔開來說了好幾次？', explain: '「不」隔開來說了好幾次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['提早'], options: ['提早起床，提早準備，提早到學校。', '我很早就到學校了。', '學校像我的第二個家。', '校門在對我笑。'], clue: '提示：哪一句有同一個詞，說了好幾次？', explain: '「提早」說了好幾次，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '奶奶的手軟軟的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「軟軟」是同一個字連在一起重複用。' },
        { id: 'rh2', sentence: '他把字寫得清清楚楚。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「清清楚楚」是同一個字重複用。' },
        { id: 'rh3', sentence: '你知道蜜蜂住在哪裡嗎？牠們住在蜂巢裡。', answer: '設問', clue: '提示：這句話是不是先問問題，再說答案？', explain: '答案是「設問」：先問蜜蜂住哪裡，再說出答案。' },
        { id: 'rh4', sentence: '為什麼要洗手呢？因為手上有細菌。', answer: '設問', clue: '提示：這句話有問題，也有答案嗎？', explain: '答案是「設問」：先問為什麼要洗手，再說出答案。' },
        { id: 'rh5', sentence: '星期一跑步，星期二跑步，星期三也跑步。', answer: '類疊', mark: ['跑步'], clue: '提示：有沒有同一個詞，說了好幾次？', explain: '答案是「類疊」：「跑步」說了好幾次。' },
        { id: 'rh6', sentence: '今天要早起，明天也要早起。', answer: '類疊', mark: ['要早起'], clue: '提示：有沒有同一句話，說了兩次？', explain: '答案是「類疊」：「要早起」說了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L03 = d; }
})(this);

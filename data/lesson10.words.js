/* 第 10 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第二步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['新娘、新郎、表姐和「我」', '老師和同學', '醫生和病人', '警察和小偷'], paras: [2, 3], why: '表姐和新娘是一起工作的同事，所以「我」也去參加了這場婚禮。' },
      { id: 'wh-shi', key: '事', options: ['參加一場魯凱族婚禮', '參加學校的運動會', '去醫院看病', '去海邊淨灘'], paras: [3], why: '「我」去參加一場魯凱族婚禮，這是「我」第一次看到。' },
      { id: 'wh-time', key: '時', options: ['婚禮從白天熱鬧到很晚很晚', '婚禮一下子就結束了', '婚禮在早上八點就結束了', '婚禮只舉行十分鐘'], paras: [6], why: '課文最後說，婚禮熱鬧到半夜才結束。' },
      { id: 'wh-di', key: '地', options: ['魯凱族的部落', '學校的教室', '醫院', '海灘'], paras: [5], why: '藏新娘的時候，新娘就藏在部落裡，婚禮是在魯凱族的部落舉行的。' },
      { id: 'wh-wu', key: '物', options: ['秋千、百合花頭飾、連杯酒', '風箏、溜冰鞋', '書包、課本', '雨傘、雨衣'], paras: [2, 4], why: '新娘站在秋千上，戴著百合花頭飾，新人還喝了連杯酒。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qc: 'extract', qe: 'extract', qf: 'extract', qb: 'infer', qd: 'infer', qh: 'infer',
      qg: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    hanzi: [
      { id: 'h-婚', combo: {'layout': 'lr', 'parts': [['女', 'm', '女生'], ['昏', 's', '']]}, char: '婚', zhuyin: 'ㄏㄨㄣ', radical: '女', strokes: 11, words: ['婚禮', '結婚'], say: '婚，結婚的婚', cloze: '結＿', img: 'wedding.png', options: ['婚', '昏', '混', '魂'], clue: '這個字的左邊，是女字旁。', explain: '答案是「婚」，左邊是「女」；「昏」是黃昏的昏，沒有女字旁。', parts: ['女', '昏'], story: '左邊是「女」，右邊的「昏」念起來很像「婚」。古時候結婚常在黃昏舉行，所以有「昏」。', sentence: '阿姨下個月要結婚了。', build: { layout: 'lr', show: ['？', '昏'], answer: '女', options: ['女', '日', '氵', '木'], clue: '想一想：結婚的時候，穿白紗的是誰？' } },
      { id: 'h-飾', combo: {'type': '形聲字', 'pict': '左邊是「食」的樣子，念法像「飾」；右邊像一塊布。用布把東西打扮得更漂亮，就是「飾」。'}, char: '飾', zhuyin: 'ㄕˋ', radical: '食', strokes: 14, words: ['服飾', '裝飾'], say: '飾，裝飾的飾', cloze: '裝＿', img: 'costume.png', options: ['飾', '式', '試', '師'], clue: '這個字的左邊，跟吃東西的「食」長得很像。', explain: '答案是「飾」；「師」是老師的師，左邊不是「食」。', parts: ['飠', '飾的右邊'], story: '左邊像「食」，右邊像一塊布。用漂亮的東西把自己或房間打扮起來，就是「飾」。', sentence: '我們用氣球裝飾教室。' },
      { id: 'h-郎', combo: {'layout': 'lr', 'parts': [['良', 's', ''], ['阝', 'm', '地方、城鎮']]}, char: '郎', zhuyin: 'ㄌㄤˊ', radical: '邑', strokes: 9, words: ['新郎', '伴郎'], say: '郎，新郎的郎', cloze: '新＿', img: 'groom.png', options: ['郎', '朗', '狼', '浪'], clue: '這個字的右邊，是耳朵旁。', explain: '答案是「郎」，右邊是耳朵旁；「朗」是朗讀的朗，右邊是「月」。', parts: ['良', '阝'], story: '左邊的「良」念起來很像「郎」，右邊是耳朵旁。「新郎」就是剛結婚的男生。', sentence: '新郎牽著新娘走進來。', build: { layout: 'lr', show: ['良', '？'], answer: '阝', options: ['阝', '月', '力', '又'], clue: '想一想：「朗讀」的朗右邊是月亮，這個字的右邊是什麼？' } },
      { id: 'h-參', combo: {'type': '象形字', 'pict': '很久以前的「參」，上面像三顆亮亮的星星，下面是一個人。後來「參」也有加入一起的意思。'}, char: '參', zhuyin: 'ㄘㄢ', radical: '厶', strokes: 11, words: ['參加', '參觀'], say: '參，參加的參', cloze: '＿加', img: 'join-wedding.png', options: ['參', '慘', '餐', '三'], clue: '這個字的上面，有三個小三角形。', explain: '答案是「參」；「慘」是悲慘的慘，左邊多了豎心旁。', parts: ['厶', '大', '彡'], story: '上面有三個「厶」，像三顆星星，下面是「人」和「彡」。「參加」就是加入一起做。', sentence: '我參加了學校的合唱團。' },
      { id: 'h-響', combo: {'layout': 'tb', 'parts': [['鄉', 's', ''], ['音', 'm', '聲音']]}, char: '響', zhuyin: 'ㄒㄧㄤˇ', radical: '音', strokes: 22, words: ['響起', '音響'], say: '響，響起的響', cloze: '音＿', img: 'bells-ring.png', options: ['響', '嚮', '想', '鄉'], clue: '這個字跟聲音有關。', explain: '答案是「響」，下面是「音」；「嚮」是嚮往的嚮，下面是「向」。', parts: ['鄉', '音'], story: '上面的「鄉」念起來很像「響」，下面的「音」是聲音。發出聲音，就是「響」。', sentence: '上課鐘聲響了。', build: { layout: 'tb', show: ['鄉', '？'], answer: '音', options: ['音', '向', '心', '日'], clue: '想一想：鐘聲、鈴聲，都是耳朵聽到的什麼？' } },
      { id: 'h-代', combo: {'layout': 'lr', 'parts': [['亻', 'm', '人'], ['弋', 's', '']]}, char: '代', zhuyin: 'ㄉㄞˋ', radical: '人', strokes: 5, words: ['代表', '代替'], say: '代，代表的代', cloze: '＿表', img: 'swing-brave.png', options: ['代', '化', '伐', '袋'], clue: '這個字的左邊，是一個人。', explain: '答案是「代」，右邊是「弋」；「化」是變化的化，右邊是「匕」。', parts: ['亻', '弋'], story: '左邊是「人」，右邊的「弋」念起來像「代」。一個人換另一個人來做，就是「代」。', sentence: '班長代表全班上臺領獎。', build: { layout: 'lr', show: ['？', '弋'], answer: '亻', options: ['亻', '扌', '木', '氵'], clue: '想一想：代表全班上臺的是誰？' } },
      { id: 'h-福', combo: {'layout': 'lr', 'parts': [['礻', 'm', '祭拜、祝願'], ['畐', 's', '']]}, char: '福', zhuyin: 'ㄈㄨˊ', radical: '示', strokes: 14, words: ['祝福', '幸福'], say: '福，祝福的福', cloze: '幸＿', img: 'blessing.png', options: ['福', '富', '副', '幅'], clue: '這個字的左邊，是示字旁。', explain: '答案是「福」，左邊是示字旁；「富」是有錢的富，上面是寶蓋頭。', parts: ['礻', '畐'], story: '左邊是示字旁，跟祝願、祭拜有關，右邊的「畐」念起來像「福」。大家心裡的好願望，就是「福」。', sentence: '全家人在一起，覺得好幸福。', build: { layout: 'lr', show: ['？', '畐'], answer: '礻', options: ['礻', '衤', '木', '扌'], clue: '想一想：祝福、祭拜的字，左邊常常是哪個部首？' } },
      { id: 'h-連', combo: {'type': '會意字', 'pict': '「辶」是走路，裡面是「車」。車子一輛接著一輛走，就是「連」。'}, char: '連', zhuyin: 'ㄌㄧㄢˊ', radical: '辵', strokes: 11, words: ['連杯酒', '接連'], say: '連，連在一起的連', cloze: '接＿', img: 'linked-cups.png', options: ['連', '運', '蓮', '速'], clue: '這個字的裡面，有一輛「車」。', explain: '答案是「連」，裡面是「車」；「運」是運動的運，裡面是「軍」。', parts: ['辶', '車'], story: '「辶」是走路，裡面是「車」。車子一輛接一輛，接在一起，就是「連」。', sentence: '兩個杯子連在一起。' },
      { id: 'h-酒', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['酉', 'm', '裝酒的罈子']]}, char: '酒', zhuyin: 'ㄐㄧㄡˇ', radical: '酉', strokes: 10, words: ['敬酒', '米酒'], say: '酒，敬酒的酒', cloze: '米＿', img: 'toast.png', options: ['酒', '洒', '醋', '九'], clue: '這個字的右邊，像一個裝東西的罈子。', explain: '答案是「酒」，右邊是「酉」；「醋」也是用罈子裝的，但是左邊是「酉」，沒有三點水。', parts: ['氵', '酉'], story: '左邊是三點水，右邊的「酉」像一個裝酒的罈子。罈子裡的水水的東西，就是「酒」。', sentence: '媽媽用米酒煮麻油雞。', build: { layout: 'lr', show: ['？', '酉'], answer: '氵', options: ['氵', '扌', '木', '言'], clue: '想一想：酒是乾的，還是像水一樣？' } },
      { id: 'h-敬', combo: {'layout': 'lr', 'parts': [['苟', 'p', ''], ['攵', 'm', '手拿東西']]}, char: '敬', zhuyin: 'ㄐㄧㄥˋ', radical: '攴', strokes: 13, words: ['敬酒', '敬禮', '尊敬'], say: '敬，敬禮的敬', cloze: '＿禮', img: 'toast.png', options: ['敬', '警', '驚', '故'], clue: '這個字的右邊，是反文旁。', explain: '答案是「敬」；「警」是警察的警，下面多了「言」；「驚」下面多了「馬」。', parts: ['苟', '攵'], story: '右邊是反文旁，像手拿著東西。對別人很有禮貌、很尊重，就是「敬」。', sentence: '升旗的時候，我們向國旗敬禮。' },
      { id: 'h-藏', combo: {'layout': 'tb', 'parts': [['艹', 'm', '草'], ['臧', 's', '']]}, char: '藏', zhuyin: 'ㄘㄤˊ', radical: '艸', strokes: 18, words: ['藏新娘', '躲藏'], say: '藏，躲藏的藏', cloze: '躲＿', img: 'hide-bride.png', options: ['藏', '臧', '臟', '戴'], clue: '這個字的上面，是草字頭。', explain: '答案是「藏」，上面是草字頭；「臧」少了草字頭。', parts: ['艹', '臧'], story: '上面是草字頭，下面的「臧」念起來像「藏」。躲到草叢裡，別人就看不見了，就是「藏」。', sentence: '小狗把骨頭藏在沙發下面。', build: { layout: 'tb', show: ['？', '臧'], answer: '艹', options: ['艹', '竹', '雨', '宀'], clue: '想一想：玩躲貓貓的時候，可以躲在什麼植物後面？' } },
      { id: 'h-俗', combo: {'layout': 'lr', 'parts': [['亻', 'm', '人'], ['谷', 's', '']]}, char: '俗', zhuyin: 'ㄙㄨˊ', radical: '人', strokes: 9, words: ['習俗', '民俗'], say: '俗，習俗的俗', cloze: '習＿', img: 'custom.png', options: ['俗', '浴', '谷', '裕'], clue: '這個字的左邊，是一個人。', explain: '答案是「俗」，左邊是單人旁；「浴」是洗澡的浴，左邊是三點水。', parts: ['亻', '谷'], story: '左邊是「人」，右邊是「谷」。住在同一個山谷的人，大家一起養成的習慣，就是「俗」。', sentence: '過年貼春聯，是我們的習俗。', build: { layout: 'lr', show: ['？', '谷'], answer: '亻', options: ['亻', '氵', '衤', '扌'], clue: '想一想：習俗是誰養成的習慣？' } },
      { id: 'h-惜', combo: {'layout': 'lr', 'parts': [['忄', 'm', '心'], ['昔', 's', '']]}, char: '惜', zhuyin: 'ㄒㄧˊ', radical: '心', strokes: 11, words: ['珍惜', '可惜'], say: '惜，珍惜的惜', cloze: '珍＿', img: 'treasure.png', options: ['惜', '借', '錯', '措'], clue: '這個字的左邊，是代表心的部首。', explain: '答案是「惜」，左邊是豎心旁；「借」是借東西的借，左邊是單人旁。', parts: ['忄', '昔'], story: '左邊是豎心旁，右邊的「昔」念起來很像「惜」。心裡很捨不得、好好愛護，就是「惜」。', sentence: '我們要珍惜每一粒米飯。', build: { layout: 'lr', show: ['？', '昔'], answer: '忄', options: ['忄', '亻', '金', '扌'], clue: '想一想：捨不得的感覺，是從哪裡來的？' } },
      { id: 'h-互', combo: {'type': '象形字', 'pict': '很久以前的「互」，像兩隻手一上一下互相拉著繩子。所以「互」是彼此、你幫我我幫你的意思。'}, char: '互', zhuyin: 'ㄏㄨˋ', radical: '二', strokes: 4, words: ['互助', '互相'], say: '互，互相的互', cloze: '＿相', img: 'help-each.png', options: ['互', '五', '玉', '牙'], clue: '這個字的上下是兩條橫線，中間像兩隻手拉在一起。', explain: '答案是「互」；「五」是數字五，中間不一樣。', parts: ['一', '彑', '一'], story: '上面一橫，下面一橫，中間像兩隻手互相拉著。你幫我、我幫你，就是「互」。', sentence: '同學之間要互相幫忙。' },
      { id: 'h-精', combo: {'layout': 'lr', 'parts': [['米', 'm', '米'], ['青', 's', '']]}, char: '精', zhuyin: 'ㄐㄧㄥ', radical: '米', strokes: 14, words: ['精神', '精彩'], say: '精，精神的精', cloze: '＿彩', img: 'spirit.png', options: ['精', '睛', '晴', '清'], clue: '這個字的左邊，是一粒一粒的米。', explain: '答案是「精」，左邊是「米」；「睛」是眼睛的睛，左邊是「目」。', parts: ['米', '青'], story: '左邊是「米」，右邊的「青」念起來像「精」。挑出最好的米，就是「精」，很好、很棒的意思。', sentence: '這場表演好精彩。', build: { layout: 'lr', show: ['？', '青'], answer: '米', options: ['米', '目', '日', '氵'], clue: '想一想：挑出最好的、一粒一粒的，是什麼？' } }
    ],
    vocab: [
      { id: 'v-婚禮', word: '婚禮', meaning: '兩個人結婚時，請親友來一起慶祝的活動。', example: '阿姨的＿＿上，大家都穿得很漂亮。', img: 'wedding.png', options: ['婚禮', '習俗', '服飾', '精神'] },
      { id: 'v-服飾', word: '服飾', meaning: '穿的衣服和戴在身上的漂亮東西。', example: '原住民的＿＿顏色好鮮豔。', img: 'costume.png', options: ['服飾', '婚禮', '新郎', '連杯酒'] },
      { id: 'v-新郎', word: '新郎', meaning: '要結婚或剛結婚的男生。', example: '＿＿穿著帥氣的衣服，牽著新娘的手。', img: 'groom.png', options: ['新郎', '新娘', '婚禮', '服飾'] },
      { id: 'v-參加', cloze: true, clozeOptions: ['參加', '離開', '忘記', '躲開'], word: '參加', meaning: '跟大家一起去做一件事。', example: '我＿＿了學校的跳繩比賽。', img: 'join-wedding.png', options: ['參加', '珍惜', '代表', '祝福'] },
      { id: 'v-響', cloze: true, clozeOptions: ['響', '亮', '熱', '甜'], word: '響', meaning: '發出聲音。', example: '下課鐘聲＿了，大家跑出教室。', img: 'bells-ring.png', options: ['響', '藏', '敬酒', '互助'] },
      { id: 'v-代表', cloze: true, clozeOptions: ['代表', '忘記', '害怕', '搬走'], word: '代表', meaning: '用一樣東西說出一個意思。', example: '紅燈＿＿要停下來。', img: 'swing-brave.png', options: ['代表', '參加', '祝福', '習俗'] },
      { id: 'v-祝福', cloze: true, clozeOptions: ['祝福', '責罵', '生氣', '吵架'], word: '祝福', meaning: '希望別人平安、快樂。', example: '我在卡片上寫滿對媽媽的＿＿。', img: 'blessing.png', options: ['祝福', '珍惜', '響', '藏'] },
      { id: 'v-連杯酒', word: '連杯酒', meaning: '兩個杯子連在一起，新郎和新娘一起喝，表示兩人同心。', example: '新郎和新娘一起喝＿＿＿，大家都在拍手。', img: 'linked-cups.png', options: ['連杯酒', '敬酒', '服飾', '婚禮'] },
      { id: 'v-敬酒', word: '敬酒', meaning: '舉起杯子向別人表示感謝和尊重。', example: '新郎新娘一桌一桌的向客人＿＿。', img: 'toast.png', options: ['敬酒', '連杯酒', '新郎', '服飾'] },
      { id: 'v-藏新娘', word: '藏新娘', meaning: '魯凱族婚禮的習俗：把新娘藏起來，讓新郎帶著親友去找。', example: '婚禮上玩＿＿＿，新郎找了好久才找到。', img: 'hide-bride.png', options: ['藏新娘', '敬酒', '連杯酒', '婚禮'] },
      { id: 'v-習俗', word: '習俗', meaning: '一個地方的人，很久以來都會這樣做的習慣。', example: '過年吃年夜飯，是我們的＿＿。', img: 'custom.png', options: ['習俗', '服飾', '精神', '新郎'] },
      { id: 'v-珍惜', cloze: true, clozeOptions: ['珍惜', '浪費', '丟掉', '弄壞'], word: '珍惜', meaning: '很看重，好好愛護，捨不得浪費。', example: '食物得來不容易，我們要好好＿＿。', img: 'treasure.png', options: ['珍惜', '參加', '代表', '響'] },
      { id: 'v-互助', cloze: true, clozeOptions: ['互助', '吵架', '比賽', '躲藏'], word: '互助', meaning: '你幫我、我幫你。', example: '大家＿＿合作，很快就把教室打掃乾淨了。', img: 'help-each.png', options: ['互助', '祝福', '珍惜', '敬酒'] },
      { id: 'v-精神', word: '精神', meaning: '一群人心裡都看重、都想做到的好想法。', example: '大家一起幫忙，表現出團結的＿＿。', img: 'spirit.png', options: ['精神', '習俗', '婚禮', '服飾'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-婚', char: '婚', img: 'cw-wedding-cake.png', charMeaning: '男生和女生結為夫妻。', word: '結婚', meaning: '兩個人成為一家人，變成先生和太太。', example: '舅舅和舅媽今天＿＿，我們都去吃喜酒。', options: ['結婚', '裝飾', '伴郎', '參觀'] },
      { id: 'cw-飾', char: '飾', img: 'cw-decorate.png', charMeaning: '打扮，讓東西更好看。', word: '裝飾', meaning: '用漂亮的東西把地方或東西打扮起來。', example: '聖誕節到了，我們用彩球＿＿聖誕樹。', options: ['裝飾', '結婚', '音響', '代替'] },
      { id: 'cw-郎', char: '郎', img: 'cw-best-man.png', charMeaning: '對男生的稱呼。', word: '伴郎', meaning: '婚禮上陪在新郎旁邊幫忙的男生。', example: '哥哥是舅舅婚禮上的＿＿。', options: ['伴郎', '幸福', '參觀', '米酒'] },
      { id: 'cw-參', char: '參', img: 'cw-museum.png', charMeaning: '加入；也可以是去看一看。', word: '參觀', meaning: '到一個地方去看一看、認識它。', example: '老師帶我們去＿＿科學博物館。', options: ['參觀', '伴郎', '裝飾', '躲藏'] },
      { id: 'cw-響', char: '響', img: 'cw-speaker.png', charMeaning: '發出聲音。', word: '音響', meaning: '可以放出音樂、聲音很大的機器。', example: '派對上，＿＿放著好聽的音樂。', options: ['音響', '敬禮', '接連', '可惜'] },
      { id: 'cw-代', char: '代', img: 'cw-substitute.png', charMeaning: '換別人來做。', word: '代替', meaning: '換成另一個人或另一樣東西來做。', example: '老師生病了，今天由別的老師＿＿上課。', options: ['代替', '結婚', '互相', '精彩'] },
      { id: 'cw-福', char: '福', img: 'cw-happy-family.png', charMeaning: '好運、快樂。', word: '幸福', meaning: '心裡覺得很快樂、很滿足。', example: '一家人一起吃飯，感覺好＿＿。', options: ['幸福', '民俗', '音響', '敬禮'] },
      { id: 'cw-連', char: '連', img: 'cw-train-cars.png', charMeaning: '一個接著一個。', word: '接連', meaning: '一個接著一個，沒有停。', example: '颱風來了，大雨＿＿下了好幾天。', options: ['接連', '代替', '參觀', '可惜'] },
      { id: 'cw-酒', char: '酒', img: 'cw-rice-wine.png', charMeaning: '用米或水果做成、大人才能喝的飲料。', word: '米酒', meaning: '用米做成的酒，常常用來煮菜。', example: '奶奶煮麻油雞時，會加一點＿＿。', options: ['米酒', '伴郎', '幸福', '互相'] },
      { id: 'cw-敬', char: '敬', img: 'cw-salute.png', charMeaning: '尊重、有禮貌。', word: '敬禮', meaning: '舉手或彎腰，表示尊重。', example: '升旗的時候，大家向國旗＿＿。', options: ['敬禮', '米酒', '接連', '裝飾'] },
      { id: 'cw-藏', char: '藏', img: 'cw-hide-seek.png', charMeaning: '躲起來，不讓人看到。', word: '躲藏', meaning: '躲起來、藏起來。', example: '玩捉迷藏的時候，我＿＿在窗簾後面。', options: ['躲藏', '敬禮', '精彩', '民俗'] },
      { id: 'cw-俗', char: '俗', img: 'cw-folk-dance.png', charMeaning: '大家很久以來的習慣。', word: '民俗', meaning: '一個地方很久以前就流傳下來的活動和習慣。', example: '舞龍舞獅是熱鬧的＿＿活動。', options: ['民俗', '躲藏', '代替', '幸福'] },
      { id: 'cw-惜', char: '惜', img: 'cw-pity.png', charMeaning: '捨不得、愛護。', word: '可惜', meaning: '覺得很捨不得、很遺憾。', example: '冰淇淋掉到地上了，好＿＿喔！', options: ['可惜', '音響', '結婚', '參觀'] },
      { id: 'cw-互', char: '互', img: 'cw-help-each.png', charMeaning: '彼此，你對我、我對你。', word: '互相', meaning: '你對我、我對你，兩邊都這樣做。', example: '好朋友要＿＿幫忙。', options: ['互相', '可惜', '米酒', '伴郎'] },
      { id: 'cw-精', char: '精', img: 'cw-show.png', charMeaning: '很好、很棒。', word: '精彩', meaning: '非常好看、非常棒。', example: '這場魔術表演好＿＿，大家一直拍手。', options: ['精彩', '民俗', '躲藏', '接連'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-江郎才盡', situationImg: 'id-no-idea.png', idiom: '江郎才盡', char: '郎', meaning: '本來很會寫、很會想，後來再也想不出好點子了。', example: '我已經說了十個故事，現在江郎才盡，一個都想不出來了。', situation: '小美每天都畫新的圖，可是今天坐了好久，咬著筆，一點新點子都想不出來。',
        fill: { options: ['我寫了好多首詩，現在＿＿＿＿，再也想不出來了。', '他＿＿＿＿的跑到操場上玩球。'], clue: '提示：哪一句是再也想不出好點子？', explain: '第一句用得對：寫了很多詩，再也想不出來了。跑去玩球跟想不出點子沒有關係。' } },
      { id: 'i-不同凡響', situationImg: 'id-great-show.png', idiom: '不同凡響', char: '響', meaning: '比一般的更好、很不平凡。', example: '這位小提琴家的演奏不同凡響，大家都聽得入迷。', situation: '這位歌手一開口唱歌，全場都安靜下來，大家都說從來沒聽過這麼好聽的歌聲。',
        fill: { options: ['這場煙火秀＿＿＿＿，大家看得目瞪口呆。', '這碗白飯很普通，吃起來＿＿＿＿。'], clue: '提示：哪一句是在說比一般的更好、很特別？', explain: '第一句用得對：煙火秀特別好看。很普通的白飯，不是不同凡響。' } },
      { id: 'i-有福同享', situationImg: 'id-share-snack.png', idiom: '有福同享', char: '福', meaning: '有好東西、好事情，大家一起分享。', example: '我們是好朋友，有福同享，我把餅乾分給大家吃。', situation: '小明的媽媽送來一盒蛋糕，小明把蛋糕切開，分給全班同學一起吃。',
        fill: { options: ['哥哥得到一盒巧克力，＿＿＿＿，分給全家人吃。', '他把糖果藏起來，＿＿＿＿，一個人偷偷吃。'], clue: '提示：哪一句是有好東西就分給大家？', explain: '第一句用得對：巧克力分給全家人。一個人偷偷吃，剛好相反。' } },
      { id: 'i-價值連城', situationImg: 'id-treasure.png', idiom: '價值連城', char: '連', meaning: '東西非常貴重，很值錢。', example: '博物館裡放著一顆價值連城的寶石。', situation: '博物館的玻璃櫃裡放著一個古老的花瓶，旁邊有警衛一直看守著，大家都說它非常非常值錢。',
        fill: { options: ['這幅古畫＿＿＿＿，要放在博物館好好保護。', '這枝鉛筆只要五塊錢，真是＿＿＿＿。'], clue: '提示：哪一句是在說東西非常貴重？', explain: '第一句用得對：古畫非常貴重。五塊錢的鉛筆很便宜，不是價值連城。' } },
      { id: 'i-相敬如賓', situationImg: 'id-kind-couple.png', idiom: '相敬如賓', char: '敬', meaning: '先生和太太互相尊重、很客氣，像對待客人一樣有禮貌。', example: '爺爺和奶奶結婚很多年，還是相敬如賓，常常互相說謝謝。', situation: '爺爺幫奶奶倒茶，奶奶笑著說謝謝；奶奶幫爺爺拿外套，爺爺也說謝謝。',
        fill: { options: ['叔叔和嬸嬸＿＿＿＿，從來不會大聲吵架。', '小狗和小貓＿＿＿＿的搶骨頭。'], clue: '提示：哪一句是夫妻互相尊重、很有禮貌？', explain: '第一句用得對：叔叔和嬸嬸互相尊重。小狗小貓搶骨頭，不是相敬如賓。' } },
      { id: 'i-笑裡藏刀', situationImg: 'id-fake-smile.png', idiom: '笑裡藏刀', char: '藏', meaning: '表面上笑笑的很友善，心裡卻想做壞事。', example: '故事裡的大野狼笑裡藏刀，假裝對小紅帽很好。', situation: '童話故事裡，大野狼笑咪咪的跟小羊說話，其實心裡想把小羊吃掉。',
        fill: { options: ['巫婆＿＿＿＿，笑著把毒蘋果送給公主。', '媽媽＿＿＿＿，溫柔的抱著小寶寶。'], clue: '提示：哪一句是表面笑笑的，心裡卻想做壞事？', explain: '第一句用得對：巫婆笑著，心裡卻想害公主。媽媽溫柔的抱寶寶，沒有想做壞事。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-婚', char: '婚', wrong: '昏', sentence: '阿姨下個月要結婚了。', options: ['婚', '昏', '混'], clue: '這裡是說兩個人成為一家人，想一想，哪一個字有女字旁？', explain: '要改成「婚」。成為一家人是「結婚」，左邊是「女」；「昏」是黃昏的昏。' },
      { id: 'fx-飾', char: '飾', wrong: '式', sentence: '我們用氣球裝飾教室。', options: ['飾', '式', '師'], clue: '這裡是說把教室打扮得漂亮，跟方式沒有關係。', explain: '要改成「飾」。打扮得漂亮是「裝飾」；「式」是方式的式。' },
      { id: 'fx-郎', char: '郎', wrong: '朗', sentence: '新郎牽著新娘走進來。', options: ['郎', '朗', '狼'], clue: '這裡說的是結婚的男生，想一想，哪一個字的右邊是耳朵旁？', explain: '要改成「郎」。結婚的男生是「新郎」，右邊是耳朵旁；「朗」是朗讀的朗，右邊是「月」。' },
      { id: 'fx-參', char: '參', wrong: '慘', sentence: '我參加了學校的合唱團。', options: ['參', '慘', '餐'], clue: '這裡是說加入一起做，跟悲傷沒有關係。', explain: '要改成「參」。加入一起做是「參加」；「慘」是悲慘的慘，左邊有豎心旁。' },
      { id: 'fx-響', char: '響', wrong: '嚮', sentence: '上課鐘聲響了。', options: ['響', '嚮', '想'], clue: '這裡是說發出聲音，想一想，哪一個字的下面是「音」？', explain: '要改成「響」。發出聲音是「響」，下面是「音」；「嚮」的下面是「向」。' },
      { id: 'fx-代', char: '代', wrong: '化', sentence: '班長代表全班上臺領獎。', options: ['代', '化', '袋'], clue: '這裡是說一個人替大家上臺，跟變化沒有關係。', explain: '要改成「代」。替大家去是「代表」；「化」是變化的化。' },
      { id: 'fx-福', char: '福', wrong: '富', sentence: '全家人在一起，覺得好幸福。', options: ['福', '富', '副'], clue: '這裡是說心裡很快樂、很滿足，跟有錢沒有關係。', explain: '要改成「福」。心裡快樂滿足是「幸福」，左邊是示字旁；「富」是有錢的富。' },
      { id: 'fx-連', char: '連', wrong: '運', sentence: '兩個杯子連在一起。', options: ['連', '運', '蓮'], clue: '這裡是說接在一起，想一想，哪一個字的裡面是「車」？', explain: '要改成「連」。接在一起是「連」，裡面是「車」；「運」的裡面是「軍」。' },
      { id: 'fx-酒', char: '酒', wrong: '醋', sentence: '媽媽用米酒煮麻油雞。', options: ['酒', '醋', '九'], clue: '這裡說的是用米做的、煮麻油雞會加的東西，不是酸酸的調味料。', explain: '要改成「酒」。用米做的是「米酒」；「醋」是酸酸的調味料。' },
      { id: 'fx-敬', char: '敬', wrong: '警', sentence: '升旗的時候，我們向國旗敬禮。', options: ['敬', '警', '驚'], clue: '這裡是說舉手表示尊重，跟警察沒有關係。', explain: '要改成「敬」。舉手表示尊重是「敬禮」；「警」是警察的警，下面多了「言」。' },
      { id: 'fx-藏', char: '藏', wrong: '臟', sentence: '小狗把骨頭藏在沙發下面。', options: ['藏', '臟', '戴'], clue: '這裡是說放到別人看不到的地方，想一想，哪一個字的上面是草字頭？', explain: '要改成「藏」。放起來不讓人看到是「藏」，上面是草字頭；「臟」是心臟的臟。' },
      { id: 'fx-俗', char: '俗', wrong: '浴', sentence: '過年貼春聯，是我們的習俗。', options: ['俗', '浴', '谷'], clue: '這裡說的是大家很久以來的習慣，跟洗澡沒有關係。', explain: '要改成「俗」。很久以來的習慣是「習俗」，左邊是單人旁；「浴」是洗澡的浴。' },
      { id: 'fx-惜', char: '惜', wrong: '借', sentence: '我們要珍惜每一粒米飯。', options: ['惜', '借', '錯'], clue: '這裡是說好好愛護、捨不得浪費，跟借東西沒有關係。', explain: '要改成「惜」。好好愛護是「珍惜」，左邊是豎心旁；「借」是借東西的借。' },
      { id: 'fx-互', char: '互', wrong: '五', sentence: '同學之間要互相幫忙。', options: ['互', '五', '牙'], clue: '這裡是說你幫我、我幫你，不是數字。', explain: '要改成「互」。你幫我、我幫你是「互相」；「五」是數字五。' },
      { id: 'fx-精', char: '精', wrong: '睛', sentence: '這場表演好精彩。', options: ['精', '睛', '晴'], clue: '這裡是說表演非常好看，跟眼睛沒有關係。', explain: '要改成「精」。非常好看是「精彩」，左邊是「米」；「睛」是眼睛的睛，左邊是「目」。' }
    ],
    similar: [
      { id: 's1', meaning: '「新＿」是要結婚的男生。', sentence: '新＿穿著帥氣的西裝。', frame: '新＿', options: ['郎', '朗'], answer: '郎', clue: '提示：這句話在說結婚的男生，右邊是耳朵旁。', explain: '答案是「郎」，右邊是耳朵旁；「朗」是朗讀的朗，右邊是「月」。' },
      { id: 's2', meaning: '「＿讀」是大聲的念出來。', sentence: '老師請我們＿讀課文。', frame: '＿讀', options: ['朗', '郎'], answer: '朗', clue: '提示：這句話在說大聲的念，右邊是月亮。', explain: '答案是「朗」，右邊是「月」；「郎」是新郎的郎。' },
      { id: 's3', meaning: '「＿加」是加入，一起去做。', sentence: '我要＿加跳繩比賽。', frame: '＿加', options: ['參', '慘'], answer: '參', clue: '提示：這句話在說加入，不是在說悲傷。', explain: '答案是「參」；「慘」是悲慘的慘，左邊有豎心旁。' },
      { id: 's4', meaning: '「音＿」是可以放音樂的機器。', sentence: '客廳的音＿正在放音樂。', frame: '音＿', options: ['響', '嚮'], answer: '響', clue: '提示：會發出聲音的東西，下面是「音」。', explain: '答案是「響」，下面是「音」；「嚮」是嚮往的嚮，下面是「向」。' },
      { id: 's5', meaning: '「＿表」是用一樣東西表示一個意思。', sentence: '綠燈＿表可以過馬路。', frame: '＿表', options: ['代', '化'], answer: '代', clue: '提示：這句話在說綠燈的意思，不是在說變化。', explain: '答案是「代」；「化」是變化的化。' },
      { id: 's6', meaning: '「變＿」是變得不一樣。', sentence: '天氣的變＿好大。', frame: '變＿', options: ['化', '代'], answer: '化', clue: '提示：這句話在說變得不一樣。', explain: '答案是「化」；「代」是代表的代。' },
      { id: 's7', meaning: '「珍＿」是好好愛護、捨不得浪費。', sentence: '我們要珍＿食物。', frame: '珍＿', options: ['惜', '借'], answer: '惜', clue: '提示：這句話在說心裡捨不得，左邊跟心有關。', explain: '答案是「惜」，左邊是豎心旁；「借」是借東西的借。' },
      { id: 's8', meaning: '「＿書」是拿別人的書來看，看完要還。', sentence: '我去圖書館＿書。', frame: '＿書', options: ['借', '惜'], answer: '借', clue: '提示：這句話在說拿別人的東西來用，左邊是人。', explain: '答案是「借」，左邊是單人旁；「惜」是珍惜的惜。' },
      { id: 's9', meaning: '「習＿」是大家很久以來的習慣。', sentence: '端午節划龍舟是一種習＿。', frame: '習＿', options: ['俗', '浴'], answer: '俗', clue: '提示：這句話在說大家的習慣，左邊是人。', explain: '答案是「俗」，左邊是單人旁；「浴」是洗澡的浴，左邊是三點水。' },
      { id: 's10', meaning: '「＿室」是洗澡的地方。', sentence: '我在＿室洗澡。', frame: '＿室', options: ['浴', '俗'], answer: '浴', clue: '提示：洗澡要用水。', explain: '答案是「浴」，左邊是三點水；「俗」是習俗的俗。' }
    ],
    listen: [
      { id: 'l1', text: '兩個人結婚，請親朋好友一起來慶祝。', answer: 0, options: [{ text: '婚禮', img: 'wedding.png' }, { text: '敬酒', img: 'toast.png' }, { text: '服飾', img: 'costume.png' }, { text: '習俗', img: 'custom.png' }] },
      { id: 'l2', text: '要結婚的男生，穿著帥氣的衣服。', answer: 0, options: [{ text: '新郎', img: 'groom.png' }, { text: '服飾', img: 'costume.png' }, { text: '藏新娘', img: 'hide-bride.png' }, { text: '連杯酒', img: 'linked-cups.png' }] },
      { id: 'l3', text: '兩個杯子連在一起，新郎和新娘一起喝。', answer: 0, options: [{ text: '連杯酒', img: 'linked-cups.png' }, { text: '敬酒', img: 'toast.png' }, { text: '婚禮', img: 'wedding.png' }, { text: '互助', img: 'help-each.png' }] },
      { id: 'l4', text: '新娘被藏起來了，新郎要帶著大家去找。', answer: 0, options: [{ text: '藏新娘', img: 'hide-bride.png' }, { text: '新郎', img: 'groom.png' }, { text: '祝福', img: 'blessing.png' }, { text: '服飾', img: 'costume.png' }] },
      { id: 'l5', text: '新郎新娘舉起杯子，一桌一桌的感謝客人。', answer: 0, options: [{ text: '敬酒', img: 'toast.png' }, { text: '連杯酒', img: 'linked-cups.png' }, { text: '藏新娘', img: 'hide-bride.png' }, { text: '響', img: 'bells-ring.png' }] },
      { id: 'l6', text: '大家說：「希望你們平安快樂！」', answer: 0, options: [{ text: '祝福', img: 'blessing.png' }, { text: '習俗', img: 'custom.png' }, { text: '精神', img: 'spirit.png' }, { text: '新郎', img: 'groom.png' }] },
      { id: 'l7', text: '你幫我搬桌子，我幫你掃地。', answer: 0, options: [{ text: '互助', img: 'help-each.png' }, { text: '珍惜', img: 'treasure.png' }, { text: '參加', img: 'join-wedding.png' }, { text: '敬酒', img: 'toast.png' }] },
      { id: 'l8', text: '叮叮噹噹，身上的飾品發出好聽的聲音。', answer: 0, options: [{ text: '響', img: 'bells-ring.png' }, { text: '藏新娘', img: 'hide-bride.png' }, { text: '習俗', img: 'custom.png' }, { text: '代表', img: 'swing-brave.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選疊字', pickSay: '看圖，選出最適合的疊字。',
      /* 短語一：疊字＋的＋動作＋東西（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '高高興興的拿回獎狀', img: 'pr-award.png',
        parts: [{ text: '高高興興', role: '怎麼做（疊字）' }, { text: '的' }, { text: '拿回獎狀', role: '做什麼' }],
        explain: '先用疊字說出做事情的樣子，加上「的」，再說做了什麼事，就能把動作說得更清楚。' },
      pick: [
        { id: 'ph1', img: 'pr-newyear.png', noun: '吃年夜飯', ask: '全家人是怎麼吃年夜飯的', look: '再看看圖片，人多不多？大家在笑嗎？', options: ['熱熱鬧鬧', '安安靜靜', '慌慌張張', '哭哭啼啼'], clue: '提示：好多家人圍在一起，有說有笑。', explain: '答案是「熱熱鬧鬧」，大家圍在一起有說有笑，所以說「熱熱鬧鬧的吃年夜飯」。' },
        { id: 'ph2', img: 'pr-soup.png', noun: '端著湯', ask: '他是怎麼端著湯的', look: '再看看圖片，湯有沒有灑出來？他走得穩不穩？', options: ['穩穩當當', '蹦蹦跳跳', '急急忙忙', '慌慌張張'], clue: '提示：他慢慢走，一滴湯都沒有灑出來。', explain: '答案是「穩穩當當」，他走得很穩，湯沒有灑出來，所以說「穩穩當當的端著湯」。' },
        { id: 'ph3', img: 'pr-gift.png', noun: '收下禮物', ask: '她是怎麼收下禮物的', look: '再看看圖片，她害不害羞？有沒有說謝謝？', options: ['大大方方', '慌慌張張', '哭哭啼啼', '急急忙忙'], clue: '提示：她一點都不害羞，笑著伸出雙手說謝謝。', explain: '答案是「大大方方」，她不害羞、很有禮貌，所以說「大大方方的收下禮物」。' },
        { id: 'ph4', img: 'pr-sweep.png', noun: '打掃教室', ask: '他們是怎麼打掃教室的', look: '再看看圖片，他們有沒有專心？', options: ['認認真真', '慌慌張張', '哭哭啼啼', '熱熱鬧鬧'], clue: '提示：他們很專心，每個角落都掃乾淨。', explain: '答案是「認認真真」，他們很專心的打掃，所以說「認認真真的打掃教室」。' },
        { id: 'ph5', img: 'pr-finish-line.png', noun: '跑完全程', ask: '他是怎麼跑完全程的', look: '再看看圖片，他有沒有跌倒？最後跑到終點了嗎？', options: ['順順利利', '哭哭啼啼', '安安靜靜', '慌慌張張'], clue: '提示：他一路上都沒有跌倒，開心的衝過終點。', explain: '答案是「順順利利」，一路上都很順，所以說「順順利利的跑完全程」。' },
        { id: 'ph6', img: 'pr-baby-sleep.png', noun: '睡著了', ask: '小寶寶是怎麼睡著的', look: '再看看圖片，小寶寶睡得好不好？', options: ['安安穩穩', '熱熱鬧鬧', '慌慌張張', '急急忙忙'], clue: '提示：小寶寶睡得很好，一動也不動。', explain: '答案是「安安穩穩」，小寶寶睡得很好，所以說「安安穩穩的睡著了」。' },
        { id: 'ph7', img: 'pr-new-clothes.png', noun: '穿上新衣服', ask: '她是怎麼穿上新衣服的', look: '再看看圖片，她穿起來好不好看？', options: ['漂漂亮亮', '慌慌張張', '哭哭啼啼', '急急忙忙'], clue: '提示：她穿上新衣服，看起來好好看。', explain: '答案是「漂漂亮亮」，她穿得很好看，所以說「漂漂亮亮的穿上新衣服」。' },
        { id: 'ph8', img: 'pr-sing.png', noun: '唱著歌', ask: '他們是怎麼唱歌的', look: '再看看圖片，他們的臉上有沒有笑？', options: ['快快樂樂', '哭哭啼啼', '慌慌張張', '安安靜靜'], clue: '提示：他們笑得好開心。', explain: '答案是「快快樂樂」，他們唱得很開心，所以說「快快樂樂的唱著歌」。' }
      ],
      say: [
        { id: 'ps1', img: 'pr-newyear.png', noun: '吃年夜飯', ask: '全家人是怎麼吃年夜飯的', accept: ['熱熱鬧鬧的吃年夜飯', '開開心心的吃年夜飯', '快快樂樂的吃年夜飯'], clue: '提示：大家圍在一起有說有笑，先用疊字說樣子，再說「的吃年夜飯」。', model: '熱熱鬧鬧的吃年夜飯' },
        { id: 'ps2', img: 'pr-sweep.png', noun: '打掃教室', ask: '他們是怎麼打掃教室的', accept: ['認認真真的打掃教室', '仔仔細細的打掃教室'], clue: '提示：他們很專心，先用疊字說樣子，再說「的打掃教室」。', model: '認認真真的打掃教室' }
      ],
      /* 第二個短語：好像為＋誰＋的＋什麼＋做什麼（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '好像為我的進步拍手', img: 'pz-leaves-clap.png',
          parts: [{ text: '好像為' }, { text: '我', role: '為誰' }, { text: '的' }, { text: '進步', role: '什麼事' }, { text: '拍手', role: '做什麼' }],
          explain: '把東西發出的聲音或樣子，說成「好像為」誰的什麼事在做動作。例如樹葉沙沙響，好像為我的進步拍手。' },
        fill: [
          { id: 'pz1', img: 'pz-birds-spring.png', parts: ['好像為', '春天', '的', '到來', '唱歌'] },
          { id: 'pz2', img: 'pz-waves-clap.png', parts: ['好像為', '我們', '的', '勝利', '鼓掌'] },
          { id: 'pz3', img: 'pz-balloons-dance.png', parts: ['好像為', '姐姐', '的', '生日', '跳舞'] },
          { id: 'pz4', img: 'pz-fireworks.png', parts: ['好像為', '大家', '的', '新年', '歡呼'] },
          { id: 'pz5', img: 'pz-flag-cheer.png', parts: ['好像為', '弟弟', '的', '勇敢', '加油'] }
        ]
      },
      words: [
        { word: '新奇', meaning: '新鮮、特別，以前沒看過。', img: 'new-things.png' },
        { word: '珍惜', meaning: '很看重，好好愛護，捨不得浪費。', img: 'treasure.png' }
      ],
      choose: [
        { id: 'pw1', word: '新奇', options: ['第一次看到會發光的魚，我覺得好新奇。', '我每天都吃一樣的早餐，覺得好新奇。'], clue: '提示：想一想，哪一個是以前沒看過、很特別的東西？', explain: '第一句用得對：第一次看到會發光的魚，很特別。每天都吃一樣的早餐，不新奇。' },
        { id: 'pw2', word: '新奇', options: ['機器人會跳舞，大家都覺得很新奇。', '我把新奇放進書包裡。'], clue: '提示：想一想，哪一句是在說很特別、沒看過的東西？', explain: '第一句用得對：會跳舞的機器人很特別。「新奇」不是東西，不能放進書包。' },
        { id: 'pw3', word: '珍惜', options: ['奶奶送的手錶，我會好好珍惜。', '我珍惜的把玩具丟到地上。'], clue: '提示：想一想，哪一句是在好好愛護東西？', explain: '第一句用得對：好好愛護奶奶送的手錶。把玩具丟到地上，不是珍惜。' },
        { id: 'pw4', word: '珍惜', options: ['我們要珍惜水，洗手時要關緊水龍頭。', '他珍惜的把飯倒進垃圾桶。'], clue: '提示：想一想，哪一句是捨不得浪費？', explain: '第一句用得對：關緊水龍頭，不浪費水。把飯倒掉是浪費，不是珍惜。' }
      ],
      make: [
        { id: 'pm1', word: '新奇', clue: '提示：想想看，你第一次看到什麼東西，覺得很特別？', model: '我第一次看到下雪，覺得好新奇。' },
        { id: 'pm2', word: '珍惜', clue: '提示：想想看，有什麼東西你會好好愛護、捨不得浪費？', model: '我會珍惜好朋友送我的卡片。' }
      ]
    },
    pattern: [
      { key: 'xianzai', id: 'xz', title: '先……再……', img: 'xianzai.png',
        meaning: '說兩件事的順序：「先」做第一件事，「再」做第二件事。',
        examples: ['放學回家以後，我先洗手，再吃點心。'],
        match: [
          { id: 'pt-xz-m1', img: 'pt-brush-sleep.png', front: '晚上睡覺前，我先刷牙，', options: ['再上床睡覺。', '再去上學。', '再吃早餐。'], clue: '提示：刷完牙以後，晚上要做什麼？', explain: '答案是「再上床睡覺」：晚上先刷牙，再上床睡覺。' },
          { id: 'pt-xz-m2', img: 'pt-shoes-door.png', front: '出門的時候，我先穿好鞋子，', options: ['再打開門出去。', '再脫掉鞋子。', '再上床睡覺。'], clue: '提示：穿好鞋子以後，要怎麼出門？', explain: '答案是「再打開門出去」：先穿好鞋子，再打開門出去。' },
          { id: 'pt-xz-m3', img: 'pt-noodles.png', front: '煮泡麵的時候，先把水燒開，', options: ['再把麵放進去。', '再把鍋子丟掉。', '再去洗澡。'], clue: '提示：水燒開以後，要把什麼放進鍋子裡？', explain: '答案是「再把麵放進去」：先把水燒開，再把麵放進去。' }
        ],
        conj: [
          { id: 'pt-xz-c1', full: '上體育課的時候，我們先做暖身操，再開始跑步。', img: 'pt-warm-up.png', sentence: '上體育課的時候，我們＿做暖身操，＿開始跑步。', options: ['先……再……', '……才……', '一邊……一邊……'], clue: '提示：說兩件事的順序，第一件和第二件。數數看有幾個空格。', explain: '答案是「先……再……」：我們先做暖身操，再開始跑步。' },
          { id: 'pt-xz-c2', full: '吃飯以前，弟弟先擺好碗筷，再叫大家來吃飯。', img: 'pt-set-table.png', sentence: '吃飯以前，弟弟＿擺好碗筷，＿叫大家來吃飯。', options: ['先……再……', '……才……', '一邊……一邊……'], clue: '提示：說兩件事的順序。數數看有幾個空格。', explain: '答案是「先……再……」：弟弟先擺好碗筷，再叫大家來吃飯。' },
          { id: 'pt-xz-c3', full: '畫畫的時候，我先用鉛筆打草稿，再塗上顏色。', img: 'pt-draw-color.png', sentence: '畫畫的時候，我＿用鉛筆打草稿，＿塗上顏色。', options: ['先……再……', '……才……', '一邊……一邊……'], clue: '提示：說畫畫的兩個步驟。數數看有幾個空格。', explain: '答案是「先……再……」：我先用鉛筆打草稿，再塗上顏色。' }
        ],
        half: [
          { id: 'pt-xz-h1', front: '早上起床以後，', clue: '提示：起床以後，你先做什麼？再做什麼？記得要說「先」和「再」。', model: '我先刷牙洗臉，再吃早餐。' },
          { id: 'pt-xz-h2', front: '到了圖書館，', clue: '提示：到了圖書館，你先做什麼？再做什麼？記得要說「先」和「再」。', model: '我先找一本喜歡的書，再坐下來看。' }
        ],
        whole: [
          { id: 'pt-xz-w1', clue: '提示：先說是什麼時候，再用「先」和「再」說兩件事的順序。想想看：洗澡的時候，你先洗什麼？', model: '洗澡的時候，我先洗頭，再洗身體。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '用「像」、「好像」把一樣東西比成另一樣東西，讓人更容易想像。', example: '課文說新娘的笑容像花朵一樣美麗。',
          show: { sentence: '弟弟的臉紅得像一顆蘋果。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '新娘的頭飾像一頂美麗的花冠。', answer: true, clue: '提示：這句話有沒有把頭飾比成另一樣東西？', explain: '是譬喻：把頭飾比成美麗的花冠。' },
            { id: 'rh-si-y2', sentence: '新娘戴著美麗的頭飾。', answer: false, clue: '提示：這句話有沒有用「像」把東西比成別的東西？', explain: '不是譬喻：這句話只是說新娘戴著頭飾，沒有比成別的東西。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['秋千盪得好高，像要飛上天。', '秋千盪得好高。'], clue: '提示：哪一句用了「像」，把秋千比成會飛的東西？', explain: '「秋千盪得好高，像要飛上天」是譬喻。' },
            { id: 'rh-si-p2', options: ['歌聲像小溪一樣清亮。', '大家一起唱歌。'], clue: '提示：哪一句把歌聲比成另一樣東西？', explain: '「歌聲像小溪一樣清亮」是譬喻：把歌聲比成小溪。' },
            { id: 'rh-si-p3', options: ['新郎的手臂像大樹一樣有力。', '新郎用力拉秋千。', '新郎拉秋千，拉呀拉。'], clue: '提示：哪一句用「像」把手臂比成別的東西？', explain: '「新郎的手臂像大樹一樣有力」是譬喻。' },
            { id: 'rh-si-p4', options: ['大家的笑聲像鞭炮一樣響亮。', '大家都在笑。', '大家笑哈哈。'], clue: '提示：哪一句把笑聲比成另一樣東西？', explain: '「大家的笑聲像鞭炮一樣響亮」是譬喻：把笑聲比成鞭炮聲。' },
            { id: 'rh-si-p5', options: ['百合花白得像天上的雲。', '新娘頭上有百合花。', '百合花香香的。', '百合花向大家點頭。'], clue: '提示：哪一句用「像」把百合花比成別的東西？', explain: '「百合花白得像天上的雲」是譬喻。' },
            { id: 'rh-si-p6', options: ['大家手拉著手，像一條長長的彩帶。', '大家手拉著手跳舞。', '跳舞好好玩。', '大家跳呀跳。'], clue: '提示：哪一句把大家牽手的樣子比成另一樣東西？', explain: '「大家手拉著手，像一條長長的彩帶」是譬喻。' }
          ] },
        { key: 'sound', name: '狀聲詞', meaning: '把聽到的聲音寫出來，例如叮噹叮噹、嘩啦嘩啦，讓人好像聽到了聲音。', example: '課文用注音寫出飾品叮叮噹噹的聲音。',
          show: { sentence: '鈴鐺叮噹叮噹的響。', mark: ['叮噹叮噹'] },
          yesno: [
            { id: 'rh-so-y1', sentence: '雨滴答滴答的下著。', answer: true, mark: ['滴答滴答'], clue: '提示：這句話有沒有把聽到的聲音寫出來？', explain: '是狀聲詞：「滴答滴答」是雨的聲音。' },
            { id: 'rh-so-y2', sentence: '外面下著雨。', answer: false, clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '不是狀聲詞：這句話沒有寫出聲音。' }
          ],
          pick: [
            { id: 'rh-so-p1', mark: ['咚咚咚'], options: ['鼓聲咚咚咚的響起來。', '大家開始打鼓。'], clue: '提示：哪一句把鼓的聲音寫出來了？', explain: '「咚咚咚」是狀聲詞：寫出鼓的聲音。' },
            { id: 'rh-so-p2', mark: ['嘩啦嘩啦'], options: ['河水嘩啦嘩啦的流。', '河水一直往前流。'], clue: '提示：哪一句寫出了河水的聲音？', explain: '「嘩啦嘩啦」是狀聲詞：寫出河水的聲音。' },
            { id: 'rh-so-p3', mark: ['啪啪啪'], options: ['大家啪啪啪的拍手。', '大家一起拍手。', '大家的手像小鳥在飛。'], clue: '提示：哪一句寫出了拍手的聲音？', explain: '「啪啪啪」是狀聲詞：寫出拍手的聲音。' },
            { id: 'rh-so-p4', mark: ['汪汪汪'], options: ['小狗汪汪汪的叫。', '小狗在門口叫。', '小狗跑得像風一樣快。'], clue: '提示：哪一句寫出了小狗的叫聲？', explain: '「汪汪汪」是狀聲詞：寫出小狗的叫聲。' },
            { id: 'rh-so-p5', mark: ['轟隆隆'], options: ['天空轟隆隆的打雷了。', '天空打雷了。', '天空黑黑的。', '雷公公生氣了。'], clue: '提示：哪一句寫出了打雷的聲音？', explain: '「轟隆隆」是狀聲詞：寫出打雷的聲音。' },
            { id: 'rh-so-p6', mark: ['劈哩啪啦'], options: ['鞭炮劈哩啪啦的響。', '過年要放鞭炮。', '鞭炮紅紅的。', '鞭炮像在唱歌。'], clue: '提示：哪一句寫出了鞭炮的聲音？', explain: '「劈哩啪啦」是狀聲詞：寫出鞭炮的聲音。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「熱熱鬧鬧」找回新娘。',
          show: { sentence: '大家熱熱鬧鬧的跳舞，新娘笑咪咪的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '新娘的衣服亮晶晶的。', answer: true, clue: '提示：形容衣服的字裡，有沒有同一個字連在一起？', explain: '是疊字：「晶晶」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '新娘穿著漂亮的衣服。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['大家開開心心的唱歌。', '大家一起唱歌。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「開開心心」是疊字。' },
            { id: 'rh-re-p2', options: ['秋千盪得高高的。', '秋千盪得很高。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「高高」是疊字。' },
            { id: 'rh-re-p3', options: ['桌上擺滿香噴噴的菜。', '桌上擺滿了菜。', '菜多得像一座山。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「香噴噴」是疊字：「噴噴」重複了。' },
            { id: 'rh-re-p4', options: ['新郎緊緊的握著繩子。', '新郎握著繩子。', '新郎拉秋千。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「緊緊」是疊字。' },
            { id: 'rh-re-p5', options: ['我們手拉手，慢慢的轉圈圈。', '我們手拉手一起跳舞。', '大家像一朵大花。', '大家跳舞跳到半夜。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「慢慢」、「圈圈」都是疊字。' },
            { id: 'rh-re-p6', options: ['新娘的臉紅通通的。', '新娘很害羞。', '新娘的臉像蘋果。', '新娘站在秋千上。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「紅通通」是疊字：「通通」重複了。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '新娘的笑容像太陽一樣溫暖。', answer: '譬喻', clue: '提示：這句話有沒有用「像」把笑容比成別的東西？', explain: '答案是「譬喻」：把笑容比成太陽。' },
        { id: 'rh2', sentence: '秋千像一隻大鳥，飛來飛去。', answer: '譬喻', clue: '提示：這句話把秋千比成什麼？', explain: '答案是「譬喻」：把秋千比成大鳥。' },
        { id: 'rh3', sentence: '鈴鐺叮叮噹噹的響個不停。', answer: '狀聲詞', mark: ['叮叮噹噹'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「狀聲詞」：「叮叮噹噹」是鈴鐺的聲音。' },
        { id: 'rh4', sentence: '大家咚咚咚的跳著舞。', answer: '狀聲詞', mark: ['咚咚咚'], clue: '提示：「咚咚咚」是什麼？', explain: '答案是「狀聲詞」：「咚咚咚」是跳舞踩地的聲音。' },
        { id: 'rh5', sentence: '婚禮熱熱鬧鬧的，好好玩。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「熱熱鬧鬧」是同一個字連在一起重複用。' },
        { id: 'rh6', sentence: '新郎笑咪咪的看著新娘。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「咪咪」是同一個字連在一起重複用。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L10 = d; }
})(this);

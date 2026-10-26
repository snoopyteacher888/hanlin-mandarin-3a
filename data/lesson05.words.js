/* 第 5 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第一步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['翁先生和其他梨農', '老師和同學', '醫生和護理師', '警察和消防員'], paras: [1, 3], why: '先想出辦法的是種梨子的翁先生，後來別的梨農也跟著學、跟著改。' },
      { id: 'wh-shi', key: '事', options: ['想辦法幫梨花擋雨，讓梨子長得更多', '梨農去海邊釣魚', '翁先生搬到城市去住', '梨農把梨樹全部砍掉'], paras: [1, 2, 3], why: '梨花一淋雨就壞掉，翁先生和梨農想出小雨傘，幫梨花擋雨。' },
      { id: 'wh-time', key: '時', options: ['一月梨花開花、常常下雨的時候', '很熱的暑假', '下雪的聖誕節', '中秋節的晚上'], paras: [1], why: '梨子一月開花，那時候常常下著小雨。' },
      { id: 'wh-di', key: '地', options: ['宜蘭三星鄉的梨園', '臺北的百貨公司', '學校的操場', '海邊的沙灘'], paras: [1], why: '這一課寫的是宜蘭三星鄉種梨子的果園。' },
      { id: 'wh-wu', key: '物', options: ['泡麵空碗、竹筷子、膠帶和線', '書包和課本', '風箏和氣球', '足球和球鞋'], paras: [2], why: '翁先生用吃完的泡麵碗、竹筷子，再用膠帶和線，做成小雨傘。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'extract', qg: 'extract', qf: 'infer', qj: 'infer',
      qh: 'evaluate', qi: 'interpret', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架（老師要求：不能只給課文，要教孩子怎麼想、解釋為什麼選這個答案）：
       think 是提示裡「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ["空碗做的小雨傘，要怎麼固定在樹上？", "加了夾子的小雨傘，只要怎麼做？哪一個比較快？"], why: "空碗做的雨傘要花功夫綁上去；有夾子的只要一夾就固定好了，比較方便，也比較省時間。" },
      qi: { think: ["課文一開始，梨花遇到什麼問題？", "後面一段一段都在說什麼？（想辦法、再改良）"], why: "課文先說梨花怕淋雨，接著說翁先生想出撐傘的方法，梨農再一次一次改良。整課都在說梨農怎麼解決梨花淋雨的問題。" }
    },
    /* 「說說看」改成選選看（老師要求：直接說太難）：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ["在梨樹上面搭一個大大的透明棚子。", "用防水的布做成小帽子，套在梨花上面。"], bad: ["把梨花全部摘下來，放進冰箱。", "下雨的時候，叫雨不要下。"], why: "棚子和防水小帽子都能擋住雨，梨花還能繼續長大。把花摘下來就結不出梨子了，叫雨不要下也做不到。" },
      k2: { good: ["夾子小雨傘一夾就固定在樹上，比較快。", "夾子小雨傘不用綁線、貼膠帶，比較方便。"], bad: ["夾子小雨傘是彩色的，比較漂亮。", "夾子小雨傘可以拿來吃。"], why: "兩種小雨傘都在幫梨花擋雨，比的是好不好用：夾子一夾就固定，比空碗傘又快又方便。顏色漂亮、可以吃，都不是它比較好的地方。" }
    },
    hanzi: [
      { id: 'h-綁', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['邦', 's', '']]}, char: '綁', zhuyin: 'ㄅㄤˇ', radical: '糸', strokes: 13, words: ['綁鞋帶', '綁頭髮'], say: '綁，綁鞋帶的綁', cloze: '＿鞋帶', img: 'tie-rope.png', options: ['綁', '幫', '邦', '梆'], clue: '這個字的左邊是糸字旁。', explain: '答案是「綁」，左邊是糸字旁；「幫」是幫忙的幫，「邦」的左邊沒有糸字旁。', parts: ['糸', '邦'], story: '左邊是糸字旁，就是絲線、繩子；右邊的「邦」念起來像「綁」。用繩子繞起來、打個結，就是「綁」。', sentence: '爸爸把舊報紙綁成一捆。', build: { layout: 'lr', show: ['？', '邦'], answer: '糸', options: ['糸', '木', '巾', '扌'], clue: '想一想：綁東西要用繩子，左邊放什麼？' } },
      { id: 'h-綿', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['帛', 's', '']]}, char: '綿', zhuyin: 'ㄇㄧㄢˊ', radical: '糸', strokes: 14, words: ['綿綿', '綿羊'], say: '綿，綿綿的綿', cloze: '綿＿', img: 'drizzle.png', options: ['綿', '棉', '錦', '帛'], clue: '這個字的左邊是糸字旁。', explain: '答案是「綿」，左邊是糸字旁；「棉」是棉被的棉，左邊是「木」；「錦」的左邊是「金」。', parts: ['糸', '帛'], story: '左邊是糸字旁，右邊的「帛」是布。絲線又細又長，一直連下去不會斷，所以「綿綿」是一直不停的意思。', sentence: '細雨綿綿，下了好幾天。', build: { layout: 'lr', show: ['？', '帛'], answer: '糸', options: ['糸', '木', '金', '亻'], clue: '想一想：又細又長、連著不斷的是絲線，左邊放什麼？' } },
      { id: 'h-腐', combo: {'layout': 'tb', 'parts': [['府', 's', ''], ['肉', 'm', '肉']]}, char: '腐', zhuyin: 'ㄈㄨˇ', radical: '肉', strokes: 14, words: ['腐爛', '豆腐'], say: '腐，腐爛的腐', cloze: '＿爛', img: 'rotten-fruit.png', options: ['腐', '府', '附', '俯'], clue: '這個字的下面是「肉」。', explain: '答案是「腐」，下面是「肉」；「府」的下面沒有「肉」，「附」的左邊是耳朵旁。', parts: ['府', '肉'], story: '上面是「府」，念起來像「腐」；下面是「肉」。肉放太久就會壞掉、發臭，就是「腐」。', sentence: '香蕉放太久，都腐爛了。', build: { layout: 'tb', show: ['府', '？'], answer: '肉', options: ['肉', '心', '木', '土'], clue: '想一想：什麼東西放太久會壞掉、發臭？' } },
      { id: 'h-甜', combo: {'layout': 'lr', 'parts': [['舌', 'm', '舌頭'], ['甘', 'm', '好吃']]}, char: '甜', zhuyin: 'ㄊㄧㄢˊ', radical: '甘', strokes: 11, words: ['甜美', '甜點'], say: '甜，甜美的甜', cloze: '＿美', img: 'sweet-pear.png', options: ['甜', '舔', '話', '括'], clue: '這個字的左邊是「舌」，右邊是「甘」。', explain: '答案是「甜」，右邊是「甘」；「舔」的右邊是「忝」，「話」的左邊是言字旁。', parts: ['舌', '甘'], story: '左邊是「舌」，就是舌頭；右邊是「甘」，就是好吃。舌頭嚐到像糖一樣好吃的味道，就是「甜」。', sentence: '這顆西瓜好甜。', build: { layout: 'lr', show: ['舌', '？'], answer: '甘', options: ['甘', '口', '日', '舌'], clue: '想一想：舌頭嚐到好吃的味道，右邊放哪一個？' } },
      { id: 'h-梨', combo: {'layout': 'tb', 'parts': [['利', 's', ''], ['木', 'm', '樹']]}, char: '梨', zhuyin: 'ㄌㄧˊ', radical: '木', strokes: 11, words: ['梨花', '水梨'], say: '梨，梨花的梨', cloze: '＿花', img: 'pear-flower.png', options: ['梨', '犁', '利', '黎'], clue: '這個字的下面是「木」。', explain: '答案是「梨」，下面是「木」；「犁」的下面是「牛」，「利」的下面沒有「木」。', parts: ['利', '木'], story: '上面是「利」，念起來像「梨」；下面是「木」，就是樹。長在樹上、水分很多的水果，就是「梨」。', sentence: '秋天的水梨又甜又多汁。', build: { layout: 'tb', show: ['利', '？'], answer: '木', options: ['木', '牛', '水', '火'], clue: '想一想：梨子長在哪裡？' } },
      { id: 'h-爛', combo: {'layout': 'lr', 'parts': [['火', 'm', '火'], ['蘭', 's', '']]}, char: '爛', zhuyin: 'ㄌㄢˋ', radical: '火', strokes: 21, words: ['腐爛', '燦爛'], say: '爛，腐爛的爛', cloze: '腐＿', img: 'rotten-fruit.png', options: ['爛', '攔', '欄', '蘭'], clue: '這個字的左邊是火字旁。', explain: '答案是「爛」，左邊是「火」；「攔」的左邊是提手旁，「欄」的左邊是「木」，「蘭」的上面是草字頭。', parts: ['火', '蘭'], story: '左邊是「火」，右邊的「蘭」念起來像「爛」。東西用火煮得太久，變得軟軟的，就是「爛」；壞掉了也叫「爛」。', sentence: '香蕉放太久，都腐爛了。', build: { layout: 'lr', show: ['？', '蘭'], answer: '火', options: ['火', '扌', '木', '氵'], clue: '想一想：東西煮太久會變軟，左邊放什麼？' } },
      { id: 'h-固', combo: {'type': '形聲字', 'pict': '外面是一個大框框，裡面是「古」。四面都圍得好好的，很牢、不會動，就是「固」。'}, char: '固', zhuyin: 'ㄍㄨˋ', radical: '囗', strokes: 8, words: ['固定', '堅固'], say: '固，固定的固', cloze: '＿定', img: 'fix-shelf.png', options: ['固', '困', '因', '回'], clue: '這個字的框框裡面是「古」。', explain: '答案是「固」，框框裡是「古」；「困」的裡面是「木」，「因」的裡面是「大」。', parts: ['囗', '古'], story: '外面是大框框，裡面是「古」，念起來像「固」。四面都圍起來，很牢、不會亂動，就是「固定」。', sentence: '這座橋很堅固。' },
      { id: 'h-筷', combo: {'layout': 'tb', 'parts': [['竹', 'm', '竹子'], ['快', 's', '']]}, char: '筷', zhuyin: 'ㄎㄨㄞˋ', radical: '竹', strokes: 13, words: ['筷子', '公筷'], say: '筷，公筷的筷', cloze: '公＿', img: 'chopsticks.png', options: ['筷', '快', '塊', '決'], clue: '這個字的上面是竹字頭。', explain: '答案是「筷」，上面是竹字頭；「快」沒有竹字頭，「塊」的左邊是「土」。', parts: ['竹', '快'], story: '上面是竹字頭，下面的「快」念起來像「筷」。用竹子做的、吃飯夾菜的兩根棒子，就是「筷子」。', sentence: '我用筷子夾青菜。', build: { layout: 'tb', show: ['？', '快'], answer: '竹', options: ['竹', '艹', '雨', '宀'], clue: '想一想：筷子常常用什麼做的？' } },
      { id: 'h-結', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['吉', 's', '']]}, char: '結', zhuyin: 'ㄐㄧㄝˊ', radical: '糸', strokes: 12, words: ['結果', '蝴蝶結'], say: '結，結果的結', cloze: '＿果', img: 'fruit-tree.png', options: ['結', '給', '桔', '潔'], clue: '這個字的左邊是糸字旁，右邊是「吉」。', explain: '答案是「結」，右邊是「吉」；「給」的右邊是「合」，「桔」的左邊是「木」。', parts: ['糸', '吉'], story: '左邊是糸字旁，右邊的「吉」念起來有點像「結」。把繩子打一個結，就是「結」；植物長出果實，也叫「結」。', sentence: '這棵樹結了好多蘋果。', build: { layout: 'lr', show: ['？', '吉'], answer: '糸', options: ['糸', '木', '口', '氵'], clue: '想一想：打結要用繩子，左邊放什麼？' } },
      { id: 'h-膠', combo: {'layout': 'lr', 'parts': [['月', 'm', '肉'], ['翏', 's', '']]}, char: '膠', zhuyin: 'ㄐㄧㄠ', radical: '肉', strokes: 15, words: ['膠帶', '膠水'], say: '膠，膠帶的膠', cloze: '＿帶', img: 'tape.png', options: ['膠', '交', '教', '郊'], clue: '這個字的左邊是「月」。', explain: '答案是「膠」，左邊是「月」；「交」、「教」、「郊」念起來很像，可是都不是黏東西的膠。', parts: ['月', '翏'], story: '左邊的「月」是肉的意思，很久以前的人用動物的皮熬成黏黏的東西，就是「膠」，可以把東西黏起來。', sentence: '我用膠帶把書貼好。' },
      { id: 'h-夾', combo: {'type': '會意字', 'pict': '中間是一個「大」人，兩邊各有一個小「人」，好像大人被夾在中間。'}, char: '夾', zhuyin: 'ㄐㄧㄚˊ', radical: '大', strokes: 7, words: ['夾子', '夾菜'], say: '夾，夾子的夾', cloze: '＿子', img: 'clip.png', options: ['夾', '來', '爽', '央'], clue: '這個字的中間是「大」，兩邊各有一個「人」。', explain: '答案是「夾」，中間是「大」；「來」的中間是「木」，「央」的上面不一樣。', parts: ['大', '人', '人'], story: '中間是一個大人，兩邊各有一個小人，好像把大人夾在中間。用兩邊把東西壓住，就是「夾」。', sentence: '我用夾子把紙張固定好。' },
      { id: 'h-景', combo: {'layout': 'tb', 'parts': [['日', 'm', '太陽'], ['京', 's', '']]}, char: '景', zhuyin: 'ㄐㄧㄥˇ', radical: '日', strokes: 12, words: ['美景', '風景'], say: '景，美景的景', cloze: '美＿', img: 'view-mountain.png', options: ['景', '影', '京', '涼'], clue: '這個字的上面是「日」，下面是「京」。', explain: '答案是「景」；「影」的右邊多了三撇，「京」的上面沒有「日」。', parts: ['日', '京'], story: '上面是「日」，就是太陽；下面的「京」念起來像「景」。太陽照著，眼睛看到的山和水，就是「風景」。', sentence: '火車窗外的風景好漂亮。', build: { layout: 'tb', show: ['日', '？'], answer: '京', options: ['京', '小', '木', '口'], clue: '想一想：太陽下面放的這個字，念起來跟「景」很像。' } },
      { id: 'h-汁', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['十', 's', '']]}, char: '汁', zhuyin: 'ㄓ', radical: '水', strokes: 5, words: ['多汁', '果汁'], say: '汁，多汁的汁', cloze: '多＿', img: 'juicy-pear.png', options: ['汁', '什', '計', '針'], clue: '這個字的左邊是三點水。', explain: '答案是「汁」，左邊是三點水；「什」的左邊是單人旁，「計」的左邊是言字旁，「針」的左邊是「金」。', parts: ['氵', '十'], story: '左邊是三點水，右邊是「十」。水果裡面擠出來的水，就是「汁」，像果汁。', sentence: '我喝了一杯果汁。', build: { layout: 'lr', show: ['？', '十'], answer: '氵', options: ['氵', '亻', '言', '金'], clue: '想一想：果汁是喝的，左邊放什麼？' } },
      { id: 'h-遮', combo: {'type': '形聲字', 'pict': '左下是辵字旁，跟走路有關；裡面是「庶」。擋在前面，不讓東西過來，就是「遮」。'}, char: '遮', zhuyin: 'ㄓㄜ', radical: '辵', strokes: 15, words: ['遮雨', '遮陽'], say: '遮，遮雨的遮', cloze: '＿雨', img: 'shelter-rain.png', options: ['遮', '這', '進', '庶'], clue: '這個字的左下是辵字旁，裡面是「庶」。', explain: '答案是「遮」，裡面是「庶」；「這」的裡面是「言」，「進」的裡面是「隹」。', parts: ['辶', '庶'], story: '左下是辵字旁，裡面是「庶」。用東西擋在前面，不讓雨、太陽過來，就是「遮」。', sentence: '夏天出門要戴帽子遮陽。' },
      { id: 'h-撐', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['掌', 's', '']]}, char: '撐', zhuyin: 'ㄔㄥ', radical: '手', strokes: 15, words: ['撐傘', '支撐'], say: '撐，撐傘的撐', cloze: '＿傘', img: 'umbrella-walk.png', options: ['撐', '掌', '撞', '堂'], clue: '這個字的左邊是提手旁，右邊是「掌」。', explain: '答案是「撐」，左邊是提手旁；「掌」沒有提手旁，「撞」的右邊是「童」。', parts: ['扌', '掌'], story: '左邊是提手旁，右邊是「掌」，念起來有點像「撐」。用手把東西頂住、打開，就是「撐」，像撐傘。', sentence: '下雨了，大家都撐傘。', build: { layout: 'lr', show: ['？', '掌'], answer: '扌', options: ['扌', '木', '土', '氵'], clue: '想一想：撐傘要用什麼？' } }
    ],
    vocab: [
      { id: 'v-梨花', word: '梨花', meaning: '梨樹開的花，白白的。', example: '果園裡的＿＿開了，白白的一大片。', img: 'pear-flower.png', options: ['梨花', '筷子', '膠帶', '夾子'] },
      { id: 'v-撐傘', cloze: true, clozeOptions: ['撐傘', '游泳', '睡覺', '跳舞'], word: '撐傘', meaning: '把雨具打開拿在手上，擋雨或擋太陽。', example: '下雨了，大家都＿＿走路。', img: 'umbrella-walk.png', options: ['撐傘', '遮雨', '綁', '固定'] },
      { id: 'v-甜美', word: '甜美', meaning: '吃起來像糖一樣，味道很棒。', example: '這顆西瓜的味道很＿＿。', img: 'sweet-pear.png', options: ['甜美', '多汁', '腐爛', '綿綿'] },
      { id: 'v-多汁', word: '多汁', meaning: '裡面有很多水分。', example: '這顆水梨咬下去好＿＿，汁都流出來了。', img: 'juicy-pear.png', options: ['多汁', '甜美', '固定', '腐爛'] },
      { id: 'v-綿綿', word: '綿綿', meaning: '一直下、不會停。', example: '細雨＿＿，好幾天都沒有出太陽。', img: 'drizzle.png', options: ['綿綿', '腐爛', '多汁', '結'] },
      { id: 'v-腐爛', cloze: true, clozeOptions: ['腐爛', '長高', '唱歌', '說話'], word: '腐爛', meaning: '東西放太久，壞掉、變得軟軟臭臭的。', example: '香蕉放太久，都＿＿了。', img: 'rotten-fruit.png', options: ['腐爛', '綿綿', '甜美', '固定'] },
      { id: 'v-結', cloze: true, clozeOptions: ['結', '吃', '跑', '寫'], word: '結', meaning: '植物長出果實。', example: '這棵樹＿了好多蘋果。', img: 'fruit-tree.png', options: ['結', '綁', '撐傘', '遮雨'] },
      { id: 'v-筷子', word: '筷子', meaning: '吃飯時用來夾菜的兩根細棒子。', example: '我用＿＿夾青菜。', img: 'chopsticks.png', options: ['筷子', '夾子', '膠帶', '梨花'] },
      { id: 'v-膠帶', word: '膠帶', meaning: '有黏性、可以把東西貼起來的長條帶子。', example: '我用＿＿把破掉的書貼好。', img: 'tape.png', options: ['膠帶', '筷子', '夾子', '美景'] },
      { id: 'v-綁', cloze: true, clozeOptions: ['綁', '吃', '喝', '唱'], word: '綁', meaning: '用繩子繞起來，打個結。', example: '爸爸把舊報紙＿成一捆。', img: 'tie-rope.png', options: ['綁', '結', '撐傘', '遮雨'] },
      { id: 'v-夾子', word: '夾子', meaning: '可以把東西夾住的小工具。', example: '媽媽用＿＿把衣服固定在曬衣架上。', img: 'clip.png', options: ['夾子', '膠帶', '筷子', '梨花'] },
      { id: 'v-遮雨', word: '遮雨', meaning: '擋住雨，不讓雨淋到。', example: '我們躲在屋簷下＿＿。', img: 'shelter-rain.png', options: ['遮雨', '撐傘', '腐爛', '綿綿'] },
      { id: 'v-固定', word: '固定', meaning: '放好、綁好，不會亂動。', example: '爸爸用螺絲把書架＿＿在牆上。', img: 'fix-shelf.png', options: ['固定', '腐爛', '甜美', '多汁'] },
      { id: 'v-美景', word: '美景', meaning: '很漂亮、讓人想一直看的風光。', example: '站在山頂上，可以看到好多＿＿。', img: 'view-mountain.png', options: ['美景', '梨花', '膠帶', '夾子'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-綁', char: '綁', img: 'cw-ponytail.png', charMeaning: '用繩子繞起來。', word: '綁頭髮', meaning: '用橡皮筋把頭髮綁起來。', example: '姐姐用橡皮筋＿＿＿。', options: ['綁頭髮', '綿羊', '豆腐', '甜點'] },
      { id: 'cw-綿', char: '綿', img: 'cw-sheep.png', charMeaning: '一直連著不斷；軟軟的。', word: '綿羊', meaning: '身上有白白捲捲的毛的動物。', example: '草地上有一群＿＿在吃草。', options: ['綿羊', '水梨', '公筷', '果汁'] },
      { id: 'cw-腐', char: '腐', img: 'cw-tofu.png', charMeaning: '壞掉；白白軟軟的食物。', word: '豆腐', meaning: '用黃豆做的、白白軟軟的食物。', example: '媽媽煮了一鍋＿＿湯。', options: ['豆腐', '膠水', '風景', '遮陽'] },
      { id: 'cw-甜', char: '甜', img: 'cw-dessert.png', charMeaning: '像糖一樣的味道。', word: '甜點', meaning: '甜甜的點心，像蛋糕、布丁。', example: '吃完飯，我們一起吃＿＿。', options: ['甜點', '支撐', '綿羊', '蝴蝶結'] },
      { id: 'cw-梨', char: '梨', img: 'cw-pear.png', charMeaning: '一種水果。', word: '水梨', meaning: '一種咬起來脆脆、水分很多的水果。', example: '秋天的＿＿又甜又多汁。', options: ['水梨', '堅固', '夾菜', '燦爛'] },
      { id: 'cw-爛', char: '爛', img: 'cw-bright-smile.png', charMeaning: '壞掉；很亮、很漂亮。', word: '燦爛', meaning: '很亮、很漂亮。', example: '她笑得好＿＿。', options: ['燦爛', '豆腐', '果汁', '公筷'] },
      { id: 'cw-固', char: '固', img: 'cw-strong-bridge.png', charMeaning: '很牢、不會動。', word: '堅固', meaning: '很牢、不容易壞。', example: '這座橋很＿＿，大卡車也能開過去。', options: ['堅固', '甜點', '綁頭髮', '風景'] },
      { id: 'cw-筷', char: '筷', img: 'cw-serving-chopsticks.png', charMeaning: '吃飯夾菜的棒子。', word: '公筷', meaning: '大家一起夾菜用的筷子。', example: '吃飯要用＿＿夾菜，比較衛生。', options: ['公筷', '水梨', '膠水', '遮陽'] },
      { id: 'cw-結', char: '結', img: 'cw-bow.png', charMeaning: '把繩子打一個結；長出果實。', word: '蝴蝶結', meaning: '綁成像蝴蝶一樣的結。', example: '妹妹的頭上綁著一個紅色的＿＿＿。', options: ['蝴蝶結', '綿羊', '燦爛', '支撐'] },
      { id: 'cw-膠', char: '膠', img: 'cw-glue.png', charMeaning: '黏黏的，可以把東西黏起來。', word: '膠水', meaning: '可以把紙黏起來的黏黏的水。', example: '我用＿＿把圖畫貼在紙上。', options: ['膠水', '甜點', '堅固', '夾菜'] },
      { id: 'cw-夾', char: '夾', img: 'cw-pick-food.png', charMeaning: '從兩邊把東西壓住。', word: '夾菜', meaning: '用筷子把菜拿起來。', example: '奶奶幫我＿＿，我吃得好飽。', options: ['夾菜', '豆腐', '風景', '綁頭髮'] },
      { id: 'cw-景', char: '景', img: 'cw-train-view.png', charMeaning: '眼睛看到的山和水。', word: '風景', meaning: '眼睛看到的山、水、樹這些景色。', example: '火車窗外的＿＿好漂亮。', options: ['風景', '公筷', '蝴蝶結', '果汁'] },
      { id: 'cw-汁', char: '汁', img: 'cw-juice.png', charMeaning: '水果裡的水。', word: '果汁', meaning: '用水果打出來的飲料。', example: '天氣好熱，我喝了一杯冰涼的＿＿。', options: ['果汁', '堅固', '水梨', '燦爛'] },
      { id: 'cw-遮', char: '遮', img: 'cw-sun-hat.png', charMeaning: '擋住。', word: '遮陽', meaning: '擋住太陽。', example: '夏天出門要戴帽子＿＿。', options: ['遮陽', '膠水', '綿羊', '甜點'] },
      { id: 'cw-撐', char: '撐', img: 'cw-pillars.png', charMeaning: '頂住，不讓它倒下來。', word: '支撐', meaning: '在下面頂住，讓它不會倒。', example: '幾根柱子＿＿著屋頂。', options: ['支撐', '夾菜', '豆腐', '風景'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-甜言蜜語', situationImg: 'id-stranger-candy.png', idiom: '甜言蜜語', char: '甜', meaning: '很好聽、讓人開心，可是不一定是真心的話。', example: '壞人常常用甜言蜜語騙人，我們要小心。', situation: '一個陌生人拿著糖果，笑咪咪的對小朋友說好多好聽的話，想帶他走，小朋友趕快跑去找老師。',
        fill: { options: ['陌生人說的＿＿＿＿，不可以隨便相信。', '他罵人的話好難聽，真是＿＿＿＿。'], clue: '提示：哪一句是說很好聽、可是可能是騙人的話？', explain: '第一句用得對：陌生人說好聽的話，可能是騙人的。罵人的話很難聽，剛好相反。' } },
      { id: 'i-海枯石爛', situationImg: 'id-old-couple.png', idiom: '海枯石爛', char: '爛', meaning: '就算過了非常非常久，也不會改變。', example: '我們說好，就算海枯石爛，也要當一輩子的好朋友。', situation: '爺爺和奶奶結婚五十年了，還是每天手牽手去公園散步。',
        fill: { options: ['就算＿＿＿＿，我也會一直記得你。', '這朵花明天就謝了，真是＿＿＿＿。'], clue: '提示：哪一句是說過了很久很久都不會變？', explain: '第一句用得對：過了很久也一直記得。花明天就謝了，一下子就變了，剛好相反。' } },
      { id: 'i-張口結舌', situationImg: 'id-stage-fright.png', idiom: '張口結舌', char: '結', meaning: '嚇到或緊張得張開嘴巴，卻說不出話來。', example: '老師突然叫他回答，他緊張得張口結舌。', situation: '小明站上台要說故事，看到台下好多人，嘴巴張開了，卻一句話也說不出來。',
        fill: { options: ['看到好大的一隻熊，他嚇得＿＿＿＿。', '他上台說話又大聲又流利，說得＿＿＿＿。'], clue: '提示：哪一句的人嚇到說不出話來？', explain: '第一句用得對：嚇得張開嘴巴說不出話。說話又大聲又流利，剛好相反。' } },
      { id: 'i-如膠似漆', situationImg: 'id-best-friends.png', idiom: '如膠似漆', char: '膠', meaning: '感情非常好，常常黏在一起分不開。', example: '這兩隻小狗如膠似漆，走到哪裡都在一起。', situation: '兩個好朋友每天一起上學、一起吃午餐、一起回家，從來不分開。',
        fill: { options: ['這對好朋友＿＿＿＿，每天都黏在一起。', '他們兩個一見面就吵架，真是＿＿＿＿。'], clue: '提示：哪一句的兩個人感情非常好？', explain: '第一句用得對：好朋友每天黏在一起。一見面就吵架，剛好相反。' } },
      { id: 'i-一手遮天', situationImg: 'id-bossy-king.png', idiom: '一手遮天', char: '遮', meaning: '一個人什麼都自己說了算，還把事情藏起來，不讓別人知道。', example: '有個同學想一手遮天，偷偷改了比賽的分數，最後還是被老師發現了。', situation: '一個國王把壞消息都藏起來，什麼事都自己決定，也不准大家說出來。',
        fill: { options: ['他以為可以＿＿＿＿，把做錯的事藏起來，最後還是被發現了。', '他做錯事馬上跟大家說對不起，真是＿＿＿＿。'], clue: '提示：哪一句的人想把事情藏起來，自己說了算？', explain: '第一句用得對：想把做錯的事藏起來。馬上說對不起、讓大家知道，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-綁', char: '綁', wrong: '幫', sentence: '爸爸把舊報紙綁成一捆。', options: ['綁', '幫', '邦'], clue: '這裡是說用繩子繞起來，想一想，哪一個字的左邊是糸字旁？', explain: '要改成「綁」。用繩子繞起來是「綁」，左邊是糸字旁；「幫」是幫忙的幫。' },
      { id: 'fx-綿', char: '綿', wrong: '棉', sentence: '草地上有一群綿羊。', options: ['綿', '棉', '錦'], clue: '這裡說的是一種動物，想一想，哪一個字的左邊是糸字旁？', explain: '要改成「綿」。動物是「綿羊」，左邊是糸字旁；「棉」是棉被的棉，左邊是「木」。' },
      { id: 'fx-腐', char: '腐', wrong: '府', sentence: '媽媽煮了豆腐湯。', options: ['腐', '府', '附'], clue: '這裡說的是白白軟軟的食物，想一想，哪一個字的下面有「肉」？', explain: '要改成「腐」。白白軟軟的食物是「豆腐」，下面有「肉」；「府」的下面沒有「肉」。' },
      { id: 'fx-甜', char: '甜', wrong: '舔', sentence: '這顆西瓜好甜。', options: ['甜', '舔', '話'], clue: '這裡說的是像糖一樣的味道，想一想，哪一個字的右邊是「甘」？', explain: '要改成「甜」。像糖一樣的味道是「甜」，右邊是「甘」；「舔」是用舌頭舔的舔。' },
      { id: 'fx-梨', char: '梨', wrong: '犁', sentence: '秋天的水梨又甜又多汁。', options: ['梨', '犁', '利'], clue: '這裡說的是水果，想一想，哪一個字的下面是「木」？', explain: '要改成「梨」。水果是「水梨」，下面是「木」；「犁」的下面是「牛」。' },
      { id: 'fx-爛', char: '爛', wrong: '攔', sentence: '香蕉放太久，都腐爛了。', options: ['爛', '攔', '欄'], clue: '這裡是說東西壞掉了，想一想，哪一個字的左邊是火字旁？', explain: '要改成「爛」。壞掉是「腐爛」，左邊是「火」；「攔」的左邊是提手旁。' },
      { id: 'fx-固', char: '固', wrong: '困', sentence: '這座橋很堅固。', options: ['固', '困', '因'], clue: '這裡是說很牢、不容易壞，想一想，哪一個字的框框裡是「古」？', explain: '要改成「固」。很牢是「堅固」，框框裡是「古」；「困」的裡面是「木」。' },
      { id: 'fx-筷', char: '筷', wrong: '快', sentence: '我用筷子夾青菜。', options: ['筷', '快', '塊'], clue: '這裡說的是夾菜的用具，想一想，哪一個字的上面是竹字頭？', explain: '要改成「筷」。夾菜的用具是「筷子」，上面是竹字頭；「快」沒有竹字頭。' },
      { id: 'fx-結', char: '結', wrong: '給', sentence: '這棵樹結了好多蘋果。', options: ['結', '給', '桔'], clue: '這裡是說長出果實，想一想，哪一個字的右邊是「吉」？', explain: '要改成「結」。長出果實是「結」，右邊是「吉」；「給」的右邊是「合」。' },
      { id: 'fx-膠', char: '膠', wrong: '交', sentence: '我用膠帶把書貼好。', options: ['膠', '交', '教'], clue: '這裡說的是黏黏的帶子，想一想，哪一個字的左邊是「月」？', explain: '要改成「膠」。黏黏的帶子是「膠帶」，左邊是「月」；「交」是交朋友的交。' },
      { id: 'fx-夾', char: '夾', wrong: '來', sentence: '我用夾子把紙張固定好。', options: ['夾', '來', '爽'], clue: '這裡說的是把紙張壓住、固定好的小工具，想一想，哪一個字的中間是「大」？', explain: '要改成「夾」。夾住東西的工具是「夾子」，中間是「大」；「來」的中間是「木」。' },
      { id: 'fx-景', char: '景', wrong: '影', sentence: '火車窗外的風景好漂亮。', options: ['景', '影', '京'], clue: '這裡說的是看到的山和水，想一想，哪一個字的右邊沒有三撇？', explain: '要改成「景」。看到的山和水是「風景」；「影」的右邊多了三撇。' },
      { id: 'fx-汁', char: '汁', wrong: '什', sentence: '我喝了一杯果汁。', options: ['汁', '什', '計'], clue: '這裡說的是喝的東西，想一想，哪一個字的左邊是三點水？', explain: '要改成「汁」。喝的是「果汁」，左邊是三點水；「什」的左邊是單人旁。' },
      { id: 'fx-遮', char: '遮', wrong: '這', sentence: '夏天出門要戴帽子遮陽。', options: ['遮', '這', '庶'], clue: '這裡是說擋住太陽，想一想，哪一個字的裡面是「庶」？', explain: '要改成「遮」。擋住太陽是「遮陽」；「這」的裡面是「言」。' },
      { id: 'fx-撐', char: '撐', wrong: '掌', sentence: '下雨了，大家都撐傘。', options: ['撐', '掌', '撞'], clue: '這裡是說把雨傘打開拿著，想一想，哪一個字的左邊是提手旁？', explain: '要改成「撐」。把雨傘打開拿著是「撐傘」，左邊是提手旁；「掌」是手掌的掌。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿羊」是身上有白白捲捲毛的動物。', sentence: '牧場裡有好多＿羊。', frame: '＿羊', options: ['綿', '棉'], answer: '綿', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「綿」；「棉」是棉被的棉。' },
      { id: 's2', meaning: '「＿被」是蓋在身上、暖暖的被子。', sentence: '冬天要蓋厚厚的＿被。', frame: '＿被', options: ['棉', '綿'], answer: '棉', clue: '提示：這個字的左邊是「木」。', explain: '答案是「棉」；「綿」是綿羊的綿。' },
      { id: 's3', meaning: '「燦＿」是很亮、很漂亮。', sentence: '早上的陽光好燦＿。', frame: '燦＿', options: ['爛', '攔'], answer: '爛', clue: '提示：跟光有關，這個字的左邊是火字旁。', explain: '答案是「爛」；「攔」是攔住的攔。' },
      { id: 's4', meaning: '「＿住」是擋住，不讓他過去。', sentence: '警察伸手＿住超速的車子。', frame: '＿住', options: ['攔', '爛'], answer: '攔', clue: '提示：要用手擋，這個字的左邊是提手旁。', explain: '答案是「攔」；「爛」是腐爛的爛。' },
      { id: 's5', meaning: '「布告＿」是學校裡貼通知的板子。', sentence: '學校的布告＿貼了新的海報。', frame: '布告＿', options: ['欄', '爛'], answer: '欄', clue: '提示：這個字的左邊是「木」。', explain: '答案是「欄」；「爛」是腐爛的爛。' },
      { id: 's6', meaning: '「水＿」是水分很多的水果。', sentence: '我最喜歡吃水＿。', frame: '水＿', options: ['梨', '犁'], answer: '梨', clue: '提示：水果長在樹上，這個字的下面是「木」。', explain: '答案是「梨」；「犁」是犁田的犁。' },
      { id: 's7', meaning: '「＿田」是用牛拉著工具，把田裡的土翻鬆。', sentence: '農夫用牛＿田。', frame: '＿田', options: ['犁', '梨'], answer: '犁', clue: '提示：這個字的下面是「牛」。', explain: '答案是「犁」；「梨」是水梨的梨。' },
      { id: 's8', meaning: '「風＿」是眼睛看到的山和水。', sentence: '山上的風＿好美。', frame: '風＿', options: ['景', '影'], answer: '景', clue: '提示：這個字的右邊沒有三撇。', explain: '答案是「景」；「影」是電影的影。' },
      { id: 's9', meaning: '「電＿」是在大螢幕上看的故事。', sentence: '週末我們去看電＿。', frame: '電＿', options: ['影', '景'], answer: '影', clue: '提示：這個字的右邊有三撇。', explain: '答案是「影」；「景」是風景的景。' },
      { id: 's10', meaning: '「＿忙」是替別人一起做事。', sentence: '我＿忙媽媽洗碗。', frame: '＿忙', options: ['幫', '綁'], answer: '幫', clue: '提示：這個字的下面是「巾」。', explain: '答案是「幫」；「綁」是綁鞋帶的綁。' },
      { id: 's11', meaning: '「＿鞋帶」是把鞋子的帶子打結。', sentence: '我會自己＿鞋帶。', frame: '＿鞋帶', options: ['綁', '幫'], answer: '綁', clue: '提示：要用繩子，這個字的左邊是糸字旁。', explain: '答案是「綁」；「幫」是幫忙的幫。' }
    ],
    listen: [
      { id: 'l1', text: '吃飯的時候，用兩根細細的棒子夾菜。', answer: 0, options: [{ text: '筷子', img: 'chopsticks.png' }, { text: '夾子', img: 'clip.png' }, { text: '膠帶', img: 'tape.png' }, { text: '梨花', img: 'pear-flower.png' }] },
      { id: 'l2', text: '可以把破掉的紙黏起來的長條帶子。', answer: 0, options: [{ text: '膠帶', img: 'tape.png' }, { text: '筷子', img: 'chopsticks.png' }, { text: '夾子', img: 'clip.png' }, { text: '梨花', img: 'pear-flower.png' }] },
      { id: 'l3', text: '可以把衣服夾在曬衣架上的小工具。', answer: 0, options: [{ text: '夾子', img: 'clip.png' }, { text: '膠帶', img: 'tape.png' }, { text: '筷子', img: 'chopsticks.png' }, { text: '美景', img: 'view-mountain.png' }] },
      { id: 'l4', text: '水果放太久，壞掉了，還發出臭味。', answer: 0, options: [{ text: '腐爛', img: 'rotten-fruit.png' }, { text: '甜美', img: 'sweet-pear.png' }, { text: '多汁', img: 'juicy-pear.png' }, { text: '固定', img: 'fix-shelf.png' }] },
      { id: 'l5', text: '小雨一直下，下了好幾天都不停。', answer: 0, options: [{ text: '綿綿', img: 'drizzle.png' }, { text: '腐爛', img: 'rotten-fruit.png' }, { text: '固定', img: 'fix-shelf.png' }, { text: '筷子', img: 'chopsticks.png' }] },
      { id: 'l6', text: '下雨了，我把雨傘打開，拿在手上走路。', answer: 0, options: [{ text: '撐傘', img: 'umbrella-walk.png' }, { text: '綁', img: 'tie-rope.png' }, { text: '結', img: 'fruit-tree.png' }, { text: '固定', img: 'fix-shelf.png' }] },
      { id: 'l7', text: '雨好大，我們躲在屋簷下，不讓雨淋到身上。', answer: 0, options: [{ text: '遮雨', img: 'shelter-rain.png' }, { text: '腐爛', img: 'rotten-fruit.png' }, { text: '結', img: 'fruit-tree.png' }, { text: '筷子', img: 'chopsticks.png' }] },
      { id: 'l8', text: '站在山頂上，看到好漂亮的山和海。', answer: 0, options: [{ text: '美景', img: 'view-mountain.png' }, { text: '腐爛', img: 'rotten-fruit.png' }, { text: '膠帶', img: 'tape.png' }, { text: '夾子', img: 'clip.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的四個字。',
      /* 短語一：什麼東西＋四個字說它怎麼樣（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '這顆水蜜桃鮮嫩多汁', img: 'pr-peach.png',
        parts: [{ text: '這顆水蜜桃', role: '什麼東西' }, { text: '鮮嫩多汁', role: '怎麼樣（四個字）' }],
        explain: '先說是什麼東西，後面再用四個字，說說它吃起來、看起來是什麼樣子。' },
      pick: [
        { id: 'ph1', img: 'pr-peach.png', before: '這顆水蜜桃', noun: '。', join: '', ask: '這顆水蜜桃怎麼樣', look: '再看看圖片，水蜜桃咬下去，有沒有流出汁來？', options: ['鮮嫩多汁', '乾淨整齊', '緊張刺激', '五顏六色'], clue: '提示：水蜜桃軟軟的，咬一口汁就流出來了。', explain: '答案是「鮮嫩多汁」，水蜜桃又嫩又有很多汁，所以說「這顆水蜜桃鮮嫩多汁」。' },
        { id: 'ph2', img: 'pr-fireworks.png', before: '晚上的煙火', noun: '。', join: '', ask: '晚上的煙火怎麼樣', look: '再看看圖片，天上的煙火有幾種顏色？', options: ['五顏六色', '鮮嫩多汁', '乾淨整齊', '香脆可口'], clue: '提示：天上的煙火有紅色、黃色、綠色、藍色，好多種顏色。', explain: '答案是「五顏六色」，煙火有好多顏色，所以說「晚上的煙火五顏六色」。' },
        { id: 'ph3', img: 'pr-ball-game.png', before: '這場籃球比賽', noun: '。', join: '', ask: '這場籃球比賽怎麼樣', look: '再看看圖片，比賽的分數是不是咬得很緊？大家看得緊不緊張？', options: ['緊張刺激', '鮮嫩多汁', '香脆可口', '乾淨整齊'], clue: '提示：兩隊一直搶球，看比賽的人都屏住呼吸，好緊張。', explain: '答案是「緊張刺激」，比賽讓人好緊張，所以說「這場籃球比賽緊張刺激」。' },
        { id: 'ph4', img: 'pr-tidy-room.png', before: '我的房間', noun: '。', join: '', ask: '我的房間怎麼樣', look: '再看看圖片，房間裡的東西都放好了嗎？', options: ['乾淨整齊', '鮮嫩多汁', '香脆可口', '緊張刺激'], clue: '提示：書排得好好的，地上也沒有垃圾。', explain: '答案是「乾淨整齊」，房間又乾淨又整齊，所以說「我的房間乾淨整齊」。' },
        { id: 'ph5', img: 'pr-chips.png', before: '這包洋芋片', noun: '。', join: '', ask: '這包洋芋片怎麼樣', look: '再看看圖片，洋芋片咬下去，有沒有發出喀滋喀滋的聲音？', options: ['香脆可口', '緊張刺激', '乾淨整齊', '鮮嫩多汁'], clue: '提示：洋芋片香香的，咬起來脆脆的，很好吃。', explain: '答案是「香脆可口」，洋芋片又香又脆，所以說「這包洋芋片香脆可口」。' },
        { id: 'ph6', img: 'pr-puppy.png', before: '這隻小狗', noun: '。', join: '', ask: '這隻小狗怎麼樣', look: '再看看圖片，小狗是不是跳來跳去、搖著尾巴？', options: ['活潑可愛', '鮮嫩多汁', '香脆可口', '緊張刺激'], clue: '提示：小狗一直跳來跳去，還歪著頭看你。', explain: '答案是「活潑可愛」，小狗又活潑又可愛，所以說「這隻小狗活潑可愛」。' }
      ],
      say: [],
      /* 第二個短語：把＋什麼東西＋怎麼做（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '把衣服摺起來', img: 'pz-fold-clothes.png',
          parts: [{ text: '把' }, { text: '衣服', role: '什麼東西' }, { text: '摺起來', role: '怎麼做' }],
          explain: '先說「把」，再說什麼東西，最後說要對它做什麼動作。' },
        fill: [
          { id: 'pz1', img: 'pz-socks.png', parts: ['把', '襪子', '穿上去'] },
          { id: 'pz2', img: 'pz-drink-juice.png', parts: ['把', '果汁', '喝光光'] },
          { id: 'pz3', img: 'pz-trash-in.png', parts: ['把', '垃圾', '丟進去'] },
          { id: 'pz4', img: 'pz-open-window.png', parts: ['把', '窗戶', '打開來'] },
          { id: 'pz5', img: 'pz-toys-away.png', parts: ['把', '玩具', '收進箱子'] }
        ]
      },
      words: [
        { word: '改良', meaning: '把缺點改掉，讓東西變得更好。', img: 'clip-umbrella.png' },
        { word: '浮現', meaning: '慢慢出現在眼前或心裡。', img: 'pz-memory.png' }
      ],
      choose: [
        { id: 'pw1', word: '改良', options: ['這種西瓜改良以後，變得更甜了。', '我把好好的碗改良成破掉的碗。'], clue: '提示：想一想，「改良」以後，東西會變得更好，還是更壞？', explain: '第一句用得對：改良以後西瓜更甜了。把碗弄破是變壞，不是改良。' },
        { id: 'pw2', word: '浮現', options: ['看到舊照片，小時候的事浮現在我心裡。', '我把書包浮現在桌子上。'], clue: '提示：想一想，「浮現」是東西被放好，還是慢慢出現在眼前或心裡？', explain: '第一句用得對：小時候的事慢慢出現在心裡。書包是放在桌上，不能說浮現。' }
      ],
      make: [
        { id: 'pm1', word: '改良', clue: '提示：想想看，有什麼東西改一改以後變得更好用？', model: '爸爸改良了舊書架，現在可以放更多書了。' },
        { id: 'pm2', word: '浮現', clue: '提示：想想看，聽到一首歌或看到一張照片，你會想起什麼？', model: '聽到這首歌，去海邊玩的畫面就浮現在我眼前。' }
      ]
    },
    pattern: [
      { key: 'buzhi', id: 'bz', title: '不只……還……', img: 'buzhi.png',
        meaning: '先說要做的一件事，再用「還」說另一件更多、更難的事。',
        examples: ['準備去郊遊，不只要帶水壺，還要帶雨衣。'],
        match: [
          { id: 'pt-bz-m1', img: 'pt-clean-room.png', front: '打掃房間，不只要掃地，', options: ['還要把垃圾拿去倒。', '還要把房間變成海洋。', '還要吃掉掃把。'], clue: '提示：看看圖片，掃完地，還要做什麼？', explain: '答案是「還要把垃圾拿去倒」：打掃不只要掃地，還要倒垃圾。' },
          { id: 'pt-bz-m2', img: 'pt-walk-dog.png', front: '照顧小狗，不只要餵牠吃飯，', options: ['還要帶牠去散步。', '還要教牠開車。', '還要幫牠買手機。'], clue: '提示：看看圖片，照顧小狗還要做什麼？', explain: '答案是「還要帶牠去散步」：照顧小狗不只要餵飯，還要帶牠散步。' },
          { id: 'pt-bz-m3', img: 'pt-cross-road.png', front: '過馬路，不只要看紅綠燈，', options: ['還要注意來來往往的車子。', '還要在馬路上睡覺。', '還要一邊走一邊跳舞。'], clue: '提示：過馬路的時候，除了紅綠燈，還要小心什麼？', explain: '答案是「還要注意來來往往的車子」：過馬路不只看燈號，還要注意車子。' }
        ],
        conj: [
          { id: 'pt-bz-c1', full: '種花不只要澆水，還要曬太陽。', img: 'pt-grow-flower.png', sentence: '種花＿＿要澆水，＿要曬太陽。', options: ['不只……還……', '因為……所以……', '……，可是……'], clue: '提示：先說一件要做的事，再說另一件更多的事。數數看有幾個空格。', explain: '答案是「不只……還……」：種花不只要澆水，還要曬太陽。' },
          { id: 'pt-bz-c2', full: '上學不只要帶課本，還要帶水壺。', img: 'pt-school-bag.png', sentence: '上學＿＿要帶課本，＿要帶水壺。', options: ['不只……還……', '因為……所以……', '……，可是……'], clue: '提示：帶了課本，還要帶什麼？數數看有幾個空格。', explain: '答案是「不只……還……」：上學不只要帶課本，還要帶水壺。' },
          { id: 'pt-bz-c3', full: '做蛋糕不只要準備麵粉，還要準備雞蛋。', img: 'pt-bake-cake.png', sentence: '做蛋糕＿＿要準備麵粉，＿要準備雞蛋。', options: ['不只……還……', '因為……所以……', '……，可是……'], clue: '提示：準備了麵粉，還要準備什麼？數數看有幾個空格。', explain: '答案是「不只……還……」：做蛋糕不只要準備麵粉，還要準備雞蛋。' }
        ],
        half: [
          { id: 'pt-bz-h1', front: '去露營，不只要帶帳篷，', clue: '提示：去露營還要帶什麼？記得要說「還」。', model: '還要帶手電筒。' },
          { id: 'pt-bz-h2', front: '學游泳，不只要會踢水，', clue: '提示：學游泳還要學會什麼？記得要說「還」。', model: '還要學會換氣。' }
        ],
        whole: [
          { id: 'pt-bz-w1', clue: '提示：先說要做的一件事，再用「還」說另一件更多的事。想想看：幫忙做家事，要做哪些事？', model: '幫忙做家事，不只要洗碗，還要把碗擦乾。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '用「像」、「好像」把一樣東西比成另一樣東西，讓人更容易想像。', example: '課文裡，梨花好像撐著一把小雨傘一樣。',
          show: { sentence: '荷葉像一把綠色的大雨傘。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '小狗的毛軟軟的，像一團棉花。', answer: true, clue: '提示：這句話有沒有把小狗的毛比成另一樣東西？', explain: '是譬喻：把小狗的毛比成一團棉花。' },
            { id: 'rh-si-y2', sentence: '小狗在院子裡玩。', answer: false, clue: '提示：這句話有沒有用「像」把東西比成別的東西？', explain: '不是譬喻：這句話只是說小狗在玩。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['白白的梨花像天上的雪。', '梨花開了。'], clue: '提示：哪一句用了「像」，把梨花比成別的東西？', explain: '「白白的梨花像天上的雪」是譬喻：把梨花比成雪。' },
            { id: 'rh-si-p2', options: ['雨滴像一顆顆小珍珠。', '外面在下雨。'], clue: '提示：哪一句把雨滴比成另一樣東西？', explain: '「雨滴像一顆顆小珍珠」是譬喻：把雨滴比成珍珠。' },
            { id: 'rh-si-p3', options: ['水梨甜得像糖果。', '水梨很好吃。', '水梨甜甜的。'], clue: '提示：哪一句用「像」把水梨的味道比成別的東西？', explain: '「水梨甜得像糖果」是譬喻：把水梨的甜比成糖果。' },
            { id: 'rh-si-p4', options: ['小雨傘像一頂頂小帽子。', '梨樹上有小雨傘。', '小雨傘綁在樹上。'], clue: '提示：哪一句把小雨傘比成另一樣東西？', explain: '「小雨傘像一頂頂小帽子」是譬喻：把小雨傘比成帽子。' },
            { id: 'rh-si-p5', options: ['弟弟的臉紅得像蘋果。', '弟弟的臉紅了。', '弟弟在吃蘋果。', '弟弟的臉紅紅的。'], clue: '提示：哪一句用「像」把弟弟的臉比成別的東西？', explain: '「弟弟的臉紅得像蘋果」是譬喻：把臉比成蘋果。' },
            { id: 'rh-si-p6', options: ['月亮像一個大圓盤。', '月亮出來了。', '月亮圓圓的。', '我在看月亮。'], clue: '提示：哪一句把月亮比成另一樣東西？', explain: '「月亮像一個大圓盤」是譬喻：把月亮比成圓盤。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「細雨綿綿」，把「綿」重複說。',
          show: { sentence: '水梨甜甜的，好好吃。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '梨花白白的，好漂亮。', answer: true, clue: '提示：這句話裡，有沒有同一個字連在一起？', explain: '是疊字：「白白」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '梨花是白色的。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['小雨下得細細的。', '下了一場小雨。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「細細」是疊字。' },
            { id: 'rh-re-p2', options: ['梨子圓圓的。', '梨子是圓形的。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「圓圓」是疊字。' },
            { id: 'rh-re-p3', options: ['梨農高高興興的採梨子。', '梨農在採梨子。', '梨子像一顆顆小燈泡。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「高高興興」是疊字。' },
            { id: 'rh-re-p4', options: ['梨子大大的，好重。', '梨子很重。', '梨子像一顆小球。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「大大」是疊字。' },
            { id: 'rh-re-p5', options: ['果園裡香香的。', '果園裡有梨子。', '梨樹像一把把大傘。', '梨樹在對我揮手。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「香香」是疊字。' },
            { id: 'rh-re-p6', options: ['小雨傘輕輕的搖。', '小雨傘在樹上。', '小雨傘像小帽子。', '小雨傘在跳舞。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「輕輕」是疊字。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '天上的白雲像一群綿羊。', answer: '譬喻', clue: '提示：有沒有用「像」把白雲比成別的東西？', explain: '答案是「譬喻」：把白雲比成綿羊。' },
        { id: 'rh2', sentence: '彩虹好像一座彎彎的橋。', answer: '譬喻', clue: '提示：有沒有用「好像」把彩虹比成別的東西？', explain: '答案是「譬喻」：把彩虹比成一座橋。' },
        { id: 'rh3', sentence: '草地綠綠的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「綠綠」是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '妹妹安安靜靜的看書。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「安安靜靜」是同一個字重複用。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L05 = d; }
})(this);

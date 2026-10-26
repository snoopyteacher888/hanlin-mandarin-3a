/* 第 4 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第一步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['師傅和徒弟康康', '老師和同學', '爸爸和媽媽', '醫生和護理師'], paras: [1], why: '這一課在說一位師傅，和跟著他學本領的徒弟康康。' },
      { id: 'wh-shi', key: '事', options: ['水滾了，師傅教康康從根本解決問題', '康康和朋友一起到河邊去釣魚', '師傅生病了，食堂只好關門休息', '康康不小心把鍋子打破了，被罵'], paras: [2, 3, 4], why: '鍋裡的水一直滾，師傅把柴火抽走，教康康要先找出問題真正的原因。' },
      { id: 'wh-time', key: '時', options: ['某一天的早上', '中秋節的晚上', '下雪的冬天', '半夜十二點'], paras: [2], why: '事情發生在某一天的早上，康康撿完柴回到食堂的時候。' },
      { id: 'wh-di', key: '地', options: ['山腳下的小食堂', '熱鬧的夜市裡', '學校的大教室', '海邊的沙灘上'], paras: [1], why: '師徒兩人在山腳下、樹林旁的一間小食堂工作。' },
      { id: 'wh-wu', key: '物', options: ['鍋子、熱水和木柴', '書包、課本和鉛筆', '風箏、氣球和彩帶', '雨傘、雨衣和雨鞋'], paras: [2, 3], why: '鍋子裡的熱水一直滾，鍋子下面燒著木柴。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'infer',
      qh: 'evaluate', qi: 'interpret', qj: 'interpret', k1: 'evaluate', k2: 'interpret' },
    /* 詮釋整合、比較評估的鷹架（老師要求：不能只給課文，要教孩子怎麼想、解釋為什麼選這個答案）：
       think 是提示裡「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ["水為什麼會一直滾？是因為鍋子下面的什麼？", "比一比：誰的方法有讓火變小？"], why: "水會滾，是因為下面的火很大。康康把水舀起來再倒回去，火還是一樣大，水很快又滾了。師傅把柴火拿出來，火變小了，水才真的不滾。" },
      qi: { think: ["康康的方法只處理了哪裡？師傅的方法處理了哪裡？", "哪一種方法才真的把問題解決？"], why: "康康只處理上面的水，問題一直沒有解決；師傅找到真正的原因是火太大，從根本下手，問題就解決了。所以處理問題要先找到根本的原因。" },
      qj: { think: ["拆開來看：「釜」是鍋子，「薪」是柴火，「抽」是拿出來。", "從鍋子下面把柴火拿出來，火會怎麼樣？水會怎麼樣？"], why: "釜底抽薪就是從鍋子底下把柴火拿掉。火變小，水自然就不滾了，這是從最根本的地方把問題解決。" }
    },
    /* 「說說看」改成選選看（老師要求：直接說太難）：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ["康康只是把水舀起來，師傅把鍋子下面的柴拿走。", "康康處理的是上面的水，師傅處理的是下面的火。"], bad: ["康康煮的是湯，師傅煮的是一大鍋好吃的麵。", "康康穿紅色的衣服，師傅穿白色的衣服和帽子。"], why: "比較兩個人的方法，要看他們處理的地方：康康只動了鍋子裡的水，師傅動的是讓水滾的火。煮什麼、穿什麼衣服，都不是方法的不一樣。" },
      k2: { good: ["我常常忘記帶水壺，後來前一天晚上就把水壺放在書包旁邊。", "我早上常常遲到，後來我提早一點睡覺，早上就起得來。"], bad: ["我常常忘記帶水壺，所以我每天都坐在教室裡難過的哭。", "我功課常常寫不完，所以我偷偷把作業本藏起來不交給老師。"], why: "合理的做法是先找到問題為什麼會發生，再從原因去改，像忘記帶就先放好、起不來就早點睡。哭、把作業藏起來，都沒有解決問題。" }
    },
    /* 理解提問錯的選項（老師要求：正確答案不要特別長，不然一看就猜到）。長度和正確答案差不多；正確答案還是在加密的課文檔裡。不放課文原句 */
    quizDistractors: {
      qc: ["鍋子的蓋子掉了", "風鈴被風吹走了", "師傅在門口睡著"],
      qd: ["把鍋子搬到門口吹風", "在鍋子裡加一些冰塊", "跑去山上撿更多木柴"],
      qe: ["鍋子裡的水太少了", "鍋子太小，裝不下", "康康舀得不夠快"],
      qf: ["他想趕快去外面和朋友一起玩耍", "他怕熱水太冷，客人吃了會不喜歡", "他不喜歡煮菜，想要早一點回家去"],
      qi: ["水滾了就要一直把水舀起來", "撿柴火比煮菜做飯還要重要", "遇到問題要趕快跑去躲起來"]
    },
    hanzi: [
      { id: 'h-冒', combo: {'type': '會意字', 'pict': '上面像一頂帽子，下面是「目」，就是眼睛。帽子戴在眼睛上面，後來有「往上、往外跑出來」的意思。'}, char: '冒', zhuyin: 'ㄇㄠˋ', radical: '冂', strokes: 9, words: ['冒出', '感冒'], say: '冒，冒出的冒', cloze: '＿出', img: 'steam-pot.png', options: ['冒', '帽', '胃', '買'], clue: '這個字的上面像一頂帽子，下面是「目」。', explain: '答案是「冒」；「帽」的左邊多了「巾」，「胃」的下面是「月」。', parts: ['冃', '目'], story: '上面像一頂帽子，下面是眼睛。東西從裡面往上、往外跑出來，就是「冒」，像熱湯冒出白煙。', sentence: '鍋子裡的水冒出好多泡泡。', build: { layout: 'tb', show: ['冃', '？'], answer: '目', options: ['目', '月', '口', '田'], clue: '想一想：帽子下面露出來的是什麼？' } },
      { id: 'h-傅', combo: {'layout': 'lr', 'parts': [['亻', 'm', '人'], ['尃', 's', '']]}, char: '傅', zhuyin: 'ㄈㄨˋ', radical: '人', strokes: 12, words: ['師傅', '修車師傅'], say: '傅，師傅的傅', cloze: '師＿', img: 'chef.png', options: ['傅', '傳', '博', '捕'], clue: '這個字的左邊是單人旁，右邊上面像「甫」。', explain: '答案是「傅」；「傳」是傳球的傳，右邊是「專」；「博」的左邊是「十」。', parts: ['亻', '尃'], story: '左邊是單人旁，右邊念起來有點像「傅」。有專門本領、可以教別人的人，就是「師傅」。', sentence: '麵店的師傅很會煮麵。', build: { layout: 'lr', show: ['？', '尃'], answer: '亻', options: ['亻', '十', '扌', '氵'], clue: '想一想：師傅是一個人，左邊放什麼？' } },
      { id: 'h-堂', combo: {'layout': 'tb', 'parts': [['尚', 's', ''], ['土', 'm', '土地']]}, char: '堂', zhuyin: 'ㄊㄤˊ', radical: '土', strokes: 11, words: ['食堂', '禮堂'], say: '堂，食堂的堂', cloze: '食＿', img: 'dining-hall.png', options: ['堂', '常', '當', '掌'], clue: '這個字的下面是「土」。', explain: '答案是「堂」，下面是「土」；「常」的下面是「巾」，「當」的下面是「田」，「掌」的下面是「手」。', parts: ['尚', '土'], story: '下面是「土」，很久以前的大房子要先用土堆出高高的地基。蓋在土上面、大家聚在一起的大房間，就是「堂」。', sentence: '全校同學到禮堂看表演。', build: { layout: 'tb', show: ['尚', '？'], answer: '土', options: ['土', '巾', '田', '手'], clue: '想一想：大房子要蓋在什麼上面？' } },
      { id: 'h-徒', combo: {'layout': 'lr', 'parts': [['彳', 'm', '走路'], ['走', 's', '']]}, char: '徒', zhuyin: 'ㄊㄨˊ', radical: '彳', strokes: 10, words: ['徒弟', '徒手'], say: '徒，徒弟的徒', cloze: '＿弟', img: 'master-apprentice.png', options: ['徒', '陡', '走', '徙'], clue: '這個字的左邊是雙人旁，右邊是「走」。', explain: '答案是「徒」；「陡」的左邊是耳朵旁，「走」沒有雙人旁。', parts: ['彳', '走'], story: '左邊是雙人旁，右邊是「走」，都跟走路有關。一直跟在師傅後面走、跟著學本領的人，就是「徒弟」。', sentence: '師傅教徒弟煮菜。', build: { layout: 'lr', show: ['？', '走'], answer: '彳', options: ['彳', '阝', '亻', '土'], clue: '想一想：這個字跟走路有關，左邊放哪一個？' } },
      { id: 'h-騰', combo: {'type': '形聲字', 'pict': '右下角是「馬」。馬兒跳起來、往上衝，就是「騰」。水滾的時候一直往上衝，也叫「沸騰」。'}, char: '騰', zhuyin: 'ㄊㄥˊ', radical: '馬', strokes: 20, words: ['沸騰', '奔騰'], say: '騰，沸騰的騰', cloze: '沸＿', img: 'boiling-water.png', options: ['騰', '勝', '藤', '謄'], clue: '這個字的右下角是「馬」。', explain: '答案是「騰」；「勝」的右下是「力」，「藤」的上面多了草字頭，「謄」的下面是「言」。', parts: ['月', '龹', '馬'], story: '右下角有一匹「馬」。馬兒跳起來往上衝，就是「騰」；水煮滾了，泡泡一直往上衝，就是「沸騰」。', sentence: '鍋裡的水沸騰了。' },
      { id: 'h-湯', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['昜', 's', '']]}, char: '湯', zhuyin: 'ㄊㄤ', radical: '水', strokes: 12, words: ['熱湯', '湯匙'], say: '湯，湯匙的湯', cloze: '＿匙', img: 'scoop-soup.png', options: ['湯', '場', '陽', '揚'], clue: '這個字的左邊是三點水。', explain: '答案是「湯」，左邊是三點水；「場」的左邊是「土」，「陽」的左邊是耳朵旁，「揚」的左邊是提手旁。', parts: ['氵', '昜'], story: '左邊是三點水，右邊的「昜」念起來像「湯」。煮得熱熱的、有很多水可以喝的，就是「湯」。', sentence: '媽媽煮了一鍋熱湯。', build: { layout: 'lr', show: ['？', '昜'], answer: '氵', options: ['氵', '土', '阝', '扌'], clue: '想一想：熱熱的湯，裡面有很多什麼？' } },
      { id: 'h-鈴', combo: {'layout': 'lr', 'parts': [['金', 'm', '金屬'], ['令', 's', '']]}, char: '鈴', zhuyin: 'ㄌㄧㄥˊ', radical: '金', strokes: 13, words: ['風鈴', '門鈴'], say: '鈴，風鈴的鈴', cloze: '風＿', img: 'wind-chime.png', options: ['鈴', '玲', '零', '領'], clue: '這個字的左邊是金字旁。', explain: '答案是「鈴」，左邊是「金」；「玲」的左邊是斜玉旁，「零」的上面是雨字頭，「領」的右邊是「頁」。', parts: ['金', '令'], story: '左邊是「金」，右邊的「令」念起來像「鈴」。用金屬做的、搖一搖會叮叮響的東西，就是「鈴」。', sentence: '叮咚！有人按門鈴。', build: { layout: 'lr', show: ['？', '令'], answer: '金', options: ['金', '王', '雨', '木'], clue: '想一想：會叮叮響的鈴，常常用什麼做的？' } },
      { id: 'h-鍋', combo: {'layout': 'lr', 'parts': [['金', 'm', '金屬'], ['咼', 's', '']]}, char: '鍋', zhuyin: 'ㄍㄨㄛ', radical: '金', strokes: 17, words: ['鍋子', '火鍋'], say: '鍋，鍋子的鍋', cloze: '＿子', img: 'pot.png', options: ['鍋', '過', '渦', '窩'], clue: '這個字的左邊是金字旁。', explain: '答案是「鍋」，左邊是「金」；「過」是走過去的過，「渦」的左邊是三點水，「窩」的上面是穴字頭。', parts: ['金', '咼'], story: '左邊是「金」，右邊的「咼」念起來像「鍋」。用金屬做的、放在火上煮東西的，就是「鍋」。', sentence: '冬天全家一起吃火鍋。', build: { layout: 'lr', show: ['？', '咼'], answer: '金', options: ['金', '氵', '木', '石'], clue: '想一想：鍋子放在火上燒也不會壞，是用什麼做的？' } },
      { id: 'h-撿', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['僉', 's', '']]}, char: '撿', zhuyin: 'ㄐㄧㄢˇ', radical: '手', strokes: 16, words: ['撿柴', '撿垃圾'], say: '撿，撿柴的撿', cloze: '＿柴', img: 'pick-firewood.png', options: ['撿', '檢', '儉', '臉'], clue: '這個字的左邊是提手旁。', explain: '答案是「撿」，左邊是提手旁；「檢」的左邊是「木」，「儉」的左邊是單人旁，「臉」的左邊是「月」。', parts: ['扌', '僉'], story: '左邊是提手旁，右邊念起來像「撿」。彎下腰，用手把地上的東西拿起來，就是「撿」。', sentence: '我們在公園撿垃圾。', build: { layout: 'lr', show: ['？', '僉'], answer: '扌', options: ['扌', '木', '亻', '月'], clue: '想一想：把東西拿起來要用什麼？' } },
      { id: 'h-解', combo: {'type': '會意字', 'pict': '左邊是「角」，右邊上面是「刀」，下面是「牛」。用刀把牛角和牛分開，就是「解」。後來把難題分開、處理好，也叫「解」。'}, char: '解', zhuyin: 'ㄐㄧㄝˇ', radical: '角', strokes: 13, words: ['解決', '了解'], say: '解，解決的解', cloze: '＿決', img: 'solve-problem.png', options: ['解', '角', '鮮', '用'], clue: '這個字的左邊是「角」，右邊有「刀」和「牛」。', explain: '答案是「解」；「角」只有左邊那一半，「鮮」的左邊是「魚」。', parts: ['角', '刀', '牛'], story: '左邊是「角」，右邊是「刀」和「牛」。用刀把牛角分開，就是「解」。把難題一點一點分開，想出辦法，就是「解決」。', sentence: '我們一起想辦法解決問題。' },
      { id: 'h-薪', combo: {'layout': 'tb', 'parts': [['艹', 'm', '草'], ['新', 's', '']]}, char: '薪', zhuyin: 'ㄒㄧㄣ', radical: '艸', strokes: 17, words: ['薪水', '釜底抽薪'], say: '薪，薪水的薪', cloze: '＿水', img: 'remove-firewood.png', options: ['薪', '新', '親', '欣'], clue: '這個字的上面是草字頭。', explain: '答案是「薪」，上面是草字頭；「新」沒有草字頭，「親」的右邊是「見」。', parts: ['艹', '新'], story: '上面是草字頭，下面的「新」念起來像「薪」。很久以前燒火用的草和樹枝，就叫「薪」，也就是柴。', sentence: '爸爸領到薪水了。', build: { layout: 'tb', show: ['？', '新'], answer: '艹', options: ['艹', '雨', '竹', '宀'], clue: '想一想：很久以前燒火用的是草和樹枝，上面放什麼？' } },
      { id: 'h-止', combo: {'type': '象形字', 'pict': '很久以前的「止」，是畫一隻腳。腳停在地上不動，就是「停止」。'}, char: '止', zhuyin: 'ㄓˇ', radical: '止', strokes: 4, words: ['停止', '禁止'], say: '止，停止的止', cloze: '停＿', img: 'stop-sign.png', options: ['止', '上', '正', '土'], clue: '這個字像一隻腳，比「上」的左邊多了一豎。', explain: '答案是「止」；「上」的左邊少了一豎，「正」的上面多了一橫。', parts: ['止'], story: '很久以前的「止」是畫一隻腳。腳停住不走了，就是「停止」。', sentence: '雨停止了，我們出去玩吧！' },
      { id: 'h-抽', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['由', 's', '']]}, char: '抽', zhuyin: 'ㄔㄡ', radical: '手', strokes: 8, words: ['抽出來', '抽屜'], say: '抽，抽出來的抽', cloze: '＿出來', img: 'pull-book.png', options: ['抽', '油', '袖', '笛'], clue: '這個字的左邊是提手旁。', explain: '答案是「抽」，左邊是提手旁；「油」的左邊是三點水，「袖」的左邊是衣字旁。', parts: ['扌', '由'], story: '左邊是提手旁，右邊的「由」念起來有點像「抽」。用手從一堆東西裡把一樣拉出來，就是「抽」。', sentence: '我把鉛筆放進抽屜裡。', build: { layout: 'lr', show: ['？', '由'], answer: '扌', options: ['扌', '氵', '衤', '木'], clue: '想一想：把東西拉出來要用什麼？' } },
      { id: 'h-揚', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['昜', 's', '']]}, char: '揚', zhuyin: 'ㄧㄤˊ', radical: '手', strokes: 12, words: ['飄揚', '表揚'], say: '揚，飄揚的揚', cloze: '飄＿', img: 'flag-wave.png', options: ['揚', '湯', '場', '陽'], clue: '這個字的左邊是提手旁。', explain: '答案是「揚」，左邊是提手旁；「湯」的左邊是三點水，「場」的左邊是「土」，「陽」的左邊是耳朵旁。', parts: ['扌', '昜'], story: '左邊是提手旁，右邊的「昜」念起來像「揚」。用手把東西往上舉高、往上丟，就是「揚」。', sentence: '國旗在風中飄揚。', build: { layout: 'lr', show: ['？', '昜'], answer: '扌', options: ['扌', '氵', '土', '阝'], clue: '想一想：把東西往上舉高，要用什麼？' } }
    ],
    vocab: [
      { id: 'v-食堂', word: '食堂', meaning: '大家一起吃飯的地方。', example: '中午，我們到學校的＿＿吃午餐。', img: 'dining-hall.png', options: ['食堂', '鍋子', '風鈴', '師傅'] },
      { id: 'v-風鈴', word: '風鈴', meaning: '掛在窗邊，風一吹就叮叮響的小東西。', example: '窗邊的＿＿被吹得叮叮噹噹。', img: 'wind-chime.png', options: ['風鈴', '鍋子', '食堂', '撿柴'] },
      { id: 'v-師徒', word: '師徒', meaning: '教本領的人，和跟著他學本領的人。', example: '這對＿＿一起做出一張漂亮的木椅。', img: 'master-apprentice.png', options: ['師徒', '食堂', '風鈴', '接待'] },
      { id: 'v-師傅', word: '師傅', meaning: '有專門本領的人，像很會煮菜、很會修東西的人。', example: '麵店的＿＿煮的牛肉麵好好吃。', img: 'chef.png', options: ['師傅', '師徒', '食堂', '鍋子'] },
      { id: 'v-撿柴', cloze: true, clozeOptions: ['撿柴', '游泳', '睡覺', '唱歌'], word: '撿柴', meaning: '到山上把樹枝一根一根拿回來，用來燒火。', example: '爺爺小時候，每天都要上山＿＿。', img: 'pick-firewood.png', options: ['撿柴', '接待', '沸騰', '解決'] },
      { id: 'v-鍋子', word: '鍋子', meaning: '放在火上煮東西用的器具。', example: '媽媽把麵放進＿＿裡煮。', img: 'pot.png', options: ['鍋子', '風鈴', '食堂', '師徒'] },
      { id: 'v-冒', cloze: true, clozeOptions: ['冒', '掉', '吃', '睡'], word: '冒', meaning: '從裡面往上、往外跑出來。', example: '熱湯一直＿出白白的煙。', img: 'steam-pot.png', options: ['冒', '舀', '抽', '撿柴'] },
      { id: 'v-舀', cloze: true, clozeOptions: ['舀', '踢', '跑', '唱'], word: '舀', meaning: '用湯匙或杓子把湯、水盛起來。', example: '我拿湯匙＿了一口湯。', img: 'scoop-soup.png', options: ['舀', '冒', '抽', '解決'] },
      { id: 'v-沸騰', cloze: true, clozeOptions: ['沸騰', '結冰', '變冷', '乾掉'], word: '沸騰', meaning: '水煮得很熱，一直冒出大泡泡。', example: '水煮到一百度就會＿＿，冒出大泡泡。', img: 'boiling-water.png', options: ['沸騰', '解決', '接待', '撿柴'] },
      { id: 'v-揚湯止沸', word: '揚湯止沸', meaning: '把滾水舀起來再倒回去，想讓水不滾；就是只處理表面，沒有解決真正的問題。', example: '只把玩具塞到床底下，就像＿＿＿＿，房間還是很亂。', img: 'scoop-boiling.png', options: ['揚湯止沸', '釜底抽薪', '沸騰', '接待'] },
      { id: 'v-抽', cloze: true, clozeOptions: ['抽', '吃', '喝', '跳'], word: '抽', meaning: '從一堆東西裡拉出一樣來。', example: '哥哥從書架上＿出一本故事書。', img: 'pull-book.png', options: ['抽', '舀', '冒', '師傅'] },
      { id: 'v-解決', cloze: true, clozeOptions: ['解決', '忘記', '弄丟', '吃掉'], word: '解決', meaning: '把問題處理好。', example: '我們一起想辦法，終於＿＿了這個問題。', img: 'solve-problem.png', options: ['解決', '接待', '沸騰', '撿柴'] },
      { id: 'v-釜底抽薪', word: '釜底抽薪', meaning: '把鍋子底下的柴抽走；就是找到問題真正的原因，從根本處理好。', example: '弟弟玩手機玩到忘了寫功課，媽媽乾脆把手機收起來，這就是＿＿＿＿。', img: 'remove-firewood.png', options: ['釜底抽薪', '揚湯止沸', '解決', '沸騰'] },
      { id: 'v-接待', cloze: true, clozeOptions: ['接待', '打掃', '收拾', '修理'], word: '接待', meaning: '在門口歡迎客人，好好照顧他們。', example: '叔叔站在門口，＿＿來參加生日會的客人。', img: 'welcome-guests.png', options: ['接待', '解決', '撿柴', '沸騰'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-冒', char: '冒', img: 'cw-cold.png', charMeaning: '從裡面往外跑出來；生病。', word: '感冒', meaning: '生病了，會咳嗽、流鼻水。', example: '天氣變冷，弟弟＿＿了。', options: ['感冒', '禮堂', '門鈴', '停止'] },
      { id: 'cw-傅', char: '傅', img: 'cw-mechanic.png', charMeaning: '有專門本領的人。', word: '修車師傅', meaning: '會修理汽車的人。', example: '車子壞了，＿＿＿＿幫我們修好了。', options: ['修車師傅', '撿垃圾', '感冒', '火鍋'] },
      { id: 'cw-堂', char: '堂', img: 'cw-auditorium.png', charMeaning: '大家聚在一起的大房間。', word: '禮堂', meaning: '學校裡可以開大會、看表演的大房間。', example: '全校的同學都到＿＿看表演。', options: ['禮堂', '抽屜', '薪水', '湯匙'] },
      { id: 'cw-徒', char: '徒', img: 'cw-catch-fish.png', charMeaning: '跟著學的人；空空的。', word: '徒手', meaning: '不用工具，只用手。', example: '他沒有用網子，＿＿抓到一條魚。', options: ['徒手', '表揚', '了解', '門鈴'] },
      { id: 'cw-騰', char: '騰', img: 'cw-horses.png', charMeaning: '跳起來、往上衝。', word: '奔騰', meaning: '像馬一樣很快的往前跑。', example: '一群馬在草原上＿＿。', options: ['奔騰', '停止', '感冒', '禮堂'] },
      { id: 'cw-湯', char: '湯', img: 'cw-spoon.png', charMeaning: '煮得熱熱的、可以喝的。', word: '湯匙', meaning: '喝湯、吃飯用的小杓子。', example: '我用＿＿喝玉米濃湯。', options: ['湯匙', '抽屜', '火鍋', '薪水'] },
      { id: 'cw-鈴', char: '鈴', img: 'cw-doorbell.png', charMeaning: '會叮叮響的東西。', word: '門鈴', meaning: '按了會響，告訴主人有人來了。', example: '叮咚！有人按＿＿了。', options: ['門鈴', '湯匙', '徒手', '了解'] },
      { id: 'cw-鍋', char: '鍋', img: 'cw-hotpot.png', charMeaning: '煮東西的器具。', word: '火鍋', meaning: '把湯放在桌上一邊煮一邊吃的料理。', example: '冬天好冷，全家一起吃＿＿。', options: ['火鍋', '禮堂', '表揚', '奔騰'] },
      { id: 'cw-撿', char: '撿', img: 'cw-pick-trash.png', charMeaning: '用手把東西拿起來。', word: '撿垃圾', meaning: '把地上的垃圾拿起來丟掉。', example: '我們在公園裡＿＿＿，讓公園變乾淨。', options: ['撿垃圾', '修車師傅', '湯匙', '停止'] },
      { id: 'cw-解', char: '解', img: 'cw-understand.png', charMeaning: '分開；弄清楚。', word: '了解', meaning: '知道得很清楚。', example: '聽完老師的說明，我終於＿＿這一題了。', options: ['了解', '門鈴', '奔騰', '火鍋'] },
      { id: 'cw-薪', char: '薪', img: 'cw-salary.png', charMeaning: '柴；工作賺的錢。', word: '薪水', meaning: '工作賺到的錢。', example: '爸爸領到＿＿，請全家吃大餐。', options: ['薪水', '感冒', '徒手', '抽屜'] },
      { id: 'cw-止', char: '止', img: 'cw-rain-stop.png', charMeaning: '停下來。', word: '停止', meaning: '不再繼續。', example: '雨＿＿了，我們出去玩吧！', options: ['停止', '了解', '禮堂', '湯匙'] },
      { id: 'cw-抽', char: '抽', img: 'cw-drawer.png', charMeaning: '從一堆東西裡拉出來。', word: '抽屜', meaning: '桌子裡可以拉出來放東西的小箱子。', example: '我把鉛筆放進＿＿裡。', options: ['抽屜', '薪水', '奔騰', '門鈴'] },
      { id: 'cw-揚', char: '揚', img: 'cw-praise.png', charMeaning: '往上舉；說出來讓大家知道。', word: '表揚', meaning: '在大家面前說他做得很好。', example: '他撿到錢交給老師，校長在朝會上＿＿他。', options: ['表揚', '火鍋', '徒手', '停止'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-打退堂鼓', situationImg: 'id-give-up.png', idiom: '打退堂鼓', char: '堂', meaning: '事情做到一半，害怕或嫌累，就不想做了。', example: '爬山爬到一半，弟弟喊累，想打退堂鼓。', situation: '小明報名了跑步比賽，可是才練習兩天，覺得太累，就跟老師說他不想參加了。',
        fill: { options: ['已經說好要一起表演，你可不要＿＿＿＿。', '他每天認真練習，最後得到第一名，真是＿＿＿＿。'], clue: '提示：哪一句是說事情做到一半就不想做了？', explain: '第一句用得對：說好要表演，就不要做到一半不做。認真練習得到第一名，剛好相反。' } },
      { id: 'i-骨瘦如柴', situationImg: 'id-thin-dog.png', idiom: '骨瘦如柴', char: '柴', meaning: '非常非常瘦，瘦得像乾乾的木柴。', example: '那隻流浪貓骨瘦如柴，我們趕快拿東西給牠吃。', situation: '路邊有一隻小狗，身體好瘦好瘦，看得到一根一根的骨頭。',
        fill: { options: ['他生病好久都吃不下飯，變得＿＿＿＿。', '他每天吃好多東西，胖得＿＿＿＿。'], clue: '提示：哪一句的人變得非常瘦？', explain: '第一句用得對：吃不下飯，變得好瘦。每天吃很多變胖，剛好相反。' } },
      { id: 'i-揚眉吐氣', situationImg: 'id-team-win.png', idiom: '揚眉吐氣', char: '揚', meaning: '以前一直輸、一直被看不起，現在終於成功了，心裡好痛快。', example: '我們班拔河輸了好多次，今天終於贏了，大家都揚眉吐氣。', situation: '小華的足球隊以前每一場都輸，今天終於贏了第一場，大家開心的大叫跳起來。',
        fill: { options: ['練習了好久，今天終於得到冠軍，大家都＿＿＿＿。', '他考試考不好，難過得＿＿＿＿，一句話都不想說。'], clue: '提示：哪一句是終於成功、心裡好痛快？', explain: '第一句用得對：終於得到冠軍，心裡好痛快。考不好很難過，剛好相反。' } },
      { id: 'i-適可而止', situationImg: 'id-stop-game.png', idiom: '適可而止', char: '止', meaning: '做到剛剛好就停下來，不要做得太過分。', example: '吃糖果要適可而止，吃太多牙齒會蛀掉。', situation: '哥哥玩電腦遊戲玩了一下子，媽媽說該休息了，哥哥就把電腦關掉，起來動一動。',
        fill: { options: ['看電視要＿＿＿＿，不然眼睛會累。', '他一直吃冰淇淋，吃了十碗還不停，真是＿＿＿＿。'], clue: '提示：哪一句是做到剛剛好就停下來？', explain: '第一句用得對：電視看一下就要停。吃了十碗還不停，剛好相反。' } },
      { id: 'i-一知半解', situationImg: 'id-half-know.png', idiom: '一知半解', char: '解', meaning: '只知道一點點，沒有真的弄懂。', example: '他對這個遊戲的規則一知半解，玩起來常常出錯。', situation: '小美只聽了一半就舉手說她會了，結果自己做的時候，一直做錯。',
        fill: { options: ['他只看了一點說明書，對這台機器還是＿＿＿＿。', '他把這本書讀了好多次，每一頁都懂了，真是＿＿＿＿。'], clue: '提示：哪一句的人只懂一點點？', explain: '第一句用得對：只看一點說明書，沒有真的弄懂。每一頁都懂了，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-冒', char: '冒', wrong: '帽', sentence: '鍋子裡的水冒出好多泡泡。', options: ['冒', '帽', '胃'], clue: '這裡是說往上跑出來，想一想，哪一個字的左邊沒有「巾」？', explain: '要改成「冒」。往上跑出來是「冒」；「帽」是帽子的帽，左邊有「巾」。' },
      { id: 'fx-傅', char: '傅', wrong: '傳', sentence: '麵店的師傅很會煮麵。', options: ['傅', '傳', '博'], clue: '這裡說的是有本領的人，想一想，哪一個字的右邊上面像「甫」？', explain: '要改成「傅」。有本領的人是「師傅」；「傳」是傳球的傳。' },
      { id: 'fx-堂', char: '堂', wrong: '常', sentence: '全校同學到禮堂看表演。', options: ['堂', '常', '當'], clue: '這裡說的是學校裡的大房間，想一想，哪一個字的下面是「土」？', explain: '要改成「堂」。學校的大房間是「禮堂」，下面是「土」；「常」的下面是「巾」。' },
      { id: 'fx-徒', char: '徒', wrong: '陡', sentence: '師傅教徒弟煮菜。', options: ['徒', '陡', '走'], clue: '這裡說的是跟著學本領的人，想一想，哪一個字的左邊是雙人旁？', explain: '要改成「徒」。跟著學本領的是「徒弟」，左邊是雙人旁；「陡」的左邊是耳朵旁。' },
      { id: 'fx-騰', char: '騰', wrong: '勝', sentence: '鍋裡的水沸騰了。', options: ['騰', '勝', '藤'], clue: '這裡是說水滾了，想一想，哪一個字的右下角是「馬」？', explain: '要改成「騰」。水滾了是「沸騰」，右下角是「馬」；「勝」的右下是「力」。' },
      { id: 'fx-湯', char: '湯', wrong: '場', sentence: '媽媽煮了一鍋熱湯。', options: ['湯', '場', '陽'], clue: '這裡說的是可以喝的，想一想，哪一個字的左邊是三點水？', explain: '要改成「湯」。可以喝的是「熱湯」，左邊是三點水；「場」的左邊是「土」。' },
      { id: 'fx-鈴', char: '鈴', wrong: '玲', sentence: '叮咚！有人按門鈴。', options: ['鈴', '玲', '零'], clue: '這裡說的是會響的東西，想一想，哪一個字的左邊是金字旁？', explain: '要改成「鈴」。會響的是「門鈴」，左邊是「金」；「玲」的左邊是斜玉旁。' },
      { id: 'fx-鍋', char: '鍋', wrong: '過', sentence: '冬天全家一起吃火鍋。', options: ['鍋', '過', '窩'], clue: '這裡說的是煮東西的器具，想一想，哪一個字的左邊是金字旁？', explain: '要改成「鍋」。煮東西的是「火鍋」，左邊是「金」；「過」是走過去的過。' },
      { id: 'fx-撿', char: '撿', wrong: '檢', sentence: '我們在公園撿垃圾。', options: ['撿', '檢', '臉'], clue: '這裡是說用手拿起來，想一想，哪一個字的左邊是提手旁？', explain: '要改成「撿」。用手拿起來是「撿」，左邊是提手旁；「檢」的左邊是「木」。' },
      { id: 'fx-解', char: '解', wrong: '角', sentence: '我們一起想辦法解決問題。', options: ['解', '角', '鮮'], clue: '這裡是說把問題處理好，想一想，哪一個字的右邊有「刀」和「牛」？', explain: '要改成「解」。把問題處理好是「解決」；「角」只有左邊那一半。' },
      { id: 'fx-薪', char: '薪', wrong: '新', sentence: '爸爸領到薪水了。', options: ['薪', '新', '親'], clue: '這裡說的是工作賺的錢，想一想，哪一個字的上面是草字頭？', explain: '要改成「薪」。工作賺的錢是「薪水」，上面是草字頭；「新」沒有草字頭。' },
      { id: 'fx-止', char: '止', wrong: '上', sentence: '雨停止了，我們出去玩吧！', options: ['止', '上', '正'], clue: '這裡是說不再繼續，想一想，哪一個字的左邊多了一豎？', explain: '要改成「止」。不再繼續是「停止」；「上」的左邊少了一豎。' },
      { id: 'fx-抽', char: '抽', wrong: '油', sentence: '我把鉛筆放進抽屜裡。', options: ['抽', '油', '袖'], clue: '這裡說的是桌子裡拉出來的小箱子，想一想，哪一個字的左邊是提手旁？', explain: '要改成「抽」。桌子裡的小箱子是「抽屜」，左邊是提手旁；「油」的左邊是三點水。' },
      { id: 'fx-揚', char: '揚', wrong: '湯', sentence: '國旗在風中飄揚。', options: ['揚', '湯', '陽'], clue: '這裡是說被風吹得高高的，想一想，哪一個字的左邊是提手旁？', explain: '要改成「揚」。被風吹得高高的是「飄揚」，左邊是提手旁；「湯」的左邊是三點水。' }
    ],
    similar: [
      { id: 's1', meaning: '「禮＿」是學校開大會、看表演的大房間。', sentence: '全校同學在禮＿看表演。', frame: '禮＿', options: ['堂', '常'], answer: '堂', clue: '提示：這個字的下面是「土」。', explain: '答案是「堂」；「常」是平常的常。' },
      { id: 's2', meaning: '「平＿」是一般的時候、每天都這樣。', sentence: '我平＿七點起床。', frame: '平＿', options: ['常', '堂'], answer: '常', clue: '提示：這句話在說每天都這樣，這個字的下面是「巾」。', explain: '答案是「常」；「堂」是禮堂的堂。' },
      { id: 's3', meaning: '「＿查」是仔細看一看有沒有問題。', sentence: '交作業前，先＿查一次。', frame: '＿查', options: ['檢', '撿'], answer: '檢', clue: '提示：這個字的左邊是「木」。', explain: '答案是「檢」；「撿」是撿東西的撿。' },
      { id: 's4', meaning: '「＿起來」是用手把東西拿起來。', sentence: '我把地上的紙屑＿起來。', frame: '＿起', options: ['撿', '檢'], answer: '撿', clue: '提示：要用手拿，這個字的左邊是提手旁。', explain: '答案是「撿」；「檢」是檢查的檢。' },
      { id: 's5', meaning: '「濃＿」是煮得很香、很濃，可以喝的。', sentence: '我最喜歡喝玉米濃＿。', frame: '濃＿', options: ['湯', '場'], answer: '湯', clue: '提示：可以喝的，這個字的左邊是三點水。', explain: '答案是「湯」；「場」是操場的場。' },
      { id: 's6', meaning: '「操＿」是學校裡可以跑步、玩耍的地方。', sentence: '下課了，大家到操＿玩。', frame: '操＿', options: ['場', '湯'], answer: '場', clue: '提示：這個字的左邊是「土」。', explain: '答案是「場」；「湯」是喝湯的湯。' },
      { id: 's7', meaning: '「＿光」是天上那顆大火球照下來的光。', sentence: '早上，＿光照進教室。', frame: '＿光', options: ['陽', '揚'], answer: '陽', clue: '提示：這個字的左邊是耳朵旁。', explain: '答案是「陽」；「揚」是飄揚的揚。' },
      { id: 's8', meaning: '「飄＿」是被風吹得高高的，飄來飄去。', sentence: '國旗在風中飄＿。', frame: '飄＿', options: ['揚', '陽'], answer: '揚', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「揚」；「陽」是太陽的陽。' },
      { id: 's9', meaning: '「＿用」是要花的錢。', sentence: '這次旅行的＿用是多少錢？', frame: '＿用', options: ['費', '沸'], answer: '費', clue: '提示：跟錢有關，這個字的下面是「貝」。', explain: '答案是「費」；「沸」是沸騰的沸。' },
      { id: 's10', meaning: '「煮＿」是把水煮到滾。', sentence: '水要煮＿了才可以喝。', frame: '煮＿', options: ['沸', '費'], answer: '沸', clue: '提示：跟水有關，這個字的左邊是三點水。', explain: '答案是「沸」；「費」是費用的費。' },
      { id: 's11', meaning: '「＿頭」是砍木頭的工具。', sentence: '工人用＿頭砍樹。', frame: '＿頭', options: ['斧', '釜'], answer: '斧', clue: '提示：這個字的下面是「斤」。', explain: '答案是「斧」；「釜」是很久以前的鍋子。' }
    ],
    listen: [
      { id: 'l1', text: '大家一起吃飯的地方，學校裡也有。', answer: 0, options: [{ text: '食堂', img: 'dining-hall.png' }, { text: '鍋子', img: 'pot.png' }, { text: '風鈴', img: 'wind-chime.png' }, { text: '師傅', img: 'chef.png' }] },
      { id: 'l2', text: '掛在窗邊，風一吹就叮叮噹噹的響。', answer: 0, options: [{ text: '風鈴', img: 'wind-chime.png' }, { text: '鍋子', img: 'pot.png' }, { text: '食堂', img: 'dining-hall.png' }, { text: '撿柴', img: 'pick-firewood.png' }] },
      { id: 'l3', text: '可以放在爐子上，用來煮湯、煮麵。', answer: 0, options: [{ text: '鍋子', img: 'pot.png' }, { text: '風鈴', img: 'wind-chime.png' }, { text: '食堂', img: 'dining-hall.png' }, { text: '師徒', img: 'master-apprentice.png' }] },
      { id: 'l4', text: '水煮得好熱，一直冒出大泡泡。', answer: 0, options: [{ text: '沸騰', img: 'boiling-water.png' }, { text: '解決', img: 'solve-problem.png' }, { text: '接待', img: 'welcome-guests.png' }, { text: '撿柴', img: 'pick-firewood.png' }] },
      { id: 'l5', text: '到山上撿樹枝，帶回家燒火。', answer: 0, options: [{ text: '撿柴', img: 'pick-firewood.png' }, { text: '接待', img: 'welcome-guests.png' }, { text: '沸騰', img: 'boiling-water.png' }, { text: '抽', img: 'pull-book.png' }] },
      { id: 'l6', text: '拿湯匙把碗裡的湯盛起來。', answer: 0, options: [{ text: '舀', img: 'scoop-soup.png' }, { text: '抽', img: 'pull-book.png' }, { text: '冒', img: 'steam-pot.png' }, { text: '撿柴', img: 'pick-firewood.png' }] },
      { id: 'l7', text: '客人來了，站在門口歡迎他們。', answer: 0, options: [{ text: '接待', img: 'welcome-guests.png' }, { text: '解決', img: 'solve-problem.png' }, { text: '撿柴', img: 'pick-firewood.png' }, { text: '沸騰', img: 'boiling-water.png' }] },
      { id: 'l8', text: '把鍋子下面的柴拿走，火變小了，水也不滾了。', answer: 0, options: [{ text: '釜底抽薪', img: 'remove-firewood.png' }, { text: '揚湯止沸', img: 'scoop-boiling.png' }, { text: '撿柴', img: 'pick-firewood.png' }, { text: '接待', img: 'welcome-guests.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語（短語一）每一格下面寫要放什麼樣的詞（老師要求） */
      fillLabels: {"before": "誰做什麼", "answer": "什麼樣子（疊字）", "noun": "什麼地方"},
      pickName: '看圖選疊字', pickSay: '看圖，選出最適合的疊字。',
      /* 短語一：疊字＋的＋什麼地方＋方位詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '軟軟的沙發上', img: 'pr-sofa.png',
        parts: [{ text: '軟軟', role: '什麼樣子（疊字）' }, { text: '的' }, { text: '沙發', role: '什麼地方' }, { text: '上', role: '方位' }],
        explain: '先用疊字說這個地方是什麼樣子，加上「的」，再說是什麼地方，最後加上「上、下、裡、旁」這些說位置的字。' },
      pick: [
        { id: 'ph1', img: 'pr-sofa.png', before: '小貓躺在', noun: '沙發上', ask: '小貓躺在什麼樣的沙發上', look: '再看看圖片，小貓躺下去，沙發陷下去了嗎？', options: ['軟軟', '尖尖', '冰冰', '甜甜'], clue: '提示：小貓一躺下去，沙發就陷下去了，好舒服。', explain: '答案是「軟軟」，沙發坐起來很軟，所以說「小貓躺在軟軟的沙發上」。' },
        { id: 'ph2', img: 'pr-cave.png', before: '探險隊走進', noun: '山洞裡', ask: '探險隊走進什麼樣的山洞裡', look: '再看看圖片，山洞裡亮不亮？', options: ['黑黑', '白白', '甜甜', '軟軟'], clue: '提示：山洞裡沒有燈，大家都要拿手電筒。', explain: '答案是「黑黑」，山洞裡很暗，所以說「探險隊走進黑黑的山洞裡」。' },
        { id: 'ph3', img: 'pr-peak.png', before: '登山客站在', noun: '山頂上', ask: '登山客站在什麼樣的山頂上', look: '再看看圖片，這座山高不高？', options: ['高高', '甜甜', '軟軟', '濕濕'], clue: '提示：站在山頂上，可以看到底下好小好小的房子。', explain: '答案是「高高」，山很高，所以說「登山客站在高高的山頂上」。' },
        { id: 'ph4', img: 'pr-clear-river.png', before: '小魚游在', noun: '河水中', ask: '小魚游在什麼樣的河水中', look: '再看看圖片，看得到河底的石頭嗎？', options: ['清清', '甜甜', '熱熱', '軟軟'], clue: '提示：河水很乾淨，看得到底下的石頭。', explain: '答案是「清清」，河水很乾淨，所以說「小魚游在清清的河水中」。' },
        { id: 'ph5', img: 'pr-grass.png', before: '蚱蜢躲在', noun: '草叢裡', ask: '蚱蜢躲在什麼樣的草叢裡', look: '再看看圖片，草叢是什麼顏色？', options: ['綠綠', '紅紅', '白白', '藍藍'], clue: '提示：草叢是青草長成的，和蚱蜢的顏色一樣。', explain: '答案是「綠綠」，草叢是綠色的，所以說「蚱蜢躲在綠綠的草叢裡」。' },
        { id: 'ph6', img: 'pr-fridge.png', before: '果汁放在', noun: '冰箱裡', ask: '果汁放在什麼樣的冰箱裡', look: '再看看圖片，冰箱打開時會冒出什麼？', options: ['冰冰', '熱熱', '軟軟', '甜甜'], clue: '提示：打開冰箱，有涼涼的冷氣跑出來。', explain: '答案是「冰冰」，冰箱裡很冷，所以說「果汁放在冰冰的冰箱裡」。' }
      ],
      say: [],
      /* 第二個短語：做什麼＋怎麼樣＋的＋誰（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '安慰哭泣的妹妹', img: 'pz-comfort.png',
          parts: [{ text: '安慰', role: '做什麼' }, { text: '哭泣', role: '怎麼樣' }, { text: '的' }, { text: '妹妹', role: '誰' }],
          explain: '先說做什麼事，再說這個人怎麼了，加上「的」，最後說是誰。' },
        pick: [
        { id: 'p2-pz1', img: 'pz-help-up.png', before: '扶起', join: '', noun: '的小朋友', ask: '扶起什麼的小朋友', look: '再看看圖片，想一想哪一個放進去最合適？', options: ["跌倒", "唱歌", "吃飽", "開心"], clue: '提示：小朋友摔在地上，需要人扶。', explain: '答案是「跌倒」，完整的短語是「扶起跌倒的小朋友」。' },
        { id: 'p2-pz2', img: 'pz-feed-cat.png', before: '餵飽', join: '', noun: '的小貓', ask: '餵飽什麼的小貓', look: '再看看圖片，想一想哪一個放進去最合適？', options: ["肚子餓", "吃很飽", "愛唱歌", "很乾淨"], clue: '提示：小貓好久沒吃東西了。', explain: '答案是「肚子餓」，完整的短語是「餵飽肚子餓的小貓」。' },
        { id: 'p2-pz3', img: 'pz-wake-dad.png', before: '叫醒', join: '', noun: '的爸爸', ask: '叫醒什麼的爸爸', look: '再看看圖片，想一想哪一個放進去最合適？', options: ["睡著", "醒著", "唱歌", "吃飯"], clue: '提示：爸爸閉上眼睛，還躺在床上休息。', explain: '答案是「睡著」，完整的短語是「叫醒睡著的爸爸」。' },
        { id: 'p2-pz4', img: 'pz-lost-grandma.png', before: '幫助', join: '', noun: '的奶奶', ask: '幫助什麼的奶奶', look: '再看看圖片，想一想哪一個放進去最合適？', options: ["迷路", "跳舞", "唱歌", "睡覺"], clue: '提示：奶奶找不到回家的方向。', explain: '答案是「迷路」，完整的短語是「幫助迷路的奶奶」。' },
        { id: 'p2-pz5', img: 'pz-cheer-runner.png', before: '鼓勵', join: '', noun: '的哥哥', ask: '鼓勵什麼的哥哥', look: '再看看圖片，想一想哪一個放進去最合適？', options: ["累壞", "睡著", "吃飯", "洗澡"], clue: '提示：哥哥滿頭大汗，快要跑不動了。', explain: '答案是「累壞」，完整的短語是「鼓勵累壞的哥哥」。' }
      ],
      fill: [
          { id: 'pz1', img: 'pz-help-up.png', parts: ['扶起', '跌倒', '的', '小朋友'] },
          { id: 'pz2', img: 'pz-feed-cat.png', parts: ['餵飽', '肚子餓', '的', '小貓'] },
          { id: 'pz3', img: 'pz-wake-dad.png', parts: ['叫醒', '睡著', '的', '爸爸'] },
          { id: 'pz4', img: 'pz-lost-grandma.png', parts: ['幫助', '迷路', '的', '奶奶'] },
          { id: 'pz5', img: 'pz-cheer-runner.png', parts: ['鼓勵', '累壞', '的', '哥哥'] }
        ]
      },
      words: [
        { word: '接待', meaning: '在門口歡迎客人，好好照顧他們。', img: 'welcome-guests.png' },
        { word: '解決', meaning: '把問題處理好。', img: 'solve-problem.png' }
      ],
      choose: [
        { id: 'pw1', word: '接待', options: ['客人來了，媽媽在門口接待他們。', '我自己在房間裡接待功課。'], clue: '提示：想一想，「接待」的對象是人，還是東西？', explain: '第一句用得對：接待的是來家裡的客人。功課不是客人，不能說接待功課。' },
        { id: 'pw2', word: '解決', options: ['我們一起想辦法，解決了吵架的問題。', '我把蛋糕解決了，變成一個大蛋糕。'], clue: '提示：想一想，「解決」是把什麼處理好？', explain: '第一句用得對：解決的是問題。蛋糕變成大蛋糕，不是解決問題。' }
      ],
      make: [
        { id: 'pm1', word: '接待', clue: '提示：想想看，家裡有客人來的時候，誰在門口歡迎他們？', model: '奶奶笑咪咪的接待來家裡玩的親戚。' },
        { id: 'pm2', word: '解決', clue: '提示：想想看，你遇過什麼問題，後來怎麼處理好？', model: '鉛筆斷了，我用削鉛筆機解決了問題。' }
      ]
    },
    pattern: [
      { key: 'dang', id: 'dg', title: '當……，……', img: 'dang.png',
        meaning: '「當」後面先說一件事，接著再說後面跟著發生的事。',
        examples: ['當鬧鐘響起，我馬上起床刷牙。'],
        match: [
          { id: 'pt-dg-m1', img: 'pt-green-walk.png', front: '當綠燈亮起，', options: ['行人開始過馬路。', '行人開始游泳。', '汽車飛上天。'], clue: '提示：看看圖片，綠燈亮了，路口的人做什麼？', explain: '答案是「行人開始過馬路」：綠燈亮了，接著行人過馬路。' },
          { id: 'pt-dg-m2', img: 'pt-dog-greet.png', front: '當媽媽打開家門，', options: ['小狗高興的跑過去。', '小狗變成了小貓。', '門變成了窗戶。'], clue: '提示：看看圖片，媽媽回家了，小狗怎麼做？', explain: '答案是「小狗高興的跑過去」：門打開了，接著小狗跑過去。' },
          { id: 'pt-dg-m3', img: 'pt-sunset-dark.png', front: '當太陽下山，', options: ['天空慢慢變暗了。', '天空變成綠色的。', '月亮掉進海裡。'], clue: '提示：太陽不見了，天空會變得怎麼樣？', explain: '答案是「天空慢慢變暗了」：太陽下山，接著天空變暗。' }
        ],
        conj: [
          { id: 'pt-dg-c1', full: '當老師走進教室，大家馬上安靜下來。', img: 'pt-teacher-enter.png', sentence: '＿老師走進教室，大家馬上安靜下來。', options: ['當……，……', '……，可是……', '因為……所以……'], clue: '提示：先發生一件事，接著發生另一件事。數數看有幾個空格。', explain: '答案是「當……，……」：當老師走進教室，大家馬上安靜下來。' },
          { id: 'pt-dg-c2', full: '當雨停了，彩虹出現在天空。', img: 'pt-rainbow-sky.png', sentence: '＿雨停了，彩虹出現在天空。', options: ['當……，……', '……，可是……', '因為……所以……'], clue: '提示：雨停了以後，接著出現什麼？數數看有幾個空格。', explain: '答案是「當……，……」：當雨停了，彩虹出現在天空。' },
          { id: 'pt-dg-c3', full: '當我說完故事，大家都拍手。', img: 'pt-story-clap.png', sentence: '＿我說完故事，大家都拍手。', options: ['當……，……', '……，可是……', '因為……所以……'], clue: '提示：故事說完以後，接著大家做什麼？數數看有幾個空格。', explain: '答案是「當……，……」：當我說完故事，大家都拍手。' }
        ],
        half: [
          { id: 'pt-dg-h1', front: '當我回到家，', clue: '提示：回到家以後，接著發生什麼事？', model: '媽媽已經煮好晚餐了。' },
          { id: 'pt-dg-h2', front: '當鬧鐘響了，', clue: '提示：鬧鐘響了，接著你會做什麼？', model: '我就趕快起床。' }
        ],
        whole: [
          { id: 'pt-dg-w1', clue: '提示：先用「當」說一件事，再說接著發生的事。想想看：下課鐘響了以後，你做什麼？', model: '當下課鐘響了，我和同學去盪鞦韆。' }
        ] },
      { key: 'keshi', id: 'ks', title: '……，可是……', img: 'keshi.png',
        meaning: '前面說做了什麼事，「可是」後面說結果跟想的不一樣。',
        examples: ['我很早就出門，可是公車還是開走了。'],
        match: [
          { id: 'pt-ks-m1', img: 'pt-search-pencil.png', front: '我找了好久，', options: ['可是還是找不到鉛筆。', '可是我變成了大象。', '可是鉛筆會唱歌。'], clue: '提示：看看圖片，找了好久，找到了嗎？', explain: '答案是「可是還是找不到鉛筆」：找了好久，結果還是找不到。' },
          { id: 'pt-ks-m2', img: 'pt-balloon-pop.png', front: '弟弟一直吹氣球，', options: ['可是氣球破掉了。', '可是氣球變成西瓜。', '可是天空下起糖果。'], clue: '提示：看看圖片，氣球吹太大會怎麼樣？', explain: '答案是「可是氣球破掉了」：一直吹，結果氣球破了。' },
          { id: 'pt-ks-m3', img: 'pt-push-door.png', front: '我很用力的推門，', options: ['可是門還是打不開。', '可是門飛走了。', '可是我長出翅膀。'], clue: '提示：看看圖片，門打開了嗎？', explain: '答案是「可是門還是打不開」：很用力推，結果門還是不開。' }
        ],
        conj: [
          { id: 'pt-ks-c1', full: '我用力踢球，可是球沒有進門。', img: 'pt-kick-miss.png', sentence: '我用力踢球，＿＿球沒有進門。', options: ['……，可是……', '當……，……', '因為……所以……'], clue: '提示：踢了球，結果跟想的不一樣。數數看有幾個空格。', explain: '答案是「……，可是……」：我用力踢球，可是球沒有進門。' },
          { id: 'pt-ks-c2', full: '妹妹練習了好久，可是還是不會翻跟斗。', img: 'pt-somersault.png', sentence: '妹妹練習了好久，＿＿還是不會翻跟斗。', options: ['……，可是……', '當……，……', '因為……所以……'], clue: '提示：練習了好久，結果跟想的不一樣。數數看有幾個空格。', explain: '答案是「……，可是……」：妹妹練習了好久，可是還是不會翻跟斗。' },
          { id: 'pt-ks-c3', full: '我把手洗了三次，可是手上還是黑黑的。', img: 'pt-dirty-hands.png', sentence: '我把手洗了三次，＿＿手上還是黑黑的。', options: ['……，可是……', '當……，……', '因為……所以……'], clue: '提示：洗了三次，結果跟想的不一樣。數數看有幾個空格。', explain: '答案是「……，可是……」：我把手洗了三次，可是手上還是黑黑的。' }
        ],
        half: [
          { id: 'pt-ks-h1', front: '我每天都幫花澆水，', clue: '提示：每天澆水，結果卻跟你想的不一樣？記得要說「可是」。', model: '可是花還是沒有開。' },
          { id: 'pt-ks-h2', front: '我很早就上床睡覺，', clue: '提示：很早就睡，結果卻跟你想的不一樣？記得要說「可是」。', model: '可是早上還是起不來。' }
        ],
        whole: [
          { id: 'pt-ks-w1', clue: '提示：先說你做了什麼，再用「可是」說結果跟想的不一樣。想想看：你很努力做一件事，結果怎麼了？', model: '我認真練習跳繩，可是還是跳不到一百下。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'personify', name: '擬人', meaning: '把東西寫得像人一樣，會唱歌、會笑、會說話。', example: '課文裡，風鈴的聲音好像在「招呼」遠方的客人，就像人在打招呼。',
          show: { sentence: '月亮躲在雲後面，偷偷的看著我。', mark: ['躲在雲後面', '偷偷的看著我'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '水壺生氣的嗚嗚大叫。', answer: true, mark: ['生氣的'], clue: '提示：水壺會不會生氣？', explain: '是擬人：水壺不會生氣，把它寫得像人一樣。' },
            { id: 'rh-pe-y2', sentence: '水壺裡的水煮開了。', answer: false, clue: '提示：這句話裡的水壺，有沒有做人才會做的事？', explain: '不是擬人：這句話只是說水煮開了。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['點點頭'], options: ['小草在風中點點頭。', '小草被風吹得歪歪的。'], clue: '提示：哪一句的小草，做了人才會做的事？', explain: '「小草點點頭」是擬人：小草不會點頭。' },
            { id: 'rh-pe-p2', mark: ['開心的跳著舞'], options: ['鍋裡的湯開心的跳著舞。', '鍋裡的湯煮開了。'], clue: '提示：湯會不會開心、會不會跳舞？', explain: '「湯開心的跳著舞」是擬人：湯不會跳舞。' },
            { id: 'rh-pe-p3', mark: ['對我眨眼睛'], options: ['星星對我眨眼睛。', '天上有好多星星。', '星星亮得像鑽石。'], clue: '提示：星星有沒有眼睛？', explain: '「星星對我眨眼睛」是擬人：星星沒有眼睛。' },
            { id: 'rh-pe-p4', mark: ['唱著歌'], options: ['爐子裡的柴火唱著歌。', '爐子裡的柴火燒得好旺。', '柴火紅得像太陽。'], clue: '提示：哪一句的柴火，像人一樣在做事？', explain: '「柴火唱著歌」是擬人：柴火不會唱歌。' },
            { id: 'rh-pe-p5', mark: ['跟我說悄悄話'], options: ['風鈴在窗邊跟我說悄悄話。', '風鈴掛在窗邊。', '風鈴響得像小鈴鐺。', '風鈴叮叮的響著。'], clue: '提示：風鈴會不會說話？', explain: '「風鈴跟我說悄悄話」是擬人：風鈴不會說話。' },
            { id: 'rh-pe-p6', mark: ['笑著跟我們揮手'], options: ['太陽笑著跟我們揮手。', '太陽出來了。', '太陽圓得像一顆球。', '太陽紅紅的。'], clue: '提示：太陽有沒有手？', explain: '「太陽笑著跟我們揮手」是擬人：太陽沒有手。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「靜靜的」山腳下。',
          show: { sentence: '小貓輕輕的走過來。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '奶奶的頭髮白白的。', answer: true, clue: '提示：這句話裡，有沒有同一個字連在一起？', explain: '是疊字：「白白」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '奶奶的頭髮是白色的。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['鍋子熱熱的，不要摸。', '鍋子很燙，不要摸。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「熱熱」是疊字。' },
            { id: 'rh-re-p2', options: ['小溪的水清清的。', '小溪的水很乾淨。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「清清」是疊字。' },
            { id: 'rh-re-p3', options: ['康康慢慢的走回來。', '康康走回來了。', '康康走得像烏龜。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「慢慢」是疊字。' },
            { id: 'rh-re-p4', options: ['樹林綠綠的，好漂亮。', '樹林很漂亮。', '樹林像一片大海。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「綠綠」是疊字。' },
            { id: 'rh-re-p5', options: ['大家高高興興的吃飯。', '大家一起吃飯。', '飯菜像一座小山。', '飯菜在對我招手。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「高高興興」是疊字。' },
            { id: 'rh-re-p6', options: ['爐子裡的火紅紅的。', '爐子裡有火。', '火像一條紅色的龍。', '火在跳舞。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「紅紅」是疊字。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '月亮躲在雲後面睡覺。', answer: '擬人', clue: '提示：月亮會不會睡覺？', explain: '答案是「擬人」：月亮不會睡覺，把它寫得像人一樣。' },
        { id: 'rh2', sentence: '花兒對著我微笑。', answer: '擬人', clue: '提示：花會不會笑？', explain: '答案是「擬人」：花不會笑，把它寫得像人一樣。' },
        { id: 'rh3', sentence: '湖水藍藍的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「藍藍」是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '他把房間打掃得乾乾淨淨。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「乾乾淨淨」是同一個字重複用。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L04 = d; }
})(this);

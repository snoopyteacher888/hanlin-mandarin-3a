/* 第 8 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第二步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['寄居蟹、小螃蟹、美美、友友和志工', '小狗、小貓、老師', '海龜、漁夫', '爸爸、媽媽、哥哥'], paras: [1, 2], why: '劇本每一幕前面都有寫出角色，有兩隻小動物、兩個小朋友，還有淨灘的志工。' },
      { id: 'wh-shi', key: '事', options: ['寄居蟹找不到殼，只好住在瓶蓋裡', '寄居蟹搬進一個漂亮的大貝殼', '小螃蟹去山上找朋友', '友友和美美在海邊游泳'], paras: [1], why: '海灘上的貝殼被人撿光了，寄居蟹沒有新家，只能躲進瓶蓋。' },
      { id: 'wh-time', key: '時', options: ['夜晚和白天', '中秋節', '下大雪的冬天', '放學的時候'], paras: [1, 2], why: '第一幕的時間是夜晚，第二幕、第三幕的時間是白天。' },
      { id: 'wh-di', key: '地', options: ['海灘', '森林', '學校', '動物園'], paras: [1, 2], why: '劇本每一幕的地點都在海灘。' },
      { id: 'wh-wu', key: '物', options: ['紙杯、瓶蓋、寶特瓶', '書包、鉛筆', '風箏、皮球', '雨傘、雨鞋'], paras: [1, 2], why: '小螃蟹被紙杯卡住，寄居蟹住在瓶蓋裡，海上漂來好多寶特瓶。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qe: 'extract', qf: 'extract', qj: 'extract', qc: 'infer', qd: 'infer', qh: 'infer',
      qg: 'interpret', qi: 'interpret', k2: 'interpret', k1: 'evaluate' },
    hanzi: [
      { id: 'h-寄', combo: {'layout': 'tb', 'parts': [['宀', 'm', '房子'], ['奇', 's', '']]}, char: '寄', zhuyin: 'ㄐㄧˋ', radical: '宀', strokes: 11, words: ['寄居蟹', '寄信'], say: '寄，寄信的寄', cloze: '＿信', img: 'hermit-crab.png', options: ['寄', '奇', '騎', '計'], clue: '這個字的上面，像房子的屋頂。', explain: '答案是「寄」，上面是「宀」，像房子；「騎」是騎車的騎，左邊是「馬」。', parts: ['宀', '奇'], story: '上面的「宀」像房子，下面的「奇」念起來很像「寄」。住在別人的房子裡，就是「寄」；把信交給郵差送出去，也叫「寄」。', sentence: '我把卡片寄給外婆。', build: { layout: 'tb', show: ['？', '奇'], answer: '宀', options: ['宀', '艹', '竹', '雨'], clue: '想一想：寄居蟹住在別人的家裡，家是什麼樣子？' } },
      { id: 'h-居', combo: {'layout': 'tb', 'parts': [['尸', 'm', '人坐著'], ['古', 'p', '']]}, char: '居', zhuyin: 'ㄐㄩ', radical: '尸', strokes: 8, words: ['寄居蟹', '鄰居', '居住'], say: '居，鄰居的居', cloze: '鄰＿', img: 'hermit-crab.png', options: ['居', '局', '句', '據'], clue: '這個字的外面，像一個人坐著。', explain: '答案是「居」，外面是「尸」，裡面是「古」；「局」的裡面是「句」的樣子。', parts: ['尸', '古'], story: '「尸」像一個人坐著，下面是「古」。一直坐在、住在同一個地方，就是「居」。', sentence: '隔壁的鄰居很親切。' },
      { id: 'h-幕', combo: {'layout': 'tb', 'parts': [['莫', 's', ''], ['巾', 'm', '布']]}, char: '幕', zhuyin: 'ㄇㄨˋ', radical: '巾', strokes: 14, words: ['第一幕', '布幕', '螢幕'], say: '幕，布幕的幕', cloze: '布＿', img: 'stage-curtain.png', options: ['幕', '慕', '暮', '莫'], clue: '這個字跟布有關。', explain: '答案是「幕」，下面是「巾」，就是布；「慕」是羨慕的慕，下面是「心」的變形。', parts: ['莫', '巾'], story: '上面的「莫」念起來很像「幕」，下面的「巾」是一塊布。舞臺上一大塊布，就是「幕」。', sentence: '表演開始了，布幕慢慢拉開。', build: { layout: 'tb', show: ['莫', '？'], answer: '巾', options: ['巾', '心', '土', '日'], clue: '想一想：舞臺上拉開、拉上的東西，是用什麼做的？' } },
      { id: 'h-殼', combo: {'type': '會意字', 'pict': '左邊像一個硬硬的外殼，右邊的「殳」像手拿著東西敲。敲一敲，硬硬的外皮就是「殼」。'}, char: '殼', zhuyin: 'ㄎㄜˊ', radical: '殳', strokes: 12, words: ['貝殼', '蛋殼'], say: '殼，貝殼的殼', cloze: '貝＿', img: 'shell.png', options: ['殼', '穀', '設', '般'], clue: '這個字是包在外面、硬硬的一層。', explain: '答案是「殼」；「穀」是稻穀的穀，下面有「禾」。', parts: ['殼的左邊', '殳'], story: '左邊像一個硬硬的外殼，右邊的「殳」像手拿著東西敲。包在外面、硬硬的那一層，就是「殼」。', sentence: '蝸牛背著硬硬的殼。' },
      { id: 'h-類', combo: {'layout': 'lr', 'parts': [['米和犬', 'p', ''], ['頁', 'm', '頭']]}, char: '類', zhuyin: 'ㄌㄟˋ', radical: '頁', strokes: 19, words: ['人類', '分類'], say: '類，人類的類', cloze: '人＿', img: 'people.png', options: ['類', '顏', '顧', '煩'], clue: '這個字的左邊，上面是「米」，下面是「犬」。', explain: '答案是「類」，左邊是「米」和「犬」；「顏」是顏色的顏，左邊是「彥」。', parts: ['米', '犬', '頁'], story: '左邊上面是「米」，下面是「犬」，右邊是「頁」。米粒長得都一樣，一樣的東西放在一起，就是同一「類」。', sentence: '我們把垃圾分類，再丟進回收桶。' },
      { id: 'h-瓶', combo: {'layout': 'lr', 'parts': [['并', 's', ''], ['瓦', 'm', '陶土做的器具']]}, char: '瓶', zhuyin: 'ㄆㄧㄥˊ', radical: '瓦', strokes: 11, words: ['瓶蓋', '花瓶'], say: '瓶，瓶子的瓶', cloze: '＿蓋', img: 'bottle-cap.png', options: ['瓶', '平', '拼', '餅'], clue: '這個字跟陶土做的器具有關。', explain: '答案是「瓶」，右邊是「瓦」；「拼」是拼圖的拼，左邊是提手旁。', parts: ['并', '瓦'], story: '左邊的「并」念起來很像「瓶」，右邊的「瓦」是用陶土燒成的東西。以前的瓶子是陶土做的，所以有「瓦」。', sentence: '媽媽把花插在花瓶裡。', build: { layout: 'lr', show: ['并', '？'], answer: '瓦', options: ['瓦', '皿', '木', '金'] } },
      { id: 'h-蓋', combo: {'layout': 'tb', 'parts': [['艹', 'm', '草'], ['盍', 's', '']]}, char: '蓋', zhuyin: 'ㄍㄞˋ', radical: '艸', strokes: 14, words: ['瓶蓋', '蓋房子'], say: '蓋，瓶蓋的蓋', cloze: '瓶＿', img: 'bottle-cap.png', options: ['蓋', '益', '盒', '盆'], clue: '這個字的上面，是草字頭。', explain: '答案是「蓋」，上面是草字頭；「盒」是盒子的盒，上面是「合」。', parts: ['艹', '盍'], story: '上面是草字頭，很久以前的人用草蓋在屋頂上。把東西蓋在上面、遮起來，就是「蓋」。', sentence: '工人在蓋新的房子。', build: { layout: 'tb', show: ['？', '盍'], answer: '艹', options: ['艹', '竹', '雨', '宀'], clue: '想一想：很久以前，人們用什麼植物蓋在屋頂上？' } },
      { id: 'h-淨', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['爭', 's', '']]}, char: '淨', zhuyin: 'ㄐㄧㄥˋ', radical: '水', strokes: 11, words: ['淨灘', '乾淨'], say: '淨，乾淨的淨', cloze: '乾＿', img: 'beach-clean.png', options: ['淨', '靜', '爭', '睜'], clue: '這個字跟水有關。', explain: '答案是「淨」，左邊是三點水；「靜」是安靜的靜，左邊是「青」。', parts: ['氵', '爭'], story: '左邊是三點水，右邊的「爭」念起來很像「淨」。用水洗一洗，東西就乾淨了。', sentence: '洗過的碗很乾淨。', build: { layout: 'lr', show: ['？', '爭'], answer: '氵', options: ['氵', '青', '扌', '目'] } },
      { id: 'h-志', combo: {'layout': 'tb', 'parts': [['士', 's', ''], ['心', 'm', '心裡想的']]}, char: '志', zhuyin: 'ㄓˋ', radical: '心', strokes: 7, words: ['志工', '志向'], say: '志，志工的志', cloze: '＿工', img: 'volunteer.png', options: ['志', '忘', '怎', '誌'], clue: '這個字的上面是「士」。', explain: '答案是「志」，上面是「士」；「忘」是忘記的忘，上面是「亡」。', parts: ['士', '心'], story: '上面的「士」念起來很像「志」，下面是「心」。心裡很想做的事，就是「志」。', sentence: '他的志向是當醫生。', build: { layout: 'tb', show: ['士', '？'], answer: '心', options: ['心', '口', '土', '手'], clue: '想一想：我們的願望和想法，是放在身體的哪裡？' } },
      { id: 'h-垃', combo: {'layout': 'lr', 'parts': [['土', 'm', '泥土'], ['立', 'p', '']]}, char: '垃', zhuyin: 'ㄌㄜˋ', radical: '土', strokes: 8, words: ['垃圾'], say: '垃，垃圾的垃', cloze: '＿圾', img: 'trash.png', options: ['垃', '拉', '啦', '粒'], clue: '這個字跟泥土有關。', explain: '答案是「垃」，左邊是「土」；「拉」是拉門的拉，左邊是提手旁。', parts: ['土', '立'], story: '左邊是「土」，右邊是「立」。以前的垃圾大多是泥土和灰塵，所以是土字旁。', sentence: '吃完的餅乾袋是垃圾。', build: { layout: 'lr', show: ['？', '立'], answer: '土', options: ['土', '扌', '口', '米'], clue: '想一想：以前的垃圾大多是灰塵和什麼？' } },
      { id: 'h-圾', combo: {'layout': 'lr', 'parts': [['土', 'm', '泥土'], ['及', 's', '']]}, char: '圾', zhuyin: 'ㄙㄜˋ', radical: '土', strokes: 7, words: ['垃圾'], say: '圾，垃圾的圾', cloze: '垃＿', img: 'trash.png', options: ['圾', '級', '吸', '及'], clue: '這個字跟泥土有關。', explain: '答案是「圾」，左邊是「土」；「級」是年級的級，左邊是糸字旁。', parts: ['土', '及'], story: '左邊是「土」，右邊是「及」。「垃」和「圾」兩個字都是土字旁，常常一起出現。', sentence: '公園的地上有很多垃圾。', build: { layout: 'lr', show: ['？', '及'], answer: '土', options: ['土', '糸', '口', '扌'], clue: '想一想：「垃」和它是好朋友，「垃」的左邊是什麼？' } },
      { id: 'h-位', combo: {'type': '會意字', 'pict': '左邊是「人」，右邊是「立」，就是站著。一個人站著的地方，就是他的「位」子。'}, char: '位', zhuyin: 'ㄨㄟˋ', radical: '人', strokes: 7, words: ['兩位', '座位'], say: '位，座位的位', cloze: '座＿', img: 'two-guests.png', options: ['位', '立', '住', '拉'], clue: '這個字的左邊，是一個人。', explain: '答案是「位」，左邊是單人旁，右邊是「立」；「住」的右邊是「主」。', parts: ['亻', '立'], story: '左邊是「人」，右邊是「立」，就是站著。人站著的地方，就是「位」子。', sentence: '上課要坐在自己的座位上。', build: { layout: 'lr', show: ['？', '立'], answer: '亻', options: ['亻', '扌', '土', '氵'], clue: '想一想：站在那裡的，是誰？' } },
      { id: 'h-護', combo: {'layout': 'lr', 'parts': [['言', 'm', '說話'], ['蒦', 'p', '']]}, char: '護', zhuyin: 'ㄏㄨˋ', radical: '言', strokes: 21, words: ['愛護', '保護'], say: '護，保護的護', cloze: '保＿', img: 'care-nature.png', options: ['護', '獲', '穫', '讓'], clue: '這個字的左邊，跟說話有關。', explain: '答案是「護」，左邊是言字旁；「獲」是獲得的獲，左邊是犬字旁。', parts: ['言', '蒦'], story: '左邊的「言」是說話，右邊像用手抓住一隻鳥。用話提醒、用手護著，不讓它受傷，就是「護」。', sentence: '我們要愛護小動物。', build: { layout: 'lr', show: ['？', '蒦'], answer: '言', options: ['言', '犭', '禾', '木'], clue: '想一想：我們用什麼提醒別人，要好好保護小動物？' } },
      { id: 'h-應', combo: {'type': '會意字', 'pict': '上面像屋子裡有一個人和一隻鳥，下面是「心」。心裡覺得對、覺得該這樣做，就是「應」。'}, char: '應', zhuyin: 'ㄧㄥ', radical: '心', strokes: 17, words: ['應該', '答應'], say: '應，應該的應', cloze: '＿該', img: 'baby-hungry.png', options: ['應', '鷹', '英', '因'], clue: '這個字的下面，是「心」。', explain: '答案是「應」，下面是「心」；「鷹」是老鷹的鷹，下面是「鳥」。', parts: ['广', '亻', '隹', '心'], story: '外面像一間屋子，裡面有一個人和一隻鳥，下面是「心」。心裡覺得該這樣，就是「應」。', sentence: '天空黑黑的，應該快下雨了。' }
    ],
    vocab: [
      { id: 'v-寄居蟹', word: '寄居蟹', meaning: '住在別人留下的殼裡面的小動物，長大了就要找更大的殼當新家。', example: '沙灘上有一隻＿＿＿，背著殼慢慢爬。', img: 'hermit-crab.png', options: ['寄居蟹', '瓶蓋', '紙杯', '志工'] },
      { id: 'v-幕', cloze: true, clozeOptions: ['幕', '本', '隻', '杯'], word: '幕', meaning: '一齣戲裡的一段，演完一段，布簾就拉起來。', example: '這齣戲一共有三＿。', img: 'stage-curtain.png', options: ['幕', '位', '殼', '垃圾'] },
      { id: 'v-紙杯', word: '紙杯', meaning: '用紙做的杯子，用一次就丟掉了。', example: '生日會上，大家用＿＿喝果汁。', img: 'paper-cup.png', options: ['紙杯', '瓶蓋', '寄居蟹', '垃圾'] },
      { id: 'v-殼', cloze: true, clozeOptions: ['殼', '手', '花', '書'], word: '殼', meaning: '包在外面、硬硬的一層。', example: '蝸牛的背上，有一個硬硬的＿。', img: 'shell.png', options: ['殼', '幕', '位', '紙杯'] },
      { id: 'v-人類', word: '人類', meaning: '所有的人。', example: '狗是＿＿的好朋友。', img: 'people.png', options: ['人類', '志工', '寄居蟹', '垃圾'] },
      { id: 'v-瓶蓋', word: '瓶蓋', meaning: '蓋在瓶子口上的蓋子。', example: '喝完水，要把＿＿轉緊。', img: 'bottle-cap.png', options: ['瓶蓋', '紙杯', '殼', '淨灘'] },
      { id: 'v-淨灘', cloze: true, clozeOptions: ['淨灘', '游泳', '玩沙', '釣魚'], word: '淨灘', meaning: '到海邊把沙子上的垃圾撿起來，讓海邊變漂亮。', example: '星期六，我們跟著志工去海邊＿＿，撿了好多垃圾。', img: 'beach-clean.png', options: ['淨灘', '愛護', '應該', '人類'] },
      { id: 'v-志工', word: '志工', meaning: '自己願意來幫忙、不拿錢的人。', example: '圖書館裡有很多＿＿，幫忙整理書。', img: 'volunteer.png', options: ['志工', '人類', '寄居蟹', '紙杯'] },
      { id: 'v-垃圾', word: '垃圾', meaning: '不要了、丟掉的東西。', example: '吃完的餅乾袋，要丟進＿＿桶。', img: 'trash.png', options: ['垃圾', '瓶蓋', '紙杯', '殼'] },
      { id: 'v-位', cloze: true, clozeOptions: ['位', '隻', '條', '張'], word: '位', meaning: '算人數的時候用，說起來比較有禮貌。', example: '今天有兩＿客人來我們班上。', img: 'two-guests.png', options: ['位', '幕', '殼', '淨灘'] },
      { id: 'v-愛護', cloze: true, clozeOptions: ['愛護', '丟掉', '弄壞', '踩壞'], word: '愛護', meaning: '很珍惜，不讓它受到傷害。', example: '我們要＿＿小動物，不可以欺負牠們。', img: 'care-nature.png', options: ['愛護', '應該', '淨灘', '志工'] },
      { id: 'v-應該', cloze: true, clozeOptions: ['應該', '可是', '而且', '從來'], word: '應該', meaning: '猜想大概是這樣。', example: '妹妹一直哭，＿＿是肚子餓了。', img: 'baby-hungry.png', options: ['應該', '愛護', '人類', '位'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-寄', char: '寄', img: 'cw-mail.png', charMeaning: '把東西交給郵差，送到別的地方。', word: '寄信', meaning: '把信放進郵筒，請郵差送給別人。', example: '我＿＿給住在很遠的外婆。', options: ['寄信', '鄰居', '螢幕', '蛋殼'] },
      { id: 'cw-居', char: '居', img: 'cw-neighbor.png', charMeaning: '住。', word: '鄰居', meaning: '住在我們家旁邊的人。', example: '隔壁的＿＿送我們一盒水果。', options: ['鄰居', '寄信', '座位', '花瓶'] },
      { id: 'cw-幕', char: '幕', img: 'cw-screen.png', charMeaning: '一大片像布一樣、可以看東西的地方。', word: '螢幕', meaning: '電視、電腦上會出現畫面的地方。', example: '電視＿＿上正在播卡通。', options: ['螢幕', '分類', '志向', '答應'] },
      { id: 'cw-殼', char: '殼', img: 'cw-eggshell.png', charMeaning: '包在外面、硬硬的一層。', word: '蛋殼', meaning: '包在蛋外面、硬硬的那一層。', example: '剝開＿＿，裡面是白白的蛋。', options: ['蛋殼', '花瓶', '鄰居', '保護'] },
      { id: 'cw-類', char: '類', img: 'cw-sort.png', charMeaning: '一樣的、同一種的。', word: '分類', meaning: '把一樣的東西放在一起。', example: '丟垃圾以前，要先做好＿＿。', options: ['分類', '螢幕', '乾淨', '寄信'] },
      { id: 'cw-瓶', char: '瓶', img: 'cw-vase.png', charMeaning: '口小小、肚子大大，可以裝東西的容器。', word: '花瓶', meaning: '插花用的瓶子。', example: '媽媽把玫瑰花插在＿＿裡。', options: ['花瓶', '蛋殼', '座位', '志向'] },
      { id: 'cw-蓋', char: '蓋', img: 'cw-build.png', charMeaning: '蓋子；也是把房子做起來。', word: '蓋房子', meaning: '用磚頭、水泥和木頭，把房子做起來。', example: '工人正在＿＿＿，好多機器在工作。', options: ['蓋房子', '垃圾車', '垃圾桶', '分類'] },
      { id: 'cw-淨', char: '淨', img: 'cw-clean.png', charMeaning: '沒有髒東西。', word: '乾淨', meaning: '一點髒東西都沒有。', example: '洗完澡，身體變得好＿＿。', options: ['乾淨', '保護', '答應', '鄰居'] },
      { id: 'cw-志', char: '志', img: 'cw-dream.png', charMeaning: '心裡很想做的事。', word: '志向', meaning: '長大以後想做的事。', example: '我的＿＿是當一名醫生。', options: ['志向', '螢幕', '分類', '寄信'] },
      { id: 'cw-垃', char: '垃', img: 'cw-garbage-truck.png', word: '垃圾車', meaning: '每天來收垃圾的車子，會放音樂。', example: '聽到音樂，就知道＿＿＿來了。', options: ['垃圾車', '蓋房子', '垃圾桶', '花瓶'] },
      { id: 'cw-圾', char: '圾', img: 'cw-trash-can.png', word: '垃圾桶', meaning: '裝垃圾的桶子。', example: '吃完的果皮，要丟進＿＿＿。', options: ['垃圾桶', '垃圾車', '蓋房子', '蛋殼'] },
      { id: 'cw-位', char: '位', img: 'cw-seat.png', charMeaning: '人坐的、站的地方。', word: '座位', meaning: '坐的地方。', example: '上課的時候，要坐在自己的＿＿上。', options: ['座位', '乾淨', '寄信', '螢幕'] },
      { id: 'cw-護', char: '護', img: 'cw-protect.png', charMeaning: '照顧好，不讓它受傷。', word: '保護', meaning: '好好照顧，不讓它受到傷害。', example: '戴安全帽可以＿＿我們的頭。', options: ['保護', '答應', '志向', '鄰居'] },
      { id: 'cw-應', char: '應', img: 'cw-promise.png', charMeaning: '說好、同意；也可以是猜想。', word: '答應', meaning: '說好、同意別人。', example: '媽媽＿＿週末帶我去動物園。', options: ['答應', '保護', '乾淨', '分類'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-寄人籬下', situationImg: 'id-no-home.png', idiom: '寄人籬下', char: '寄', meaning: '沒有自己的家，住在別人家裡，什麼事都要靠別人。', example: '寄居蟹找不到殼，只好住在瓶蓋裡，好像寄人籬下。', situation: '小熊的家被大水沖走了，只好住在朋友家，吃飯、睡覺都要聽朋友的安排。',
        fill: { options: ['小狗沒有自己的家，只能住在別人家，過著＿＿＿＿的日子。', '我在自己的房間裡，＿＿＿＿的看書。'], clue: '提示：哪一句是沒有自己的家，要住在別人家？', explain: '第一句用得對：小狗沒有家，住在別人家。在自己的房間看書，不是住在別人家。' } },
      { id: 'i-金蟬脫殼', situationImg: 'id-magic-box.png', idiom: '金蟬脫殼', char: '殼', meaning: '想辦法偷偷的溜走，讓別人抓不到；就像蟬長大時，留下舊殼飛走了。', example: '魔術師用金蟬脫殼的方法，從箱子裡不見了。', situation: '魔術師被鎖在箱子裡，箱子一打開，裡面只剩下他的外套，人早就不見了。',
        fill: { options: ['小偷想用＿＿＿＿的方法，留下外套偷偷溜走。', '我每天早上＿＿＿＿的刷牙洗臉。'], clue: '提示：哪一句是想辦法偷偷溜走？', explain: '第一句用得對：小偷留下外套，想偷偷溜走。每天刷牙洗臉，沒有溜走。' } },
      { id: 'i-物以類聚', situationImg: 'id-play-together.png', idiom: '物以類聚', char: '類', meaning: '喜歡一樣東西的人，常常會聚在一起。', example: '喜歡看書的同學常常一起去圖書館，真是物以類聚。', situation: '下課時，喜歡踢球的同學都跑到操場，喜歡畫畫的同學都圍在桌子旁邊一起畫畫。',
        fill: { options: ['喜歡唱歌的同學都參加了合唱團，真是＿＿＿＿。', '我一個人在家，覺得好＿＿＿＿。'], clue: '提示：哪一句是喜歡一樣東西的人聚在一起？', explain: '第一句用得對：喜歡唱歌的人都聚在合唱團。一個人在家，沒有和別人聚在一起。' } },
      { id: 'i-守口如瓶', situationImg: 'id-secret.png', idiom: '守口如瓶', char: '瓶', meaning: '把祕密守得好好的，一點都不說出去，就像把瓶口蓋緊緊。', example: '我答應姐姐守口如瓶，不把生日驚喜告訴媽媽。', situation: '同學準備給老師一個生日驚喜，小美知道了，可是她一句話都沒有說出去。',
        fill: { options: ['我會＿＿＿＿，不把你的祕密告訴別人。', '他＿＿＿＿，把大家的祕密都說出去了。'], clue: '提示：哪一句是把祕密守好、不說出去？', explain: '第一句用得對：不把祕密告訴別人。把祕密都說出去，剛好相反。' } },
      { id: 'i-志同道合', situationImg: 'id-flower-friends.png', idiom: '志同道合', char: '志', meaning: '想做的事、喜歡的東西都一樣，很合得來。', example: '哥哥和他的同學志同道合，都想當科學家，常常一起做實驗。', situation: '兩個都很喜歡種花的好朋友，一起在學校種了一大片花，天天一起去澆水。',
        fill: { options: ['他們兩個都喜歡畫畫，是＿＿＿＿的好朋友。', '小狗在院子裡＿＿＿＿的追蝴蝶。'], clue: '提示：哪一句是兩個人喜歡的東西一樣、很合得來？', explain: '第一句用得對：兩個人都喜歡畫畫，很合得來。小狗追蝴蝶，跟兩個人合得來沒有關係。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-寄', char: '寄', wrong: '騎', sentence: '我把卡片寄給外婆。', options: ['寄', '騎', '奇'], clue: '這裡是說請郵差把卡片送過去，跟騎車沒有關係。', explain: '要改成「寄」。請郵差送東西是「寄」，上面像房子；「騎」是騎車的騎，左邊是「馬」。' },
      { id: 'fx-居', char: '居', wrong: '局', sentence: '隔壁的鄰居很親切。', options: ['居', '局', '句'], clue: '這裡說的是住在我們家旁邊的人。', explain: '要改成「居」。住在旁邊的人是「鄰居」；「局」是郵局的局。' },
      { id: 'fx-幕', char: '幕', wrong: '慕', sentence: '表演開始了，布幕慢慢拉開。', options: ['幕', '慕', '暮'], clue: '這裡說的是舞臺上的一大塊布，想一想，哪一個字跟布有關？', explain: '要改成「幕」。舞臺上的布是「布幕」，下面是「巾」；「慕」是羨慕的慕。' },
      { id: 'fx-殼', char: '殼', wrong: '穀', sentence: '蝸牛背著硬硬的殼。', options: ['殼', '穀', '設'], clue: '這裡說的是包在外面、硬硬的一層，跟稻米沒有關係。', explain: '要改成「殼」。包在外面硬硬的是「殼」；「穀」是稻穀的穀，下面有「禾」。' },
      { id: 'fx-類', char: '類', wrong: '顏', sentence: '狗是人類的好朋友。', options: ['類', '顏', '頭'], clue: '這裡說的是所有的人，跟顏色沒有關係。', explain: '要改成「類」。所有的人是「人類」；「顏」是顏色的顏。' },
      { id: 'fx-瓶', char: '瓶', wrong: '平', sentence: '媽媽把花插在花瓶裡。', options: ['瓶', '平', '餅'], clue: '這裡說的是插花用的容器，想一想，哪一個字跟陶土做的器具有關？', explain: '要改成「瓶」。插花的是「花瓶」，右邊是「瓦」；「平」是平平的平。' },
      { id: 'fx-蓋', char: '蓋', wrong: '益', sentence: '工人在蓋新的房子。', options: ['蓋', '益', '盒'], clue: '這裡是說把房子做起來，想一想，哪一個字的上面是草字頭？', explain: '要改成「蓋」。把房子做起來是「蓋房子」，上面是草字頭；「益」的上面沒有草字頭。' },
      { id: 'fx-淨', char: '淨', wrong: '靜', sentence: '洗過的碗很乾淨。', options: ['淨', '靜', '爭'], clue: '這裡說的是沒有髒東西，想一想，哪一個字跟水有關？', explain: '要改成「淨」。沒有髒東西是「乾淨」，左邊是三點水；「靜」是安靜的靜。' },
      { id: 'fx-志', char: '志', wrong: '忘', sentence: '他的志向是當醫生。', options: ['志', '忘', '怎'], clue: '這裡說的是長大以後想做的事，不是記不起來。', explain: '要改成「志」。長大想做的事是「志向」，上面是「士」；「忘」是忘記的忘。' },
      { id: 'fx-垃', char: '垃', wrong: '拉', sentence: '吃完的餅乾袋是垃圾。', options: ['垃', '拉', '啦'], clue: '這裡說的是不要的東西，想一想，哪一個字跟泥土有關？', explain: '要改成「垃」。不要的東西是「垃圾」，左邊是「土」；「拉」是拉門的拉，左邊是提手旁。' },
      { id: 'fx-圾', char: '圾', wrong: '級', sentence: '公園的地上有很多垃圾。', options: ['圾', '級', '吸'], clue: '這裡說的是丟掉的東西，跟年級沒有關係。', explain: '要改成「圾」。「垃圾」兩個字都是土字旁；「級」是年級的級。' },
      { id: 'fx-位', char: '位', wrong: '立', sentence: '上課要坐在自己的座位上。', options: ['位', '立', '住'], clue: '這裡說的是坐的地方，想一想，哪一個字的左邊是人？', explain: '要改成「位」。坐的地方是「座位」，左邊是單人旁；「立」少了單人旁。' },
      { id: 'fx-護', char: '護', wrong: '獲', sentence: '我們要愛護小動物。', options: ['護', '獲', '穫'], clue: '這裡說的是好好照顧、不讓牠受傷，跟得到東西沒有關係。', explain: '要改成「護」。好好照顧是「愛護」，左邊是言字旁；「獲」是獲得的獲。' },
      { id: 'fx-應', char: '應', wrong: '英', sentence: '妹妹一直哭，應該是肚子餓了。', options: ['應', '英', '因'], clue: '這裡是說猜想大概是這樣，想一想，哪一個字的下面有心？', explain: '要改成「應」。猜想大概是這樣是「應該」，下面是「心」；「英」是英文的英。' }
    ],
    similar: [
      { id: 's1', meaning: '「愛＿」是很珍惜、好好照顧。', sentence: '我們要愛＿小動物。', frame: '愛＿', options: ['護', '獲'], answer: '護', clue: '提示：這句話在說好好照顧，不是在說得到東西。', explain: '答案是「護」，左邊是言字旁；「獲」是獲得的獲，左邊是犬字旁。' },
      { id: 's2', meaning: '「＿得」是拿到、得到。', sentence: '他＿得了第一名。', frame: '＿得', options: ['獲', '護'], answer: '獲', clue: '提示：這句話在說拿到獎，不是在說照顧別人。', explain: '答案是「獲」。「獲得」是得到；「護」是保護的護。' },
      { id: 's3', meaning: '「垃＿」是不要了、丟掉的東西。', sentence: '紙屑要丟進垃＿桶。', frame: '垃＿', options: ['圾', '級'], answer: '圾', clue: '提示：「垃」的左邊是土，它的好朋友左邊也是土。', explain: '答案是「圾」，左邊是「土」；「級」是年級的級，左邊是糸字旁。' },
      { id: 's4', meaning: '「年＿」是說讀幾年的意思，例如三年＿、四年＿。', sentence: '我今年讀三年＿。', frame: '年＿', options: ['級', '圾'], answer: '級', clue: '提示：這句話在說讀書讀到第幾年，不是在說丟掉的東西。', explain: '答案是「級」，左邊是糸字旁；「圾」是垃圾的圾，左邊是「土」。' },
      { id: 's5', meaning: '「乾＿」是一點髒東西都沒有。', sentence: '洗過的碗很乾＿。', frame: '乾＿', options: ['淨', '靜'], answer: '淨', clue: '提示：碗要用水洗，想一想哪一個字跟水有關。', explain: '答案是「淨」，左邊是三點水；「靜」是安靜的靜。' },
      { id: 's6', meaning: '「安＿」是沒有聲音、不吵鬧。', sentence: '圖書館裡要保持安＿。', frame: '安＿', options: ['靜', '淨'], answer: '靜', clue: '提示：這句話在說不吵鬧，不是在說乾不乾淨。', explain: '答案是「靜」，左邊是「青」；「淨」是乾淨的淨，左邊是三點水。' },
      { id: 's7', meaning: '「＿工」是自己願意來幫忙、不拿錢的人。', sentence: '圖書館的＿工幫忙整理書。', frame: '＿工', options: ['志', '忘'], answer: '志', clue: '提示：這個字的上面是「士」。', explain: '答案是「志」，上面是「士」；「忘」是忘記的忘，上面是「亡」。' },
      { id: 's8', meaning: '「布＿」是舞臺上一大塊布。', sentence: '表演開始了，布＿慢慢拉開。', frame: '布＿', options: ['幕', '慕'], answer: '幕', clue: '提示：舞臺上的大布，下面是「巾」。', explain: '答案是「幕」，下面是「巾」，就是布；「慕」是羨慕的慕。' },
      { id: 's9', meaning: '「貝＿」是貝類外面硬硬的那一層。', sentence: '寄居蟹背著貝＿慢慢爬。', frame: '貝＿', options: ['殼', '穀'], answer: '殼', clue: '提示：這句話在說硬硬的外皮，不是在說稻米。', explain: '答案是「殼」；「穀」是稻穀的穀，下面有「禾」。' },
      { id: 's10', meaning: '「人＿」是所有的人。', sentence: '狗是人＿的好朋友。', frame: '人＿', options: ['類', '顏'], answer: '類', clue: '提示：這句話在說所有的人，不是在說顏色。', explain: '答案是「類」；「顏」是顏色的顏。' }
    ],
    listen: [
      { id: 'l1', text: '有一種小動物，住在別人留下的殼裡面。', answer: 0, options: [{ text: '寄居蟹', img: 'hermit-crab.png' }, { text: '志工', img: 'volunteer.png' }, { text: '紙杯', img: 'paper-cup.png' }, { text: '垃圾', img: 'trash.png' }] },
      { id: 'l2', text: '舞臺上的戲演完一段，布簾就拉起來。', answer: 0, options: [{ text: '幕', img: 'stage-curtain.png' }, { text: '瓶蓋', img: 'bottle-cap.png' }, { text: '人類', img: 'people.png' }, { text: '淨灘', img: 'beach-clean.png' }] },
      { id: 'l3', text: '用紙做的杯子，生日會的時候常常用。', answer: 0, options: [{ text: '紙杯', img: 'paper-cup.png' }, { text: '瓶蓋', img: 'bottle-cap.png' }, { text: '殼', img: 'shell.png' }, { text: '寄居蟹', img: 'hermit-crab.png' }] },
      { id: 'l4', text: '大家一起到海邊，把沙子上的垃圾撿起來。', answer: 0, options: [{ text: '淨灘', img: 'beach-clean.png' }, { text: '愛護', img: 'care-nature.png' }, { text: '幕', img: 'stage-curtain.png' }, { text: '人類', img: 'people.png' }] },
      { id: 'l5', text: '他們自己願意來幫忙，也不拿錢。', answer: 0, options: [{ text: '志工', img: 'volunteer.png' }, { text: '寄居蟹', img: 'hermit-crab.png' }, { text: '紙杯', img: 'paper-cup.png' }, { text: '瓶蓋', img: 'bottle-cap.png' }] },
      { id: 'l6', text: '蓋在寶特瓶最上面，可以轉開、轉緊。', answer: 0, options: [{ text: '瓶蓋', img: 'bottle-cap.png' }, { text: '殼', img: 'shell.png' }, { text: '紙杯', img: 'paper-cup.png' }, { text: '垃圾', img: 'trash.png' }] },
      { id: 'l7', text: '我們要好好照顧小樹，不讓它受傷。', answer: 0, options: [{ text: '愛護', img: 'care-nature.png' }, { text: '淨灘', img: 'beach-clean.png' }, { text: '應該', img: 'baby-hungry.png' }, { text: '志工', img: 'volunteer.png' }] },
      { id: 'l8', text: '吃完的餅乾袋、喝完的飲料罐，都要丟掉。', answer: 0, options: [{ text: '垃圾', img: 'trash.png' }, { text: '寄居蟹', img: 'hermit-crab.png' }, { text: '人類', img: 'people.png' }, { text: '幕', img: 'stage-curtain.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選疊字', pickSay: '看圖，選出最適合的疊字。',
      /* 短語一：疊字＋的＋動作（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '急急忙忙的跑出門', img: 'pr-hurry.png',
        parts: [{ text: '急急忙忙', role: '怎麼做（疊字）' }, { text: '的' }, { text: '跑出門', role: '做什麼' }],
        explain: '「急急忙忙」是疊字，說出動作的樣子，加上「的」，再說做什麼動作，就能把動作說得更清楚。' },
      pick: [
        { id: 'ph1', img: 'pr-late.png', noun: '走進教室', ask: '他是怎麼走進教室的', look: '再看看圖片，他走得快還是慢？表情怎麼樣？', options: ['急急忙忙', '安安靜靜', '整整齊齊', '哭哭啼啼'], clue: '提示：上課鐘響了，他快遲到了，走得快還是慢？', explain: '答案是「急急忙忙」，他快遲到了，走得很快，所以說「急急忙忙的走進教室」。' },
        { id: 'ph2', img: 'pr-library.png', noun: '看書', ask: '他是怎麼看書的', look: '再看看圖片，這裡是什麼地方？他有沒有說話？', options: ['安安靜靜', '急急忙忙', '蹦蹦跳跳', '慌慌張張'], clue: '提示：在圖書館裡，可以大聲吵鬧嗎？', explain: '答案是「安安靜靜」，在圖書館看書不吵鬧，所以說「安安靜靜的看書」。' },
        { id: 'ph3', img: 'pr-dance.png', noun: '跳起舞來', ask: '他們是怎麼跳舞的', look: '再看看圖片，他們的臉上有沒有笑？', options: ['開開心心', '哭哭啼啼', '慌慌張張', '安安靜靜'], clue: '提示：看看他們的臉，是笑著還是哭著？', explain: '答案是「開開心心」，他們笑得很開心，所以說「開開心心的跳起舞來」。' },
        { id: 'ph4', img: 'crab-hide.png', noun: '躲進洞裡', ask: '小螃蟹是怎麼躲進洞裡的', look: '再看看圖片，小螃蟹是害怕還是開心？', options: ['慌慌張張', '從從容容', '開開心心', '整整齊齊'], clue: '提示：小螃蟹嚇了一跳，很害怕，動作會怎麼樣？', explain: '答案是「慌慌張張」，小螃蟹很害怕、很急，所以說「慌慌張張的躲進洞裡」。' },
        { id: 'ph5', img: 'pr-stage.png', noun: '走上舞臺', ask: '她是怎麼走上舞臺的', look: '再看看圖片，她緊不緊張？走得穩不穩？', options: ['從從容容', '慌慌張張', '哭哭啼啼', '急急忙忙'], clue: '提示：她一點都不緊張，慢慢的、穩穩的走上去。', explain: '答案是「從從容容」，她不緊張、不慌忙，所以說「從從容容的走上舞臺」。' },
        { id: 'ph6', img: 'pr-shoes.png', noun: '排好鞋子', ask: '鞋子是怎麼排好的', look: '再看看圖片，鞋子排得亂不亂？', options: ['整整齊齊', '急急忙忙', '哭哭啼啼', '慌慌張張'], clue: '提示：鞋子一雙一雙排成一排，一點都不亂。', explain: '答案是「整整齊齊」，鞋子排得一點都不亂，所以說「整整齊齊的排好鞋子」。' },
        { id: 'ph7', img: 'pr-bunny.png', noun: '跑過草地', ask: '小兔子是怎麼跑過草地的', look: '再看看圖片，小兔子是走路還是一邊跳一邊跑？', options: ['蹦蹦跳跳', '安安靜靜', '慌慌張張', '整整齊齊'], clue: '提示：小兔子一邊跳一邊跑，看起來很高興。', explain: '答案是「蹦蹦跳跳」，小兔子一邊跳一邊跑，所以說「蹦蹦跳跳的跑過草地」。' },
        { id: 'ph8', img: 'pr-homework.png', noun: '寫作業', ask: '她是怎麼寫作業的', look: '再看看圖片，她有沒有專心？', options: ['認認真真', '蹦蹦跳跳', '慌慌張張', '哭哭啼啼'], clue: '提示：她很專心，一個字一個字慢慢寫。', explain: '答案是「認認真真」，她很專心的寫，所以說「認認真真的寫作業」。' }
      ],
      say: [
        { id: 'ps1', img: 'pr-hurry.png', noun: '跑出門', ask: '他是怎麼跑出門的', accept: ['急急忙忙的跑出門', '匆匆忙忙的跑出門', '慌慌張張的跑出門'], clue: '提示：他快遲到了，先用疊字說他的樣子，再說「的跑出門」。', model: '急急忙忙的跑出門' },
        { id: 'ps2', img: 'pr-library.png', noun: '看書', ask: '他是怎麼看書的', accept: ['安安靜靜的看書', '認認真真的看書', '開開心心的看書'], clue: '提示：在圖書館裡不能吵鬧，先用疊字說他的樣子，再說「的看書」。', model: '安安靜靜的看書' }
      ],
      /* 第二個短語：從＋地點＋動作（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '從樹上掉下來', img: 'pz-apple-fall.png',
          parts: [{ text: '從' }, { text: '樹上', role: '從哪裡' }, { text: '掉下來', role: '做什麼動作' }],
          explain: '先說「從」哪裡，再說做了什麼動作，就知道東西是從哪裡移動到別的地方。' },
        fill: [
          { id: 'pz1', img: 'pz-slide.png', parts: ['從', '溜滑梯上', '滑下來'] },
          { id: 'pz2', img: 'pz-bag.png', parts: ['從', '書包裡', '拿出來'] },
          { id: 'pz3', img: 'pz-fish.png', parts: ['從', '水裡', '跳起來'] },
          { id: 'pz4', img: 'pz-door.png', parts: ['從', '門口', '走進來'] },
          { id: 'pz5', img: 'pz-crab-hole.png', parts: ['從', '洞裡', '爬出來'] }
        ]
      },
      words: [
        { word: '愛護', meaning: '很珍惜，好好照顧，不讓它受傷。', img: 'care-nature.png' },
        { word: '應該', meaning: '猜想大概是這樣。', img: 'baby-hungry.png' }
      ],
      choose: [
        { id: 'pw1', word: '愛護', options: ['我們要愛護公園裡的花草樹木。', '我愛護了一碗麵，好好吃。'], clue: '提示：想一想，花草樹木和麵，哪一個需要好好照顧、不讓它受傷？', explain: '第一句用得對：花草樹木要好好照顧。麵是用來吃的，不是愛護。' },
        { id: 'pw2', word: '愛護', options: ['哥哥很愛護他的小狗，每天幫牠洗澡。', '弟弟愛護把書丟在地上。'], clue: '提示：想一想，哪一句是在好好照顧？', explain: '第一句用得對：哥哥好好照顧小狗。把書丟在地上，不是愛護。' },
        { id: 'pw3', word: '應該', options: ['天空黑黑的，等一下應該會下雨。', '我應該了一杯牛奶。'], clue: '提示：想一想，哪一句是在猜等一下會發生什麼事？', explain: '第一句用得對：看到天空黑黑的，猜想等一下會下雨。牛奶是喝的，不能「應該」。' },
        { id: 'pw4', word: '應該', options: ['弟弟一直打哈欠，應該是想睡覺了。', '我應該一顆蘋果，好甜。'], clue: '提示：想一想，哪一句是在猜弟弟怎麼了？', explain: '第一句用得對：看到弟弟打哈欠，猜想他想睡覺了。蘋果是吃的，不能「應該」。' }
      ],
      make: [
        { id: 'pm1', word: '愛護', clue: '提示：想想看，你會怎麼好好照顧你的東西或小動物？', model: '我會好好愛護我的書，不在上面亂畫。' },
        { id: 'pm2', word: '應該', clue: '提示：想想看，看到什麼樣子，你會猜發生了什麼事？', model: '弟弟一直打哈欠，應該是想睡覺了。' }
      ]
    },
    pattern: [
      { key: 'yinwei', id: 'yw', title: '因為……只能……', img: 'yinwei.png',
        meaning: '因為發生了前面的事，沒有別的辦法，只好那樣做。',
        examples: ['因為鉛筆斷了，我只能先借同學的鉛筆。'],
        match: [
          { id: 'pt-yw-m1', img: 'pt-no-bus.png', front: '因為公車一直沒有來，', options: ['我們只能走路回家。', '我們只能飛上天空。', '小狗只能變成小貓。'], clue: '提示：等不到公車，還可以怎麼回家？', explain: '答案是「我們只能走路回家」：等不到公車，沒有別的辦法，只好走路回家。' },
          { id: 'pt-yw-m2', img: 'pt-rain-inside.png', front: '因為外面下大雨，', options: ['大家只能在教室裡玩。', '太陽只能變成月亮。', '我只能吃十碗飯。'], clue: '提示：下大雨不能去操場，可以在哪裡玩？', explain: '答案是「大家只能在教室裡玩」：外面下大雨，只好在教室裡玩。' },
          { id: 'pt-yw-m3', img: 'pt-ball-tree.png', front: '因為球卡在大樹上拿不下來，', options: ['我們只能換一顆球玩。', '大樹只能唱歌給我們聽。', '球只能自己飛回家。'], clue: '提示：球拿不下來，還可以怎麼繼續玩？', explain: '答案是「我們只能換一顆球玩」：球拿不下來，只好換一顆球。' }
        ],
        conj: [
          { id: 'pt-yw-c1', full: '因為天黑了，我們只能先回家。', img: 'pt-dark-home.png', sentence: '＿＿天黑了，我們＿＿先回家。', options: ['因為……只能……', '……竟然……', '只要……就……'], clue: '提示：前面是原因，後面是沒有別的辦法、只好做的事。數數看有幾個空格。', explain: '答案是「因為……只能……」：因為天黑了，我們只能先回家。' },
          { id: 'pt-yw-c2', full: '因為弟弟還太小，他只能坐在旁邊看。', img: 'pt-too-small.png', sentence: '＿＿弟弟還太小，他＿＿坐在旁邊看。', options: ['因為……只能……', '……竟然……', '只要……就……'], clue: '提示：弟弟太小是原因，坐在旁邊看是只好做的事。數數看有幾個空格。', explain: '答案是「因為……只能……」：因為弟弟還太小，他只能坐在旁邊看。' },
          { id: 'pt-yw-c3', full: '因為冰箱裡沒有菜了，媽媽只能去市場買。', img: 'pt-empty-fridge.png', sentence: '＿＿冰箱裡沒有菜了，媽媽＿＿去市場買。', options: ['因為……只能……', '……竟然……', '只要……就……'], clue: '提示：沒有菜是原因，去市場買是只好做的事。數數看有幾個空格。', explain: '答案是「因為……只能……」：因為冰箱裡沒有菜了，媽媽只能去市場買。' }
        ],
        half: [
          { id: 'pt-yw-h1', front: '因為我忘了帶雨傘，', clue: '提示：沒有雨傘，下雨了要怎麼辦？記得要說「只能」。', model: '我只能淋雨回家。' },
          { id: 'pt-yw-h2', front: '因為電梯壞了，', clue: '提示：電梯不能坐，要怎麼上樓？記得要說「只能」。', model: '我們只能爬樓梯。' }
        ],
        whole: [
          { id: 'pt-yw-w1', clue: '提示：先說「因為」發生了什麼事，再用「只能」說只好怎麼做。想想看：停電了怎麼辦？', model: '因為停電了，我們只能點蠟燭。' }
        ] },
      { key: 'jingran', id: 'jr', title: '……竟然……', img: 'jingran.png',
        meaning: '事情的結果跟原本想的不一樣，讓人覺得很意外。',
        examples: ['我以為今天會下雨，竟然出大太陽了。'],
        match: [
          { id: 'pt-jr-m1', img: 'pt-cat-dog.png', front: '我以為小貓會怕小狗，', options: ['牠們竟然變成了好朋友。', '牠們竟然一起去上學。', '牠們竟然會開汽車。'], clue: '提示：看看圖片，小貓和小狗在做什麼？', explain: '答案是「牠們竟然變成了好朋友」：本來以為小貓會怕，沒想到牠們感情很好。' },
          { id: 'pt-jr-m2', img: 'pt-ant-cookie.png', front: '螞蟻的身體那麼小，', options: ['竟然搬得動大餅乾。', '竟然會打電話。', '竟然長得比大樹還高。'], clue: '提示：看看圖片，螞蟻正在搬什麼？', explain: '答案是「竟然搬得動大餅乾」：螞蟻很小，沒想到搬得動那麼大的餅乾。' },
          { id: 'pt-jr-m3', img: 'pt-fast-done.png', front: '弟弟平常寫字很慢，', options: ['今天竟然第一個寫完作業。', '今天竟然把作業吃掉了。', '今天竟然變成了大人。'], clue: '提示：看看圖片，弟弟舉起手、拿著寫好的作業。', explain: '答案是「今天竟然第一個寫完作業」：弟弟平常很慢，沒想到今天第一個寫完。' }
        ],
        conj: [
          { id: 'pt-jr-c1', full: '我只是閉上眼睛一下，竟然就睡著了。', img: 'pt-fall-asleep.png', sentence: '我只是閉上眼睛一下，＿＿就睡著了。', options: ['……竟然……', '因為……只能……', '只要……就……'], clue: '提示：只想閉一下眼睛，結果卻睡著了，很意外。數數看有幾個空格。', explain: '答案是「……竟然……」：我只是閉上眼睛一下，竟然就睡著了。' },
          { id: 'pt-jr-c2', full: '這麼小的種子，竟然長成了一棵大樹。', img: 'pt-seed-tree.png', sentence: '這麼小的種子，＿＿長成了一棵大樹。', options: ['……竟然……', '因為……只能……', '只要……就……'], clue: '提示：小小的種子變成大樹，讓人很意外。數數看有幾個空格。', explain: '答案是「……竟然……」：這麼小的種子，竟然長成了一棵大樹。' },
          { id: 'pt-jr-c3', full: '平常最怕水的弟弟，竟然學會游泳了。', img: 'pt-swim-learn.png', sentence: '平常最怕水的弟弟，＿＿學會游泳了。', options: ['……竟然……', '因為……只能……', '只要……就……'], clue: '提示：怕水的人學會游泳，讓人很意外。數數看有幾個空格。', explain: '答案是「……竟然……」：平常最怕水的弟弟，竟然學會游泳了。' }
        ],
        half: [
          { id: 'pt-jr-h1', front: '我以為今天會很冷，', clue: '提示：結果天氣跟你想的不一樣，會怎麼樣？記得要說「竟然」。', model: '竟然熱得流汗了。' },
          { id: 'pt-jr-h2', front: '小狗平常很調皮，', clue: '提示：今天小狗跟平常不一樣，牠做了什麼？記得要說「竟然」。', model: '今天竟然乖乖的睡了一整天。' }
        ],
        whole: [
          { id: 'pt-jr-w1', clue: '提示：先說你本來以為怎麼樣，再用「竟然」說想不到的結果。想想看：一顆看起來很甜的蘋果，吃起來怎麼樣？', model: '我以為這顆蘋果是甜的，竟然是酸的。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'personify', name: '擬人', meaning: '把東西或動物寫得像人一樣，會說話、會擔心、會開心。', example: '課文裡的寄居蟹和小螃蟹，會說話、會擔心找不到家，就像人一樣。',
          show: { sentence: '小螃蟹開心的說：「謝謝你幫我！」', mark: ['開心的說'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '海浪輕輕的唱著歌。', answer: true, mark: ['唱著歌'], clue: '提示：海浪會不會像人一樣唱歌？', explain: '是擬人：海浪不會唱歌，這句把海浪寫得像人一樣。' },
            { id: 'rh-pe-y2', sentence: '海邊有很多海浪。', answer: false, clue: '提示：這句話裡的海浪，有沒有做人才會做的事？', explain: '不是擬人：海邊有海浪是真的會看到的，沒有把海浪寫得像人。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['揮揮手', '說再見'], options: ['貝殼揮揮手，跟我說再見。', '沙灘上有很多貝殼。'], clue: '提示：哪一句的貝殼，做了人才會做的事？', explain: '「貝殼揮揮手，跟我說再見」是擬人：貝殼不會揮手說再見。' },
            { id: 'rh-pe-p2', mark: ['難過的哭了'], options: ['看到滿地垃圾，大海難過的哭了。', '大海裡有很多垃圾。'], clue: '提示：大海會不會像人一樣難過？', explain: '「大海難過的哭了」是擬人：大海不會哭，這句把大海寫得像人。' },
            { id: 'rh-pe-p3', mark: ['害羞的躲進', '雲裡'], options: ['月亮害羞的躲進雲裡。', '今天晚上的月亮很圓。', '月亮圓得像一顆球。'], clue: '提示：哪一句的月亮，有人的心情？', explain: '「月亮害羞的躲進雲裡」是擬人：月亮不會害羞。' },
            { id: 'rh-pe-p4', mark: ['張開雙手', '歡迎我們'], options: ['沙灘張開雙手，歡迎我們來玩。', '海邊有一大片沙灘。', '沙子細得像麵粉。'], clue: '提示：沙灘會不會像人一樣歡迎別人？', explain: '「沙灘張開雙手，歡迎我們來玩」是擬人：沙灘沒有手。' },
            { id: 'rh-pe-p5', mark: ['生氣的大叫'], options: ['風生氣的大叫，把垃圾吹得到處飛。', '今天的風很大。', '風呼呼呼的吹。', '風快得像一匹馬。'], clue: '提示：哪一句的風，有人的心情、會大叫？', explain: '「風生氣的大叫」是擬人：風不會生氣、不會大叫。' },
            { id: 'rh-pe-p6', mark: ['向我眨眼睛'], options: ['星星在天上向我眨眼睛。', '天上有很多星星。', '星星亮晶晶的。', '星星像一顆顆鑽石。'], clue: '提示：星星有沒有眼睛？會不會眨眼睛？', explain: '「星星在天上向我眨眼睛」是擬人：星星沒有眼睛，這句把星星寫得像人。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「慌慌張張」、「閃閃發亮」。',
          show: { sentence: '沙灘上的貝殼亮晶晶的，海水藍藍的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '海風涼涼的，好舒服。', answer: true, clue: '提示：形容海風的字裡，有沒有同一個字連在一起？', explain: '是疊字：「涼涼」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '我喜歡去海邊玩。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['寄居蟹慢慢的爬過沙灘。', '寄居蟹爬過沙灘。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「寄居蟹慢慢的爬過沙灘」是疊字：「慢慢」重複了。' },
            { id: 'rh-re-p2', options: ['小螃蟹急急忙忙的跑回家。', '小螃蟹跑回家了。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「小螃蟹急急忙忙的跑回家」是疊字：「急急忙忙」重複了。' },
            { id: 'rh-re-p3', options: ['海邊的沙子軟軟的。', '海邊有很多沙子。', '沙子像麵粉一樣細。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「海邊的沙子軟軟的」是疊字：「軟軟」重複了。' },
            { id: 'rh-re-p4', options: ['志工把垃圾撿得乾乾淨淨。', '志工把垃圾撿起來。', '沙灘像一個大垃圾場。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「志工把垃圾撿得乾乾淨淨」是疊字：「乾乾淨淨」重複了。' },
            { id: 'rh-re-p5', options: ['月光閃閃的照在海面上。', '晚上的海邊有月光。', '月亮像一個大圓盤。', '月亮對著大海微笑。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「月光閃閃的照在海面上」是疊字：「閃閃」重複了。' },
            { id: 'rh-re-p6', options: ['小朋友高高興興的去淨灘。', '小朋友去淨灘。', '沙灘像一張大床。', '海浪在跟我們玩遊戲。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「小朋友高高興興的去淨灘」是疊字：「高高興興」重複了。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，隔開來重複說好幾次，讀起來有節奏。', example: '課文裡小螃蟹說「拜託！拜託！」，把同一句話說了兩次。',
          show: { sentence: '撿垃圾，撿垃圾，大家一起撿垃圾。', mark: ['撿垃圾'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '我撿到瓶蓋，我撿到紙杯，我撿到寶特瓶。', answer: true, mark: ['我撿到'], clue: '提示：找找看，有沒有同一句話隔開來說了好幾次？', explain: '是類疊：「我撿到」說了三次，讀起來有節奏。' },
            { id: 'rh-rp-y2', sentence: '我在沙灘上撿到一個瓶蓋。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['快跑'], options: ['快跑！快跑！有人來了！', '有人來了，我們快跑。'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「快跑！快跑！有人來了」是類疊：「快跑」說了兩次。' },
            { id: 'rh-rp-p2', mark: ['一個'], options: ['一個，一個，又一個，垃圾怎麼撿都撿不完。', '沙灘上的垃圾很多，撿都撿不完。'], clue: '提示：哪一句有同一個詞，隔開來說了好幾次？', explain: '「一個，一個，又一個」是類疊：「一個」重複說了好幾次。' },
            { id: 'rh-rp-p3', mark: ['我愛'], options: ['我愛大海，我愛沙灘，我愛寄居蟹。', '我很喜歡去海邊玩。', '海水藍藍的，好漂亮。'], clue: '提示：哪一句有同一句話，隔開來說了好幾次？', explain: '「我愛大海，我愛沙灘，我愛寄居蟹」是類疊：「我愛」說了三次。' },
            { id: 'rh-rp-p4', mark: ['幫幫我'], options: ['幫幫我，幫幫我，我被卡住了！', '我被卡住了，請你幫我。', '我被卡得像一顆粽子。'], clue: '提示：哪一句有同一句話，連著喊了兩次？', explain: '「幫幫我，幫幫我，我被卡住了」是類疊：「幫幫我」說了兩次。' },
            { id: 'rh-rp-p5', mark: ['不要'], options: ['不要亂丟垃圾，不要撿貝殼回家。', '去海邊玩，要記得把垃圾帶走。', '海邊乾乾淨淨的。', '海浪在沙灘上跳舞。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「不要亂丟垃圾，不要撿貝殼回家」是類疊：「不要」說了兩次。' },
            { id: 'rh-rp-p6', mark: ['新家', '在哪裡'], options: ['新家在哪裡？新家在哪裡？寄居蟹到處找。', '寄居蟹到處找新家。', '寄居蟹的殼硬硬的。', '寄居蟹難過的嘆了一口氣。'], clue: '提示：哪一句有同一句話，隔開來說了兩次？', explain: '「新家在哪裡？新家在哪裡？」是類疊：同一句話說了兩次。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '寄居蟹嘆了一口氣說：「我的家在哪裡？」', answer: '擬人', mark: ['嘆了一口氣說'], clue: '提示：寄居蟹會不會像人一樣嘆氣、說話？', explain: '答案是「擬人」：寄居蟹不會說話，這句把牠寫得像人一樣。' },
        { id: 'rh2', sentence: '太陽公公笑咪咪的看著大家淨灘。', answer: '擬人', mark: ['笑咪咪的看著'], clue: '提示：太陽會不會笑？', explain: '答案是「擬人」：太陽不會笑，這句把太陽寫得像人一樣。' },
        { id: 'rh3', sentence: '海水清清的，沙子白白的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「清清」、「白白」都是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '小螃蟹慌慌張張的跑過來。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「慌慌張張」是同一個字連在一起重複用。' },
        { id: 'rh5', sentence: '帶走垃圾，帶走垃圾，請大家帶走垃圾。', answer: '類疊', mark: ['帶走垃圾'], clue: '提示：有沒有同一句話，隔開來說了好幾次？', explain: '答案是「類疊」：「帶走垃圾」說了三次。' },
        { id: 'rh6', sentence: '謝謝你，謝謝你，你救了我！', answer: '類疊', mark: ['謝謝你'], clue: '提示：有沒有同一句話，說了兩次？', explain: '答案是「類疊」：「謝謝你」說了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L08 = d; }
})(this);

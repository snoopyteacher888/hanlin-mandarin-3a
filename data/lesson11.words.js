/* 第 11 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qe: 'extract', qf: 'extract', qc: 'infer', qd: 'infer', qh: 'infer',
      qg: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    hanzi: [
      { id: 'h-除', combo: {'layout': 'lr', 'parts': [['阝', 'm', '臺階'], ['余', 's', '']]}, char: '除', zhuyin: 'ㄔㄨˊ', radical: '阜', strokes: 10, words: ['除夕', '除草'], say: '除，除夕的除', cloze: '＿夕', img: 'new-year-eve.png', options: ['除', '途', '徐', '余'], clue: '這個字的左邊，是耳朵旁。', explain: '答案是「除」，左邊是耳朵旁；「途」是路途的途，外面是「辶」。', parts: ['阝', '余'], story: '左邊的耳朵旁像一層一層的臺階，右邊的「余」念起來有點像「除」。走下臺階、把舊的去掉，就是「除」。「除夕」就是一年的最後一天。', sentence: '除夕晚上，全家一起吃年夜飯。', build: { layout: 'lr', show: ['？', '余'], answer: '阝', options: ['阝', '亻', '扌', '辶'], clue: '想一想：這個字的左邊，像一層一層的臺階。' } },
      { id: 'h-嬸', combo: {'layout': 'lr', 'parts': [['女', 'm', '女生'], ['審', 's', '']]}, char: '嬸', zhuyin: 'ㄕㄣˇ', radical: '女', strokes: 18, words: ['嬸嬸'], say: '嬸，嬸嬸的嬸', cloze: '嬸＿', img: 'auntie.png', options: ['嬸', '審', '婚', '神'], clue: '這個字的左邊，是女字旁。', explain: '答案是「嬸」，左邊是「女」；「審」沒有女字旁。', parts: ['女', '審'], story: '左邊是「女」，右邊的「審」念起來很像「嬸」。叔叔的太太是女生，所以叫「嬸嬸」。', sentence: '嬸嬸送我一本故事書。', build: { layout: 'lr', show: ['？', '審'], answer: '女', options: ['女', '言', '扌', '木'], clue: '想一想：叔叔的太太，左邊要放哪一個部首？' } },
      { id: 'h-煙', combo: {'layout': 'lr', 'parts': [['火', 'm', '火'], ['垔', 's', '']]}, char: '煙', zhuyin: 'ㄧㄢ', radical: '火', strokes: 13, words: ['煙火', '煙囪'], say: '煙，煙火的煙', cloze: '＿火', img: 'fireworks-sky.png', options: ['煙', '燈', '炒', '因'], clue: '這個字跟火有關。', explain: '答案是「煙」，左邊是「火」；「燈」是電燈的燈，右邊是「登」。', parts: ['火', '垔'], story: '左邊是「火」。東西燒起來，冒出來的灰灰白白的氣，就是「煙」。', sentence: '新年的夜晚，天空放滿了煙火。', build: { layout: 'lr', show: ['？', '垔'], answer: '火', options: ['火', '氵', '木', '口'], clue: '想一想：煙是東西燒起來才有的，跟什麼有關？' } },
      { id: 'h-陣', combo: {'type': '會意字', 'pict': '左邊的耳朵旁像小山坡，右邊是「車」。古時候打仗，車子在山坡前排成一排一排，就是「陣」。'}, char: '陣', zhuyin: 'ㄓㄣˋ', radical: '阜', strokes: 10, words: ['陣陣', '一陣風'], say: '陣，一陣風的陣', cloze: '一＿風', img: 'strange-sound.png', options: ['陣', '陳', '連', '庫'], clue: '這個字的右邊，是一輛「車」。', explain: '答案是「陣」，右邊是「車」；「陳」的右邊是「東」。', parts: ['阝', '車'], story: '左邊是耳朵旁，右邊是「車」。車子排成一排一排，就是「陣」。後來一下來、一下停的，也叫「一陣」。', sentence: '一陣風吹過來，好涼快。', build: { layout: 'lr', show: ['？', '車'], answer: '阝', options: ['阝', '辶', '亻', '扌'], clue: '想一想：「陳」和這個字的左邊一樣，是什麼？' } },
      { id: 'h-附', combo: {'layout': 'lr', 'parts': [['阝', 'm', '小山坡'], ['付', 's', '']]}, char: '附', zhuyin: 'ㄈㄨˋ', radical: '阜', strokes: 8, words: ['附近'], say: '附，附近的附', cloze: '＿近', img: 'nearby.png', options: ['附', '付', '府', '符'], clue: '這個字的左邊，是耳朵旁。', explain: '答案是「附」，左邊是耳朵旁；「付」是付錢的付，沒有耳朵旁。', parts: ['阝', '付'], story: '左邊是耳朵旁，右邊的「付」念起來很像「附」。靠在旁邊、離得不遠，就是「附」近。', sentence: '我家附近有一座公園。', build: { layout: 'lr', show: ['？', '付'], answer: '阝', options: ['阝', '亻', '竹', '扌'], clue: '想一想：和「除」、「陣」的左邊一樣，是什麼？' } },
      { id: 'h-店', combo: {'type': '形聲字', 'pict': '外面的「广」像一間有屋頂的房子，裡面的「占」念起來像「店」。在房子裡賣東西的地方，就是「店」。'}, char: '店', zhuyin: 'ㄉㄧㄢˋ', radical: '广', strokes: 8, words: ['店家', '商店'], say: '店，商店的店', cloze: '商＿', img: 'closed-shops.png', options: ['店', '站', '點', '占'], clue: '這個字的外面，像一間有屋頂的房子。', explain: '答案是「店」，外面是「广」；「站」是車站的站，左邊是「立」。', parts: ['广', '占'], story: '「广」像有屋頂的房子，裡面的「占」念起來像「店」。在房子裡賣東西，就是「店」。', sentence: '巷口的麵包店好香。' },
      { id: 'h-休', combo: {'type': '會意字', 'pict': '左邊是「人」，右邊是「木」，就是樹。一個人靠在大樹旁邊停下來，就是「休息」。'}, char: '休', zhuyin: 'ㄒㄧㄡ', radical: '人', strokes: 6, words: ['休息', '休假'], say: '休，休息的休', cloze: '＿假', img: 'rest.png', options: ['休', '木', '伙', '什'], clue: '這個字像一個人靠在大樹旁邊。', explain: '答案是「休」，左邊是「人」，右邊是「木」。', parts: ['亻', '木'], story: '左邊是「人」，右邊是「木」。人走累了，靠在樹旁邊停一下，就是「休」。', sentence: '爸爸放假，在家休息。' },
      { id: 'h-息', combo: {'type': '會意字', 'pict': '上面的「自」很久以前是鼻子，下面是「心」。從鼻子呼吸到心裡的氣，就是「息」。'}, char: '息', zhuyin: 'ㄒㄧˊ', radical: '心', strokes: 10, words: ['休息', '消息'], say: '息，休息的息', cloze: '休＿', img: 'rest.png', options: ['息', '思', '急', '怎'], clue: '這個字的上面是「自」，下面是「心」。', explain: '答案是「息」，上面是「自」；「思」的上面是「田」。', parts: ['自', '心'], story: '上面的「自」很久以前是畫一個鼻子，下面是「心」。用鼻子呼吸，就是「息」。停下來喘口氣，就是「休息」。', sentence: '跑完步，我坐下來休息。' },
      { id: 'h-修', combo: {'type': '形聲字', 'pict': '左邊是「人」，中間一豎，右邊有「攵」和「彡」。人拿著工具把東西弄好，就是「修」。'}, char: '修', zhuyin: 'ㄒㄧㄡ', radical: '人', strokes: 10, words: ['修車廠', '修理'], say: '修，修理的修', cloze: '＿理', img: 'garage.png', options: ['修', '條', '候', '悠'], clue: '這個字的右下角，有三撇。', explain: '答案是「修」，右下角是三撇；「條」的右下角是「木」。', parts: ['亻', '丨', '攵', '彡'], story: '左邊是「人」，右邊有手拿工具的「攵」和三撇的「彡」。人拿著工具把壞掉的東西弄好，就是「修」。', sentence: '爸爸幫我修理腳踏車。' },
      { id: 'h-廠', combo: {'type': '形聲字', 'pict': '外面的「广」像一間大房子，裡面的「敞」念起來像「廠」。很大的房子裡有很多機器在做東西，就是「工廠」。'}, char: '廠', zhuyin: 'ㄔㄤˇ', radical: '广', strokes: 15, words: ['修車廠', '工廠'], say: '廠，工廠的廠', cloze: '工＿', img: 'garage.png', options: ['廠', '敞', '場', '常'], clue: '這個字的外面，像一間大房子。', explain: '答案是「廠」，外面是「广」；「敞」沒有「广」。', parts: ['广', '敞'], story: '「广」像一間大房子，裡面的「敞」念起來像「廠」。很大的房子裡用機器做東西，就是「廠」。', sentence: '這間工廠在做餅乾。' },
      { id: 'h-檢', combo: {'layout': 'lr', 'parts': [['木', 'm', '木頭'], ['僉', 's', '']]}, char: '檢', zhuyin: 'ㄐㄧㄢˇ', radical: '木', strokes: 17, words: ['檢查'], say: '檢，檢查的檢', cloze: '＿查', img: 'check-car.png', options: ['檢', '撿', '險', '臉'], clue: '這個字的左邊，是木字旁。', explain: '答案是「檢」，左邊是「木」；「撿」是撿東西的撿，左邊是提手旁。', parts: ['木', '僉'], story: '左邊是「木」，右邊的「僉」念起來像「檢」。很久以前，重要的東西用木頭盒子裝好、仔細看過，就是「檢」。', sentence: '交作業前，我會先檢查一次。', build: { layout: 'lr', show: ['？', '僉'], answer: '木', options: ['木', '扌', '阝', '月'], clue: '想一想：「撿東西」用手，「檢查」的左邊不是手，是什麼？' } },
      { id: 'h-查', combo: {'layout': 'tb', 'parts': [['木', 'm', '木頭'], ['且', 'p', '']]}, char: '查', zhuyin: 'ㄔㄚˊ', radical: '木', strokes: 9, words: ['檢查', '查字典'], say: '查，檢查的查', cloze: '檢＿', img: 'check-car.png', options: ['查', '杏', '香', '直'], clue: '這個字的上面是「木」，下面是「且」。', explain: '答案是「查」，下面是「且」；「香」的上面是「禾」，下面是「日」。', parts: ['木', '且'], story: '上面是「木」，下面是「且」。仔細的看一看、找一找，就是「查」。', sentence: '不會的字，我會查字典。', build: { layout: 'tb', show: ['？', '且'], answer: '木', options: ['木', '禾', '日', '口'], clue: '想一想：和「檢」的左邊一樣，是什麼？' } },
      { id: 'h-拖', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['㐌', 'p', '']]}, char: '拖', zhuyin: 'ㄊㄨㄛ', radical: '手', strokes: 8, words: ['拖車', '拖地'], say: '拖，拖地的拖', cloze: '＿地', img: 'tow-car.png', options: ['拖', '托', '施', '地'], clue: '這個字跟手有關。', explain: '答案是「拖」，左邊是提手旁；「施」的左邊是「方」。', parts: ['扌', '㐌'], story: '左邊是提手旁。用手拉著東西在地上走，就是「拖」。', sentence: '我幫媽媽拖地板。', build: { layout: 'lr', show: ['？', '㐌'], answer: '扌', options: ['扌', '方', '氵', '土'], clue: '想一想：拉著重重的東西，要用身體的哪個部分？' } },
      { id: 'h-幸', combo: {'type': '會意字', 'pict': '很久以前的「幸」，像一個可以打開的手銬。逃開了壞事，所以「幸」是好運氣的意思。'}, char: '幸', zhuyin: 'ㄒㄧㄥˋ', radical: '干', strokes: 8, words: ['幸好', '幸運'], say: '幸，幸好的幸', cloze: '＿運', img: 'lucky.png', options: ['幸', '辛', '季', '李'], clue: '這個字的上面是「土」，下面像「羊」少一點。', explain: '答案是「幸」；「辛」是辛苦的辛，上面是「立」。', parts: ['土', '𢆉'], story: '「幸」的上面是「土」。好事剛好發生、壞事躲過了，就是「幸」。', sentence: '幸好我有帶雨傘。' },
      { id: 'h-零', combo: {'layout': 'tb', 'parts': [['雨', 'm', '雨'], ['令', 's', '']]}, char: '零', zhuyin: 'ㄌㄧㄥˊ', radical: '雨', strokes: 13, words: ['零件', '零錢'], say: '零，零錢的零', cloze: '＿錢', img: 'small-part.png', options: ['零', '鈴', '玲', '冷'], clue: '這個字的上面，是雨字頭。', explain: '答案是「零」，上面是雨字頭；「鈴」是鈴鐺的鈴，左邊是「金」。', parts: ['雨', '令'], story: '上面是雨字頭，下面的「令」念起來像「零」。很久以前的「零」是小雨一點一點落下來，所以有小小的、一點點的意思。', sentence: '我把零錢放進小豬撲滿。', build: { layout: 'tb', show: ['？', '令'], answer: '雨', options: ['雨', '竹', '艹', '穴'], clue: '想一想：一點一點落下來的，是什麼？' } }
    ],
    vocab: [
      { id: 'v-除夕', word: '除夕', meaning: '一年的最後一天晚上，全家會一起吃年夜飯。', example: '＿＿晚上，全家人一起圍爐。', img: 'new-year-eve.png', options: ['除夕', '店家', '零件', '煙火'] },
      { id: 'v-嬸嬸', word: '嬸嬸', meaning: '叔叔的太太。', example: '叔叔和＿＿帶著小堂妹來我家玩。', img: 'auntie.png', options: ['嬸嬸', '店家', '附近', '除夕'] },
      { id: 'v-煙火', word: '煙火', meaning: '點火以後，會飛到天上炸開、變成漂亮光點的東西。', example: '新年的晚上，天上放滿了五顏六色的＿＿。', img: 'fireworks-sky.png', options: ['煙火', '零件', '陣陣', '修車廠'] },
      { id: 'v-陣陣', cloze: true, clozeOptions: ['陣陣', '本本', '張張', '條條'], word: '陣陣', meaning: '一下來、一下停，一次又一次的。', example: '花園裡傳來＿＿花香。', img: 'strange-sound.png', options: ['陣陣', '煙火', '附近', '幸好'] },
      { id: 'v-附近', word: '附近', meaning: '離這裡不遠的地方。', example: '我家＿＿有一間便利商店。', img: 'nearby.png', options: ['附近', '店家', '除夕', '零件'] },
      { id: 'v-店家', word: '店家', meaning: '開店、賣東西的人或商店。', example: '過年時，很多＿＿都關門休息。', img: 'closed-shops.png', options: ['店家', '嬸嬸', '附近', '煙火'] },
      { id: 'v-休息', cloze: true, clozeOptions: ['休息', '跑步', '吵架', '工作'], word: '休息', meaning: '停下來，讓身體放鬆一下。', example: '走累了，我們坐在樹下＿＿。', img: 'rest.png', options: ['休息', '檢查', '打擾', '拖'] },
      { id: 'v-修車廠', word: '修車廠', meaning: '修理汽車、機車的地方。', example: '車子壞了，爸爸把它開到＿＿＿。', img: 'garage.png', options: ['修車廠', '店家', '煙火', '除夕'] },
      { id: 'v-關', cloze: true, clozeOptions: ['關', '開', '吃', '畫'], word: '關', meaning: '把打開的東西合起來。', example: '睡覺前，記得把燈＿掉。', img: 'close-door.png', options: ['關', '拖', '擺', '修車廠'] },
      { id: 'v-檢查', cloze: true, clozeOptions: ['檢查', '丟掉', '弄壞', '藏起來'], word: '檢查', meaning: '仔細的看一看，找找有沒有問題。', example: '交作業前，要先＿＿有沒有寫錯。', img: 'check-car.png', options: ['檢查', '休息', '打擾', '幸好'] },
      { id: 'v-拖', cloze: true, clozeOptions: ['拖', '吃', '唱', '寫'], word: '拖', meaning: '拉著東西，讓它跟著走。', example: '大卡車把壞掉的汽車＿走了。', img: 'tow-car.png', options: ['拖', '關', '擺', '檢查'] },
      { id: 'v-擺', cloze: true, clozeOptions: ['擺', '跳', '飛', '哭'], word: '擺', meaning: '把東西放好、排好。', example: '餐桌上＿滿了好吃的菜。', img: 'new-year-dishes.png', options: ['擺', '拖', '關', '零件'] },
      { id: 'v-打擾', cloze: true, clozeOptions: ['打擾', '幫助', '感謝', '照顧'], word: '打擾', meaning: '讓別人沒辦法好好做事或休息。', example: '弟弟在寫功課，我們不要去＿＿他。', img: 'disturb.png', options: ['打擾', '休息', '檢查', '幸好'] },
      { id: 'v-幸好', cloze: true, clozeOptions: ['幸好', '可惜', '因為', '如果'], word: '幸好', meaning: '運氣不錯，事情沒有變得更糟。', example: '突然下大雨，＿＿我有帶雨傘。', img: 'lucky.png', options: ['幸好', '打擾', '陣陣', '附近'] },
      { id: 'v-零件', word: '零件', meaning: '機器或車子裡面，一個一個小小的東西。', example: '腳踏車壞了，要換一個新的＿＿。', img: 'small-part.png', options: ['零件', '煙火', '店家', '嬸嬸'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-除', char: '除', img: 'cw-weeding.png', charMeaning: '去掉、拿掉。', word: '除草', meaning: '把不要的雜草拔掉。', example: '爺爺在菜園裡＿＿。', options: ['除草', '附近', '休假', '工廠'] },
      { id: 'cw-嬸', char: '嬸', img: 'cw-auntie-hug.png', charMeaning: '叔叔的太太。', word: '嬸嬸', meaning: '叔叔的太太，也是家裡的親人。', example: '過年回家，＿＿給我一個大大的擁抱。', options: ['嬸嬸', '零錢', '修理', '拖地'] },
      { id: 'cw-煙', char: '煙', img: 'cw-chimney.png', charMeaning: '東西燒起來冒出的灰白色的氣。', word: '煙囪', meaning: '屋頂上讓煙跑出去的長管子。', example: '工廠的＿＿冒出白白的煙。', options: ['煙囪', '除草', '幸運', '查字典'] },
      { id: 'cw-陣', char: '陣', img: 'cw-gust.png', charMeaning: '一段時間；一下來一下停。', word: '一陣風', meaning: '突然吹來一下子的風。', example: '＿＿＿吹過來，把帽子吹走了。', options: ['一陣風', '附近', '工廠', '零錢'] },
      { id: 'cw-附', char: '附', img: 'cw-map-near.png', charMeaning: '靠近、在旁邊。', word: '附近', meaning: '離這裡不遠的地方。', example: '學校＿＿有一間文具店。', options: ['附近', '休假', '除草', '修理'] },
      { id: 'cw-店', char: '店', img: 'cw-shop.png', charMeaning: '賣東西的地方。', word: '商店', meaning: '賣東西的店。', example: '街上有好多＿＿，賣衣服、賣鞋子。', options: ['商店', '煙囪', '拖地', '消息'] },
      { id: 'cw-休', char: '休', img: 'cw-holiday.png', charMeaning: '停下來、不工作。', word: '休假', meaning: '不用上班，可以在家休息或出去玩。', example: '爸爸今天＿＿，帶我們去動物園。', options: ['休假', '一陣風', '工廠', '查字典'] },
      { id: 'cw-息', char: '息', img: 'cw-good-news.png', charMeaning: '呼吸；也可以是新的事情。', word: '消息', meaning: '別人告訴我們的新事情。', example: '我聽到一個好＿＿：明天要去郊遊！', options: ['消息', '商店', '除草', '幸運'] },
      { id: 'cw-修', char: '修', img: 'cw-fix-bike.png', charMeaning: '把壞掉的東西弄好。', word: '修理', meaning: '把壞掉的東西弄好。', example: '爸爸幫我＿＿壞掉的腳踏車。', options: ['修理', '煙囪', '零錢', '休假'] },
      { id: 'cw-廠', char: '廠', img: 'cw-factory.png', charMeaning: '用機器做東西的大房子。', word: '工廠', meaning: '用很多機器做東西的地方。', example: '這間＿＿每天做好多罐果汁。', options: ['工廠', '消息', '一陣風', '拖地'] },
      { id: 'cw-檢', char: '檢', img: 'cw-doctor-check.png', charMeaning: '仔細看有沒有問題。', word: '健康檢查', meaning: '請醫生看看身體有沒有問題。', example: '學校請醫生來幫我們做＿＿＿＿。', options: ['健康檢查', '查字典', '修理', '商店'] },
      { id: 'cw-查', char: '查', img: 'cw-dictionary.png', charMeaning: '仔細的找一找、看一看。', word: '查字典', meaning: '翻字典，找出不會的字。', example: '遇到不會念的字，我會＿＿＿。', options: ['查字典', '健康檢查', '休假', '除草'] },
      { id: 'cw-拖', char: '拖', img: 'cw-mop.png', charMeaning: '拉著走。', word: '拖地', meaning: '用拖把把地板擦乾淨。', example: '打掃時間，我負責＿＿。', options: ['拖地', '附近', '幸運', '工廠'] },
      { id: 'cw-幸', char: '幸', img: 'cw-clover.png', charMeaning: '好運氣。', word: '幸運', meaning: '運氣很好。', example: '我找到一片四葉草，覺得好＿＿。', options: ['幸運', '修理', '一陣風', '煙囪'] },
      { id: 'cw-零', char: '零', img: 'cw-coins.png', charMeaning: '小小的、一點點的。', word: '零錢', meaning: '一塊、五塊、十塊這種小錢。', example: '我把＿＿存進小豬撲滿。', options: ['零錢', '拖地', '商店', '消息'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-斬草除根', situationImg: 'id-pull-weeds.png', idiom: '斬草除根', char: '除', meaning: '拔草要連根拔掉，才不會再長出來；比喻把壞事徹底解決。', example: '爺爺拔雜草時一定斬草除根，雜草就不會再長出來了。', situation: '爺爺拔雜草的時候，不只拔葉子，還把草根整個挖出來，這樣草就不會再長了。',
        fill: { options: ['蟑螂要＿＿＿＿，把蟑螂窩找出來清乾淨。', '我＿＿＿＿的吃了一碗冰。'], clue: '提示：哪一句是在說把壞事徹底解決，不讓它再來？', explain: '第一句用得對：把蟑螂窩清乾淨，蟑螂就不會再來。吃冰跟解決壞事沒有關係。' } },
      { id: 'i-烏煙瘴氣', situationImg: 'id-messy-room.png', idiom: '烏煙瘴氣', char: '煙', meaning: '亂七八糟、讓人很不舒服的樣子。', example: '兩個人在教室裡大吵一架，把教室弄得烏煙瘴氣。', situation: '派對上有人吵架、有人亂丟東西，大家都覺得很不舒服，沒有心情玩了。',
        fill: { options: ['他們一直吵架，把教室弄得＿＿＿＿。', '公園裡空氣清新，讓人覺得＿＿＿＿。'], clue: '提示：哪一句是亂七八糟、讓人不舒服？', explain: '第一句用得對：吵架把教室弄得很亂。空氣清新很舒服，剛好相反。' } },
      { id: 'i-息息相關', situationImg: 'id-plant-water.png', idiom: '息息相關', char: '息', meaning: '兩件事的關係非常、非常緊密。', example: '吃得健康和身體好不好，是息息相關的。', situation: '小花每天都有澆水，就長得很好；有一次忘了澆水，小花馬上就垂下頭來。',
        fill: { options: ['睡得好不好，和上課有沒有精神＿＿＿＿。', '我的鉛筆和天上的星星＿＿＿＿。'], clue: '提示：哪一句的兩件事，關係真的很緊密？', explain: '第一句用得對：睡得好，上課才有精神。鉛筆和星星沒有關係。' } },
      { id: 'i-不修邊幅', situationImg: 'id-messy-hair.png', idiom: '不修邊幅', char: '修', meaning: '不注意自己的打扮，頭髮、衣服亂亂的。', example: '哥哥放假時不修邊幅，頭髮沒梳就出門了。', situation: '哥哥早上起床，頭髮亂翹、衣服皺皺的，也沒有洗臉，就直接出門了。',
        fill: { options: ['叔叔＿＿＿＿，衣服皺皺的、鬍子也沒刮。', '姐姐穿得整整齊齊，一點也不＿＿＿＿。'], clue: '提示：哪一句的人沒有好好打扮？', explain: '第一句用得對：衣服皺皺的、鬍子沒刮，就是不修邊幅。第二句說「一點也不」，姐姐穿得很整齊。' } },
      { id: 'i-幸災樂禍', situationImg: 'id-laugh-fall.png', idiom: '幸災樂禍', char: '幸', meaning: '別人發生不好的事，自己卻很開心。這是不好的行為。', example: '同學跌倒了，我們不可以幸災樂禍，要趕快扶他起來。', situation: '小明的冰淇淋掉到地上，旁邊的小華不但沒有安慰他，還哈哈大笑。',
        fill: { options: ['弟弟考不好，哥哥卻＿＿＿＿的笑他。', '我得了第一名，全家人＿＿＿＿的幫我拍手。'], clue: '提示：哪一句是別人發生不好的事，卻很開心？', explain: '第一句用得對：弟弟考不好，哥哥卻在笑，這是不好的行為。家人幫我拍手是替我高興，不是幸災樂禍。' } },
      { id: 'i-七零八落', situationImg: 'id-toys-mess.png', idiom: '七零八落', char: '零', meaning: '東西散得到處都是，亂亂的。', example: '風把桌上的紙吹得七零八落。', situation: '弟弟玩完積木沒有收，積木散得客廳到處都是，這裡一塊、那裡一塊。',
        fill: { options: ['一陣大風，把曬好的衣服吹得＿＿＿＿。', '書架上的書排得＿＿＿＿，好整齊。'], clue: '提示：哪一句是東西散得到處都是？', explain: '第一句用得對：衣服被吹得到處都是。書排得整整齊齊，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-除', char: '除', wrong: '途', sentence: '除夕晚上，全家一起吃年夜飯。', options: ['除', '途', '余'], clue: '這裡說的是一年最後一天的晚上，想一想，哪一個字的左邊是耳朵旁？', explain: '要改成「除」。一年最後一天是「除夕」，左邊是耳朵旁；「途」是路途的途。' },
      { id: 'fx-嬸', char: '嬸', wrong: '審', sentence: '小嬸送我一本故事書。', options: ['嬸', '審', '神'], clue: '這裡說的是叔叔的太太，想一想，哪一個字有女字旁？', explain: '要改成「嬸」。叔叔的太太是「嬸嬸」，左邊是「女」；「審」沒有女字旁。' },
      { id: 'fx-煙', char: '煙', wrong: '因', sentence: '新年的夜晚，天空放滿了煙火。', options: ['煙', '因', '燈'], clue: '這裡說的是點火以後在天上炸開的東西，想一想，哪一個字跟火有關？', explain: '要改成「煙」。天上炸開的是「煙火」，左邊是「火」；「因」是因為的因。' },
      { id: 'fx-陣', char: '陣', wrong: '陳', sentence: '一陣風吹過來，好涼快。', options: ['陣', '陳', '連'], clue: '這裡是說突然吹來一下子的風，想一想，哪一個字的右邊是「車」？', explain: '要改成「陣」。一下子的風是「一陣風」，右邊是「車」；「陳」的右邊是「東」。' },
      { id: 'fx-附', char: '附', wrong: '付', sentence: '我家附近有一座公園。', options: ['附', '付', '府'], clue: '這裡說的是離得不遠的地方，跟付錢沒有關係。', explain: '要改成「附」。不遠的地方是「附近」，左邊是耳朵旁；「付」是付錢的付。' },
      { id: 'fx-店', char: '店', wrong: '站', sentence: '巷口的麵包店好香。', options: ['店', '站', '點'], clue: '這裡說的是賣東西的地方，不是坐車的地方。', explain: '要改成「店」。賣東西的地方是「店」；「站」是車站的站。' },
      { id: 'fx-休', char: '休', wrong: '木', sentence: '爸爸放假，在家休息。', options: ['休', '木', '什'], clue: '這裡是說人停下來放鬆，想一想，哪一個字像人靠在大樹旁邊？', explain: '要改成「休」。人靠在樹旁邊停下來是「休息」，左邊有單人旁；「木」少了單人旁。' },
      { id: 'fx-息', char: '息', wrong: '思', sentence: '跑完步，我坐下來休息。', options: ['息', '思', '急'], clue: '這裡是說停下來喘口氣，想一想，哪一個字的上面是「自」？', explain: '要改成「息」。停下來喘口氣是「休息」，上面是「自」；「思」的上面是「田」。' },
      { id: 'fx-修', char: '修', wrong: '條', sentence: '爸爸幫我修理腳踏車。', options: ['修', '條', '候'], clue: '這裡是說把壞掉的東西弄好，想一想，哪一個字的右下角是三撇？', explain: '要改成「修」。把東西弄好是「修理」，右下角是三撇；「條」的右下角是「木」。' },
      { id: 'fx-廠', char: '廠', wrong: '場', sentence: '這間工廠在做餅乾。', options: ['廠', '場', '常'], clue: '這裡說的是用機器做東西的大房子，想一想，哪一個字的外面像房子？', explain: '要改成「廠」。用機器做東西的地方是「工廠」，外面是「广」；「場」是操場的場。' },
      { id: 'fx-檢', char: '檢', wrong: '撿', sentence: '交作業前，我會先檢查一次。', options: ['檢', '撿', '險'], clue: '這裡是說仔細看有沒有錯，不是把東西拿起來。', explain: '要改成「檢」。仔細看是「檢查」，左邊是「木」；「撿」是撿東西的撿，左邊是提手旁。' },
      { id: 'fx-查', char: '查', wrong: '香', sentence: '不會的字，我會查字典。', options: ['查', '香', '杏'], clue: '這裡是說翻字典找一找，跟香香的味道沒有關係。', explain: '要改成「查」。翻字典找字是「查字典」；「香」是香味的香。' },
      { id: 'fx-拖', char: '拖', wrong: '施', sentence: '我幫媽媽拖地板。', options: ['拖', '施', '托'], clue: '這裡是說用長長的工具把地板擦乾淨，想一想，哪一個字的左邊是手？', explain: '要改成「拖」。用拖把擦地是「拖地」，左邊是提手旁；「施」的左邊是「方」。' },
      { id: 'fx-幸', char: '幸', wrong: '辛', sentence: '幸好我有帶雨傘。', options: ['幸', '辛', '李'], clue: '這裡是說還好，跟辛苦沒有關係。', explain: '要改成「幸」。還好是「幸好」；「辛」是辛苦的辛。' },
      { id: 'fx-零', char: '零', wrong: '鈴', sentence: '我把零錢放進小豬撲滿。', options: ['零', '鈴', '冷'], clue: '這裡說的是小小的錢，想一想，哪一個字的上面是雨字頭？', explain: '要改成「零」。小小的錢是「零錢」，上面是雨字頭；「鈴」是鈴鐺的鈴。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿心」是很在意、很照顧別人。', sentence: '奶奶很＿心我的身體。', frame: '＿心', options: ['關', '聯'], answer: '關', clue: '提示：這句話在說照顧別人，外面是一扇門。', explain: '答案是「關」，外面是「門」；「聯」是聯合的聯，左邊是「耳」。' },
      { id: 's2', meaning: '「＿車」是把壞掉的車子拉走。', sentence: '壞掉的車子被＿車拉走了。', frame: '＿車', options: ['拖', '托'], answer: '拖', clue: '提示：這句話在說拉著車子走。', explain: '答案是「拖」；「托」是用手托著的托。' },
      { id: 's3', meaning: '「＿運」是運氣很好。', sentence: '我抽到大獎，好＿運！', frame: '＿運', options: ['幸', '辛'], answer: '幸', clue: '提示：這句話在說運氣很好，不是在說很累。', explain: '答案是「幸」；「辛」是辛苦的辛，上面是「立」。' },
      { id: 's4', meaning: '「＿苦」是很累、很不容易。', sentence: '爸爸工作很＿苦。', frame: '＿苦', options: ['辛', '幸'], answer: '辛', clue: '提示：這句話在說很累，不是在說運氣好。', explain: '答案是「辛」；「幸」是幸運的幸。' },
      { id: 's5', meaning: '「＿錢」是小小的錢。', sentence: '我用＿錢買了一顆糖。', frame: '＿錢', options: ['零', '鈴'], answer: '零', clue: '提示：這個字的上面是雨字頭。', explain: '答案是「零」；「鈴」是鈴鐺的鈴，左邊是「金」。' },
      { id: 's6', meaning: '「＿理」是把壞掉的東西弄好。', sentence: '爸爸在＿理電腦。', frame: '＿理', options: ['修', '條'], answer: '修', clue: '提示：這個字的右下角是三撇。', explain: '答案是「修」；「條」是一條魚的條，右下角是「木」。' },
      { id: 's7', meaning: '「時＿」是說什麼時間。', sentence: '小時＿，我住在鄉下。', frame: '時＿', options: ['候', '修'], answer: '候', clue: '提示：這句話在說時間，不是在說修東西。', explain: '答案是「候」；「修」是修理的修。' },
      { id: 's8', meaning: '「工＿」是用機器做東西的地方。', sentence: '這間工＿在做玩具。', frame: '工＿', options: ['廠', '敞'], answer: '廠', clue: '提示：這個字的外面像一間大房子。', explain: '答案是「廠」，外面是「广」；「敞」沒有「广」。' },
      { id: 's9', meaning: '「一＿風」是突然吹來一下子的風。', sentence: '一＿風把帽子吹走了。', frame: '一＿風', options: ['陣', '陳'], answer: '陣', clue: '提示：這個字的右邊是「車」。', explain: '答案是「陣」，右邊是「車」；「陳」的右邊是「東」。' },
      { id: 's10', meaning: '「＿夕」是一年最後一天的晚上。', sentence: '＿夕晚上要吃年夜飯。', frame: '＿夕', options: ['除', '途'], answer: '除', clue: '提示：這個字的左邊是耳朵旁。', explain: '答案是「除」；「途」是路途的途。' }
    ],
    listen: [
      { id: 'l1', text: '一年的最後一天晚上，全家人一起吃年夜飯。', answer: 0, options: [{ text: '除夕', img: 'new-year-eve.png' }, { text: '煙火', img: 'fireworks-sky.png' }, { text: '店家', img: 'closed-shops.png' }, { text: '零件', img: 'small-part.png' }] },
      { id: 'l2', text: '她是叔叔的太太。', answer: 0, options: [{ text: '嬸嬸', img: 'auntie.png' }, { text: '店家', img: 'closed-shops.png' }, { text: '修車廠', img: 'garage.png' }, { text: '附近', img: 'nearby.png' }] },
      { id: 'l3', text: '咻——碰！天空開出一朵一朵漂亮的光。', answer: 0, options: [{ text: '煙火', img: 'fireworks-sky.png' }, { text: '除夕', img: 'new-year-eve.png' }, { text: '零件', img: 'small-part.png' }, { text: '拖', img: 'tow-car.png' }] },
      { id: 'l4', text: '車子壞掉了，要開去這裡請師傅修理。', answer: 0, options: [{ text: '修車廠', img: 'garage.png' }, { text: '店家', img: 'closed-shops.png' }, { text: '附近', img: 'nearby.png' }, { text: '嬸嬸', img: 'auntie.png' }] },
      { id: 'l5', text: '仔細的看一看，找找哪裡有問題。', answer: 0, options: [{ text: '檢查', img: 'check-car.png' }, { text: '休息', img: 'rest.png' }, { text: '打擾', img: 'disturb.png' }, { text: '幸好', img: 'lucky.png' }] },
      { id: 'l6', text: '拖吊車拉著壞掉的車子往前走。', answer: 0, options: [{ text: '拖', img: 'tow-car.png' }, { text: '關', img: 'close-door.png' }, { text: '擺', img: 'new-year-dishes.png' }, { text: '檢查', img: 'check-car.png' }] },
      { id: 'l7', text: '還好只壞了一個小地方，一下子就修好了。', answer: 0, options: [{ text: '幸好', img: 'lucky.png' }, { text: '打擾', img: 'disturb.png' }, { text: '陣陣', img: 'strange-sound.png' }, { text: '休息', img: 'rest.png' }] },
      { id: 'l8', text: '車子裡面一個小小的東西壞了，要換新的。', answer: 0, options: [{ text: '零件', img: 'small-part.png' }, { text: '煙火', img: 'fireworks-sky.png' }, { text: '店家', img: 'closed-shops.png' }, { text: '除夕', img: 'new-year-eve.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說出動作是怎麼做的。',
      /* 短語一：怎麼做＋動作（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '急忙跑回家', img: 'pr-rush-home.png',
        parts: [{ text: '急忙', role: '怎麼做' }, { text: '跑回家', role: '做什麼' }],
        explain: '在動作前面加上「怎麼做」，例如急忙、慢慢、輕輕、大聲，就能知道動作是什麼樣子。' },
      pick: [
        { id: 'ph1', img: 'pr-late-bus.png', noun: '跑向公車', join: '', ask: '他是怎麼跑向公車的', look: '再看看圖片，公車快開走了嗎？', options: ['急忙', '慢慢', '輕輕', '小聲'], clue: '提示：公車快開走了，他要快一點。', explain: '答案是「急忙」，公車快開走了，所以「急忙跑向公車」。' },
        { id: 'ph2', img: 'pr-turtle.png', noun: '爬過馬路', join: '', ask: '烏龜是怎麼爬過馬路的', look: '再看看圖片，烏龜爬得快嗎？', options: ['慢慢', '急忙', '大聲', '用力'], clue: '提示：烏龜爬得一點都不快。', explain: '答案是「慢慢」，烏龜爬得很慢，所以「慢慢爬過馬路」。' },
        { id: 'ph3', img: 'pr-baby-door.png', noun: '關上門', join: '', ask: '媽媽是怎麼關上門的', look: '再看看圖片，寶寶在睡覺，媽媽會怎麼關門？', options: ['輕輕', '用力', '大聲', '急忙'], clue: '提示：寶寶在睡覺，關門不能太大聲。', explain: '答案是「輕輕」，寶寶在睡覺，所以「輕輕關上門」。' },
        { id: 'ph4', img: 'pr-sing-loud.png', noun: '唱著歌', join: '', ask: '他是怎麼唱歌的', look: '再看看圖片，他的嘴巴張得大不大？', options: ['大聲', '輕輕', '慢慢', '小聲'], clue: '提示：他張大嘴巴，大家都聽得到。', explain: '答案是「大聲」，他唱得很大聲，所以「大聲唱著歌」。' },
        { id: 'ph5', img: 'pr-push-door.png', noun: '推開門', join: '', ask: '他是怎麼推開門的', look: '再看看圖片，門很重嗎？他有沒有很用力？', options: ['用力', '輕輕', '慢慢', '小聲'], clue: '提示：門很重，他咬著牙推。', explain: '答案是「用力」，門很重，所以「用力推開門」。' },
        { id: 'ph6', img: 'pr-whisper.png', noun: '說悄悄話', join: '', ask: '她是怎麼說悄悄話的', look: '再看看圖片，她說話大聲嗎？', options: ['小聲', '大聲', '用力', '急忙'], clue: '提示：說悄悄話，不能讓別人聽到。', explain: '答案是「小聲」，悄悄話要小聲說，所以「小聲說悄悄話」。' },
        { id: 'ph7', img: 'pr-pack-bag.png', noun: '收書包', join: '', ask: '他是怎麼收書包的', look: '再看看圖片，上課鐘快響了嗎？他的手動得快不快？', options: ['急忙', '慢慢', '輕輕', '大聲'], clue: '提示：放學的車子要開了，他手忙腳亂的收。', explain: '答案是「急忙」，他趕時間，所以「急忙收書包」。' },
        { id: 'ph8', img: 'pr-turn-page.png', noun: '翻著書', join: '', ask: '她是怎麼翻書的', look: '再看看圖片，書很舊、很容易破嗎？', options: ['輕輕', '用力', '大聲', '急忙'], clue: '提示：這本書很舊，翻太大力會破掉。', explain: '答案是「輕輕」，舊書要小心翻，所以「輕輕翻著書」。' }
      ],
      say: [],
      /* 第二個短語：做什麼＋一＋量詞疊字＋什麼樣子＋的＋東西（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '飄來一陣陣香香的味道', img: 'pz-smell.png',
          parts: [{ text: '飄來', role: '做什麼' }, { text: '一' }, { text: '陣陣', role: '量詞疊字' }, { text: '香香', role: '什麼樣子' }, { text: '的' }, { text: '味道', role: '什麼東西' }],
          explain: '先說做什麼，再說「一」加上量詞疊字，像一陣陣、一顆顆，再說什麼樣子，加上「的」，最後說是什麼東西。' },
        fill: [
          { id: 'pz1', img: 'pz-bubbles.png', parts: ['冒出', '一', '顆顆', '透明', '的', '泡泡'] },
          { id: 'pz2', img: 'pz-applause.png', parts: ['響起', '一', '陣陣', '熱烈', '的', '掌聲'] },
          { id: 'pz3', img: 'pz-birds-come.png', parts: ['飛來', '一', '隻隻', '可愛', '的', '小鳥'] },
          { id: 'pz4', img: 'pz-leaves-fall.png', parts: ['掉下', '一', '片片', '金黃', '的', '葉子'] },
          { id: 'pz5', img: 'pz-night-stars.png', parts: ['亮起', '一', '顆顆', '閃亮', '的', '星星'] }
        ]
      },
      words: [
        { word: '檢查', meaning: '仔細的看一看，找找有沒有問題。', img: 'check-car.png' }
      ],
      choose: [
        { id: 'pw1', word: '檢查', options: ['交考卷前，我先檢查有沒有寫錯。', '我把檢查放進冰箱。'], clue: '提示：想一想，哪一句是在仔細看有沒有問題？', explain: '第一句用得對：交考卷前仔細看一看。「檢查」不是東西，不能放進冰箱。' },
        { id: 'pw2', word: '檢查', options: ['醫生幫我檢查喉嚨。', '小鳥在樹上檢查唱歌。'], clue: '提示：想一想，哪一句是在仔細看有沒有問題？', explain: '第一句用得對：醫生仔細看喉嚨有沒有生病。小鳥唱歌不是檢查。' }
      ],
      make: [
        { id: 'pm1', word: '檢查', clue: '提示：想想看，出門以前、交作業以前，你會先仔細看什麼？', model: '出門以前，我會檢查書包有沒有帶齊。' }
      ]
    },
    pattern: [
      { key: 'chule', id: 'cl', title: '除了……還……', img: 'chule.png',
        meaning: '做一件事，可以有兩個好處；先用「除了」說第一個，再用「還」說第二個。',
        examples: ['去公園散步，除了可以運動，還可以看到美麗的花。'],
        match: [
          { id: 'pt-cl-m1', img: 'pt-read-happy.png', front: '看書除了可以學到新知識，', options: ['還可以讓心情變好。', '還會讓書變成小鳥。', '還可以吃下一整本書。'], clue: '提示：看書還有什麼好處？', explain: '答案是「還可以讓心情變好」：看書可以學東西，也讓人開心。' },
          { id: 'pt-cl-m2', img: 'pt-bike-view.png', front: '騎腳踏車除了可以運動，', options: ['還可以看看路邊的風景。', '還可以變成汽車。', '還會讓天空下雨。'], clue: '提示：看看圖片，騎車的時候還可以看到什麼？', explain: '答案是「還可以看看路邊的風景」：騎車可以運動，也能看風景。' },
          { id: 'pt-cl-m3', img: 'pt-chores-help.png', front: '幫忙做家事除了可以讓媽媽輕鬆，', options: ['還可以學會很多本領。', '還可以讓碗會說話。', '還可以讓地板飛起來。'], clue: '提示：做家事的人自己會得到什麼？', explain: '答案是「還可以學會很多本領」：幫忙做家事，自己也學到東西。' }
        ],
        conj: [
          { id: 'pt-cl-c1', full: '吃水果除了可以讓身體健康，還可以補充水分。', img: 'pt-fruit.png', sentence: '吃水果＿＿可以讓身體健康，＿可以補充水分。', options: ['除了……還……', '有人……有人……', '……才能……'], clue: '提示：吃水果有兩個好處。數數看有幾個空格。', explain: '答案是「除了……還……」：吃水果除了可以讓身體健康，還可以補充水分。' },
          { id: 'pt-cl-c2', full: '去動物園除了可以看大象，還可以看長頸鹿。', img: 'pt-zoo.png', sentence: '去動物園＿＿可以看大象，＿可以看長頸鹿。', options: ['除了……還……', '有人……有人……', '……才能……'], clue: '提示：去動物園可以看到兩種動物。數數看有幾個空格。', explain: '答案是「除了……還……」：去動物園除了可以看大象，還可以看長頸鹿。' },
          { id: 'pt-cl-c3', full: '學游泳除了可以運動，還可以保護自己。', img: 'pt-swim-safe.png', sentence: '學游泳＿＿可以運動，＿可以保護自己。', options: ['除了……還……', '有人……有人……', '……才能……'], clue: '提示：學游泳有兩個好處。數數看有幾個空格。', explain: '答案是「除了……還……」：學游泳除了可以運動，還可以保護自己。' }
        ],
        half: [
          { id: 'pt-cl-h1', front: '畫畫除了可以讓我開心，', clue: '提示：畫好的畫，還可以拿來做什麼？記得要說「還」。', model: '還可以送給家人當禮物。' },
          { id: 'pt-cl-h2', front: '早睡早起除了身體好，', clue: '提示：早睡早起，上課的時候會怎麼樣？記得要說「還」。', model: '上課還會很有精神。' }
        ],
        whole: [
          { id: 'pt-cl-w1', clue: '提示：先說做什麼事，再用「除了」和「還」說兩個好處。想想看：養小狗有什麼好處？', model: '養小狗除了可以陪我玩，還可以幫忙看家。' }
        ] },
      { key: 'youren', id: 'yr', title: '有人……有人……', img: 'youren.png',
        meaning: '說在同一個地方，大家在做不一樣的事。',
        examples: ['公園裡有人在跑步，有人在溜狗，大家都在享受好天氣。'],
        match: [
          { id: 'pt-yr-m1', img: 'pt-playground.png', front: '操場上有人在打球，', options: ['有人在跑步。', '有人在洗澡。', '有人在睡午覺。'], clue: '提示：看看圖片，操場上的人還在做什麼？', explain: '答案是「有人在跑步」：操場上有人打球，有人跑步。' },
          { id: 'pt-yr-m2', img: 'pt-night-fair.png', front: '夜市裡有人在買雞排，', options: ['有人在玩撈金魚。', '有人在上數學課。', '有人在刷牙。'], clue: '提示：看看圖片，夜市裡還有人在做什麼？', explain: '答案是「有人在玩撈金魚」：夜市裡有人買吃的，有人玩遊戲。' },
          { id: 'pt-yr-m3', img: 'pt-library-people.png', front: '圖書館裡有人在看書，', options: ['有人在借書。', '有人在打籃球。', '有人在大聲唱歌。'], clue: '提示：在圖書館裡，可以做什麼安靜的事？', explain: '答案是「有人在借書」：圖書館裡有人看書，有人借書。' }
        ],
        conj: [
          { id: 'pt-yr-c1', full: '教室裡有人在擦黑板，有人在掃地，大家都在打掃。', img: 'pt-class-clean.png', sentence: '教室裡＿＿在擦黑板，＿＿在掃地，大家都在打掃。', options: ['有人……有人……', '除了……還……', '……才能……'], clue: '提示：說教室裡不同的人在做不同的事。數數看有幾個空格。', explain: '答案是「有人……有人……」：教室裡有人在擦黑板，有人在掃地。' },
          { id: 'pt-yr-c2', full: '公園裡有人在跳舞，有人在打太極拳，好熱鬧。', img: 'pt-park-morning.png', sentence: '公園裡＿＿在跳舞，＿＿在打太極拳，好熱鬧。', options: ['有人……有人……', '除了……還……', '……才能……'], clue: '提示：說公園裡不同的人在做不同的事。數數看有幾個空格。', explain: '答案是「有人……有人……」：公園裡有人在跳舞，有人在打太極拳。' },
          { id: 'pt-yr-c3', full: '游泳池裡有人在游泳，有人在玩水，大家都很開心。', img: 'pt-pool-fun.png', sentence: '游泳池裡＿＿在游泳，＿＿在玩水，大家都很開心。', options: ['有人……有人……', '除了……還……', '……才能……'], clue: '提示：說游泳池裡不同的人在做不同的事。數數看有幾個空格。', explain: '答案是「有人……有人……」：游泳池裡有人在游泳，有人在玩水。' }
        ],
        half: [
          { id: 'pt-yr-h1', front: '海邊有人在堆沙堡，', clue: '提示：海邊還有人在做什麼？記得要說「有人」。', model: '有人在玩水。' },
          { id: 'pt-yr-h2', front: '廚房裡有人在洗菜，', clue: '提示：廚房裡還有人在做什麼？記得要說「有人」。', model: '有人在炒菜。' }
        ],
        whole: [
          { id: 'pt-yr-w1', clue: '提示：先說是什麼地方，再用兩個「有人」說大家在做不一樣的事。想想看：你家客廳晚上大家在做什麼？', model: '客廳裡有人在看電視，有人在看書。' }
        ] },
      { key: 'caineng', id: 'cn', title: '……才能……', img: 'caineng.png',
        meaning: '要先做到前面的事，才能有後面的結果。',
        examples: ['每天認真練習，才能把跳繩跳好。'],
        match: [
          { id: 'pt-cn-m1', img: 'pt-hw-first.png', front: '要先寫完作業，', options: ['才能出去玩。', '才能變成小鳥。', '才能讓太陽下山。'], clue: '提示：寫完作業以後，可以做什麼？', explain: '答案是「才能出去玩」：先寫完作業，才可以出去玩。' },
          { id: 'pt-cn-m2', img: 'pt-key-door.png', front: '記得帶鑰匙，', options: ['才能打開家門。', '才能長高。', '才能聽到音樂。'], clue: '提示：看看圖片，鑰匙是用來做什麼的？', explain: '答案是「才能打開家門」：有帶鑰匙，才能開門。' },
          { id: 'pt-cn-m3', img: 'pt-seed-water.png', front: '每天幫種子澆水，', options: ['才能長出小花。', '才能變成石頭。', '才能飛上天。'], clue: '提示：種子每天喝水，會長出什麼？', explain: '答案是「才能長出小花」：每天澆水，種子才會長出花。' }
        ],
        conj: [
          { id: 'pt-cn-c1', full: '多吃青菜，身體才能健康。', img: 'pt-eat-veg.png', sentence: '多吃青菜，身體＿＿健康。', options: ['……才能……', '除了……還……', '有人……有人……'], clue: '提示：要先多吃青菜，才會有健康的身體。數數看有幾個空格。', explain: '答案是「……才能……」：多吃青菜，身體才能健康。' },
          { id: 'pt-cn-c2', full: '過馬路要看紅綠燈，才能平平安安。', img: 'pt-cross-safe.png', sentence: '過馬路要看紅綠燈，＿＿平平安安。', options: ['……才能……', '除了……還……', '有人……有人……'], clue: '提示：要先看紅綠燈，才會平安。數數看有幾個空格。', explain: '答案是「……才能……」：過馬路要看紅綠燈，才能平平安安。' },
          { id: 'pt-cn-c3', full: '把玩具收好，房間才能乾乾淨淨。', img: 'pt-tidy-toys.png', sentence: '把玩具收好，房間＿＿乾乾淨淨。', options: ['……才能……', '除了……還……', '有人……有人……'], clue: '提示：要先收好玩具，房間才會乾淨。數數看有幾個空格。', explain: '答案是「……才能……」：把玩具收好，房間才能乾乾淨淨。' }
        ],
        half: [
          { id: 'pt-cn-h1', front: '上課要認真聽，', clue: '提示：認真聽課，會有什麼好結果？記得要說「才能」。', model: '才能學到新東西。' },
          { id: 'pt-cn-h2', front: '晚上早點睡，', clue: '提示：早點睡，早上會怎麼樣？記得要說「才能」。', model: '早上才能準時起床。' }
        ],
        whole: [
          { id: 'pt-cn-w1', clue: '提示：先說要做到什麼事，再用「才能」說會有什麼好結果。想想看：牙齒要怎樣才會健康？', model: '要好好刷牙，牙齒才能健康。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sound', name: '狀聲詞', meaning: '把聽到的聲音寫出來，例如叩囉叩囉、叮咚，讓人好像聽到了聲音。', example: '課文用注音寫出車子壞掉時發出的奇怪聲音。',
          show: { sentence: '車子發出噗噗噗的聲音，停了下來。', mark: ['噗噗噗'] },
          yesno: [
            { id: 'rh-so-y1', sentence: '門鈴叮咚叮咚的響了。', answer: true, mark: ['叮咚叮咚'], clue: '提示：這句話有沒有把聽到的聲音寫出來？', explain: '是狀聲詞：「叮咚叮咚」是門鈴的聲音。' },
            { id: 'rh-so-y2', sentence: '有人按了門鈴。', answer: false, clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '不是狀聲詞：這句話沒有寫出聲音。' }
          ],
          pick: [
            { id: 'rh-so-p1', mark: ['叭叭'], options: ['汽車叭叭的按喇叭。', '汽車按了喇叭。'], clue: '提示：哪一句把喇叭的聲音寫出來了？', explain: '「叭叭」是狀聲詞：寫出喇叭的聲音。' },
            { id: 'rh-so-p2', mark: ['咻'], options: ['煙火咻的一聲飛上天。', '煙火飛上了天空。'], clue: '提示：哪一句寫出了煙火的聲音？', explain: '「咻」是狀聲詞：寫出煙火飛上天的聲音。' },
            { id: 'rh-so-p3', mark: ['劈哩啪啦'], options: ['鞭炮劈哩啪啦的響。', '外面有人放鞭炮。', '鞭炮紅得像辣椒。'], clue: '提示：哪一句寫出了鞭炮的聲音？', explain: '「劈哩啪啦」是狀聲詞：寫出鞭炮的聲音。' },
            { id: 'rh-so-p4', mark: ['叩叩叩'], options: ['有人叩叩叩的敲門。', '有人在敲門。', '敲門的人很著急。'], clue: '提示：哪一句寫出了敲門的聲音？', explain: '「叩叩叩」是狀聲詞：寫出敲門的聲音。' },
            { id: 'rh-so-p5', mark: ['咕嚕咕嚕'], options: ['我的肚子咕嚕咕嚕的叫。', '我的肚子好餓。', '我餓得像一隻小狼。', '肚子在跟我說話。'], clue: '提示：哪一句寫出了肚子的聲音？', explain: '「咕嚕咕嚕」是狀聲詞：寫出肚子餓的聲音。' },
            { id: 'rh-so-p6', mark: ['滴答滴答'], options: ['時鐘滴答滴答的走著。', '時鐘一直在走。', '時間過得很快。', '時鐘像一個圓圓的月亮。'], clue: '提示：哪一句寫出了時鐘的聲音？', explain: '「滴答滴答」是狀聲詞：寫出時鐘的聲音。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，隔開來重複說好幾次，讀起來有節奏。', example: '課文裡「幸好……；幸好……」、「是啊，是啊」，把同一個詞重複說。',
          show: { sentence: '謝謝你，謝謝你，你幫了我們大忙！', mark: ['謝謝你'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '快一點，快一點，年夜飯要開始了！', answer: true, mark: ['快一點'], clue: '提示：找找看，有沒有同一句話說了好幾次？', explain: '是類疊：「快一點」說了兩次。' },
            { id: 'rh-rp-y2', sentence: '年夜飯要開始了，我們要快一點。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['新年快樂'], options: ['新年快樂，新年快樂，大家新年快樂！', '大家新年快樂！'], clue: '提示：哪一句有同一句話說了好幾次？', explain: '「新年快樂」說了好幾次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['幸好'], options: ['幸好有帶傘，幸好有穿外套。', '我有帶傘，也有穿外套。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「幸好」說了兩次，是類疊。' },
            { id: 'rh-rp-p3', mark: ['好想'], options: ['好想回家，好想吃年夜飯。', '我想回家吃年夜飯。', '年夜飯香噴噴的。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「好想」說了兩次，是類疊。' },
            { id: 'rh-rp-p4', mark: ['對啊'], options: ['對啊，對啊，你說得沒錯！', '你說得沒錯。', '你說得像老師一樣。'], clue: '提示：哪一句有同一句話，連著說了兩次？', explain: '「對啊，對啊」是類疊。' },
            { id: 'rh-rp-p5', mark: ['有人'], options: ['有人在唱歌，有人在跳舞。', '大家在唱歌跳舞。', '舞臺亮晶晶的。', '音樂在空中跳舞。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「有人」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['一路平安'], options: ['一路平安，一路平安，祝你們一路平安！', '祝你們平安回家。', '回家的路長長的。', '月亮陪著我們回家。'], clue: '提示：哪一句有同一句話，說了好幾次？', explain: '「一路平安」說了好幾次，是類疊。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「一陣陣」、「長長的路」。',
          show: { sentence: '天黑黑的，路長長的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '年夜飯香噴噴的。', answer: true, clue: '提示：形容年夜飯的字裡，有沒有同一個字連在一起？', explain: '是疊字：「噴噴」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '年夜飯很好吃。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['外面黑漆漆的。', '外面很黑。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「黑漆漆」是疊字：「漆漆」重複了。' },
            { id: 'rh-re-p2', options: ['師傅慢慢的把車子修好。', '師傅把車子修好。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「慢慢」是疊字。' },
            { id: 'rh-re-p3', options: ['桌上擺滿熱騰騰的年菜。', '桌上擺滿年菜。', '年菜多得像一座山。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「熱騰騰」是疊字：「騰騰」重複了。' },
            { id: 'rh-re-p4', options: ['小堂妹的臉圓圓的。', '小堂妹很可愛。', '小堂妹像一顆蘋果。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「圓圓」是疊字。' },
            { id: 'rh-re-p5', options: ['大家開開心心的過新年。', '大家一起過新年。', '新年像一場派對。', '新年在敲我們的門。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「開開心心」是疊字。' },
            { id: 'rh-re-p6', options: ['春聯紅通通的。', '門口貼著春聯。', '春聯像紅色的衣服。', '春聯向我們說恭喜。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「紅通通」是疊字：「通通」重複了。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '鞭炮砰砰砰的響個不停。', answer: '狀聲詞', mark: ['砰砰砰'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「狀聲詞」：「砰砰砰」是鞭炮的聲音。' },
        { id: 'rh2', sentence: '車子嘎的一聲停了下來。', answer: '狀聲詞', mark: ['嘎'], clue: '提示：「嘎」是什麼？', explain: '答案是「狀聲詞」：「嘎」是車子停下來的聲音。' },
        { id: 'rh3', sentence: '回家囉，回家囉，我們要回家過年囉！', answer: '類疊', mark: ['回家囉'], clue: '提示：有沒有同一句話，說了好幾次？', explain: '答案是「類疊」：「回家囉」說了好幾次。' },
        { id: 'rh4', sentence: '爺爺好，奶奶好，大家好！', answer: '類疊', mark: ['好'], clue: '提示：有沒有同一個字，隔開來說了好幾次？', explain: '答案是「類疊」：「好」隔開來說了好幾次。' },
        { id: 'rh5', sentence: '修車師傅笑嘻嘻的說新年快樂。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「嘻嘻」是同一個字連在一起重複用。' },
        { id: 'rh6', sentence: '天空亮晶晶的，都是煙火。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「晶晶」是同一個字連在一起重複用。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L11 = d; }
})(this);

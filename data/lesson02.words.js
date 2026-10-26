/* 第 2 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第二步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['小真和她的家人', '老師和同學', '醫生和護理師', '警察和消防員'], paras: [1, 2], why: '這一課在說小真，還有幫她想辦法的爸爸、一起出門的家人。' },
      { id: 'wh-shi', key: '事', options: ['小真用便利貼提醒自己，做事越來越有條理', '小真在學校比賽得到第一名', '小真把便利貼全部丟掉', '小真去動物園看動物'], paras: [1, 3], why: '小真以前很容易忘記事情，用了便利貼以後，事情都能一件一件做好。' },
      { id: 'wh-time', key: '時', options: ['隔天早上，七點以前就要出門', '中秋節的晚上', '暑假的時候', '下雪的星期天'], paras: [2], why: '媽媽隔天要開會，所以一家人第二天一早七點以前就得出發。' },
      { id: 'wh-di', key: '地', options: ['小真的家', '學校的操場', '海邊', '動物園'], paras: [2, 4], why: '便利貼貼在書桌前面、冰箱上，都是在小真的家裡。' },
      { id: 'wh-wu', key: '物', options: ['便利貼和鬧鐘', '雨傘和雨衣', '足球和球鞋', '蠟筆和畫紙'], paras: [1, 2], why: '小真用便利貼記下要做的事，睡覺前還設定好鬧鐘。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qd: 'extract', qe: 'extract', qc: 'infer', qf: 'infer', qh: 'infer',
      qg: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    /* 詮釋整合、比較評估的鷹架（老師要求：不能只給課文，要教孩子怎麼想、解釋為什麼選這個答案）：
       think 是提示裡「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ["小真以前做事是什麼樣子？", "用了便利貼以後，她變得怎麼樣？前後比一比。"], why: "小真以前常常忘東忘西，做事沒有順序。用便利貼把要做的事寫下來以後，她做事有了先後順序，計畫也能按時做完。" },
      qi: { think: ["小真自己怎麼用便利貼？", "課文後面說，她還幫誰用便利貼？"], why: "小真不只用便利貼安排自己的時間，後來也用它來提醒家裡的人，所以答案是提醒家人。" },
      qj: { think: ["「妙」是什麼意思？（很好、很巧妙）", "便利貼是又小又便宜的東西，它幫小真做到了什麼？"], why: "「妙用」就是用得很巧妙。便利貼又小又便宜，小真卻用它解決了常常忘記事情的大問題，所以叫「妙用便利貼」。" }
    },
    hanzi: [
      { id: 'h-貼', combo: {'layout': 'lr', 'parts': [['貝', 'm', '錢'], ['占', 's', '']]}, char: '貼', zhuyin: 'ㄊㄧㄝ', radical: '貝', strokes: 12, words: ['便利貼', '貼紙'], say: '貼，便利貼的貼', cloze: '便利＿', img: 'sticky-note.png', options: ['貼', '站', '帖', '點'], clue: '這個字的左邊，是貝字旁。', explain: '答案是「貼」，左邊是「貝」；「站」是車站的站，左邊是「立」。', parts: ['貝', '占'], story: '左邊的「貝」很久以前是錢，右邊的「占」念起來像「貼」。把東西黏在上面，就是「貼」。', sentence: '我把貼紙送給妹妹。', build: { layout: 'lr', show: ['？', '占'], answer: '貝', options: ['貝', '立', '口', '火'], clue: '想一想：很久以前，人們拿什麼海邊的東西當作錢？' } },
      { id: 'h-使', combo: {'layout': 'lr', 'parts': [['亻', 'm', '人'], ['吏', 's', '']]}, char: '使', zhuyin: 'ㄕˇ', radical: '人', strokes: 8, words: ['使用', '天使'], say: '使，使用的使', cloze: '＿用', img: 'use-scissors.png', options: ['使', '便', '史', '吏'], clue: '這個字的左邊是單人旁，右邊的上面有一個「口」。', explain: '答案是「使」；「便」的右邊是「更」，「史」沒有單人旁。', parts: ['亻', '吏'], story: '左邊是單人旁，右邊的「吏」是做事的官員。叫人去做事、拿東西來用，就是「使」。', sentence: '這把剪刀使用時要小心。', build: { layout: 'lr', show: ['？', '吏'], answer: '亻', options: ['亻', '口', '木', '扌'], clue: '想一想：叫人去做事，左邊放跟人有關的哪一個部首？' } },
      { id: 'h-醒', combo: {'layout': 'lr', 'parts': [['酉', 'm', '酒罈子'], ['星', 's', '']]}, char: '醒', zhuyin: 'ㄒㄧㄥˇ', radical: '酉', strokes: 16, words: ['提醒', '睡醒'], say: '醒，提醒的醒', cloze: '提＿', img: 'remind.png', options: ['醒', '星', '猩', '腥'], clue: '這個字的左邊是「酉」，右邊是「星」。', explain: '答案是「醒」；「星」是星星的星，左邊沒有「酉」；「猩」的左邊是犬字旁。', parts: ['酉', '星'], story: '左邊的「酉」像一個酒罈子，右邊的「星」念起來像「醒」。喝醉的人清楚過來，就是「醒」；把別人叫醒、讓他記得，就是「提醒」。', sentence: '鬧鐘一響，我就醒了。', build: { layout: 'lr', show: ['？', '星'], answer: '酉', options: ['酉', '犭', '日', '月'], clue: '想一想：「酒」的右邊是什麼？這個字的左邊也一樣。' } },
      { id: 'h-隔', combo: {'layout': 'lr', 'parts': [['阝', 'm', '小山坡'], ['鬲', 's', '']]}, char: '隔', zhuyin: 'ㄍㄜˊ', radical: '阜', strokes: 13, words: ['隔天', '隔壁'], say: '隔，隔天的隔', cloze: '＿天', img: 'next-morning.png', options: ['隔', '嗝', '福', '隨'], clue: '這個字的左邊，是耳朵旁。', explain: '答案是「隔」，左邊是耳朵旁；「嗝」的左邊是「口」，「福」的左邊是示字旁。', parts: ['阝', '鬲'], story: '左邊的耳朵旁像一座小山坡，把兩邊分開。中間被東西擋住、分開，就是「隔」。', sentence: '我家隔壁住著一位老爺爺。', build: { layout: 'lr', show: ['？', '鬲'], answer: '阝', options: ['阝', '口', '月', '礻'], clue: '想一想：和「除」、「附」的左邊一樣。' } },
      { id: 'h-準', combo: {'type': '形聲字', 'pict': '上面左邊是三點水，右邊是「隹」，下面是「十」。水面平平的，可以拿來量東西平不平，所以有「準確」的意思。'}, char: '準', zhuyin: 'ㄓㄨㄣˇ', radical: '水', strokes: 13, words: ['準時', '準備'], say: '準，準時的準', cloze: '＿時', img: 'on-time.png', options: ['準', '淮', '進', '誰'], clue: '這個字的下面，有一個「十」。', explain: '答案是「準」，下面有「十」；「淮」的下面沒有「十」，「進」有辵字旁。', parts: ['氵', '隹', '十'], story: '上面是三點水和「隹」，下面是「十」。水面平平的，量東西最準，所以說好幾點就幾點，叫「準時」。', sentence: '我每天準時起床。' },
      { id: 'h-睡', combo: {'layout': 'lr', 'parts': [['目', 'm', '眼睛'], ['垂', 's', '']]}, char: '睡', zhuyin: 'ㄕㄨㄟˋ', radical: '目', strokes: 13, words: ['睡覺', '睡衣'], say: '睡，睡覺的睡', cloze: '＿覺', img: 'go-sleep.png', options: ['睡', '垂', '錘', '捶'], clue: '這個字的左邊，是目字旁。', explain: '答案是「睡」，左邊是「目」；「垂」沒有目字旁，「錘」的左邊是「金」。', parts: ['目', '垂'], story: '左邊的「目」是眼睛，右邊的「垂」是往下掉。眼皮垂下來，閉上眼睛休息，就是「睡」。', sentence: '晚上九點，我上床睡覺。', build: { layout: 'lr', show: ['？', '垂'], answer: '目', options: ['目', '金', '扌', '口'], clue: '想一想：睡覺的時候，要閉上身體的哪個部分？' } },
      { id: 'h-鐘', combo: {'layout': 'lr', 'parts': [['金', 'm', '金屬'], ['童', 's', '']]}, char: '鐘', zhuyin: 'ㄓㄨㄥ', radical: '金', strokes: 20, words: ['鬧鐘', '時鐘'], say: '鐘，鬧鐘的鐘', cloze: '鬧＿', img: 'alarm-clock.png', options: ['鐘', '鍾', '童', '撞'], clue: '這個字的左邊是金字旁，右邊是「童」。', explain: '答案是「鐘」，右邊是「童」；「鍾」的右邊是「重」，「撞」的左邊是提手旁。', parts: ['金', '童'], story: '左邊是「金」，右邊的「童」念起來像「鐘」。很久以前的鐘是用銅做的，敲起來噹噹響。', sentence: '牆上的時鐘滴答響。', build: { layout: 'lr', show: ['？', '童'], answer: '金', options: ['金', '木', '扌', '口'], clue: '想一想：很久以前的鐘，是用亮亮的銅做的。' } },
      { id: 'h-效', combo: {'layout': 'lr', 'parts': [['交', 's', ''], ['攵', 'm', '手拿工具']]}, char: '效', zhuyin: 'ㄒㄧㄠˋ', radical: '攴', strokes: 10, words: ['有效', '效果'], say: '效，有效的效', cloze: '有＿', img: 'good-way.png', options: ['效', '郊', '校', '咬'], clue: '這個字的左邊是「交」，右邊是「攵」。', explain: '答案是「效」；「郊」的右邊是耳朵旁，「校」的左邊是「木」。', parts: ['交', '攵'], story: '左邊的「交」念起來像「效」，右邊的「攵」像手拿著工具。照著做，做出好結果，就是「有效」。', sentence: '這個方法很有效。', build: { layout: 'lr', show: ['交', '？'], answer: '攵', options: ['攵', '阝', '木', '口'], clue: '想一想：「放」和「收」的右邊是什麼？' } },
      { id: 'h-序', combo: {'type': '形聲字', 'pict': '外面的「广」像一間房子，裡面的「予」念起來像「序」。房子兩邊排得整整齊齊的牆，就是「序」，有先後排好的意思。'}, char: '序', zhuyin: 'ㄒㄩˋ', radical: '广', strokes: 7, words: ['次序', '順序'], say: '序，次序的序', cloze: '次＿', img: 'in-order.png', options: ['序', '予', '預', '野'], clue: '這個字的外面是「广」，裡面是「予」。', explain: '答案是「序」；「予」的外面沒有「广」，「野」的左邊是「里」。', parts: ['广', '予'], story: '外面是「广」，裡面的「予」念起來像「序」。東西照先後排好，就是「次序」。', sentence: '請大家照順序排隊。' },
      { id: 'h-而', combo: {'type': '象形字', 'pict': '很久以前的「而」，是畫下巴上垂下來的鬍子。後來借來當作連接句子的字。'}, char: '而', zhuyin: 'ㄦˊ', radical: '而', strokes: 6, words: ['而且', '反而'], say: '而，而且的而', cloze: '＿且', img: 'big-sweet.png', options: ['而', '面', '西', '耐'], clue: '這個字像下巴垂下來的鬍子，上面一橫一撇。', explain: '答案是「而」；「面」是臉的意思，裡面多了兩橫。', parts: ['而'], story: '很久以前的「而」，是畫下巴垂下來的鬍子。現在常用在「而且」，表示還有更多。', sentence: '這顆蘋果很大，而且很甜。' },
      { id: 'h-且', combo: {'type': '象形字', 'pict': '很久以前的「且」，像一塊疊起來的石碑，下面有一長橫當作底座。'}, char: '且', zhuyin: 'ㄑㄧㄝˇ', radical: '一', strokes: 5, words: ['而且', '並且'], say: '且，而且的且', cloze: '而＿', img: 'big-sweet.png', options: ['且', '旦', '目', '具'], clue: '這個字的下面是一長橫，上面像一個框，裡面有兩橫。', explain: '答案是「且」；「旦」的上面是「日」，「目」的下面沒有長長的底。', parts: ['且'], story: '「且」像一層一層疊起來的東西，下面有一長橫當底座。一層加一層，所以有「還有」的意思。', sentence: '他很聰明，並且很努力。' },
      { id: 'h-排', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['非', 's', '']]}, char: '排', zhuyin: 'ㄆㄞˊ', radical: '手', strokes: 11, words: ['安排', '排隊'], say: '排，安排的排', cloze: '安＿', img: 'plan-day.png', options: ['排', '悲', '非', '輩'], clue: '這個字的左邊是提手旁，右邊是「非」。', explain: '答案是「排」；「悲」的下面是「心」，「非」沒有提手旁。', parts: ['扌', '非'], story: '左邊是提手旁，右邊的「非」像兩排東西。用手把東西一個一個排好，就是「排」。', sentence: '買東西要排隊。', build: { layout: 'lr', show: ['？', '非'], answer: '扌', options: ['扌', '亻', '心', '口'], clue: '想一想：把東西一個一個擺好，要用身體的哪個部分？' } },
      { id: 'h-冰', combo: {'layout': 'lr', 'parts': [['冫', 'm', '結冰'], ['水', 's', '']]}, char: '冰', zhuyin: 'ㄅㄧㄥ', radical: '冫', strokes: 6, words: ['冰箱', '冰塊'], say: '冰，冰箱的冰', cloze: '＿箱', img: 'fridge.png', options: ['冰', '永', '泳', '沐'], clue: '這個字的左邊是兩點，右邊是「水」。', explain: '答案是「冰」，左邊是兩點；「泳」、「沐」的左邊是三點水，「永」沒有兩點。', parts: ['冫', '水'], story: '左邊的兩點是結冰的樣子，右邊是「水」。水凍起來，就是「冰」。', sentence: '果汁裡放了冰塊。', build: { layout: 'lr', show: ['？', '水'], answer: '冫', options: ['冫', '氵', '亻', '木'], clue: '想一想：水凍起來的時候，左邊只剩下兩點。' } },
      { id: 'h-箱', combo: {'layout': 'tb', 'parts': [['竹', 'm', '竹子'], ['相', 's', '']]}, char: '箱', zhuyin: 'ㄒㄧㄤ', radical: '竹', strokes: 15, words: ['冰箱', '紙箱'], say: '箱，冰箱的箱', cloze: '冰＿', img: 'fridge.png', options: ['箱', '相', '廂', '想'], clue: '這個字的上面是竹字頭，下面是「相」。', explain: '答案是「箱」，上面是竹字頭；「廂」的外面是「广」，「想」的下面是「心」。', parts: ['竹', '相'], story: '上面是竹字頭，下面的「相」念起來像「箱」。很久以前的箱子是用竹子編的，可以裝東西。', sentence: '牛奶放在冰箱裡。', build: { layout: 'tb', show: ['？', '相'], answer: '竹', options: ['竹', '艹', '雨', '心'], clue: '想一想：很久以前的箱子，是用一節一節的植物編成的。' } },
      { id: 'h-原', combo: {'type': '會意字', 'pict': '外面的「厂」像山崖，下面像泉水。水從山崖下流出來的地方，就是「原」，表示本來、一開始。'}, char: '原', zhuyin: 'ㄩㄢˊ', radical: '厂', strokes: 10, words: ['原來', '原本'], say: '原，原來的原', cloze: '＿來', img: 'found-pencil.png', options: ['原', '源', '願', '厚'], clue: '這個字的外面是「厂」，左邊沒有三點水。', explain: '答案是「原」；「源」的左邊多了三點水，「願」的右邊多了「頁」。', parts: ['厂', '泉'], story: '外面的「厂」像山崖，下面像泉水。水一開始流出來的地方，就是「原」，所以有「本來」的意思。', sentence: '我原本想去公園。' },
      { id: 'h-條', combo: {'type': '形聲字', 'pict': '右下角是「木」，就是樹。樹上長長的細枝，就是「條」。後來長長的東西都可以叫「條」。'}, char: '條', zhuyin: 'ㄊㄧㄠˊ', radical: '木', strokes: 11, words: ['便條', '條紋'], say: '條，便條的條', cloze: '便＿', img: 'memo-note.png', options: ['條', '修', '候', '悠'], clue: '這個字的右下角是「木」。', explain: '答案是「條」，右下角是「木」；「修」的右下角是三撇。', parts: ['亻', '丨', '攵', '木'], story: '右下角是「木」。樹上長長細細的枝條，就是「條」。寫字的長長小紙片，叫做「便條」。', sentence: '桌上有一張便條。' },
      { id: 'h-況', combo: {'layout': 'lr', 'parts': [['冫', 'm', '冷'], ['兄', 's', '']]}, char: '況', zhuyin: 'ㄎㄨㄤˋ', radical: '冫', strokes: 7, words: ['情況'], say: '況，情況的況', cloze: '情＿', img: 'look-outside.png', options: ['況', '兄', '說', '祝'], clue: '這個字的左邊是兩點，右邊是「兄」。', explain: '答案是「況」，左邊是兩點；「祝」的左邊是示字旁，「說」的左邊是言字旁。', parts: ['冫', '兄'], story: '左邊是兩點，右邊的「兄」念起來有點像「況」。事情現在是什麼樣子，就叫「情況」。', sentence: '下雨了，我們先看看情況。', build: { layout: 'lr', show: ['？', '兄'], answer: '冫', options: ['冫', '礻', '言', '亻'], clue: '想一想：這個字的左邊和「冰」的左邊一樣。' } }
    ],
    vocab: [
      { id: 'v-便利貼', word: '便利貼', meaning: '背面有一點點黏膠，可以貼上、再撕下來的小紙片。', example: '我把要做的事寫在＿＿＿上。', img: 'sticky-note.png', options: ['便利貼', '鬧鐘', '冰箱', '便條'] },
      { id: 'v-使用', cloze: true, clozeOptions: ['使用', '丟掉', '弄壞', '藏起'], word: '使用', meaning: '把東西拿來做事。', example: '這把剪刀很利，＿＿時要小心。', img: 'use-scissors.png', options: ['使用', '提醒', '安排', '睡覺'] },
      { id: 'v-明顯', cloze: true, clozeOptions: ['明顯', '隱藏', '黑暗', '安靜'], word: '明顯', meaning: '很清楚，一眼就看得到。', example: '他的白衣服上，有一塊很＿＿的污漬。', img: 'stain-shirt.png', options: ['明顯', '準時', '有效', '原來'] },
      { id: 'v-提醒', cloze: true, clozeOptions: ['提醒', '忘記', '打擾', '拿走'], word: '提醒', meaning: '告訴別人，讓他記得。', example: '媽媽＿＿我出門要帶雨傘。', img: 'remind.png', options: ['提醒', '使用', '睡覺', '安排'] },
      { id: 'v-隔天', cloze: true, clozeOptions: ['隔天', '昨天', '去年', '從前'], word: '隔天', meaning: '過了一個晚上，到了下一日。', example: '今天先把書包整理好，＿＿早上就不會忘東西。', img: 'next-morning.png', options: ['隔天', '準時', '次序', '而且'] },
      { id: 'v-準時', cloze: true, clozeOptions: ['準時', '遲到', '偷懶', '忘記'], word: '準時', meaning: '說好幾點就幾點，一分鐘也不晚。', example: '我們每天都要＿＿到學校。', img: 'on-time.png', options: ['準時', '隔天', '有效', '明顯'] },
      { id: 'v-睡覺', cloze: true, clozeOptions: ['睡覺', '跑步', '唱歌', '吃飯'], word: '睡覺', meaning: '閉上眼睛休息，進入夢鄉。', example: '晚上九點了，我該上床＿＿了。', img: 'go-sleep.png', options: ['睡覺', '使用', '提醒', '安排'] },
      { id: 'v-鬧鐘', word: '鬧鐘', meaning: '時間一到，就會響起來叫人起床的時鐘。', example: '早上六點，＿＿響了，我趕快起床。', img: 'alarm-clock.png', options: ['鬧鐘', '冰箱', '便利貼', '便條'] },
      { id: 'v-有效', cloze: true, clozeOptions: ['有效', '無聊', '失敗', '麻煩'], word: '有效', meaning: '做了以後，真的變好了。', example: '這個方法很＿＿，我再也沒有忘記帶作業。', img: 'good-way.png', options: ['有效', '明顯', '準時', '原來'] },
      { id: 'v-次序', cloze: true, clozeOptions: ['次序', '垃圾', '聲音', '顏色'], word: '次序', meaning: '先做什麼、後做什麼，一個接著一個。', example: '大家排好隊，照＿＿上車。', img: 'in-order.png', options: ['次序', '情況', '隔天', '便條'] },
      { id: 'v-而且', cloze: true, clozeOptions: ['而且', '雖然', '所以', '如果'], word: '而且', meaning: '表示還有更多的。', example: '這顆蘋果很大，＿＿很甜。', img: 'big-sweet.png', options: ['而且', '原來', '隔天', '準時'] },
      { id: 'v-安排', cloze: true, clozeOptions: ['安排', '忘記', '弄亂', '丟掉'], word: '安排', meaning: '先想好什麼時候做什麼事。', example: '爸爸＿＿好星期天要去動物園。', img: 'plan-day.png', options: ['安排', '提醒', '使用', '睡覺'] },
      { id: 'v-冰箱', word: '冰箱', meaning: '可以把食物冰起來、保持新鮮的電器。', example: '牛奶要放進＿＿裡。', img: 'fridge.png', options: ['冰箱', '鬧鐘', '便利貼', '情況'] },
      { id: 'v-原來', cloze: true, clozeOptions: ['原來', '突然', '已經', '從來'], word: '原來', meaning: '發現事情真相的時候用的詞。', example: '我找了好久的鉛筆，＿＿掉在椅子底下，終於找到了。', img: 'found-pencil.png', options: ['原來', '而且', '明顯', '有效'] },
      { id: 'v-便條', word: '便條', meaning: '隨手寫下要告訴別人的事，留下來的小紙條。', example: '媽媽在桌上留了一張＿＿，說她去買菜了。', img: 'memo-note.png', options: ['便條', '冰箱', '鬧鐘', '次序'] },
      { id: 'v-情況', word: '情況', meaning: '事情現在的樣子。', example: '下大雨了，老師先看看外面的＿＿，再決定要不要去操場。', img: 'look-outside.png', options: ['情況', '次序', '便條', '冰箱'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-貼', char: '貼', img: 'cw-stickers.png', charMeaning: '黏在上面。', word: '貼紙', meaning: '背面有黏膠，可以黏在東西上的小圖案。', example: '我把可愛的＿＿貼在筆記本上。', options: ['貼紙', '睡衣', '冰塊', '排隊'] },
      { id: 'cw-使', char: '使', img: 'cw-angel.png', charMeaning: '叫人做事；拿來用。', word: '天使', meaning: '故事裡有翅膀、心地善良的人物，也用來說很善良的人。', example: '她常常幫助別人，像＿＿一樣。', options: ['天使', '時鐘', '紙箱', '順序'] },
      { id: 'cw-醒', char: '醒', img: 'cw-wake-up.png', charMeaning: '睡飽了張開眼睛；讓人記得。', word: '睡醒', meaning: '睡飽了，張開眼睛。', example: '我＿＿以後，先去刷牙洗臉。', options: ['睡醒', '貼紙', '效果', '原本'] },
      { id: 'cw-隔', char: '隔', img: 'cw-neighbor.png', charMeaning: '中間分開；過了一段。', word: '隔壁', meaning: '旁邊的那一間房子。', example: '＿＿的阿姨送我們一盒水果。', options: ['隔壁', '天使', '冰塊', '條紋'] },
      { id: 'cw-準', char: '準', img: 'cw-pack-bag.png', charMeaning: '一點都不差；先弄好。', word: '準備', meaning: '先把要用的東西弄好。', example: '明天要去郊遊，我先＿＿好背包。', options: ['準備', '睡衣', '情況', '並且'] },
      { id: 'cw-睡', char: '睡', img: 'cw-pajamas.png', charMeaning: '閉上眼睛休息。', word: '睡衣', meaning: '睡覺時穿的衣服。', example: '洗完澡，我換上＿＿。', options: ['睡衣', '時鐘', '紙箱', '反而'] },
      { id: 'cw-鐘', char: '鐘', img: 'cw-wall-clock.png', charMeaning: '看時間、會報時的東西。', word: '時鐘', meaning: '掛在牆上或放在桌上，用來看時間的東西。', example: '牆上的＿＿滴答滴答的走。', options: ['時鐘', '貼紙', '隔壁', '原本'] },
      { id: 'cw-效', char: '效', img: 'cw-practice.png', charMeaning: '做了以後的好結果。', word: '效果', meaning: '做了以後得到的結果。', example: '每天練習跳繩，進步的＿＿很明顯。', options: ['效果', '準備', '排隊', '條紋'] },
      { id: 'cw-序', char: '序', img: 'cw-numbers-line.png', charMeaning: '先後排好。', word: '順序', meaning: '先、後排好的樣子。', example: '請照＿＿一個一個上台。', options: ['順序', '睡醒', '冰塊', '天使'] },
      { id: 'cw-而', char: '而', img: 'cw-medicine.png', charMeaning: '用來連接句子的字。', word: '反而', meaning: '跟原本想的剛好相反。', example: '吃了藥睡一覺，他的病沒有變嚴重，＿＿好多了。', options: ['反而', '冰塊', '隔壁', '時鐘'] },
      { id: 'cw-且', char: '且', img: 'cw-clean-room.png', charMeaning: '還有、再加上。', word: '並且', meaning: '和「而」字開頭的那個詞一樣，表示還有。', example: '他把房間掃乾淨，＿＿把垃圾拿去倒。', options: ['並且', '反而', '睡衣', '效果'] },
      { id: 'cw-排', char: '排', img: 'cw-line-up.png', charMeaning: '一個接一個擺好。', word: '排隊', meaning: '一個接一個站好，照先後輪流。', example: '買東西要＿＿，不可以插隊。', options: ['排隊', '準備', '紙箱', '睡醒'] },
      { id: 'cw-冰', char: '冰', img: 'cw-ice.png', charMeaning: '水凍起來變成的硬硬的東西。', word: '冰塊', meaning: '一塊一塊凍起來的冰。', example: '果汁裡放了幾顆＿＿，好涼快。', options: ['冰塊', '貼紙', '順序', '反而'] },
      { id: 'cw-箱', char: '箱', img: 'cw-box.png', charMeaning: '可以裝東西的盒子。', word: '紙箱', meaning: '用厚紙板做成的箱子。', example: '我們把舊玩具放進＿＿裡。', options: ['紙箱', '天使', '效果', '情況'] },
      { id: 'cw-原', char: '原', img: 'cw-rain-window.png', charMeaning: '本來、一開始。', word: '原本', meaning: '一開始、本來。', example: '我＿＿想去公園，可是下雨了。', options: ['原本', '時鐘', '排隊', '睡衣'] },
      { id: 'cw-條', char: '條', img: 'cw-stripes.png', charMeaning: '長長細細的東西。', word: '條紋', meaning: '一條一條的花紋。', example: '這件衣服上有藍白相間的＿＿。', options: ['條紋', '冰塊', '隔壁', '準備'] },
      { id: 'cw-況', char: '況', img: 'cw-traffic-jam.png', charMeaning: '事情的樣子。', word: '情況', meaning: '事情現在的樣子。', example: '路上塞車了，爸爸打電話問前面的＿＿。', options: ['情況', '紙箱', '天使', '順序'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-循序漸進', situationImg: 'id-step-swim.png', idiom: '循序漸進', char: '序', meaning: '照著先後，一步一步慢慢往前進步。', example: '學寫字要循序漸進，先把筆畫寫好。', situation: '小明學游泳，先練習踢水，再練習換氣，最後才游完一整趟。',
        fill: { options: ['學跳繩要＿＿＿＿，先學會跳一下，再跳很多下。', '他一下子就想做最難的題目，一點也沒有先練習，真是＿＿＿＿。'], clue: '提示：哪一句是一步一步慢慢來？', explain: '第一句用得對：先學跳一下，再跳很多下，是一步一步來。一下子就想做最難的，剛好相反。' } },
      { id: 'i-輕而易舉', situationImg: 'id-lift-box.png', idiom: '輕而易舉', char: '而', meaning: '非常輕鬆，一點都不費力。', example: '這題好簡單，他輕而易舉就答對了。', situation: '舉重選手只用一隻手，就把重重的箱子舉起來了，臉上還在笑。',
        fill: { options: ['這題好簡單，他＿＿＿＿就答對了。', '這箱子好重，我＿＿＿＿的搬了好久都搬不動。'], clue: '提示：哪一句是輕輕鬆鬆、不費力？', explain: '第一句用得對：題目簡單，一下就答對。搬了好久都搬不動，剛好相反。' } },
      { id: 'i-得過且過', situationImg: 'id-messy-homework.png', idiom: '得過且過', char: '且', meaning: '只想隨便混過去，不想認真做好。這不是好習慣。', example: '寫作業不能得過且過，寫完要認真檢查。', situation: '小華寫作業隨便亂寫，字歪歪的也不改，心想：「反正交出去就好了。」',
        fill: { options: ['他寫作業總是＿＿＿＿，從來不檢查。', '她＿＿＿＿的認真練習，最後得到了第一名。'], clue: '提示：哪一句是隨便混過去、不認真？', explain: '第一句用得對：從來不檢查，就是隨便混過去。認真練習得到第一名，不是這個意思。' } },
      { id: 'i-排山倒海', situationImg: 'id-big-waves.png', idiom: '排山倒海', char: '排', meaning: '力量非常大，好像能把山推倒、把海翻過來。', example: '颱風來了，大浪排山倒海的打上岸。', situation: '颱風天的海邊，好大好大的海浪一波接一波打上岸，聲音好嚇人。',
        fill: { options: ['大浪＿＿＿＿的打過來，大家趕快往後跑。', '小貓＿＿＿＿的輕輕走過來。'], clue: '提示：哪一句的力量非常非常大？', explain: '第一句用得對：大浪的力量很大。小貓輕輕走過來，力量很小。' } },
      { id: 'i-冰天雪地', situationImg: 'id-north-pole.png', idiom: '冰天雪地', char: '冰', meaning: '天氣非常冷，到處都結冰、下雪。', example: '北極是一個冰天雪地的地方。', situation: '北極到處都是白白的雪和冰，北極熊在冷冷的冰上走著。',
        fill: { options: ['北極是一個＿＿＿＿的地方，冷得不得了。', '夏天的海邊熱呼呼的，真是＿＿＿＿。'], clue: '提示：哪一句是說天氣非常冷？', explain: '第一句用得對：北極非常冷。夏天的海邊很熱，剛好相反。' } },
      { id: 'i-原封不動', situationImg: 'id-unopened-gift.png', idiom: '原封不動', char: '原', meaning: '保持本來的樣子，一點也沒有動過。', example: '他把借來的書原封不動的還回去。', situation: '生日禮物一直放在桌上，包裝紙和緞帶都沒有拆開過。',
        fill: { options: ['他把借來的玩具＿＿＿＿的還給同學。', '他把玩具拆得＿＿＿＿，零件散了一地。'], clue: '提示：哪一句是一點也沒有動過？', explain: '第一句用得對：玩具保持原來的樣子還回去。拆得零件散了一地，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-貼', char: '貼', wrong: '站', sentence: '我把貼紙送給妹妹。', options: ['貼', '站', '點'], clue: '這裡說的是可以黏在東西上的小圖案，想一想，哪一個字的左邊是貝字旁？', explain: '要改成「貼」。可以黏的小圖案是「貼紙」，左邊是「貝」；「站」是車站的站。' },
      { id: 'fx-使', char: '使', wrong: '便', sentence: '這把剪刀使用時要小心。', options: ['使', '便', '史'], clue: '這裡是說拿來用，想一想，哪一個字的右邊上面有「口」？', explain: '要改成「使」。拿來用是「使用」；「便」的右邊是「更」。' },
      { id: 'fx-醒', char: '醒', wrong: '星', sentence: '鬧鐘一響，我就醒了。', options: ['醒', '星', '猩'], clue: '這裡是說睡飽張開眼睛，想一想，哪一個字的左邊是「酉」？', explain: '要改成「醒」。張開眼睛是「醒」，左邊是「酉」；「星」是星星的星。' },
      { id: 'fx-隔', char: '隔', wrong: '福', sentence: '我家隔壁住著一位老爺爺。', options: ['隔', '福', '嗝'], clue: '這裡說的是旁邊那一間房子，想一想，哪一個字的左邊是耳朵旁？', explain: '要改成「隔」。旁邊那一間是「隔壁」，左邊是耳朵旁；「福」是幸福的福。' },
      { id: 'fx-準', char: '準', wrong: '淮', sentence: '我每天準時起床。', options: ['準', '淮', '進'], clue: '這裡是說說好幾點就幾點，想一想，哪一個字的下面有「十」？', explain: '要改成「準」。說好幾點就幾點是「準時」，下面有「十」；「淮」的下面沒有「十」。' },
      { id: 'fx-睡', char: '睡', wrong: '垂', sentence: '晚上九點，我上床睡覺。', options: ['睡', '垂', '錘'], clue: '這裡是說閉上眼睛休息，想一想，哪一個字的左邊是目字旁？', explain: '要改成「睡」。閉上眼睛休息是「睡覺」，左邊是「目」；「垂」沒有目字旁。' },
      { id: 'fx-鐘', char: '鐘', wrong: '鍾', sentence: '牆上的時鐘滴答響。', options: ['鐘', '鍾', '童'], clue: '這裡說的是看時間的東西，想一想，哪一個字的右邊是「童」？', explain: '要改成「鐘」。看時間的是「時鐘」，右邊是「童」；「鍾」的右邊是「重」。' },
      { id: 'fx-效', char: '效', wrong: '校', sentence: '這個方法很有效。', options: ['效', '校', '郊'], clue: '這裡是說真的有用，想一想，哪一個字的右邊是「攵」？', explain: '要改成「效」。真的有用是「有效」，右邊是「攵」；「校」是學校的校。' },
      { id: 'fx-序', char: '序', wrong: '予', sentence: '請大家照順序排隊。', options: ['序', '予', '野'], clue: '這裡是說先後排好，想一想，哪一個字的外面有「广」？', explain: '要改成「序」。先後排好是「順序」，外面有「广」；「予」沒有「广」。' },
      { id: 'fx-而', char: '而', wrong: '面', sentence: '這顆蘋果很大，而且很甜。', options: ['而', '面', '耐'], clue: '這裡是說還有更多，跟臉沒有關係。', explain: '要改成「而」。還有更多是「而且」；「面」是臉的意思。' },
      { id: 'fx-且', char: '且', wrong: '旦', sentence: '他很聰明，並且很努力。', options: ['且', '旦', '組'], clue: '這裡是說還有更多的事，想一想，哪一個字的下面是一長橫，上面像一個框，裡面有兩橫？', explain: '要改成「且」。還有更多是「並且」；「旦」的上面是「日」。' },
      { id: 'fx-排', char: '排', wrong: '非', sentence: '買東西要排隊。', options: ['排', '非', '悲'], clue: '這裡是說一個接一個站好，想一想，哪一個字的左邊是提手旁？', explain: '要改成「排」。一個接一個站好是「排隊」，左邊是提手旁；「非」沒有提手旁。' },
      { id: 'fx-冰', char: '冰', wrong: '水', sentence: '果汁裡放了冰塊。', options: ['冰', '水', '永'], clue: '這裡說的是凍起來的硬硬的東西，想一想，哪一個字的左邊是兩點？', explain: '要改成「冰」。凍起來的是「冰塊」，左邊是兩點；「水」沒有兩點。' },
      { id: 'fx-箱', char: '箱', wrong: '相', sentence: '牛奶放在冰箱裡。', options: ['箱', '相', '想'], clue: '這裡說的是可以把食物冰起來的電器，想一想，哪一個字的上面是竹字頭？', explain: '要改成「箱」。冰食物的電器是「冰箱」，上面是竹字頭；「相」沒有竹字頭。' },
      { id: 'fx-原', char: '原', wrong: '源', sentence: '我原本想去公園。', options: ['原', '源', '願'], clue: '這裡是說本來，想一想，哪一個字的左邊沒有三點水？', explain: '要改成「原」。本來是「原本」；「源」的左邊多了三點水。' },
      { id: 'fx-條', char: '條', wrong: '修', sentence: '桌上有一張便條。', options: ['條', '修', '候'], clue: '這裡說的是隨手寫下要告訴別人的小紙片，想一想，哪一個字的右下角是「木」？', explain: '要改成「條」。寫字的小紙條是「便條」，右下角是「木」；「修」的右下角是三撇。' },
      { id: 'fx-況', char: '況', wrong: '兄', sentence: '下雨了，我們先看看情況。', options: ['況', '兄', '祝'], clue: '這裡說的是事情的樣子，想一想，哪一個字的左邊是兩點？', explain: '要改成「況」。事情的樣子是「情況」，左邊是兩點；「兄」是哥哥的意思。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿用」是把東西拿來做事。', sentence: '這台電腦要小心＿用。', frame: '＿用', options: ['使', '便'], answer: '使', clue: '提示：這個字的右邊上面有一個「口」。', explain: '答案是「使」；「便」的右邊是「更」，是方便的便。' },
      { id: 's2', meaning: '「方＿」是順手、不麻煩。', sentence: '坐公車去學校很方＿。', frame: '方＿', options: ['便', '使'], answer: '便', clue: '提示：這個字的右邊是「更」。', explain: '答案是「便」；「使」是使用的使。' },
      { id: 's3', meaning: '「＿衣」是晚上上床時穿的衣服。', sentence: '洗完澡，我換上＿衣。', frame: '＿衣', options: ['睡', '垂'], answer: '睡', clue: '提示：這個字的左邊是目字旁。', explain: '答案是「睡」；「垂」沒有目字旁。' },
      { id: 's4', meaning: '「鬧＿」是會響起來叫人起床的東西。', sentence: '鬧＿一響，我就起床。', frame: '鬧＿', options: ['鐘', '鍾'], answer: '鐘', clue: '提示：這個字的右邊是「童」。', explain: '答案是「鐘」；「鍾」的右邊是「重」。' },
      { id: 's5', meaning: '「有＿」是真的有用。', sentence: '這個方法很有＿。', frame: '有＿', options: ['效', '郊'], answer: '效', clue: '提示：這個字的右邊是「攵」。', explain: '答案是「效」；「郊」是郊外的郊，右邊是耳朵旁。' },
      { id: 's6', meaning: '「＿遊」是到城市外面去玩。', sentence: '星期天我們去＿遊。', frame: '＿遊', options: ['郊', '效'], answer: '郊', clue: '提示：這句話在說出去玩，這個字的右邊是耳朵旁。', explain: '答案是「郊」；「效」是有效的效。' },
      { id: 's7', meaning: '「＿要」是一定得有。', sentence: '下雨天＿要帶雨傘。', frame: '＿要', options: ['需', '而'], answer: '需', clue: '提示：這個字的上面是雨字頭。', explain: '答案是「需」；「而」沒有雨字頭。' },
      { id: 's8', meaning: '「工＿」是做事時用的東西。', sentence: '鐵鎚是一種工＿。', frame: '工＿', options: ['具', '且'], answer: '具', clue: '提示：這個字的下面有兩點。', explain: '答案是「具」；「且」的下面是一長橫。' },
      { id: 's9', meaning: '「冰＿」是把食物冰起來的電器。', sentence: '牛奶放在冰＿裡。', frame: '冰＿', options: ['箱', '廂'], answer: '箱', clue: '提示：這個字的上面是竹字頭。', explain: '答案是「箱」；「廂」的外面是「广」。' },
      { id: 's10', meaning: '「車＿」是火車上坐人的地方。', sentence: '火車的車＿裡坐滿了人。', frame: '車＿', options: ['廂', '箱'], answer: '廂', clue: '提示：這個字的外面是「广」。', explain: '答案是「廂」；「箱」的上面是竹字頭。' },
      { id: 's11', meaning: '「＿本」是本來、一開始。', sentence: '我＿本想去公園。', frame: '＿本', options: ['原', '源'], answer: '原', clue: '提示：這個字的左邊沒有三點水。', explain: '答案是「原」；「源」的左邊多了三點水。' }
    ],
    listen: [
      { id: 'l1', text: '背面有一點黏膠，寫好字可以貼在桌上的小紙片。', answer: 0, options: [{ text: '便利貼', img: 'sticky-note.png' }, { text: '便條', img: 'memo-note.png' }, { text: '鬧鐘', img: 'alarm-clock.png' }, { text: '冰箱', img: 'fridge.png' }] },
      { id: 'l2', text: '早上六點，它響起來叫我起床。', answer: 0, options: [{ text: '鬧鐘', img: 'alarm-clock.png' }, { text: '冰箱', img: 'fridge.png' }, { text: '便利貼', img: 'sticky-note.png' }, { text: '便條', img: 'memo-note.png' }] },
      { id: 'l3', text: '牛奶、水果放在裡面，冰冰涼涼的不會壞。', answer: 0, options: [{ text: '冰箱', img: 'fridge.png' }, { text: '鬧鐘', img: 'alarm-clock.png' }, { text: '便條', img: 'memo-note.png' }, { text: '情況', img: 'look-outside.png' }] },
      { id: 'l4', text: '媽媽跟我說：「出門別忘了帶雨傘喔！」', answer: 0, options: [{ text: '提醒', img: 'remind.png' }, { text: '睡覺', img: 'go-sleep.png' }, { text: '使用', img: 'use-scissors.png' }, { text: '安排', img: 'plan-day.png' }] },
      { id: 'l5', text: '說好八點到，我八點就到了，一分鐘也沒有晚。', answer: 0, options: [{ text: '準時', img: 'on-time.png' }, { text: '隔天', img: 'next-morning.png' }, { text: '有效', img: 'good-way.png' }, { text: '次序', img: 'in-order.png' }] },
      { id: 'l6', text: '大家一個接一個，照先後排好上車。', answer: 0, options: [{ text: '次序', img: 'in-order.png' }, { text: '情況', img: 'look-outside.png' }, { text: '原來', img: 'found-pencil.png' }, { text: '隔天', img: 'next-morning.png' }] },
      { id: 'l7', text: '媽媽出門前，在桌上留了一張紙，寫著她去買菜了。', answer: 0, options: [{ text: '便條', img: 'memo-note.png' }, { text: '便利貼', img: 'sticky-note.png' }, { text: '冰箱', img: 'fridge.png' }, { text: '鬧鐘', img: 'alarm-clock.png' }] },
      { id: 'l8', text: '晚上九點，閉上眼睛，進入夢鄉。', answer: 0, options: [{ text: '睡覺', img: 'go-sleep.png' }, { text: '提醒', img: 'remind.png' }, { text: '安排', img: 'plan-day.png' }, { text: '使用', img: 'use-scissors.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看在什麼樣的地方。',
      /* 短語一：做什麼＋在＋什麼樣子＋的＋地方（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '躺在柔軟的草地上', img: 'pr-lie-grass.png',
        parts: [{ text: '躺', role: '做什麼' }, { text: '在' }, { text: '柔軟', role: '什麼樣子' }, { text: '的' }, { text: '草地上', role: '什麼地方' }],
        explain: '先說做什麼，加上「在」，再說那個地方是什麼樣子，加上「的」，最後說是什麼地方。' },
      pick: [
        { id: 'ph1', img: 'pr-hang-high.png', before: '掛在', noun: '牆上', ask: '畫掛在什麼樣的牆上', look: '再看看圖片，畫掛得高不高？', options: ['高高', '低低', '濕濕', '黑黑'], clue: '提示：畫掛得比爸爸的頭還高。', explain: '答案是「高高」，畫掛得很高，所以「掛在高高的牆上」。' },
        { id: 'ph2', img: 'pr-cat-dark.png', before: '躲在', noun: '角落', ask: '小貓躲在什麼樣的角落', look: '再看看圖片，那個角落亮不亮？', options: ['黑暗', '明亮', '熱鬧', '乾淨'], clue: '提示：那個角落暗暗的，幾乎看不清楚。', explain: '答案是「黑暗」，角落暗暗的，所以「躲在黑暗的角落」。' },
        { id: 'ph3', img: 'pr-juice-fridge.png', before: '放在', noun: '冰箱裡', ask: '果汁放在什麼樣的冰箱裡', look: '再看看圖片，冰箱裡冷不冷？', options: ['冰涼', '溫暖', '乾燥', '吵鬧'], clue: '提示：冰箱裡冒著冷冷的白氣。', explain: '答案是「冰涼」，冰箱裡很冷，所以「放在冰涼的冰箱裡」。' },
        { id: 'ph4', img: 'pr-curvy-path.png', before: '走在', noun: '小路上', ask: '他們走在什麼樣的小路上', look: '再看看圖片，小路是直直的嗎？', options: ['彎彎', '寬寬', '高高', '亮亮'], clue: '提示：小路轉來轉去，不是直直的。', explain: '答案是「彎彎」，小路轉來轉去，所以「走在彎彎的小路上」。' },
        { id: 'ph5', img: 'pr-sofa.png', before: '坐在', noun: '沙發上', ask: '爺爺坐在什麼樣的沙發上', look: '再看看圖片，爺爺坐得舒不舒服？', options: ['舒服', '刺刺', '髒髒', '吵鬧'], clue: '提示：爺爺靠在軟軟的墊子上，都快睡著了。', explain: '答案是「舒服」，爺爺坐得很舒服，所以「坐在舒服的沙發上」。' },
        { id: 'ph6', img: 'pr-whiteboard.png', before: '寫在', noun: '白板上', ask: '老師寫在什麼樣的白板上', look: '再看看圖片，白板是乾淨的，還是髒髒的？', options: ['乾淨', '髒亂', '濕濕', '彎彎'], clue: '提示：白板剛剛擦過，一點灰都沒有。', explain: '答案是「乾淨」，白板剛擦好，所以「寫在乾淨的白板上」。' },
        { id: 'ph7', img: 'pr-small-pot.png', before: '種在', noun: '花盆裡', ask: '小花種在什麼樣的花盆裡', look: '再看看圖片，花盆大不大？', options: ['小小', '大大', '空空', '破破'], clue: '提示：花盆小得可以放在手掌上。', explain: '答案是「小小」，花盆很小，所以「種在小小的花盆裡」。' },
        { id: 'ph8', img: 'pr-busy-street.png', before: '站在', noun: '街上', ask: '他站在什麼樣的街上', look: '再看看圖片，街上的人多不多？', options: ['熱鬧', '安靜', '空空', '黑暗'], clue: '提示：街上好多人走來走去。', explain: '答案是「熱鬧」，街上人很多，所以「站在熱鬧的街上」。' }
      ],
      say: [],
      /* 第二個短語：誰＋做什麼＋變得有＋改變成什麼樣子（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '弟弟吃飯變得有規矩', img: 'pz-eat-manners.png',
          parts: [{ text: '弟弟', role: '誰' }, { text: '吃飯', role: '做什麼' }, { text: '變得有' }, { text: '規矩', role: '變成什麼樣子' }],
          explain: '先說是誰、做什麼事，再說「變得有」，最後說變成什麼樣子，表示和以前不一樣了。' },
        fill: [
          { id: 'pz1', img: 'pz-sing-brave.png', parts: ['妹妹', '唱歌', '變得有', '自信'] },
          { id: 'pz2', img: 'pz-strong-ball.png', parts: ['哥哥', '打球', '變得有', '力氣'] },
          { id: 'pz3', img: 'pz-lively-dog.png', parts: ['小狗', '走路', '變得有', '精神'] },
          { id: 'pz4', img: 'pz-draw-better.png', parts: ['姐姐', '畫畫', '變得有', '進步'] },
          { id: 'pz5', img: 'pz-fast-homework.png', parts: ['我', '寫作業', '變得有', '效率'] }
        ]
      },
      words: [
        { word: '果然', meaning: '事情的結果，跟原本想的一樣。', img: 'pz-rain-came.png' }
      ],
      choose: [
        { id: 'pw1', word: '果然', options: ['氣象說下午會下雨，果然下午就下雨了。', '我果然不知道明天會不會下雨。'], clue: '提示：想一想，哪一句的結果跟原本想的一樣？', explain: '第一句用得對：說會下雨，後來真的下雨了。第二句沒有先想到什麼結果。' },
        { id: 'pw2', word: '果然', options: ['老師說這本書很好看，我看了果然很喜歡。', '果然是一種好吃的水果。'], clue: '提示：想一想，「果然」是東西的名字嗎？', explain: '第一句用得對：老師說好看，看了真的喜歡。「果然」不是水果的名字。' }
      ],
      make: [
        { id: 'pm1', word: '果然', clue: '提示：先說別人說了什麼，或你本來想到什麼，再用「果然」說結果真的一樣。', model: '媽媽說這碗湯很燙，我喝一口，果然很燙。' }
      ]
    },
    pattern: [
      { key: 'weile', id: 'wl', title: '為了……', img: 'weile.png',
        meaning: '先用「為了」說想做到的事，再說為了這件事，做了什麼。',
        examples: ['為了不遲到，哥哥前一天晚上就把書包整理好。'],
        match: [
          { id: 'pt-wl-m1', img: 'pt-umbrella.png', front: '為了不被雨淋濕，', options: ['我出門帶了一把雨傘。', '我把鞋子放進冰箱。', '我在家裡唱歌。'], clue: '提示：看看圖片，外面在下雨，要帶什麼？', explain: '答案是「我出門帶了一把雨傘」：不想淋濕，所以帶雨傘。' },
          { id: 'pt-wl-m2', img: 'pt-brush-teeth.png', front: '為了讓牙齒健康，', options: ['我每天認真刷牙。', '我每天吃很多糖果。', '我晚上不睡覺。'], clue: '提示：要怎麼做，牙齒才會健康？', explain: '答案是「我每天認真刷牙」：為了牙齒健康，要好好刷牙。' },
          { id: 'pt-wl-m3', img: 'pt-water-flower.png', front: '為了讓花長得漂亮，', options: ['妹妹每天幫花澆水。', '妹妹把花放進衣櫃。', '妹妹把花剪光。'], clue: '提示：看看圖片，妹妹拿著什麼？', explain: '答案是「妹妹每天幫花澆水」：為了花長得好，要每天澆水。' }
        ],
        conj: [
          { id: 'pt-wl-c1', full: '為了買禮物給媽媽，弟弟把零用錢存起來。', img: 'pt-piggy-bank.png', sentence: '＿＿買禮物給媽媽，弟弟把零用錢存起來。', options: ['為了……', '……，而且……', '……一會兒……一會兒……'], clue: '提示：弟弟存錢，是想做到什麼事？數數看有幾個空格。', explain: '答案是「為了……」：為了買禮物給媽媽，弟弟把零用錢存起來。' },
          { id: 'pt-wl-c2', full: '為了看日出，我們很早就起床了。', img: 'pt-sunrise.png', sentence: '＿＿看日出，我們很早就起床了。', options: ['為了……', '……，而且……', '……一會兒……一會兒……'], clue: '提示：很早起床，是想做到什麼事？數數看有幾個空格。', explain: '答案是「為了……」：為了看日出，我們很早就起床了。' },
          { id: 'pt-wl-c3', full: '為了保護眼睛，看書的時候要開燈。', img: 'pt-read-lamp.png', sentence: '＿＿保護眼睛，看書的時候要開燈。', options: ['為了……', '……，而且……', '……一會兒……一會兒……'], clue: '提示：看書開燈，是想做到什麼事？數數看有幾個空格。', explain: '答案是「為了……」：為了保護眼睛，看書的時候要開燈。' }
        ],
        half: [
          { id: 'pt-wl-h1', front: '為了跑得更快，', clue: '提示：想跑得更快，要怎麼做？', model: '我每天到操場練習。' },
          { id: 'pt-wl-h2', front: '為了不忘記帶作業，', clue: '提示：要怎麼做，才不會忘記帶作業？', model: '我寫完就馬上放進書包。' }
        ],
        whole: [
          { id: 'pt-wl-w1', clue: '提示：先用「為了」說你想做到什麼，再說你會怎麼做。想想看：為了身體健康，你會做什麼？', model: '為了身體健康，我每天都吃青菜。' }
        ] },
      { key: 'erqie', id: 'eq', title: '……，而且……', img: 'erqie.png',
        meaning: '先說一個好地方，再用「而且」說另一個更進一步的好地方。',
        examples: ['這家麵包店的麵包很香，而且價錢很便宜。'],
        match: [
          { id: 'pt-eq-m1', img: 'pt-watermelon.png', front: '這顆西瓜很大，', options: ['而且吃起來很甜。', '而且會唱歌。', '而且會飛。'], clue: '提示：西瓜除了大，吃起來怎麼樣？', explain: '答案是「而且吃起來很甜」：西瓜又大又甜。' },
          { id: 'pt-eq-m2', img: 'pt-helpful-girl.png', front: '小美很聰明，', options: ['而且很樂意幫助同學。', '而且是一隻小狗。', '而且住在月亮上。'], clue: '提示：看看圖片，小美在做什麼？', explain: '答案是「而且很樂意幫助同學」：小美聰明又愛幫助人。' },
          { id: 'pt-eq-m3', img: 'pt-big-park.png', front: '這座公園很大，', options: ['而且有好多好玩的遊樂器材。', '而且可以放進口袋裡。', '而且會走路。'], clue: '提示：看看圖片，公園裡有什麼？', explain: '答案是「而且有好多好玩的遊樂器材」：公園很大，又好玩。' }
        ],
        conj: [
          { id: 'pt-eq-c1', full: '這件外套很溫暖，而且很輕。', img: 'pt-light-coat.png', sentence: '這件外套很溫暖，＿＿很輕。', options: ['……，而且……', '為了……', '……一會兒……一會兒……'], clue: '提示：外套有兩個好地方。數數看有幾個空格。', explain: '答案是「……，而且……」：這件外套很溫暖，而且很輕。' },
          { id: 'pt-eq-c2', full: '妹妹會自己綁鞋帶，而且會自己穿衣服。', img: 'pt-tie-shoes.png', sentence: '妹妹會自己綁鞋帶，＿＿會自己穿衣服。', options: ['……，而且……', '為了……', '……一會兒……一會兒……'], clue: '提示：妹妹會做兩件事。數數看有幾個空格。', explain: '答案是「……，而且……」：妹妹會自己綁鞋帶，而且會自己穿衣服。' },
          { id: 'pt-eq-c3', full: '這本書很有趣，而且圖片很漂亮。', img: 'pt-fun-book.png', sentence: '這本書很有趣，＿＿圖片很漂亮。', options: ['……，而且……', '為了……', '……一會兒……一會兒……'], clue: '提示：這本書有兩個好地方。數數看有幾個空格。', explain: '答案是「……，而且……」：這本書很有趣，而且圖片很漂亮。' }
        ],
        half: [
          { id: 'pt-eq-h1', front: '我的小狗很可愛，', clue: '提示：小狗還有什麼好地方？記得要說「而且」。', model: '而且很聽話。' },
          { id: 'pt-eq-h2', front: '今天的天氣很晴朗，', clue: '提示：天氣還有什麼好的地方？記得要說「而且」。', model: '而且不會太熱。' }
        ],
        whole: [
          { id: 'pt-eq-w1', clue: '提示：先說一個人或東西的好地方，再用「而且」說另一個好地方。想想看：你的好朋友有什麼優點？', model: '我的好朋友很幽默，而且很會畫畫。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「時時刻刻」、「漸漸的」。',
          show: { sentence: '小貓慢慢的走過來。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '媽媽每天都笑咪咪的。', answer: true, clue: '提示：形容媽媽的字裡，有沒有同一個字連在一起？', explain: '是疊字：「咪咪」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '媽媽每天都很開心。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['我把房間整理得乾乾淨淨。', '我把房間整理好了。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「乾乾淨淨」是疊字。' },
            { id: 'rh-re-p2', options: ['小明輕輕的關上門。', '小明關上門。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「輕輕」是疊字。' },
            { id: 'rh-re-p3', options: ['便利貼上寫得清清楚楚。', '便利貼上寫了字。', '便利貼像一片小葉子。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「清清楚楚」是疊字。' },
            { id: 'rh-re-p4', options: ['小美天天都準時起床。', '小美每一天都準時起床。', '小美起床像一隻小鳥。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「天天」是疊字：「天」重複了。' },
            { id: 'rh-re-p5', options: ['大家高高興興的出門。', '大家一起出門。', '出門像在比賽。', '門在對我們說再見。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「高高興興」是疊字。' },
            { id: 'rh-re-p6', options: ['我把書包背得穩穩的。', '我背好書包了。', '書包像一座小山。', '書包在跟我說話。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「穩穩」是疊字。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，重複說兩次以上，讀起來有節奏。', example: '課文裡的「忘東忘西」，把「忘」隔開來重複說。',
          show: { sentence: '一件事，兩件事，三件事，全部做完了！', mark: ['件事'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '洗好了臉，刷好了牙，換好了衣服。', answer: true, mark: ['好了'], clue: '提示：找找看，有沒有同一個詞說了好幾次？', explain: '是類疊：「好了」說了好幾次。' },
            { id: 'rh-rp-y2', sentence: '我已經準備好出門了。', answer: false, clue: '提示：這句話裡，有沒有同一個詞說了好幾次？', explain: '不是類疊：這句話沒有重複說同一個詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['打個勾'], options: ['做完一件，打個勾；再做一件，再打個勾。', '做完事情要打勾。'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「打個勾」說了兩次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['找'], options: ['他東找西找，就是找不到鉛筆。', '他一直沒有看到鉛筆。'], clue: '提示：哪一句有同一個字，隔開來說了好幾次？', explain: '「找」隔開來說了好幾次，是類疊。' },
            { id: 'rh-rp-p3', mark: ['提醒'], options: ['提醒爸爸，也提醒媽媽。', '我會跟家人說。', '便利貼像小老師。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「提醒」說了兩次，是類疊。' },
            { id: 'rh-rp-p4', mark: ['一張'], options: ['一張寫功課，一張寫整理書包。', '我寫了兩張便利貼。', '便利貼很好用。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「一張」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['做完'], options: ['做完功課，做完家事，再出去玩。', '我把事情都做好了。', '玩具在等我。', '時間像小河。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「做完」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['記得'], options: ['記得帶水壺，記得帶外套。', '出門要帶東西。', '水壺像一個小瓶子。', '外套在門口等我。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「記得」說了兩次，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '媽媽的手暖暖的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「暖暖」是同一個字連在一起重複用。' },
        { id: 'rh2', sentence: '小狗的眼睛圓圓的。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「圓圓」是同一個字連在一起重複用。' },
        { id: 'rh3', sentence: '吃完飯，洗完碗，掃完地。', answer: '類疊', mark: ['完'], clue: '提示：有沒有同一個字，隔開來說了好幾次？', explain: '答案是「類疊」：「完」隔開來說了好幾次。' },
        { id: 'rh4', sentence: '早上要記得，晚上也要記得。', answer: '類疊', mark: ['要記得'], clue: '提示：有沒有同一句話，說了兩次？', explain: '答案是「類疊」：「要記得」說了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L02 = d; }
})(this);

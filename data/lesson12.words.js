/* 第 12 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 課文地圖畫成樹狀圖（照課本的課文結構表） */
    mapLayout: 'tree',
    /* 人事時地物（課文地圖的第二步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['我們一家人、爺爺奶奶、叔叔嬸嬸和小堂妹', '老師和同學', '醫生和護理師', '警察和司機'], paras: [2, 3], why: '全家人在爺爺家，叔叔、嬸嬸和小堂妹在視訊的另一邊。' },
      { id: 'wh-shi', key: '事', options: ['用視訊和叔叔嬸嬸一起過年團圓', '全家一起出國旅行', '全家去海邊放風箏', '在學校開運動會'], paras: [3, 7], why: '嬸嬸要在月子中心休息，大家就用平板電腦視訊，一起過年。' },
      { id: 'wh-time', key: '時', options: ['除夕夜', '中秋節', '暑假', '端午節'], paras: [1], why: '課文一開始就說，是除夕夜在路上。' },
      { id: 'wh-di', key: '地', options: ['爺爺奶奶家的客廳', '學校的教室', '動物園', '海邊'], paras: [2], why: '一大家子擠在爺爺家的客廳，一起看平板電腦。' },
      { id: 'wh-wu', key: '物', options: ['平板電腦和紅包', '風箏和皮球', '粽子和龍舟', '書包和課本'], paras: [4, 6], why: '團圓桌上擺了平板電腦，奶奶還拿出紅包給小堂妹。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qd: 'extract', qf: 'extract', qg: 'extract', qb: 'infer', qc: 'infer', qh: 'infer',
      qe: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    /* 詮釋整合、比較評估的鷹架（老師要求：不能只給課文，要教孩子怎麼想、解釋為什麼選這個答案）：
       think 是提示裡「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qe: { think: ["嬸嬸剛生了小寶寶，現在在哪裡？", "她在那裡最需要什麼？"], why: "嬸嬸剛生完小寶寶，要在月子中心休息、把身體養好，不方便回來。為了不讓她累到，大家就用平板電腦和她見面說話。" },
      qi: { think: ["感情好的家人，會怎麼對待彼此？", "家人為嬸嬸想了什麼辦法？奶奶又準備了什麼？"], why: "大家替嬸嬸著想，讓她好好休息，還一起視訊問候，奶奶也準備紅包送給小堂妹。互相關心、替對方著想，就是感情很好。" },
      qj: { think: ["題目是「不一樣的團圓」：家人沒有都在同一個地方，還算不算團圓？", "一句一句想：哪一句話在說「家人」和「家」的關係？"], why: "這次過年，家人沒有都在一起，但大家用視訊見面、互相關心，一樣是團圓。叔叔說的那句話，意思是只要家人的心在一起，那裡就是家，最能說出這一課想告訴我們的事。" }
    },
    hanzi: [
      { id: 'h-剩', combo: {'layout': 'lr', 'parts': [['乘', 's', ''], ['刂', 'm', '刀']]}, char: '剩', zhuyin: 'ㄕㄥˋ', radical: '刀', strokes: 12, words: ['剩下', '剩飯'], say: '剩，剩下的剩', cloze: '＿下', img: 'leftover.png', options: ['剩', '乘', '利', '勝'], clue: '這個字的右邊，是立刀旁。', explain: '答案是「剩」，右邊是立刀旁；「乘」是乘車的乘，沒有立刀旁。', parts: ['乘', '刂'], story: '左邊的「乘」念起來像「剩」，右邊是立刀旁。用刀切走一些，留下來沒用完的，就是「剩」。', sentence: '蛋糕只剩下最後一塊。', build: { layout: 'lr', show: ['乘', '？'], answer: '刂', options: ['刂', '力', '又', '寸'], clue: '想一想：用刀切下一塊，右邊要放哪一個跟刀有關的部首？' } },
      { id: 'h-默', combo: {'layout': 'lr', 'parts': [['黑', 's', ''], ['犬', 'm', '狗']]}, char: '默', zhuyin: 'ㄇㄛˋ', radical: '黑', strokes: 16, words: ['默默', '默寫'], say: '默，默默的默', cloze: '默＿', img: 'quiet-window.png', options: ['默', '點', '黑', '墨'], clue: '這個字的左邊是「黑」，右邊是一隻狗。', explain: '答案是「默」，右邊是「犬」；「點」的右邊是「占」，「墨」的下面是「土」。', parts: ['黑', '犬'], story: '左邊是「黑」，右邊的「犬」就是狗。黑夜裡的狗靜靜的不叫，就是「默」，不說話的意思。', sentence: '老師念語詞，我們默寫在本子上。' },
      { id: 'h-樓', combo: {'layout': 'lr', 'parts': [['木', 'm', '木頭'], ['婁', 's', '']]}, char: '樓', zhuyin: 'ㄌㄡˊ', radical: '木', strokes: 15, words: ['上樓', '大樓'], say: '樓，上樓的樓', cloze: '上＿', img: 'upstairs.png', options: ['樓', '數', '屢', '婁'], clue: '這個字的左邊，是木字旁。', explain: '答案是「樓」，左邊是「木」；「數」是數學的數，右邊是「攵」。', parts: ['木', '婁'], story: '左邊是「木」，右邊的「婁」念起來像「樓」。很久以前，一層一層的房子是用木頭蓋的，就是「樓」。', sentence: '我們搭電梯上樓。', build: { layout: 'lr', show: ['？', '婁'], answer: '木', options: ['木', '女', '米', '禾'], clue: '想一想：很久以前，一層一層的房子是用什麼蓋的？' } },
      { id: 'h-訊', combo: {'layout': 'lr', 'parts': [['言', 'm', '說話'], ['卂', 's', '']]}, char: '訊', zhuyin: 'ㄒㄩㄣˋ', radical: '言', strokes: 10, words: ['視訊', '訊息'], say: '訊，視訊的訊', cloze: '視＿', img: 'video-call.png', options: ['訊', '迅', '計', '信'], clue: '這個字的左邊，是言字旁。', explain: '答案是「訊」，左邊是「言」；「迅」是迅速的迅，有辵字旁。', parts: ['言', '卂'], story: '左邊是「言」，就是說話。右邊的「卂」念起來像「訊」。把話傳給別人知道，就是「訊息」。', sentence: '爸爸傳了一則訊息給媽媽。', build: { layout: 'lr', show: ['？', '卂'], answer: '言', options: ['言', '辶', '扌', '口'], clue: '想一想：把消息告訴別人，要靠說話，左邊放什麼？' } },
      { id: 'h-視', combo: {'layout': 'lr', 'parts': [['礻', 's', ''], ['見', 'm', '看見']]}, char: '視', zhuyin: 'ㄕˋ', radical: '見', strokes: 12, words: ['視訊', '電視'], say: '視，視訊的視', cloze: '＿訊', img: 'video-call.png', options: ['視', '現', '見', '祝'], clue: '這個字的左邊是示字旁，右邊是「見」。', explain: '答案是「視」；「現」的左邊是「王」，「祝」的右邊是「兄」。', parts: ['礻', '見'], story: '右邊是「見」，就是用眼睛看。左邊的示字旁念起來像「視」。用眼睛仔細看，就是「視」。', sentence: '晚上，全家一起看電視。' },
      { id: 'h-叔', combo: {'layout': 'lr', 'parts': [['尗', 's', ''], ['又', 'm', '手']]}, char: '叔', zhuyin: 'ㄕㄨˊ', radical: '又', strokes: 8, words: ['叔叔', '叔公'], say: '叔，叔叔的叔', cloze: '叔＿', img: 'uncle.png', options: ['叔', '淑', '收', '救'], clue: '這個字的右邊是「又」，左邊沒有三點水。', explain: '答案是「叔」；「淑」的左邊多了三點水，「收」的右邊是「攵」。', parts: ['尗', '又'], story: '右邊的「又」很久以前是畫一隻手。爸爸的弟弟，我們叫他「叔叔」。', sentence: '叔叔帶我去河邊釣魚。' },
      { id: 'h-團', combo: {'type': '形聲字', 'pict': '外面的大方框把東西圍起來，裡面的「專」念起來像「團」。大家圍在一起，就是「團」。'}, char: '團', zhuyin: 'ㄊㄨㄢˊ', radical: '囗', strokes: 14, words: ['團圓', '社團'], say: '團，團圓的團', cloze: '＿圓', img: 'reunion-table.png', options: ['團', '圓', '轉', '傳'], clue: '這個字的外面有一個大方框，裡面是「專」。', explain: '答案是「團」；「圓」的裡面是「員」，「轉」和「傳」沒有大方框。', parts: ['囗', '專'], story: '外面的大方框像把大家圍起來，裡面的「專」念起來像「團」。大家圍在一起，就是「團圓」。', sentence: '過年時，全家人團圓吃年夜飯。' },
      { id: 'h-鏡', combo: {'layout': 'lr', 'parts': [['金', 'm', '金屬'], ['竟', 's', '']]}, char: '鏡', zhuyin: 'ㄐㄧㄥˋ', radical: '金', strokes: 19, words: ['鏡頭', '鏡子'], say: '鏡，鏡子的鏡', cloze: '＿子', img: 'cw-mirror.png', options: ['鏡', '境', '竟', '鐘'], clue: '這個字的左邊是金字旁，右邊是「竟」。', explain: '答案是「鏡」；「境」的左邊是「土」，「鐘」的右邊是「童」。', parts: ['金', '竟'], story: '左邊是「金」，右邊的「竟」念起來像「鏡」。很久以前的鏡子，是把銅磨得亮亮的，可以照出自己。', sentence: '我對著鏡子刷牙。', build: { layout: 'lr', show: ['？', '竟'], answer: '金', options: ['金', '土', '木', '火'], clue: '想一想：很久以前的鏡子，是用亮亮的銅做的，左邊放什麼？' } },
      { id: 'h-逗', combo: {'type': '形聲字', 'pict': '辵字旁表示走路、停下來，裡面的「豆」念起來像「逗」。停下來跟人玩、說好笑的話，就是「逗」。'}, char: '逗', zhuyin: 'ㄉㄡˋ', radical: '辵', strokes: 11, words: ['逗號', '逗趣'], say: '逗，逗趣的逗', cloze: '＿趣', img: 'make-laugh.png', options: ['逗', '豆', '短', '頭'], clue: '這個字有辵字旁，裡面是「豆」。', explain: '答案是「逗」；「短」和「頭」都沒有辵字旁。', parts: ['辶', '豆'], story: '辵字旁和走路、停下來有關，裡面的「豆」念起來像「逗」。停下來說好笑的話，讓人開心，就是「逗」。', sentence: '小丑的表演逗得大家哈哈笑。' },
      { id: 'h-娃', combo: {'layout': 'lr', 'parts': [['女', 'm', '女生'], ['圭', 's', '']]}, char: '娃', zhuyin: 'ㄨㄚˊ', radical: '女', strokes: 9, words: ['娃娃', '洋娃娃'], say: '娃，娃娃的娃', cloze: '娃＿', img: 'baby.png', options: ['娃', '蛙', '佳', '掛'], clue: '這個字的左邊，是女字旁。', explain: '答案是「娃」，左邊是「女」；「蛙」是青蛙的蛙，左邊是「虫」。', parts: ['女', '圭'], story: '左邊是「女」，右邊的「圭」念起來有點像「娃」。可愛的小孩子、小嬰兒，就叫「娃娃」。', sentence: '妹妹最喜歡她的洋娃娃。', build: { layout: 'lr', show: ['？', '圭'], answer: '女', options: ['女', '虫', '亻', '土'], clue: '想一想：「嬸」的左邊是什麼？這個字的左邊也一樣。' } },
      { id: 'h-壓', combo: {'layout': 'tb', 'parts': [['厭', 's', ''], ['土', 'm', '泥土']]}, char: '壓', zhuyin: 'ㄧㄚ', radical: '土', strokes: 17, words: ['壓歲錢', '壓扁'], say: '壓，壓歲錢的壓', cloze: '＿歲錢', img: 'red-envelope.png', options: ['壓', '厭', '壞', '歷'], clue: '這個字的上面是「厭」，下面是「土」。', explain: '答案是「壓」，下面是「土」；「厭」是討厭的厭，下面沒有「土」。', parts: ['厭', '土'], story: '上面的「厭」念起來像「壓」，下面是「土」。用力往下按到地上，就是「壓」。', sentence: '過年時，我收到了壓歲錢。', build: { layout: 'tb', show: ['厭', '？'], answer: '土', options: ['土', '手', '心', '石'], clue: '想一想：把東西往下按到地上，下面要放什麼？' } },
      { id: 'h-錢', combo: {'layout': 'lr', 'parts': [['金', 'm', '金屬'], ['戔', 's', '']]}, char: '錢', zhuyin: 'ㄑㄧㄢˊ', radical: '金', strokes: 16, words: ['壓歲錢', '錢包'], say: '錢，壓歲錢的錢', cloze: '壓歲＿', img: 'red-envelope.png', options: ['錢', '淺', '線', '前'], clue: '這個字的左邊，是金字旁。', explain: '答案是「錢」，左邊是「金」；「淺」是深淺的淺，左邊是三點水。', parts: ['金', '戔'], story: '左邊是「金」，右邊的「戔」念起來像「錢」。很久以前的錢是用銅做的，所以有金字旁。', sentence: '我用零用錢買了一枝筆。', build: { layout: 'lr', show: ['？', '戔'], answer: '金', options: ['金', '氵', '糸', '木'], clue: '想一想：很久以前的錢幣，是用銅做的。' } },
      { id: 'h-透', combo: {'type': '形聲字', 'pict': '辵字旁表示走過去，裡面的「秀」念起來像「透」。從這一邊穿過去到那一邊，就是「透」。'}, char: '透', zhuyin: 'ㄊㄡˋ', radical: '辵', strokes: 11, words: ['透過', '透明'], say: '透，透明的透', cloze: '＿明', img: 'cw-clear-cup.png', options: ['透', '秀', '誘', '遠'], clue: '這個字有辵字旁，裡面是「秀」。', explain: '答案是「透」；「秀」沒有辵字旁，「遠」的裡面是「袁」。', parts: ['辶', '秀'], story: '辵字旁和走路有關，裡面的「秀」念起來像「透」。光可以穿過去、看得到另一邊，就是「透明」。', sentence: '透過窗戶，可以看到外面的大樹。' },
      { id: 'h-握', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['屋', 's', '']]}, char: '握', zhuyin: 'ㄨㄛˋ', radical: '手', strokes: 12, words: ['握手', '握住'], say: '握，握手的握', cloze: '＿手', img: 'hold-hands.png', options: ['握', '屋', '渥', '喔'], clue: '這個字的左邊，是提手旁。', explain: '答案是「握」，左邊是提手旁；「屋」是房屋的屋，沒有提手旁。', parts: ['扌', '屋'], story: '左邊是提手旁，右邊的「屋」念起來像「握」。用手把東西抓緊，就是「握」。', sentence: '比賽結束，兩隊互相握手。', build: { layout: 'lr', show: ['？', '屋'], answer: '扌', options: ['扌', '口', '氵', '木'], clue: '想一想：把東西抓緊，要用身體的哪個部分？' } }
    ],
    vocab: [
      { id: 'v-團圓', cloze: true, clozeOptions: ['團圓', '吵架', '分開', '上學'], word: '團圓', meaning: '分開的家人，又聚在一起。', example: '過年時，家人從各地回來＿＿。', img: 'reunion-table.png', options: ['團圓', '視訊', '鏡頭', '叔叔'] },
      { id: 'v-剩下', cloze: true, clozeOptions: ['剩下', '吃光', '買到', '丟掉'], word: '剩下', meaning: '用掉一些以後，還留著的。', example: '餅乾吃了好多，盒子裡只＿＿兩片。', img: 'leftover.png', options: ['剩下', '透過', '默默', '團圓'] },
      { id: 'v-默默', cloze: true, clozeOptions: ['默默', '大聲', '熱鬧', '吵鬧'], word: '默默', meaning: '不說話，靜靜的。', example: '她＿＿的把椅子排好，一句話都沒說。', img: 'quiet-window.png', options: ['默默', '匆匆忙忙', '剩下', '逗'] },
      { id: 'v-匆匆忙忙', cloze: true, clozeOptions: ['匆匆忙忙', '慢慢吞吞', '悠悠閒閒', '輕輕鬆鬆'], word: '匆匆忙忙', meaning: '很急、很趕的樣子。', example: '快遲到了，哥哥＿＿＿＿的跑出門。', img: 'hurry.png', options: ['匆匆忙忙', '默默', '透過', '剩下'] },
      { id: 'v-樓', cloze: true, clozeOptions: ['樓', '船', '車', '球'], word: '樓', meaning: '房子的一層。', example: '我家住在大廈的三＿。', img: 'upstairs.png', options: ['樓', '娃娃', '握', '逗'] },
      { id: 'v-視訊', word: '視訊', meaning: '用手機或電腦，一邊看到對方的臉，一邊說話。', example: '阿姨住在國外，我們常常和她＿＿聊天。', img: 'video-call.png', options: ['視訊', '鏡頭', '壓歲錢', '叔叔'] },
      { id: 'v-叔叔', word: '叔叔', meaning: '爸爸的弟弟。', example: '＿＿和爸爸長得好像，因為他們是兄弟。', img: 'uncle.png', options: ['叔叔', '娃娃', '鏡頭', '團圓'] },
      { id: 'v-鏡頭', word: '鏡頭', meaning: '相機或手機上，用來拍照的小圓窗。', example: '拍照時，大家要看著＿＿笑一個。', img: 'camera-lens.png', options: ['鏡頭', '視訊', '壓歲錢', '樓'] },
      { id: 'v-逗', cloze: true, clozeOptions: ['逗', '罵', '嚇', '吵'], word: '逗', meaning: '說好笑的話、做好笑的事，讓人開心。', example: '小丑做鬼臉，＿得小朋友哈哈大笑。', img: 'make-laugh.png', options: ['逗', '握', '樓', '剩下'] },
      { id: 'v-娃娃', word: '娃娃', meaning: '小嬰兒、小孩子。', example: '阿姨懷裡抱著一個胖嘟嘟的小＿＿。', img: 'baby.png', options: ['娃娃', '叔叔', '鏡頭', '壓歲錢'] },
      { id: 'v-壓歲錢', word: '壓歲錢', meaning: '過年時，長輩包在紅包裡送給小孩的錢。', example: '除夕晚上，爺爺給我們每個人＿＿＿。', img: 'red-envelope.png', options: ['壓歲錢', '視訊', '娃娃', '團圓'] },
      { id: 'v-透過', cloze: true, clozeOptions: ['透過', '關上', '打破', '忘記'], word: '透過', meaning: '經由、用某一個方法。', example: '＿＿望遠鏡，可以看到月亮上的坑洞。', img: 'telescope.png', options: ['透過', '剩下', '默默', '握'] },
      { id: 'v-握', cloze: true, clozeOptions: ['握', '踢', '聞', '喝'], word: '握', meaning: '用手抓緊。', example: '我＿著鉛筆，認真寫字。', img: 'hold-hands.png', options: ['握', '逗', '樓', '透過'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-剩', char: '剩', img: 'cw-rice-bowl.png', charMeaning: '留下來、沒有用完的。', word: '剩飯', meaning: '沒有吃完、留在碗裡的飯。', example: '我把飯吃光光，碗裡沒有＿＿。', options: ['剩飯', '默寫', '大樓', '鏡子'] },
      { id: 'cw-默', char: '默', img: 'cw-dictation.png', charMeaning: '不說話、靜靜的。', word: '默寫', meaning: '不看課本，把記住的字寫出來。', example: '老師念語詞，我們在本子上＿＿。', options: ['默寫', '訊息', '握手', '錢包'] },
      { id: 'cw-樓', char: '樓', img: 'cw-building.png', charMeaning: '房子的一層。', word: '大樓', meaning: '很高、有很多層的房子。', example: '這棟＿＿有二十層，好高喔！', options: ['大樓', '電視', '透明', '剩飯'] },
      { id: 'cw-訊', char: '訊', img: 'cw-phone-msg.png', charMeaning: '傳來的消息。', word: '訊息', meaning: '用手機或電腦傳來的消息。', example: '媽媽的手機收到一則＿＿。', options: ['訊息', '社團', '叔公', '壓扁'] },
      { id: 'cw-視', char: '視', img: 'cw-tv.png', charMeaning: '用眼睛看。', word: '電視', meaning: '可以看節目、看卡通的機器。', example: '吃完晚飯，我們一起看＿＿。', options: ['電視', '鏡子', '默寫', '握手'] },
      { id: 'cw-叔', char: '叔', img: 'cw-granduncle.png', charMeaning: '爸爸的弟弟。', word: '叔公', meaning: '爺爺的弟弟。', example: '爺爺的弟弟，我要叫他＿＿。', options: ['叔公', '洋娃娃', '大樓', '訊息'] },
      { id: 'cw-團', char: '團', img: 'cw-club.png', charMeaning: '聚在一起。', word: '社團', meaning: '大家喜歡同一件事，聚在一起練習的團體。', example: '我參加了學校的直笛＿＿。', options: ['社團', '逗趣', '透明', '剩飯'] },
      { id: 'cw-鏡', char: '鏡', img: 'cw-mirror.png', charMeaning: '可以照出東西的亮亮的板子。', word: '鏡子', meaning: '可以照出自己樣子的東西。', example: '妹妹對著＿＿梳頭髮。', options: ['鏡子', '錢包', '電視', '社團'] },
      { id: 'cw-逗', char: '逗', img: 'cw-clown.png', charMeaning: '讓人覺得好笑、開心。', word: '逗趣', meaning: '好笑又有趣。', example: '小丑的表演好＿＿，大家笑個不停。', options: ['逗趣', '透明', '叔公', '默寫'] },
      { id: 'cw-娃', char: '娃', img: 'cw-doll.png', charMeaning: '小孩子、小嬰兒。', word: '洋娃娃', meaning: '做成小孩樣子的玩具。', example: '妹妹抱著＿＿＿，一起睡覺。', options: ['洋娃娃', '大樓', '壓扁', '訊息'] },
      { id: 'cw-壓', char: '壓', img: 'cw-crush-bottle.png', charMeaning: '用力往下按。', word: '壓扁', meaning: '用力按下去，讓東西變得扁扁的。', example: '我把空的寶特瓶＿＿，再拿去回收。', options: ['壓扁', '握手', '逗趣', '電視'] },
      { id: 'cw-錢', char: '錢', img: 'cw-wallet.png', charMeaning: '買東西要用的。', word: '錢包', meaning: '裝錢的小包包。', example: '爸爸把零錢放進＿＿裡。', options: ['錢包', '鏡子', '社團', '剩飯'] },
      { id: 'cw-透', char: '透', img: 'cw-clear-cup.png', charMeaning: '穿過去，看得到另一邊。', word: '透明', meaning: '可以看穿過去，看得到裡面。', example: '這個＿＿的杯子，看得到裡面的果汁。', options: ['透明', '叔公', '洋娃娃', '默寫'] },
      { id: 'cw-握', char: '握', img: 'cw-handshake.png', charMeaning: '用手抓緊。', word: '握手', meaning: '兩個人把手牽在一起搖一搖，表示友好。', example: '比賽完，兩隊選手互相＿＿。', options: ['握手', '錢包', '壓扁', '大樓'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-一團和氣', situationImg: 'id-team-happy.png', idiom: '一團和氣', char: '團', meaning: '大家相處得很好，氣氛很和樂。', example: '我們班一團和氣，大家都會互相幫忙。', situation: '這一隊的隊員從來不吵架，練習時互相加油，比賽完還一起擊掌。',
        fill: { options: ['全家人一起包水餃，＿＿＿＿，好開心。', '兩個人一直吵架，真是＿＿＿＿。'], clue: '提示：哪一句的大家相處得很好、很和樂？', explain: '第一句用得對：全家一起包水餃，氣氛很好。一直吵架剛好相反。' } },
      { id: 'i-潛移默化', situationImg: 'id-read-together.png', idiom: '潛移默化', char: '默', meaning: '不知不覺中，慢慢受到別人的影響而改變。', example: '爸爸每天看書，在潛移默化下，我也愛上了看書。', situation: '媽媽每天都把房間整理得很乾淨，小美看久了，不知不覺也開始自己收玩具。',
        fill: { options: ['哥哥常常幫忙做家事，在＿＿＿＿下，弟弟也會主動幫忙了。', '我＿＿＿＿的吃了一個漢堡。'], clue: '提示：哪一句是不知不覺被別人影響了？', explain: '第一句用得對：弟弟看哥哥做家事，慢慢也學會了。吃漢堡跟受影響沒有關係。' } },
      { id: 'i-人去樓空', situationImg: 'id-empty-house.png', idiom: '人去樓空', char: '樓', meaning: '以前住在這裡的人都離開了，只剩下空空的房子。', example: '老朋友搬家以後，他家人去樓空，好安靜。', situation: '小明回到以前住的地方，想找好朋友玩，可是好朋友一家早就搬走了，屋子裡空空的。',
        fill: { options: ['鄰居搬走以後，隔壁＿＿＿＿，一點聲音都沒有。', '今天家裡好熱鬧，真是＿＿＿＿。'], clue: '提示：哪一句是人都離開了，房子空空的？', explain: '第一句用得對：鄰居搬走，房子空了。家裡很熱鬧，剛好相反。' } },
      { id: 'i-一視同仁', situationImg: 'id-fair-share.png', idiom: '一視同仁', char: '視', meaning: '對每一個人都一樣好，不會偏心。', example: '老師對每個學生都一視同仁，不會偏心。', situation: '老師切蛋糕，每一個小朋友都分到一樣大的一塊，沒有人多、也沒有人少。',
        fill: { options: ['奶奶對每個孫子都＿＿＿＿，給的紅包都一樣多。', '他只把糖果分給好朋友，真是＿＿＿＿。'], clue: '提示：哪一句是對每個人都一樣、不偏心？', explain: '第一句用得對：每個孫子的紅包都一樣多。只分給好朋友是偏心，剛好相反。' } },
      { id: 'i-破鏡重圓', situationImg: 'id-make-up.png', idiom: '破鏡重圓', char: '鏡', meaning: '分開或吵架的兩個人，後來又和好、在一起了。', example: '吵架很久的兩個好朋友，終於破鏡重圓了。', situation: '小華和小強吵架以後，好久都不說話；後來他們互相道歉，又變回好朋友了。',
        fill: { options: ['他們吵架分開好幾年，最後終於＿＿＿＿。', '我把杯子摔破了，這就是＿＿＿＿。'], clue: '提示：哪一句是分開的人又和好了？', explain: '第一句用得對：分開好幾年又和好了。摔破杯子是真的東西破掉，不是這個成語的意思。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-剩', char: '剩', wrong: '乘', sentence: '盤子裡只剩下兩顆蘋果。', options: ['剩', '乘', '利'], clue: '這裡是說留下來、沒有吃完的，跟坐車沒有關係。', explain: '要改成「剩」。留下來的是「剩下」，右邊是立刀旁；「乘」是乘車的乘。' },
      { id: 'fx-默', char: '默', wrong: '點', sentence: '我們在本子上默寫生字。', options: ['默', '點', '黑'], clue: '這裡是說不看課本把字寫出來，想一想，哪一個字的右邊是「犬」？', explain: '要改成「默」。不看課本寫字是「默寫」，右邊是「犬」；「點」是一點點的點。' },
      { id: 'fx-樓', char: '樓', wrong: '數', sentence: '我家住在五樓。', options: ['樓', '數', '屢'], clue: '這裡說的是房子的一層，想一想，哪一個字的左邊是木字旁？', explain: '要改成「樓」。房子的一層是「樓」，左邊是「木」；「數」是數學的數。' },
      { id: 'fx-訊', char: '訊', wrong: '迅', sentence: '手機響了，是一則新訊息。', options: ['訊', '迅', '信'], clue: '這裡說的是傳來的消息，想一想，哪一個字的左邊是言字旁？', explain: '要改成「訊」。傳來的消息是「訊息」，左邊是「言」；「迅」是迅速的迅。' },
      { id: 'fx-視', char: '視', wrong: '現', sentence: '我們一起看電視。', options: ['視', '現', '祝'], clue: '這裡說的是可以看卡通的機器，想一想，哪一個字的左邊是示字旁？', explain: '要改成「視」。看卡通的機器是「電視」；「現」是現在的現，左邊是「王」。' },
      { id: 'fx-叔', char: '叔', wrong: '淑', sentence: '叔公送我一本書。', options: ['叔', '淑', '收'], clue: '這裡是說爺爺的弟弟，想一想，哪一個字沒有三點水？', explain: '要改成「叔」。爺爺的弟弟是「叔公」；「淑」的左邊多了三點水。' },
      { id: 'fx-團', char: '團', wrong: '傳', sentence: '過年時，全家一起吃團圓飯。', options: ['團', '傳', '轉'], clue: '這裡是說家人聚在一起，想一想，哪一個字的外面有大方框？', explain: '要改成「團」。家人聚在一起是「團圓」，外面有大方框；「傳」是傳球的傳。' },
      { id: 'fx-鏡', char: '鏡', wrong: '境', sentence: '妹妹對著鏡子梳頭髮。', options: ['鏡', '境', '竟'], clue: '這裡說的是可以照出自己的東西，想一想，哪一個字的左邊是金字旁？', explain: '要改成「鏡」。照自己的是「鏡子」，左邊是「金」；「境」的左邊是「土」。' },
      { id: 'fx-逗', char: '逗', wrong: '豆', sentence: '小丑的表演好逗趣。', options: ['逗', '豆', '短'], clue: '這裡是說好笑又有趣，想一想，哪一個字有辵字旁？', explain: '要改成「逗」。好笑又有趣是「逗趣」，有辵字旁；「豆」是紅豆的豆。' },
      { id: 'fx-娃', char: '娃', wrong: '蛙', sentence: '阿姨抱著剛出生的小女娃。', options: ['娃', '蛙', '佳'], clue: '這裡說的是小嬰兒，想一想，哪一個字的左邊是女字旁？', explain: '要改成「娃」。小嬰兒是「娃娃」，左邊是「女」；「蛙」是青蛙的蛙。' },
      { id: 'fx-壓', char: '壓', wrong: '厭', sentence: '奶奶給我一個紅包當壓歲錢。', options: ['壓', '厭', '壞'], clue: '這裡是說過年長輩給的紅包錢，想一想，哪一個字的下面是「土」？', explain: '要改成「壓」。過年的紅包錢是「壓歲錢」，下面是「土」；「厭」是討厭的厭。' },
      { id: 'fx-錢', char: '錢', wrong: '淺', sentence: '我把零用錢存起來。', options: ['錢', '淺', '線'], clue: '這裡說的是買東西要用的，想一想，哪一個字的左邊是金字旁？', explain: '要改成「錢」。買東西要用「錢」，左邊是「金」；「淺」是深淺的淺。' },
      { id: 'fx-透', char: '透', wrong: '秀', sentence: '這個杯子是透明的。', options: ['透', '秀', '遠'], clue: '這裡是說看得到裡面，想一想，哪一個字有辵字旁？', explain: '要改成「透」。看得到裡面是「透明」，有辵字旁；「秀」少了辵字旁。' },
      { id: 'fx-握', char: '握', wrong: '屋', sentence: '比賽完，我們互相握手。', options: ['握', '屋', '喔'], clue: '這裡是說用手抓住別人的手，想一想，哪一個字的左邊是提手旁？', explain: '要改成「握」。用手抓住是「握手」，左邊是提手旁；「屋」是房屋的屋。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿圓」是家人聚在一起。', sentence: '過年時，全家人一起＿圓。', frame: '＿圓', options: ['團', '傳'], answer: '團', clue: '提示：這個字的外面有一個大方框。', explain: '答案是「團」；「傳」是傳球的傳，左邊是單人旁。' },
      { id: 's2', meaning: '「＿彎」是換一個方向走。', sentence: '車子在路口＿彎了。', frame: '＿彎', options: ['轉', '團'], answer: '轉', clue: '提示：這句話在說車子換方向，左邊是「車」。', explain: '答案是「轉」，左邊是「車」；「團」是團圓的團。' },
      { id: 's3', meaning: '「＿下」是還留著、沒用完。', sentence: '盤子裡只＿下一塊餅乾。', frame: '＿下', options: ['剩', '乘'], answer: '剩', clue: '提示：這個字的右邊是立刀旁。', explain: '答案是「剩」；「乘」是乘車的乘，沒有立刀旁。' },
      { id: 's4', meaning: '「＿車」是坐車。', sentence: '我們＿車去動物園。', frame: '＿車', options: ['乘', '剩'], answer: '乘', clue: '提示：這句話在說坐車，不是在說留下來。', explain: '答案是「乘」；「剩」是剩下的剩，右邊有立刀旁。' },
      { id: 's5', meaning: '「＿寫」是不看課本，把字寫出來。', sentence: '老師要我們＿寫語詞。', frame: '＿寫', options: ['默', '點'], answer: '默', clue: '提示：這個字的右邊是「犬」。', explain: '答案是「默」；「點」的右邊是「占」。' },
      { id: 's6', meaning: '「大＿」是很高、很多層的房子。', sentence: '這棟大＿有二十層。', frame: '大＿', options: ['樓', '數'], answer: '樓', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「樓」；「數」是數學的數。' },
      { id: 's7', meaning: '「＿息」是傳來的消息。', sentence: '媽媽收到一則＿息。', frame: '＿息', options: ['訊', '迅'], answer: '訊', clue: '提示：這個字的左邊是言字旁。', explain: '答案是「訊」；「迅」是迅速的迅，有辵字旁。' },
      { id: 's8', meaning: '「＿速」是非常快。', sentence: '消防車＿速趕到。', frame: '＿速', options: ['迅', '訊'], answer: '迅', clue: '提示：這句話在說很快，這個字有辵字旁。', explain: '答案是「迅」；「訊」是訊息的訊，左邊是言字旁。' },
      { id: 's9', meaning: '「＿公」是爺爺的弟弟。', sentence: '＿公送我一盒糖果。', frame: '＿公', options: ['叔', '淑'], answer: '叔', clue: '提示：這個字的左邊沒有三點水。', explain: '答案是「叔」；「淑」的左邊多了三點水。' },
      { id: 's10', meaning: '「＿歲錢」是過年長輩給的紅包錢。', sentence: '奶奶給我＿歲錢。', frame: '＿歲錢', options: ['壓', '厭'], answer: '壓', clue: '提示：這個字的下面是「土」。', explain: '答案是「壓」；「厭」是討厭的厭，下面沒有「土」。' },
      { id: 's11', meaning: '「＿包」是出門買東西時，帶在身上的小包包。', sentence: '我的＿包裡有一百元。', frame: '＿包', options: ['錢', '淺'], answer: '錢', clue: '提示：這個字的左邊是金字旁。', explain: '答案是「錢」；「淺」是深淺的淺，左邊是三點水。' }
    ],
    listen: [
      { id: 'l1', text: '分開住的家人，過年時又聚在一起。', answer: 0, options: [{ text: '團圓', img: 'reunion-table.png' }, { text: '視訊', img: 'video-call.png' }, { text: '鏡頭', img: 'camera-lens.png' }, { text: '剩下', img: 'leftover.png' }] },
      { id: 'l2', text: '用手機看著對方的臉，一邊說話。', answer: 0, options: [{ text: '視訊', img: 'video-call.png' }, { text: '鏡頭', img: 'camera-lens.png' }, { text: '團圓', img: 'reunion-table.png' }, { text: '叔叔', img: 'uncle.png' }] },
      { id: 'l3', text: '他是爸爸的弟弟。', answer: 0, options: [{ text: '叔叔', img: 'uncle.png' }, { text: '娃娃', img: 'baby.png' }, { text: '團圓', img: 'reunion-table.png' }, { text: '樓', img: 'upstairs.png' }] },
      { id: 'l4', text: '過年時，長輩包在紅包裡送給小孩。', answer: 0, options: [{ text: '壓歲錢', img: 'red-envelope.png' }, { text: '剩下', img: 'leftover.png' }, { text: '娃娃', img: 'baby.png' }, { text: '視訊', img: 'video-call.png' }] },
      { id: 'l5', text: '小小的嬰兒，臉紅紅的，睡得好香。', answer: 0, options: [{ text: '娃娃', img: 'baby.png' }, { text: '叔叔', img: 'uncle.png' }, { text: '逗', img: 'make-laugh.png' }, { text: '握', img: 'hold-hands.png' }] },
      { id: 'l6', text: '快來不及了，大家走得好快好急。', answer: 0, options: [{ text: '匆匆忙忙', img: 'hurry.png' }, { text: '默默', img: 'quiet-window.png' }, { text: '剩下', img: 'leftover.png' }, { text: '透過', img: 'telescope.png' }] },
      { id: 'l7', text: '說一個好笑的笑話，讓大家都笑了。', answer: 0, options: [{ text: '逗', img: 'make-laugh.png' }, { text: '握', img: 'hold-hands.png' }, { text: '默默', img: 'quiet-window.png' }, { text: '樓', img: 'upstairs.png' }] },
      { id: 'l8', text: '用手把另一個人的手抓得緊緊的。', answer: 0, options: [{ text: '握', img: 'hold-hands.png' }, { text: '逗', img: 'make-laugh.png' }, { text: '透過', img: 'telescope.png' }, { text: '鏡頭', img: 'camera-lens.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的疊字，說出動作是怎麼做的。',
      /* 短語一：疊字＋做什麼＋著＋誰的什麼（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '輕輕摸著小貓的頭', img: 'pr-pet-cat.png',
        parts: [{ text: '輕輕', role: '怎麼做（疊字）' }, { text: '摸著', role: '做什麼' }, { text: '小貓的頭', role: '誰的什麼' }],
        explain: '先用疊字說「怎麼做」，像輕輕、慢慢、緊緊，再說做什麼，最後說是誰的什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-hold-dad.png', noun: '牽著爸爸的手', join: '', ask: '過馬路時，他是怎麼牽著爸爸的手的', look: '再看看圖片，路上的車子多不多？他會不會放手？', options: ['緊緊', '輕輕', '慢慢', '偷偷'], clue: '提示：車子好多，他一點都不敢放開。', explain: '答案是「緊緊」，過馬路很危險，所以「緊緊牽著爸爸的手」。' },
        { id: 'ph2', img: 'pr-push-grandma.png', noun: '推著奶奶的輪椅', join: '', ask: '他是怎麼推著奶奶的輪椅的', look: '再看看圖片，他推得快不快？', options: ['慢慢', '急急', '用力', '偷偷'], clue: '提示：要讓奶奶坐得舒服、安全，不能推太快。', explain: '答案是「慢慢」，推輪椅要小心，所以「慢慢推著奶奶的輪椅」。' },
        { id: 'ph3', img: 'pr-listen-story.png', noun: '聽著老師的故事', join: '', ask: '小朋友是怎麼聽著老師的故事的', look: '再看看圖片，小朋友有沒有在說話？', options: ['靜靜', '吵吵', '急急', '偷偷'], clue: '提示：大家都沒有說話，很專心。', explain: '答案是「靜靜」，大家很專心，所以「靜靜聽著老師的故事」。' },
        { id: 'ph4', img: 'pr-hide-gift.png', noun: '藏著媽媽的生日禮物', join: '', ask: '他是怎麼藏著媽媽的生日禮物的', look: '再看看圖片，他想讓媽媽看到嗎？', options: ['偷偷', '大大', '慢慢', '緊緊'], clue: '提示：他要給媽媽一個驚喜，不能被發現。', explain: '答案是「偷偷」，要給媽媽驚喜，所以「偷偷藏著媽媽的生日禮物」。' },
        { id: 'ph5', img: 'pr-raise-award.png', noun: '舉著自己的獎狀', join: '', ask: '她是怎麼舉著自己的獎狀的', look: '再看看圖片，她的手舉得高不高？', options: ['高高', '低低', '偷偷', '輕輕'], clue: '提示：她好開心，想讓大家都看到。', explain: '答案是「高高」，她想讓大家看到，所以「高高舉著自己的獎狀」。' },
        { id: 'ph6', img: 'pr-pick-pencil.png', noun: '撿起同學的鉛筆盒', join: '', ask: '他是怎麼撿起同學的鉛筆盒的', look: '再看看圖片，他有沒有說話？有沒有人發現？', options: ['默默', '大大', '急急', '高高'], clue: '提示：他什麼話都沒說，就幫忙撿起來了。', explain: '答案是「默默」，他不說話就幫忙，所以「默默撿起同學的鉛筆盒」。' },
        { id: 'ph7', img: 'pr-keep-envelope.png', noun: '收著奶奶的紅包', join: '', ask: '他是怎麼收著奶奶的紅包的', look: '再看看圖片，他把紅包放在哪裡？有沒有亂丟？', options: ['好好', '偷偷', '急急', '低低'], clue: '提示：他把紅包放進抽屜，小心的保管。', explain: '答案是「好好」，紅包要小心保管，所以「好好收著奶奶的紅包」。' },
        { id: 'ph8', img: 'pr-hug-mom.png', noun: '抱著媽媽的脖子', join: '', ask: '打雷了，妹妹是怎麼抱著媽媽的脖子的', look: '再看看圖片，妹妹害怕嗎？她抱得鬆不鬆？', options: ['緊緊', '輕輕', '慢慢', '高高'], clue: '提示：妹妹很害怕，一點都不想放開。', explain: '答案是「緊緊」，妹妹很害怕，所以「緊緊抱著媽媽的脖子」。' }
      ],
      say: [],
      /* 第二個短語：疊字＋的＋東西＋做什麼＋在＋什麼地方（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '小小的瓢蟲停在葉子上', img: 'pz-ladybug.png',
          parts: [{ text: '小小', role: '疊字' }, { text: '的' }, { text: '瓢蟲', role: '什麼東西' }, { text: '停', role: '做什麼' }, { text: '在' }, { text: '葉子上', role: '什麼地方' }],
          explain: '先用疊字說樣子，加上「的」，再說什麼東西、做什麼，加上「在」，最後說在什麼地方。' },
        fill: [
          { id: 'pz1', img: 'pz-frog.png', parts: ['綠綠', '的', '青蛙', '坐', '在', '荷葉上'] },
          { id: 'pz2', img: 'pz-clouds.png', parts: ['白白', '的', '雲朵', '飄', '在', '天空中'] },
          { id: 'pz3', img: 'pz-cat-sofa.png', parts: ['胖胖', '的', '小貓', '睡', '在', '沙發上'] },
          { id: 'pz4', img: 'pz-apple-tree.png', parts: ['紅紅', '的', '蘋果', '掛', '在', '樹上'] },
          { id: 'pz5', img: 'pz-footprints.png', parts: ['小小', '的', '腳印', '留', '在', '沙灘上'] }
        ]
      },
      words: [
        { word: '默默', meaning: '不說話，靜靜的。', img: 'quiet-window.png' },
        { word: '匆匆忙忙', meaning: '很急、很趕的樣子。', img: 'hurry.png' }
      ],
      choose: [
        { id: 'pw1', word: '默默', options: ['他默默的把地上的垃圾撿起來。', '他默默的大聲唱歌。'], clue: '提示：想一想，「默默」是說話，還是不說話？', explain: '第一句用得對：他不說話，靜靜的撿垃圾。大聲唱歌就不是靜靜的了。' },
        { id: 'pw2', word: '匆匆忙忙', options: ['快遲到了，弟弟匆匆忙忙的穿上鞋子。', '時間還好多，弟弟匆匆忙忙的慢慢走。'], clue: '提示：想一想，什麼時候才會很急、很趕？', explain: '第一句用得對：快遲到了，所以很趕。時間還很多又慢慢走，就不是匆匆忙忙。' }
      ],
      make: [
        { id: 'pm1', word: '默默', clue: '提示：想想看，什麼時候你會靜靜的、不說話做一件事？', model: '弟弟睡著了，我默默的玩積木。' },
        { id: 'pm2', word: '匆匆忙忙', clue: '提示：想想看，什麼時候你會很趕、很急？', model: '早上睡過頭，我匆匆忙忙的吃早餐。' }
      ]
    },
    pattern: [
      { key: 'meixiangdao', id: 'mx', title: '……，沒想到……', img: 'meixiangdao.png',
        meaning: '本來以為會怎麼樣，結果卻發生了想不到的事。',
        examples: ['本來以為今天會下雨，沒想到出了大太陽。'],
        match: [
          { id: 'pt-mx-m1', img: 'pt-picnic-rain.png', front: '我們本來要去野餐，', options: ['沒想到突然下起大雨。', '沒想到我變成一隻小鳥。', '沒想到桌子開始唱歌。'], clue: '提示：看看圖片，天氣變得怎麼樣？', explain: '答案是「沒想到突然下起大雨」：本來要去野餐，卻下雨了。' },
          { id: 'pt-mx-m2', img: 'pt-test-easy.png', front: '我以為考試會很難，', options: ['沒想到題目我都會寫。', '沒想到考卷變成了蛋糕。', '沒想到鉛筆自己會走路。'], clue: '提示：看看圖片，他寫考卷的樣子開不開心？', explain: '答案是「沒想到題目我都會寫」：以為很難，結果都會。' },
          { id: 'pt-mx-m3', img: 'pt-small-seed.png', front: '這顆種子小小的，', options: ['沒想到長成了一棵大樹。', '沒想到變成了一臺汽車。', '沒想到開口說話了。'], clue: '提示：種子種下去，會長成什麼？', explain: '答案是「沒想到長成了一棵大樹」：小小的種子，長成了大樹。' }
        ],
        conj: [
          { id: 'pt-mx-c1', full: '我以為大家都忘了我的生日，沒想到他們幫我準備了蛋糕。', img: 'pt-surprise-cake.png', sentence: '我以為大家都忘了我的生日，＿＿＿他們幫我準備了蛋糕。', options: ['……，沒想到……', '……，就……', '除了……還……'], clue: '提示：本來以為大家忘了，結果卻有蛋糕。數數看有幾個空格。', explain: '答案是「……，沒想到……」：我以為大家都忘了，沒想到他們幫我準備了蛋糕。' },
          { id: 'pt-mx-c2', full: '弟弟以為小狗會咬人，沒想到牠只是想跟他玩。', img: 'pt-puppy-play.png', sentence: '弟弟以為小狗會咬人，＿＿＿牠只是想跟他玩。', options: ['……，沒想到……', '……，就……', '除了……還……'], clue: '提示：弟弟本來很怕，結果小狗只是想玩。數數看有幾個空格。', explain: '答案是「……，沒想到……」：弟弟以為小狗會咬人，沒想到牠只是想玩。' },
          { id: 'pt-mx-c3', full: '我們以為路上會塞車，沒想到一路都很順。', img: 'pt-clear-road.png', sentence: '我們以為路上會塞車，＿＿＿一路都很順。', options: ['……，沒想到……', '……，就……', '除了……還……'], clue: '提示：本來以為會塞車，結果路上車子很少。數數看有幾個空格。', explain: '答案是「……，沒想到……」：以為會塞車，沒想到一路都很順。' }
        ],
        half: [
          { id: 'pt-mx-h1', front: '我本來以為這碗湯很燙，', clue: '提示：結果跟你想的不一樣，會怎麼樣？記得要說「沒想到」。', model: '沒想到一點都不燙。' },
          { id: 'pt-mx-h2', front: '這個箱子看起來好重，', clue: '提示：你去搬搬看，結果怎麼樣？記得要說「沒想到」。', model: '沒想到我一下子就搬起來了。' }
        ],
        whole: [
          { id: 'pt-mx-w1', clue: '提示：先說你本來以為會怎麼樣，再用「沒想到」說結果。想想看：你第一次吃苦瓜、第一次游泳的時候呢？', model: '我以為苦瓜很苦，沒想到還滿好吃的。' }
        ] },
      { key: 'jiu', id: 'jj', title: '……，就……', img: 'jiu.png',
        meaning: '前面的事一發生，後面的結果馬上跟著出現。',
        examples: ['下課鐘一響，大家就跑到操場上玩。'],
        match: [
          { id: 'pt-jj-m1', img: 'pt-street-light.png', front: '天一黑，', options: ['路燈就亮了。', '太陽就出來了。', '小鳥就去上學了。'], clue: '提示：看看圖片，天黑了，路邊什麼東西會亮起來？', explain: '答案是「路燈就亮了」：天一黑，路燈馬上亮起來。' },
          { id: 'pt-jj-m2', img: 'pt-rain-umbrella.png', front: '一下雨，', options: ['大家就把雨傘打開。', '小魚就飛上天了。', '冰淇淋就變熱了。'], clue: '提示：看看圖片，下雨了，大家拿出什麼？', explain: '答案是「大家就把雨傘打開」：一下雨，大家馬上撐傘。' },
          { id: 'pt-jj-m3', img: 'pt-doorbell-dog.png', front: '門鈴一響，', options: ['小狗就跑到門口。', '電視就自己唱歌。', '花就開了。'], clue: '提示：看看圖片，門鈴響了，誰跑過去？', explain: '答案是「小狗就跑到門口」：門鈴一響，小狗馬上跑過去。' }
        ],
        conj: [
          { id: 'pt-jj-c1', full: '我一回到家，就先去洗手。', img: 'pt-wash-hands.png', sentence: '我一回到家，＿先去洗手。', options: ['……，就……', '……，沒想到……', '除了……還……'], clue: '提示：一回到家，馬上做什麼？數數看有幾個空格。', explain: '答案是「……，就……」：我一回到家，就先去洗手。' },
          { id: 'pt-jj-c2', full: '媽媽一喊吃飯，我們就跑到餐桌旁。', img: 'pt-dinner-call.png', sentence: '媽媽一喊吃飯，我們＿跑到餐桌旁。', options: ['……，就……', '……，沒想到……', '除了……還……'], clue: '提示：媽媽一喊，大家馬上跑過去。數數看有幾個空格。', explain: '答案是「……，就……」：媽媽一喊吃飯，我們就跑到餐桌旁。' },
          { id: 'pt-jj-c3', full: '春天一到，花園裡的花就開了。', img: 'pt-spring-flowers.png', sentence: '春天一到，花園裡的花＿開了。', options: ['……，就……', '……，沒想到……', '除了……還……'], clue: '提示：春天來了，花馬上開了。數數看有幾個空格。', explain: '答案是「……，就……」：春天一到，花園裡的花就開了。' }
        ],
        half: [
          { id: 'pt-jj-h1', front: '我一躺到床上，', clue: '提示：躺到床上，馬上會怎麼樣？記得要說「就」。', model: '就睡著了。' },
          { id: 'pt-jj-h2', front: '小貓一看到逗貓棒，', clue: '提示：小貓看到好玩的東西，馬上會做什麼？記得要說「就」。', model: '就撲過去玩。' }
        ],
        whole: [
          { id: 'pt-jj-w1', clue: '提示：先說一件事發生了，再用「就」說馬上會怎麼樣。想想看：放學鐘聲一響，你會做什麼？', model: '放學鐘聲一響，我就去排路隊。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「長長的」、「匆匆忙忙」、「紅通通」。',
          show: { sentence: '小貓的眼睛圓圓的，好可愛。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '奶奶的手暖暖的。', answer: true, clue: '提示：形容奶奶的手的字裡，有沒有同一個字連在一起？', explain: '是疊字：「暖暖」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '奶奶的手很溫暖。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['小堂妹的臉胖嘟嘟的。', '小堂妹的臉很胖。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「胖嘟嘟」是疊字：「嘟嘟」重複了。' },
            { id: 'rh-re-p2', options: ['大家高高興興的拍照。', '大家一起拍照。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「高高興興」是疊字。' },
            { id: 'rh-re-p3', options: ['夜空亮晶晶的。', '夜空很亮。', '夜空像一塊黑布。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「亮晶晶」是疊字：「晶晶」重複了。' },
            { id: 'rh-re-p4', options: ['桌上的菜香噴噴的。', '桌上的菜很香。', '菜香飄到了門外。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「香噴噴」是疊字：「噴噴」重複了。' },
            { id: 'rh-re-p5', options: ['小華慢慢的走上樓。', '小華走上樓。', '小華走得像小烏龜。', '樓梯在跟小華說話。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「慢慢」是疊字。' },
            { id: 'rh-re-p6', options: ['我們熱熱鬧鬧的過新年。', '我們一起過新年。', '新年像一場派對。', '新年在對我們微笑。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「熱熱鬧鬧」是疊字。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，重複說兩次以上，讀起來有節奏。', example: '課文裡的「好香好香」，把同一個詞重複說。',
          show: { sentence: '好甜好甜，這顆蘋果好甜！', mark: ['好甜'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '好想你，好想你，我真的好想你！', answer: true, mark: ['好想你'], clue: '提示：找找看，有沒有同一句話說了好幾次？', explain: '是類疊：「好想你」說了好幾次。' },
            { id: 'rh-rp-y2', sentence: '我真的很想念你。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['恭喜'], options: ['恭喜恭喜，大家過年好！', '大家過年好！'], clue: '提示：哪一句有同一個詞說了兩次？', explain: '「恭喜」說了兩次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['好大'], options: ['好大好大的煙火！', '很大的煙火！'], clue: '提示：哪一句有同一個詞，連著說了兩次？', explain: '「好大」說了兩次，是類疊。' },
            { id: 'rh-rp-p3', mark: ['好開心'], options: ['好開心，好開心，大家都回來了！', '大家都回來了。', '大家笑得像花一樣。'], clue: '提示：哪一句有同一句話，說了兩次？', explain: '「好開心」說了兩次，是類疊。' },
            { id: 'rh-rp-p4', mark: ['等一下'], options: ['等一下，等一下，我還沒穿鞋子！', '我還沒穿鞋子。', '鞋子跑到哪裡去了？'], clue: '提示：哪一句有同一句話，連著說了兩次？', explain: '「等一下」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['好軟'], options: ['小堂妹的手好軟好軟。', '小堂妹的手很軟。', '小堂妹的手像棉花糖。', '小堂妹的手在跟我打招呼。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「好軟」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['謝謝'], options: ['謝謝爺爺，謝謝奶奶，謝謝大家！', '謝謝大家！', '大家笑得好開心。', '笑聲大得像打雷。'], clue: '提示：哪一句有同一個詞，說了好幾次？', explain: '「謝謝」說了好幾次，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '小娃娃的手軟綿綿的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「綿綿」是同一個字連在一起重複用。' },
        { id: 'rh2', sentence: '星星在天上亮閃閃的。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「閃閃」是同一個字連在一起重複用。' },
        { id: 'rh3', sentence: '回來了，回來了，大家都回來了！', answer: '類疊', mark: ['回來了'], clue: '提示：有沒有同一句話，說了好幾次？', explain: '答案是「類疊」：「回來了」說了好幾次。' },
        { id: 'rh4', sentence: '加油，加油，我們一定會贏！', answer: '類疊', mark: ['加油'], clue: '提示：有沒有同一個詞，說了好幾次？', explain: '答案是「類疊」：「加油」說了好幾次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L12 = d; }
})(this);

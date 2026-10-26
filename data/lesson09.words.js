/* 第 9 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 人事時地物（課文地圖的第二步）：選項第一個是答案，只放短短的答案和段落號碼，不放課文 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['我、家人和導遊', '老師和同學', '爺爺和奶奶', '警察和司機'], paras: [1, 2], why: '「我」和全家人一起去，還有導遊帶著大家走。' },
      { id: 'wh-shi', key: '事', options: ['全家去走古道，看海景、疊石頭', '全家去夜市吃東西', '全家去爬玉山', '全家去游泳池游泳'], paras: [1, 3], why: '全家跟著導遊走古道，看到藍藍的大海，還一起把石頭疊高。' },
      { id: 'wh-time', key: '時', options: ['上星期', '明天', '下個月', '去年冬天'], paras: [1], why: '課文一開始就說，是上星期去的。' },
      { id: 'wh-di', key: '地', options: ['阿塱壹古道', '臺北的動物園', '學校的操場', '高高的雪山'], paras: [1, 4], why: '這一課寫的地方是阿塱壹古道，旁邊有山也有海。' },
      { id: 'wh-wu', key: '物', options: ['林投樹的果實、木棧道、南田石', '風箏、氣球', '雪人、雪橇', '溜滑梯、盪鞦韆'], paras: [2, 3], why: '弟弟以為林投樹的果實是鳳梨，大家走下木棧道，還看到南田石。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qd: 'extract', qe: 'extract', qf: 'extract', qb: 'infer', qc: 'infer', qh: 'infer',
      qg: 'interpret', qi: 'interpret', k2: 'interpret', qj: 'evaluate', k1: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架（老師要求：不能只給課文，要教孩子怎麼想、解釋為什麼選這個答案）：
       think 是提示裡「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ["「意想不到」是什麼意思？（沒想到會看到）", "一個一個找：作者在古道上看到了哪些特別的東西？"], why: "作者在古道上看到長得像鳳梨的林投果、海和天連成一片的美景，還有特別的南田石，這些都是沒想到會看到的風景。其他選項的東西，課文都沒有提到。" },
      qi: { think: ["大家發出的是什麼聲音？是哭聲還是笑聲？", "大家一起把石頭疊得高高的，是在玩，還是在吵架？"], why: "大家一直笑，還一起數數、把石頭疊成小山，表示大家玩得很開心。" },
      qj: { think: ["課文是作者寫給誰看的？", "現在讀到這一句的人是誰？"], why: "這句是作者在問讀課文的人，邀請我們也去走走看。讀到這一句的就是我們，所以「你」是正在讀課文的我們。" }
    },
    hanzi: [
      { id: 'h-挑', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['兆', 's', '']]}, char: '挑', zhuyin: 'ㄊㄧㄠˇ', radical: '手', strokes: 9, words: ['挑戰', '挑選'], say: '挑，挑戰的挑', cloze: '＿戰', img: 'challenge.png', options: ['挑', '桃', '逃', '跳'], clue: '這個字跟手有關。', explain: '答案是「挑」，左邊是提手旁；「桃」是桃子的桃，左邊是「木」。', parts: ['扌', '兆'], story: '左邊是提手旁，右邊的「兆」念起來很像「挑」。用手把東西挑起來，就是「挑」。', sentence: '哥哥喜歡挑戰很難的題目。', build: { layout: 'lr', show: ['？', '兆'], answer: '扌', options: ['扌', '木', '足', '辶'], clue: '想一想：挑選東西的時候，要用身體的哪個部分？' } },
      { id: 'h-戰', combo: {'layout': 'lr', 'parts': [['單', 's', ''], ['戈', 'm', '古時候的武器']]}, char: '戰', zhuyin: 'ㄓㄢˋ', radical: '戈', strokes: 16, words: ['挑戰', '戰勝'], say: '戰，挑戰的戰', cloze: '挑＿', img: 'challenge.png', options: ['戰', '站', '佔', '單'], clue: '這個字的右邊，是古時候的一種武器。', explain: '答案是「戰」，右邊是「戈」；「站」是站立的站，左邊是「立」。', parts: ['單', '戈'], story: '右邊的「戈」是古時候打仗用的武器，左邊的「單」念起來有點像「戰」。拿著武器打仗，就是「戰」。', sentence: '我們要勇敢挑戰困難。', build: { layout: 'lr', show: ['單', '？'], answer: '戈', options: ['戈', '力', '刀', '欠'], clue: '想一想：古時候的人打仗，手上拿著什麼？' } },
      { id: 'h-交', combo: {'type': '象形字', 'pict': '很久以前的「交」，像一個人站著，兩隻腳交叉在一起。所以「交」有交叉、來來往往的意思。'}, char: '交', zhuyin: 'ㄐㄧㄠ', radical: '亠', strokes: 6, words: ['交通', '交朋友'], say: '交，交通的交', cloze: '＿通', img: 'traffic.png', options: ['交', '校', '效', '郊'], clue: '這個字像一個人站著，兩隻腳叉在一起。', explain: '答案是「交」；「校」是學校的校，左邊多了「木」。', parts: ['亠', '父'], story: '很久以前的「交」，像一個人兩腳交叉站著。車子、行人來來往往，就是「交通」。', sentence: '我在新學校交了一個好朋友。' },
      { id: 'h-隨', combo: {'type': '形聲字', 'pict': '左邊的「阝」像小山坡，裡面有「辶」，表示走路。跟著別人一起走，就是「隨」。'}, char: '隨', zhuyin: 'ㄙㄨㄟˊ', radical: '阜', strokes: 16, words: ['跟隨', '隨著'], say: '隨，跟隨的隨', cloze: '跟＿', img: 'follow-guide.png', options: ['隨', '隋', '遂', '追'], clue: '這個字的左邊是耳朵旁，裡面有走路的「辶」。', explain: '答案是「隨」，裡面有「辶」，表示走路跟著別人。', parts: ['阝', '辶', '有'], story: '左邊是耳朵旁，裡面有「辶」，就是走路的意思。跟著別人走，就是「隨」。', sentence: '小鴨子隨著鴨媽媽走過馬路。' },
      { id: 'h-導', combo: {'layout': 'tb', 'parts': [['道', 's', ''], ['寸', 'm', '手']]}, char: '導', zhuyin: 'ㄉㄠˇ', radical: '寸', strokes: 16, words: ['導遊', '導師'], say: '導，導遊的導', cloze: '＿遊', img: 'tour-guide.png', options: ['導', '道', '到', '倒'], clue: '這個字的下面，是代表手的「寸」。', explain: '答案是「導」，下面有「寸」；「道」是道路的道，下面沒有「寸」。', parts: ['道', '寸'], story: '上面是道路的「道」，下面的「寸」是手。用手指著路，帶大家往前走，就是「導」。', sentence: '導遊帶我們參觀博物館。', build: { layout: 'tb', show: ['道', '？'], answer: '寸', options: ['寸', '木', '心', '皿'], clue: '想一想：帶路的人會用什麼指方向？' } },
      { id: 'h-鳳', combo: {'type': '形聲字', 'pict': '外面是「几」，裡面是「鳥」。「鳳」是傳說中很漂亮的大鳥。'}, char: '鳳', zhuyin: 'ㄈㄥˋ', radical: '鳥', strokes: 14, words: ['鳳梨'], say: '鳳，鳳梨的鳳', cloze: '＿梨', img: 'pineapple.png', options: ['鳳', '風', '楓', '鳥'], clue: '這個字的裡面，有一隻鳥。', explain: '答案是「鳳」，裡面是「鳥」；「風」是吹風的風，裡面是「虫」。', parts: ['几', '鳥'], story: '外面是「几」，裡面是一隻「鳥」。「鳳」是傳說中很漂亮的鳥，「鳳梨」的葉子就像鳥的尾巴。', sentence: '夏天的鳳梨又甜又多汁。' },
      { id: 'h-投', combo: {'layout': 'lr', 'parts': [['扌', 'm', '手'], ['殳', 'p', '']]}, char: '投', zhuyin: 'ㄊㄡˊ', radical: '手', strokes: 7, words: ['林投樹', '投球'], say: '投，林投樹的投', cloze: '林＿樹', img: 'screwpine.png', options: ['投', '設', '股', '段'], clue: '這個字跟手有關。', explain: '答案是「投」，左邊是提手旁；「設」是設計的設，左邊是言字旁。', parts: ['扌', '殳'], story: '左邊是提手旁，右邊的「殳」像手拿著東西。用手把東西丟出去，就是「投」。', sentence: '哥哥把球投進籃框。', build: { layout: 'lr', show: ['？', '殳'], answer: '扌', options: ['扌', '言', '月', '木'], clue: '想一想：投球的時候，用身體的哪個部分？' } },
      { id: 'h-繼', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['繼的右邊', 'p', '']]}, char: '繼', zhuyin: 'ㄐㄧˋ', radical: '糸', strokes: 20, words: ['繼續'], say: '繼，繼續的繼', cloze: '＿續', img: 'keep-going.png', options: ['繼', '斷', '計', '記'], clue: '這個字的左邊是絲線，把斷掉的線接起來。', explain: '答案是「繼」；「斷」是斷掉的斷，右邊是「斤」。', parts: ['糸', '繼的右邊'], story: '左邊是糸字旁，像一條線。把斷掉的線接起來，讓它一直連下去，就是「繼」。', sentence: '休息一下，我們再繼續走。' },
      { id: 'h-續', combo: {'layout': 'lr', 'parts': [['糸', 'm', '絲線'], ['賣', 's', '']]}, char: '續', zhuyin: 'ㄒㄩˋ', radical: '糸', strokes: 21, words: ['繼續', '連續'], say: '續，繼續的續', cloze: '繼＿', img: 'keep-going.png', options: ['續', '讀', '賣', '序'], clue: '這個字的左邊，是代表絲線的部首。', explain: '答案是「續」，左邊是糸字旁；「讀」是讀書的讀，左邊是言字旁。', parts: ['糸', '賣'], story: '左邊是糸字旁，像一條長長的線，右邊是「賣」。線一直接下去不斷掉，就是「續」。', sentence: '雨連續下了三天。', build: { layout: 'lr', show: ['？', '賣'], answer: '糸', options: ['糸', '言', '口', '扌'], clue: '想一想：一直接下去、不斷掉，像什麼東西？' } },
      { id: 'h-淺', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['戔', 's', '']]}, char: '淺', zhuyin: 'ㄑㄧㄢˇ', radical: '水', strokes: 11, words: ['淺色', '很淺'], say: '淺，淺色的淺', cloze: '＿色', img: 'sea-colors.png', options: ['淺', '錢', '棧', '線'], clue: '這個字跟水有關。', explain: '答案是「淺」，左邊是三點水；「錢」是金錢的錢，左邊是「金」。', parts: ['氵', '戔'], story: '左邊是三點水，水不多、很快就看到底，就是「淺」。顏色淡淡的，也叫「淺」。', sentence: '妹妹穿著淺藍色的裙子。', build: { layout: 'lr', show: ['？', '戔'], answer: '氵', options: ['氵', '金', '木', '糸'], clue: '想一想：小朋友可以在哪裡玩水？水很少的地方。' } },
      { id: 'h-岸', combo: {'layout': 'tb', 'parts': [['山', 'm', '高高的地方'], ['厈', 's', '']]}, char: '岸', zhuyin: 'ㄢˋ', radical: '山', strokes: 8, words: ['岸邊', '海岸'], say: '岸，岸邊的岸', cloze: '＿邊', img: 'shore.png', options: ['岸', '岩', '案', '安'], clue: '這個字的上面是「山」，下面是「干」。', explain: '答案是「岸」；「岩」是岩石的岩，下面是「石」。', parts: ['山', '厈'], story: '上面是「山」，水邊高起來的地方，就是「岸」。', sentence: '我們坐在河岸邊看夕陽。' },
      { id: 'h-沿', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['㕣', 's', '']]}, char: '沿', zhuyin: 'ㄧㄢˊ', radical: '水', strokes: 8, words: ['沿著', '沿路'], say: '沿，沿著的沿', cloze: '＿著', img: 'along-coast.png', options: ['沿', '船', '鉛', '言'], clue: '這個字跟水有關。', explain: '答案是「沿」，左邊是三點水；「船」的左邊是「舟」。', parts: ['氵', '㕣'], story: '左邊是三點水。順著河水一直走，就是「沿」著河走。', sentence: '我們沿著河邊散步。' },
      { id: 'h-踩', combo: {'layout': 'lr', 'parts': [['足', 'm', '腳'], ['采', 's', '']]}, char: '踩', zhuyin: 'ㄘㄞˇ', radical: '足', strokes: 15, words: ['踩著', '踩到'], say: '踩，踩到的踩', cloze: '＿到', img: 'step-stones.png', options: ['踩', '採', '菜', '彩'], clue: '這個字跟腳有關。', explain: '答案是「踩」，左邊是足字旁；「採」是採花的採，左邊是提手旁。', parts: ['足', '采'], story: '左邊是足字旁，就是腳。右邊的「采」念起來很像「踩」。用腳踏下去，就是「踩」。', sentence: '小心不要踩到水坑。', build: { layout: 'lr', show: ['？', '采'], answer: '足', options: ['足', '扌', '艹', '彡'], clue: '想一想：走路的時候，用身體的哪個部分踏在地上？' } },
      { id: 'h-疊', combo: {'type': '會意字', 'pict': '上面有三個「田」，下面像一張桌子。東西一層一層的堆上去，就是「疊」。'}, char: '疊', zhuyin: 'ㄉㄧㄝˊ', radical: '又', strokes: 22, words: ['疊石頭', '重疊'], say: '疊，疊石頭的疊', cloze: '＿石頭', img: 'stack-stones.png', options: ['疊', '壘', '蝶', '碟'], clue: '這個字的上面，有三個「田」。', explain: '答案是「疊」；「壘」是壘球的壘，下面是「土」。', parts: ['晶', '冖', '且'], story: '上面有三個「田」，下面像一張桌子。東西一層一層往上堆，就是「疊」。', sentence: '弟弟把積木一塊一塊疊起來。' },
      { id: 'h-般', combo: {'layout': 'lr', 'parts': [['舟', 'm', '船'], ['殳', 'p', '']]}, char: '般', zhuyin: 'ㄅㄢ', radical: '舟', strokes: 10, words: ['一般', '這般'], say: '般，一般的般', cloze: '一＿', img: 'normal-stone.png', options: ['般', '船', '搬', '盤'], clue: '這個字的左邊，是一艘小船。', explain: '答案是「般」，右邊是「殳」；「船」是坐船的船，右邊是「㕣」。', parts: ['舟', '殳'], story: '左邊的「舟」是小船，右邊的「殳」像手拿著槳。「一般」就是普通、平常的意思。', sentence: '這不是一般的石頭，是很特別的石頭。', build: { layout: 'lr', show: ['舟', '？'], answer: '殳', options: ['殳', '几', '又', '口'], clue: '想一想：划船要用手拿著東西，右邊像什麼？' } }
    ],
    vocab: [
      { id: 'v-挑戰', cloze: true, clozeOptions: ['挑戰', '放棄', '害怕', '休息'], word: '挑戰', meaning: '遇到很難的事，勇敢的去試試看。', example: '這座山很高，我們要＿＿爬到山頂。', img: 'challenge.png', options: ['挑戰', '交通', '導遊', '繼續'] },
      { id: 'v-交通', word: '交通', meaning: '車子、船、飛機來來往往，把人和東西送到別的地方。', example: '上下班的時候，馬路上的＿＿很擁擠。', img: 'traffic.png', options: ['交通', '岸邊', '鳳梨', '木棧道'] },
      { id: 'v-隨', cloze: true, clozeOptions: ['隨', '離', '推', '躲'], word: '隨', meaning: '跟著。', example: '我們＿著老師，一個接一個走進教室。', img: 'follow-guide.png', options: ['隨', '踩', '沿', '疊'] },
      { id: 'v-導遊', word: '導遊', meaning: '帶大家去玩、一邊介紹景點的人。', example: '＿＿拿著小旗子，帶我們參觀老街。', img: 'tour-guide.png', options: ['導遊', '鳳梨', '交通', '林投樹'] },
      { id: 'v-鳳梨', word: '鳳梨', meaning: '一種水果，外皮硬硬的有刺，頭上有一叢綠葉，吃起來酸酸甜甜。', example: '夏天的＿＿又香又甜。', img: 'pineapple.png', options: ['鳳梨', '林投樹', '木棧道', '導遊'] },
      { id: 'v-林投樹', word: '林投樹', meaning: '長在海邊的樹，很耐風；果實長得很像鳳梨，但是不能吃。', example: '海邊的沙灘旁，長著一排＿＿＿。', img: 'screwpine.png', options: ['林投樹', '鳳梨', '岸邊', '交通'] },
      { id: 'v-繼續', cloze: true, clozeOptions: ['繼續', '停止', '忘記', '回家'], word: '繼續', meaning: '不停下來，一直做下去。', example: '休息一下，我們再＿＿往前走。', img: 'keep-going.png', options: ['繼續', '挑戰', '一般', '隨'] },
      { id: 'v-木棧道', word: '木棧道', meaning: '用木頭架起來、讓人走的步道。', example: '我們走在森林裡的＿＿＿上，聽小鳥唱歌。', img: 'boardwalk.png', options: ['木棧道', '林投樹', '交通', '鳳梨'] },
      { id: 'v-岸邊', word: '岸邊', meaning: '海或河旁邊的陸地。', example: '風浪很大，不要太靠近＿＿。', img: 'shore.png', options: ['岸邊', '木棧道', '導遊', '交通'] },
      { id: 'v-淺', cloze: true, clozeOptions: ['淺', '深', '黑', '重'], word: '淺', meaning: '顏色淡淡的；也可以說水不多、看得到底。', example: '小溪的水很＿，只到我的小腿，可以放心玩水。', img: 'sea-colors.png', options: ['淺', '踩', '疊', '沿'] },
      { id: 'v-沿', cloze: true, clozeOptions: ['沿', '跳', '飛', '拿'], word: '沿', meaning: '順著。', example: '我們＿著小河一直走，就到海邊了。', img: 'along-coast.png', options: ['沿', '隨', '淺', '踩'] },
      { id: 'v-踩', cloze: true, clozeOptions: ['踩', '拿', '吃', '寫'], word: '踩', meaning: '用腳往下踏。', example: '下雨天，弟弟喜歡＿水坑。', img: 'step-stones.png', options: ['踩', '疊', '淺', '隨'] },
      { id: 'v-疊', cloze: true, clozeOptions: ['疊', '丟', '踢', '吹'], word: '疊', meaning: '一層一層往上堆。', example: '我們把石頭一顆一顆＿起來。', img: 'stack-stones.png', options: ['疊', '踩', '沿', '一般'] },
      { id: 'v-一般', word: '一般', meaning: '普通、平常的。', example: '這不是＿＿的石頭，是很特別的石頭。', img: 'normal-stone.png', options: ['一般', '繼續', '挑戰', '岸邊'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-挑', char: '挑', img: 'cw-pick-fruit.png', charMeaning: '選一選；也可以是勇敢的去試。', word: '挑選', meaning: '從很多東西裡，選出自己要的。', example: '媽媽在市場仔細的＿＿水果。', options: ['挑選', '戰勝', '交朋友', '連續'] },
      { id: 'cw-戰', char: '戰', img: 'cw-win.png', charMeaning: '打仗、比賽。', word: '戰勝', meaning: '比賽或打仗贏了。', example: '我們班＿＿了隔壁班，得到第一名。', options: ['戰勝', '挑選', '跟隨', '踩到'] },
      { id: 'cw-交', char: '交', img: 'cw-make-friend.png', charMeaning: '互相來往。', word: '交朋友', meaning: '認識新的人，變成好朋友。', example: '我在新學校＿＿＿，認識了小美。', options: ['交朋友', '導師', '一般般', '沿路'] },
      { id: 'cw-隨', char: '隨', img: 'cw-ducklings.png', charMeaning: '跟著。', word: '跟隨', meaning: '跟在後面一起走。', example: '小鴨子＿＿鴨媽媽，排成一排過馬路。', options: ['跟隨', '戰勝', '踩到', '鳳梨酥'] },
      { id: 'cw-導', char: '導', img: 'cw-teacher.png', charMeaning: '帶領、教導。', word: '導師', meaning: '照顧全班、教我們的老師。', example: '我們班的＿＿很溫柔，常常鼓勵我們。', options: ['導師', '交朋友', '挑選', '淺色'] },
      { id: 'cw-鳳', char: '鳳', img: 'cw-pineapple-cake.png', charMeaning: '傳說中很漂亮的鳥；也是鳳梨的鳳。', word: '鳳梨酥', meaning: '包著鳳梨餡的小點心。', example: '外國朋友來臺灣，最喜歡買＿＿＿。', options: ['鳳梨酥', '投手', '連續', '岸上'] },
      { id: 'cw-投', char: '投', img: 'cw-pitcher.png', charMeaning: '丟出去。', word: '投手', meaning: '棒球比賽裡，把球丟給打擊手的人。', example: '哥哥是棒球隊的＿＿，球丟得又快又準。', options: ['投手', '導師', '挑選', '重疊'] },
      { id: 'cw-繼', char: '繼', img: 'cw-relay.png', charMeaning: '接下去。', word: '繼續努力', meaning: '不放棄，一直用心做下去。', example: '雖然沒有得獎，我還是會＿＿＿＿。', options: ['繼續努力', '鳳梨酥', '交朋友', '淺色'] },
      { id: 'cw-續', char: '續', img: 'cw-rain-days.png', charMeaning: '接下去，不斷掉。', word: '連續', meaning: '一個接著一個，沒有停。', example: '颱風來了，大雨＿＿下了三天。', options: ['連續', '戰勝', '沿路', '投手'] },
      { id: 'cw-淺', char: '淺', img: 'cw-light-blue.png', charMeaning: '顏色淡；水不深。', word: '淺色', meaning: '淡淡的顏色，例如淺藍、淺綠。', example: '夏天穿＿＿的衣服，比較不熱。', options: ['淺色', '導師', '跟隨', '踩到'] },
      { id: 'cw-岸', char: '岸', img: 'cw-boat-shore.png', charMeaning: '水邊的陸地。', word: '上岸', meaning: '從船上或水裡，走到陸地上。', example: '游完泳，教練叫大家＿＿休息。', options: ['上岸', '鳳梨酥', '連續', '挑選'] },
      { id: 'cw-沿', char: '沿', img: 'cw-road-trip.png', charMeaning: '順著。', word: '沿路', meaning: '一路上、順著路走的時候。', example: '我們＿＿看到好多美麗的花。', options: ['沿路', '投手', '戰勝', '交朋友'] },
      { id: 'cw-踩', char: '踩', img: 'cw-puddle.png', charMeaning: '用腳踏。', word: '踩到', meaning: '腳不小心踏在東西上面。', example: '弟弟不小心＿＿水坑，鞋子都溼了。', options: ['踩到', '上岸', '淺色', '導師'] },
      { id: 'cw-疊', char: '疊', img: 'cw-folded-clothes.png', charMeaning: '一層一層堆起來；也可以把東西摺起來。', word: '疊衣服', meaning: '把洗好的衣服摺整齊。', example: '我會幫媽媽＿＿＿，再放進衣櫃。', options: ['疊衣服', '鳳梨酥', '沿路', '戰勝'] },
      { id: 'cw-般', char: '般', img: 'cw-so-so.png', charMeaning: '普通、平常。', word: '一般般', meaning: '不算很好，也不算很差，普普通通。', example: '這碗麵的味道＿＿＿，不算特別好吃。', options: ['一般般', '上岸', '跟隨', '投手'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-交頭接耳', situationImg: 'id-whisper.png', idiom: '交頭接耳', char: '交', meaning: '頭靠在一起，小小聲的說話。', example: '上課時不要交頭接耳，有問題要舉手問老師。', situation: '老師在講臺上說話，兩個同學把頭靠在一起，偷偷小聲的說悄悄話。',
        fill: { options: ['考試的時候，不可以和旁邊的同學＿＿＿＿。', '我站在山頂上，＿＿＿＿的大聲唱歌。'], clue: '提示：哪一句是頭靠在一起，小小聲的說話？', explain: '第一句用得對：考試時不能和同學小聲說話。大聲唱歌不是小小聲說話。' } },
      { id: 'i-如影隨形', situationImg: 'id-shadow-friends.png', idiom: '如影隨形', char: '隨', meaning: '像影子一樣，一直跟在旁邊，分不開。', example: '小狗和主人如影隨形，主人走到哪裡，牠就跟到哪裡。', situation: '弟弟走到客廳，小狗跟到客廳；弟弟走到廚房，小狗也跟到廚房。',
        fill: { options: ['她們兩個是好朋友，每天都＿＿＿＿，一起上學、一起回家。', '我把書包＿＿＿＿的忘在學校了。'], clue: '提示：哪一句是一直在一起、分不開？', explain: '第一句用得對：兩個好朋友每天都在一起。把書包忘在學校，跟分不開沒有關係。' } },
      { id: 'i-投其所好', situationImg: 'id-gift-book.png', idiom: '投其所好', char: '投', meaning: '照著別人喜歡的東西，去做他會開心的事。', example: '爺爺喜歡下棋，我就投其所好，常常陪他下棋。', situation: '姐姐知道好朋友最喜歡恐龍，生日時就送她一本恐龍書。',
        fill: { options: ['妹妹喜歡畫畫，我就＿＿＿＿，送她一盒彩色筆。', '外面下大雨，我們＿＿＿＿的撐傘回家。'], clue: '提示：哪一句是照著別人喜歡的東西，讓他開心？', explain: '第一句用得對：妹妹喜歡畫畫，就送她彩色筆。撐傘回家跟別人喜歡什麼沒有關係。' } },
      { id: 'i-夜以繼日', situationImg: 'id-night-work.png', idiom: '夜以繼日', char: '繼', meaning: '白天做，晚上也不休息，一直做下去。', example: '工人夜以繼日的修馬路，希望大家早一點可以通行。', situation: '颱風過後，工人們從白天一直修到晚上，連夜裡都在工作，想快點把路修好。',
        fill: { options: ['醫生＿＿＿＿的照顧病人，都沒有好好睡覺。', '我＿＿＿＿的吃完一顆蘋果。'], clue: '提示：哪一句是白天晚上都不休息，一直做？', explain: '第一句用得對：醫生白天晚上都在照顧病人。吃一顆蘋果很快，不用白天晚上一直做。' } },
      { id: 'i-隔岸觀火', situationImg: 'id-not-help.png', idiom: '隔岸觀火', char: '岸', meaning: '別人有困難，卻站在旁邊看，不去幫忙。', example: '同學跌倒了，我們不要隔岸觀火，要趕快去扶他。', situation: '同學的鉛筆盒掉了，鉛筆散了一地，旁邊的人卻只是看著，沒有人去幫忙撿。',
        fill: { options: ['朋友有困難，我們不能＿＿＿＿，要伸手幫忙。', '我們＿＿＿＿，一起把教室打掃乾淨。'], clue: '提示：哪一句是在說只在旁邊看，不去幫忙？', explain: '第一句用得對：朋友有困難時，不能只在旁邊看。一起打掃是有幫忙，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-挑', char: '挑', wrong: '桃', sentence: '媽媽在市場挑選水果。', options: ['挑', '桃', '逃'], clue: '這裡是說用手選一選，想一想，哪一個字的左邊是手？', explain: '要改成「挑」。用手選東西是「挑選」，左邊是提手旁；「桃」是桃子的桃。' },
      { id: 'fx-戰', char: '戰', wrong: '站', sentence: '我們要勇敢挑戰困難。', options: ['戰', '站', '單'], clue: '這裡是說勇敢去試很難的事，跟站起來沒有關係。', explain: '要改成「戰」。勇敢去試是「挑戰」，右邊是「戈」；「站」是站立的站。' },
      { id: 'fx-交', char: '交', wrong: '校', sentence: '早上的交通很擁擠。', options: ['交', '校', '效'], clue: '這裡說的是車子來來往往，跟學校沒有關係。', explain: '要改成「交」。車子來來往往是「交通」；「校」是學校的校。' },
      { id: 'fx-隨', char: '隨', wrong: '追', sentence: '小鴨子隨著鴨媽媽過馬路。', options: ['隨', '追', '遂'], clue: '這裡是說慢慢的跟在後面走，不是用力追。', explain: '要改成「隨」。跟在後面是「隨著」；「追」是追趕的追。' },
      { id: 'fx-導', char: '導', wrong: '道', sentence: '導遊帶我們參觀博物館。', options: ['導', '道', '到'], clue: '這裡說的是帶大家去玩的人，想一想，哪一個字的下面有代表手的「寸」？', explain: '要改成「導」。帶路的人是「導遊」，下面有「寸」；「道」是道路的道。' },
      { id: 'fx-鳳', char: '鳳', wrong: '風', sentence: '夏天的鳳梨又甜又多汁。', options: ['鳳', '風', '楓'], clue: '這裡說的是一種水果，想一想，哪一個字的裡面有一隻鳥？', explain: '要改成「鳳」。水果是「鳳梨」，裡面是「鳥」；「風」是吹風的風。' },
      { id: 'fx-投', char: '投', wrong: '設', sentence: '哥哥把球投進籃框。', options: ['投', '設', '股'], clue: '這裡是說用手把球丟出去，想一想，哪一個字的左邊是手？', explain: '要改成「投」。把球丟出去是「投」，左邊是提手旁；「設」是設計的設。' },
      { id: 'fx-繼', char: '繼', wrong: '計', sentence: '休息一下，我們再繼續走。', options: ['繼', '計', '記'], clue: '這裡是說不停下來，一直接下去，想一想，哪一個字的左邊是絲線？', explain: '要改成「繼」。一直做下去是「繼續」，左邊是糸字旁；「計」是計算的計。' },
      { id: 'fx-續', char: '續', wrong: '讀', sentence: '雨連續下了三天。', options: ['續', '讀', '賣'], clue: '這裡是說一天接著一天，跟讀書沒有關係。', explain: '要改成「續」。一個接一個是「連續」，左邊是糸字旁；「讀」是讀書的讀，左邊是言字旁。' },
      { id: 'fx-淺', char: '淺', wrong: '錢', sentence: '妹妹穿著淺藍色的裙子。', options: ['淺', '錢', '線'], clue: '這裡說的是淡淡的顏色，跟金錢沒有關係。', explain: '要改成「淺」。淡淡的藍色是「淺藍色」，左邊是三點水；「錢」是金錢的錢。' },
      { id: 'fx-岸', char: '岸', wrong: '案', sentence: '我們坐在河邊的岸上看夕陽。', options: ['岸', '案', '岩'], clue: '這裡說的是水旁邊的陸地，想一想，哪一個字的上面是山？', explain: '要改成「岸」。水旁邊的陸地是「岸」，上面是「山」；「案」的下面是「木」。' },
      { id: 'fx-沿', char: '沿', wrong: '船', sentence: '我們沿著河邊散步。', options: ['沿', '船', '鉛'], clue: '這裡是說順著河邊走，想一想，哪一個字跟水有關？', explain: '要改成「沿」。順著走是「沿著」，左邊是三點水；「船」的左邊是「舟」。' },
      { id: 'fx-踩', char: '踩', wrong: '採', sentence: '小心不要踩到水坑。', options: ['踩', '採', '彩'], clue: '這裡是說用腳踏下去，想一想，哪一個字跟腳有關？', explain: '要改成「踩」。用腳踏是「踩」，左邊是足字旁；「採」是採花的採，左邊是提手旁。' },
      { id: 'fx-疊', char: '疊', wrong: '蝶', sentence: '弟弟把積木一塊一塊疊起來。', options: ['疊', '蝶', '碟'], clue: '這裡是說一層一層往上堆，跟蝴蝶沒有關係。', explain: '要改成「疊」。一層一層堆是「疊」；「蝶」是蝴蝶的蝶。' },
      { id: 'fx-般', char: '般', wrong: '船', sentence: '這不是一般的石頭。', options: ['般', '船', '盤'], clue: '這裡是說普通、平常，跟坐船沒有關係。', explain: '要改成「般」。普通的意思是「一般」；「船」是坐船的船。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿戰」是勇敢的去試很難的事。', sentence: '我們一起來＿戰爬山。', frame: '＿戰', options: ['挑', '桃'], answer: '挑', clue: '提示：這句話在說勇敢的去試，不是在說水果。', explain: '答案是「挑」，左邊是提手旁；「桃」是桃子的桃，左邊是「木」。' },
      { id: 's2', meaning: '「＿子」是一種粉紅色的水果。', sentence: '這顆＿子又大又甜。', frame: '＿子', options: ['桃', '挑'], answer: '桃', clue: '提示：這句話在說水果，水果長在樹上。', explain: '答案是「桃」，左邊是「木」；「挑」是挑選的挑，左邊是提手旁。' },
      { id: 's3', meaning: '「＿邊」是海或河旁邊的陸地。', sentence: '我們坐在河＿邊看夕陽。', frame: '＿邊', options: ['岸', '岩'], answer: '岸', clue: '提示：這句話在說水旁邊的地方，下面不是「石」。', explain: '答案是「岸」；「岩」是岩石的岩，下面是「石」。' },
      { id: 's4', meaning: '「＿石」是很大很硬的石頭。', sentence: '海邊有一塊大＿石。', frame: '＿石', options: ['岩', '岸'], answer: '岩', clue: '提示：這句話在說又大又硬的石頭，下面有「石」。', explain: '答案是「岩」，下面是「石」；「岸」是岸邊的岸。' },
      { id: 's5', meaning: '「＿色」是淡淡的顏色。', sentence: '妹妹喜歡＿色的衣服。', frame: '＿色', options: ['淺', '錢'], answer: '淺', clue: '提示：這句話在說顏色，不是在說買東西。', explain: '答案是「淺」，左邊是三點水；「錢」是金錢的錢，左邊是「金」。' },
      { id: 's6', meaning: '「零＿」是一塊一塊的小硬幣。', sentence: '我把零＿放進小豬撲滿。', frame: '零＿', options: ['錢', '淺'], answer: '錢', clue: '提示：這句話在說可以買東西的硬幣。', explain: '答案是「錢」，左邊是「金」；「淺」是淺色的淺。' },
      { id: 's7', meaning: '「＿到」是腳不小心踏在東西上。', sentence: '小心不要＿到小花。', frame: '＿到', options: ['踩', '採'], answer: '踩', clue: '提示：這句話在說用腳，不是用手。', explain: '答案是「踩」，左邊是足字旁；「採」是用手摘，左邊是提手旁。' },
      { id: 's8', meaning: '「＿花」是用手把花摘下來。', sentence: '公園的花很漂亮，可是不能＿花。', frame: '＿花', options: ['採', '踩'], answer: '採', clue: '提示：這句話在說用手摘，不是用腳。', explain: '答案是「採」，左邊是提手旁；「踩」是用腳踏，左邊是足字旁。' },
      { id: 's9', meaning: '「＿續」是一直做下去，不停下來。', sentence: '休息一下，我們再＿續走。', frame: '＿續', options: ['繼', '斷'], answer: '繼', clue: '提示：這句話在說一直接下去，不是斷掉。', explain: '答案是「繼」；「斷」是斷掉的斷，意思剛好相反。' },
      { id: 's10', meaning: '「一＿」是普通、平常的。', sentence: '這是一＿的石頭。', frame: '一＿', options: ['般', '船'], answer: '般', clue: '提示：這句話在說普通、平常，不是在說坐的交通工具。', explain: '答案是「般」，右邊是「殳」；「船」是坐船的船。' }
    ],
    listen: [
      { id: 'l1', text: '有一個人拿著小旗子，帶我們去玩，一邊走一邊介紹。', answer: 0, options: [{ text: '導遊', img: 'tour-guide.png' }, { text: '交通', img: 'traffic.png' }, { text: '鳳梨', img: 'pineapple.png' }, { text: '岸邊', img: 'shore.png' }] },
      { id: 'l2', text: '一種水果，外皮硬硬的有刺，頭上有綠色的葉子。', answer: 0, options: [{ text: '鳳梨', img: 'pineapple.png' }, { text: '林投樹', img: 'screwpine.png' }, { text: '木棧道', img: 'boardwalk.png' }, { text: '導遊', img: 'tour-guide.png' }] },
      { id: 'l3', text: '海邊的一種樹，果實很像鳳梨，可是不能吃。', answer: 0, options: [{ text: '林投樹', img: 'screwpine.png' }, { text: '鳳梨', img: 'pineapple.png' }, { text: '岸邊', img: 'shore.png' }, { text: '交通', img: 'traffic.png' }] },
      { id: 'l4', text: '用木頭架起來的步道，走在上面叩叩叩的響。', answer: 0, options: [{ text: '木棧道', img: 'boardwalk.png' }, { text: '交通', img: 'traffic.png' }, { text: '導遊', img: 'tour-guide.png' }, { text: '鳳梨', img: 'pineapple.png' }] },
      { id: 'l5', text: '馬路上有好多車子，來來往往。', answer: 0, options: [{ text: '交通', img: 'traffic.png' }, { text: '岸邊', img: 'shore.png' }, { text: '木棧道', img: 'boardwalk.png' }, { text: '林投樹', img: 'screwpine.png' }] },
      { id: 'l6', text: '我們把石頭一顆一顆往上堆，堆成一座小山。', answer: 0, options: [{ text: '疊石頭', img: 'stack-stones.png' }, { text: '踩石頭', img: 'step-stones.png' }, { text: '沿著海邊走', img: 'along-coast.png' }, { text: '挑戰', img: 'challenge.png' }] },
      { id: 'l7', text: '我們順著海岸，一直往前走。', answer: 0, options: [{ text: '沿著海邊走', img: 'along-coast.png' }, { text: '疊石頭', img: 'stack-stones.png' }, { text: '鳳梨', img: 'pineapple.png' }, { text: '導遊', img: 'tour-guide.png' }] },
      { id: 'l8', text: '爬山爬得好累，可是我們不停下來，一直往前走。', answer: 0, options: [{ text: '繼續', img: 'keep-going.png' }, { text: '一般', img: 'normal-stone.png' }, { text: '岸邊', img: 'shore.png' }, { text: '交通', img: 'traffic.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選疊字', pickSay: '看圖，選出最適合的疊字。',
      /* 短語一：動作＋著＋疊字＋的＋東西（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '穿著花花綠綠的衣服', img: 'pr-clothes.png',
        parts: [{ text: '穿著', role: '做什麼' }, { text: '花花綠綠', role: '什麼樣子（疊字）' }, { text: '的' }, { text: '衣服', role: '什麼東西' }],
        explain: '先說做什麼，再用疊字說東西的樣子，加上「的」，最後說是什麼東西，就能說得更清楚。' },
      pick: [
        { id: 'ph1', img: 'pr-blocks.png', before: '堆著', noun: '積木', ask: '他堆著什麼樣的積木', look: '再看看圖片，每一堆積木一樣高嗎？', options: ['高高低低', '密密麻麻', '來來往往', '彎彎曲曲'], clue: '提示：有的積木堆得很高，有的很矮。', explain: '答案是「高高低低」，積木有高有低，所以說「堆著高高低低的積木」。' },
        { id: 'ph2', img: 'pr-cars.png', before: '看著', noun: '車子', ask: '她看著什麼樣的車子', look: '再看看圖片，車子是停著，還是一直開來開去？', options: ['來來往往', '高高低低', '花花綠綠', '密密麻麻'], clue: '提示：馬路上的車子，有的開過來，有的開過去。', explain: '答案是「來來往往」，車子開過來又開過去，所以說「看著來來往往的車子」。' },
        { id: 'ph3', img: 'pr-ants.png', before: '爬著', noun: '螞蟻', ask: '地上爬著什麼樣的螞蟻', look: '再看看圖片，地上的螞蟻多不多？', options: ['密密麻麻', '來來往往', '大大小小', '彎彎曲曲'], clue: '提示：地上的螞蟻好多好多，擠在一起。', explain: '答案是「密密麻麻」，螞蟻又多又擠，所以說「爬著密密麻麻的螞蟻」。' },
        { id: 'ph4', img: 'pr-path.png', before: '走著', noun: '小路', ask: '他們走著什麼樣的小路', look: '再看看圖片，這條小路是直直的嗎？', options: ['彎彎曲曲', '密密麻麻', '來來往往', '高高低低'], clue: '提示：這條小路是直直的，還是轉來轉去？', explain: '答案是「彎彎曲曲」，小路轉來轉去，所以說「走著彎彎曲曲的小路」。' },
        { id: 'ph5', img: 'pr-stones.png', before: '看著', noun: '石頭', ask: '他看著什麼樣的石頭', look: '再看看圖片，這些石頭一樣大嗎？', options: ['大大小小', '彎彎曲曲', '來來往往', '密密麻麻'], clue: '提示：有的石頭很大，有的石頭很小。', explain: '答案是「大大小小」，石頭有大有小，所以說「看著大大小小的石頭」。' },
        { id: 'ph6', img: 'pr-balloons.png', before: '拿著', noun: '氣球', ask: '她拿著什麼樣的氣球', look: '再看看圖片，氣球是什麼顏色？', options: ['花花綠綠', '高高低低', '彎彎曲曲', '密密麻麻'], clue: '提示：氣球有紅色、綠色、黃色，好多種顏色。', explain: '答案是「花花綠綠」，氣球有好多顏色，所以說「拿著花花綠綠的氣球」。' },
        { id: 'ph7', img: 'pr-seesaw.png', before: '玩著', noun: '翹翹板', ask: '他們玩著什麼樣的翹翹板', look: '再看看圖片，翹翹板是怎麼動的？', options: ['上上下下', '花花綠綠', '密密麻麻', '大大小小'], clue: '提示：翹翹板一下子升高，一下子降低。', explain: '答案是「上上下下」，翹翹板一上一下，所以說「玩著上上下下的翹翹板」。' },
        { id: 'ph8', img: 'pr-books.png', before: '排著', noun: '書', ask: '書架上排著什麼樣的書', look: '再看看圖片，書排得亂不亂？', options: ['整整齊齊', '來來往往', '彎彎曲曲', '密密麻麻'], clue: '提示：書一本一本排好，一點都不亂。', explain: '答案是「整整齊齊」，書排得很整齊，所以說「排著整整齊齊的書」。' }
      ],
      say: [
        { id: 'ps1', img: 'pr-path.png', noun: '小路', ask: '他們走著什麼樣的小路', accept: ['走著彎彎曲曲的小路', '彎彎曲曲的小路'], clue: '提示：小路轉來轉去，先說「走著」，再用疊字說它的樣子，最後說「的小路」。', model: '走著彎彎曲曲的小路' },
        { id: 'ps2', img: 'pr-balloons.png', noun: '氣球', ask: '她拿著什麼樣的氣球', accept: ['拿著花花綠綠的氣球', '花花綠綠的氣球', '拿著五顏六色的氣球'], clue: '提示：氣球有好多顏色，先說「拿著」，再用疊字說它的樣子，最後說「的氣球」。', model: '拿著花花綠綠的氣球' }
      ],
      /* 第二個短語：什麼＋一＋量詞疊字＋做什麼（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '星星一顆顆亮起來', img: 'pz-stars.png',
          parts: [{ text: '星星', role: '是什麼' }, { text: '一' }, { text: '顆顆', role: '量詞疊字' }, { text: '亮起來', role: '做什麼' }],
          explain: '先說是什麼，再說「一」加上量詞疊字，像一顆顆、一朵朵，最後說做什麼，就能說出一個接著一個的樣子。' },
        fill: [
          { id: 'pz1', img: 'pz-flowers.png', parts: ['小花', '一', '朵朵', '開出來'] },
          { id: 'pz2', img: 'pz-lanterns.png', parts: ['燈籠', '一', '盞盞', '掛起來'] },
          { id: 'pz3', img: 'pz-students.png', parts: ['小朋友', '一', '個個', '走進教室'] },
          { id: 'pz4', img: 'pz-raindrops.png', parts: ['雨滴', '一', '顆顆', '落下來'] },
          { id: 'pz5', img: 'pz-ducks.png', parts: ['小鴨', '一', '隻隻', '跳下水'] }
        ]
      },
      words: [
        { word: '挑戰', meaning: '遇到很難的事，勇敢的去試試看。', img: 'challenge.png' },
        { word: '著名', meaning: '很有名，很多人都知道。', img: 'famous-place.png' }
      ],
      choose: [
        { id: 'pw1', word: '挑戰', options: ['哥哥想挑戰自己，一口氣跑完操場兩圈。', '我挑戰了一杯牛奶，喝光光。'], clue: '提示：想一想，哪一句是勇敢的去試很難的事？', explain: '第一句用得對：跑兩圈很難，哥哥勇敢去試。喝牛奶不是挑戰。' },
        { id: 'pw2', word: '挑戰', options: ['這座山很高，我們決定一起挑戰爬上山頂。', '我挑戰了一顆蘋果，好甜。'], clue: '提示：想一想，爬高山和吃蘋果，哪一個比較難、需要勇氣？', explain: '第一句用得對：爬高山很難，需要勇氣去試。吃蘋果不是挑戰。' },
        { id: 'pw3', word: '著名', options: ['臺北一〇一是一棟著名的大樓。', '我的鉛筆盒很著名的掉在地上。'], clue: '提示：想一想，哪一句說的是很多人都知道的東西？', explain: '第一句用得對：臺北一〇一很有名，很多人都知道。鉛筆盒掉在地上，跟有名沒有關係。' },
        { id: 'pw4', word: '著名', options: ['這位著名的畫家，畫了很多美麗的畫。', '弟弟著名的吃了一碗飯。'], clue: '提示：想一想，哪一句說的是很有名的人？', explain: '第一句用得對：畫家很有名。吃飯不能說「著名的吃」。' }
      ],
      make: [
        { id: 'pm1', word: '挑戰', clue: '提示：想想看，有什麼很難的事，你想勇敢的試試看？', model: '我想挑戰自己，每天跳繩一百下。' },
        { id: 'pm2', word: '著名', clue: '提示：想想看，有什麼地方或東西很有名？', model: '日月潭是臺灣著名的景點。' }
      ]
    },
    pattern: [
      { key: 'cai', id: 'ca', title: '……才……', img: 'cai.png',
        meaning: '要先做到前面的事，後面的事才會發生。',
        examples: ['等大家都坐好了，老師才開始上課。'],
        match: [
          { id: 'pt-ca-m1', img: 'pt-green-light.png', front: '等綠燈亮了，', options: ['我們才過馬路。', '我們才去睡覺。', '小狗才會飛。'], clue: '提示：看看圖片，綠燈亮了可以做什麼？', explain: '答案是「我們才過馬路」：要等綠燈亮了，才可以過馬路。' },
          { id: 'pt-ca-m2', img: 'pt-wash-hands.png', front: '把手洗乾淨以後，', options: ['我才吃飯。', '我才變成大人。', '太陽才下山。'], clue: '提示：吃飯前要先做什麼？', explain: '答案是「我才吃飯」：先把手洗乾淨，才可以吃飯。' },
          { id: 'pt-ca-m3', img: 'pt-cake-cool.png', front: '等蛋糕放涼了，', options: ['媽媽才開始抹奶油。', '烤箱才會飛起來。', '蛋糕才會唱歌。'], clue: '提示：看看圖片，蛋糕放涼以後，媽媽要做什麼？', explain: '答案是「媽媽才開始抹奶油」：蛋糕要先放涼，才能抹奶油。' }
        ],
        conj: [
          { id: 'pt-ca-c1', full: '雨停了以後，我們才出去玩。', img: 'pt-rain-stop.png', sentence: '雨停了以後，我們＿出去玩。', options: ['……才……', '一邊……一邊……', '因為……只能……'], clue: '提示：要先等雨停，接著才能出去玩。數數看有幾個空格。', explain: '答案是「……才……」：雨停了以後，我們才出去玩。' },
          { id: 'pt-ca-c2', full: '弟弟寫完作業，才去看電視。', img: 'pt-hw-tv.png', sentence: '弟弟寫完作業，＿去看電視。', options: ['……才……', '一邊……一邊……', '因為……只能……'], clue: '提示：要先寫完作業，接著才能看電視。數數看有幾個空格。', explain: '答案是「……才……」：弟弟寫完作業，才去看電視。' },
          { id: 'pt-ca-c3', full: '爬到山頂，我們才看到美麗的雲海。', img: 'pt-sea-clouds.png', sentence: '爬到山頂，我們＿看到美麗的雲海。', options: ['……才……', '一邊……一邊……', '因為……只能……'], clue: '提示：要先爬到山頂，接著才看得到雲海。數數看有幾個空格。', explain: '答案是「……才……」：爬到山頂，我們才看到美麗的雲海。' }
        ],
        half: [
          { id: 'pt-ca-h1', front: '我刷完牙，', clue: '提示：刷完牙以後，晚上要做什麼？記得要說「才」。', model: '才去睡覺。' },
          { id: 'pt-ca-h2', front: '等水燒開了，', clue: '提示：水燒開以後，可以拿來做什麼？記得要說「才」。', model: '媽媽才泡茶。' }
        ],
        whole: [
          { id: 'pt-ca-w1', clue: '提示：先說要等什麼事做好，再用「才」說接下來發生的事。想想看：出去玩以前，要等誰？', model: '等大家都到齊了，我們才出發。' }
        ] },
      { key: 'yibian', id: 'yb', title: '一邊……一邊……', img: 'yibian.png',
        meaning: '說一樣東西的這一邊有什麼、另一邊有什麼。',
        examples: ['我家門口一邊是公園，一邊是學校。'],
        match: [
          { id: 'pt-yb-m1', img: 'pt-river-sides.png', front: '這條河一邊是稻田，', options: ['一邊是小村莊。', '一邊是星期天。', '一邊是我的作業。'], clue: '提示：看看圖片，河的另一邊有什麼？', explain: '答案是「一邊是小村莊」：河的這一邊是稻田，另一邊是小村莊。' },
          { id: 'pt-yb-m2', img: 'pt-two-color-pen.png', front: '這枝筆一邊是紅色，', options: ['一邊是藍色。', '一邊是大海。', '一邊是明天。'], clue: '提示：看看圖片，筆的另一頭是什麼顏色？', explain: '答案是「一邊是藍色」：這枝筆一頭是紅色，另一頭是藍色。' },
          { id: 'pt-yb-m3', img: 'pt-street-shops.png', front: '這條街一邊是麵包店，', options: ['一邊是書店。', '一邊是下雨天。', '一邊是我的鼻子。'], clue: '提示：看看圖片，街的另一邊是什麼店？', explain: '答案是「一邊是書店」：街的這一邊是麵包店，另一邊是書店。' }
        ],
        conj: [
          { id: 'pt-yb-c1', full: '我的書包一邊放課本，一邊放水壺。', img: 'pt-bag-sides.png', sentence: '我的書包＿＿放課本，＿＿放水壺。', options: ['一邊……一邊……', '……才……', '因為……只能……'], clue: '提示：說書包的兩邊各放什麼。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：我的書包一邊放課本，一邊放水壺。' },
          { id: 'pt-yb-c2', full: '教室一邊是窗戶，一邊是門。', img: 'pt-classroom.png', sentence: '教室＿＿是窗戶，＿＿是門。', options: ['一邊……一邊……', '……才……', '因為……只能……'], clue: '提示：說教室的兩邊各有什麼。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：教室一邊是窗戶，一邊是門。' },
          { id: 'pt-yb-c3', full: '這片餅乾一邊是巧克力，一邊是草莓。', img: 'pt-cookie-two.png', sentence: '這片餅乾＿＿是巧克力，＿＿是草莓。', options: ['一邊……一邊……', '……才……', '因為……只能……'], clue: '提示：說餅乾的兩邊各是什麼口味。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：這片餅乾一邊是巧克力，一邊是草莓。' }
        ],
        half: [
          { id: 'pt-yb-h1', front: '公園的小路一邊是草地，', clue: '提示：小路的另一邊有什麼？記得要說「一邊」。', model: '一邊是小池塘。' },
          { id: 'pt-yb-h2', front: '這個盒子一邊放蠟筆，', clue: '提示：盒子的另一邊放什麼？記得要說「一邊」。', model: '一邊放彩色筆。' }
        ],
        whole: [
          { id: 'pt-yb-w1', clue: '提示：先說是什麼東西，再用兩個「一邊」說兩邊各有什麼。想想看：你的房間兩邊有什麼？', model: '我的房間一邊是床，一邊是書桌。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'personify', name: '擬人', meaning: '把東西寫得像人一樣，會唱歌、會笑、會說話。', example: '課文裡的浪花會「輕唱」，就像人在唱歌一樣。',
          show: { sentence: '小草在風裡點點頭，跟我說早安。', mark: ['點點頭', '跟我說早安'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '大樹張開手臂，歡迎我們來爬山。', answer: true, mark: ['張開手臂', '歡迎我們'], clue: '提示：大樹會不會像人一樣歡迎別人？', explain: '是擬人：大樹不會歡迎人，這句把大樹寫得像人一樣。' },
            { id: 'rh-pe-y2', sentence: '山上有很多大樹。', answer: false, clue: '提示：這句話裡的大樹，有沒有做人才會做的事？', explain: '不是擬人：山上有大樹是真的會看到的，沒有把大樹寫得像人。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['唱著歌'], options: ['海浪唱著歌，拍打岸邊。', '海浪拍打岸邊。'], clue: '提示：哪一句的海浪，做了人才會做的事？', explain: '「海浪唱著歌」是擬人：海浪不會唱歌。' },
            { id: 'rh-pe-p2', mark: ['對我們眨眼睛'], options: ['小石頭在陽光下對我們眨眼睛。', '小石頭在陽光下亮亮的。'], clue: '提示：石頭有沒有眼睛？', explain: '「小石頭對我們眨眼睛」是擬人：石頭沒有眼睛。' },
            { id: 'rh-pe-p3', mark: ['害羞的躲在', '後面'], options: ['太陽害羞的躲在山後面。', '太陽下山了。', '太陽紅得像一顆蘋果。'], clue: '提示：哪一句的太陽，有人的心情？', explain: '「太陽害羞的躲在山後面」是擬人：太陽不會害羞。' },
            { id: 'rh-pe-p4', mark: ['在耳邊說悄悄話'], options: ['山風在耳邊說悄悄話。', '山上的風很涼。', '風吹得像在推我。'], clue: '提示：風會不會說話？', explain: '「山風在耳邊說悄悄話」是擬人：風不會說話。' },
            { id: 'rh-pe-p5', mark: ['手牽手'], options: ['白雲和高山手牽手，一起看大海。', '天上有很多白雲。', '白雲軟軟的。', '白雲像一團棉花糖。'], clue: '提示：哪一句的白雲，做了人才會做的事？', explain: '「白雲和高山手牽手」是擬人：白雲和高山沒有手。' },
            { id: 'rh-pe-p6', mark: ['笑彎了腰'], options: ['小樹被風吹得笑彎了腰。', '小樹被風吹彎了。', '小樹長在路邊。', '小樹細得像一根筷子。'], clue: '提示：小樹會不會笑？', explain: '「小樹笑彎了腰」是擬人：小樹不會笑。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「深深的藍」、「淺淺的藍」、「朵朵白色的浪花」。',
          show: { sentence: '天空藍藍的，白雲軟軟的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '山上的空氣涼涼的。', answer: true, clue: '提示：形容空氣的字裡，有沒有同一個字連在一起？', explain: '是疊字：「涼涼」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '我們去爬山。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['海水清清的，好漂亮。', '海水很漂亮。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「海水清清的」是疊字：「清清」重複了。' },
            { id: 'rh-re-p2', options: ['我們慢慢的走下木棧道。', '我們走下木棧道。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「我們慢慢的走下木棧道」是疊字：「慢慢」重複了。' },
            { id: 'rh-re-p3', options: ['山路彎彎的，好長喔。', '山路很長。', '山路像一條蛇。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「山路彎彎的」是疊字：「彎彎」重複了。' },
            { id: 'rh-re-p4', options: ['岸邊有大大的石頭。', '岸邊有石頭。', '石頭在岸邊睡覺。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「岸邊有大大的石頭」是疊字：「大大」重複了。' },
            { id: 'rh-re-p5', options: ['風呼呼的吹過海邊。', '海邊的風很大。', '風像一個調皮的孩子。', '風在跟浪花說話。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「風呼呼的吹過海邊」是疊字：「呼呼」重複了。' },
            { id: 'rh-re-p6', options: ['小明高高興興的爬上山。', '小明爬上山了。', '山頂像一頂帽子。', '大山在等我們。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「小明高高興興的爬上山」是疊字：「高高興興」重複了。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，隔開來重複說好幾次，讀起來有節奏。', example: '課文裡「一步一步」、「一聲聲」，把同一個詞重複說。',
          show: { sentence: '走呀走，走呀走，我們走到了海邊。', mark: ['走呀走'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '我看到高山，我看到大海，我看到白雲。', answer: true, mark: ['我看到'], clue: '提示：找找看，有沒有同一句話隔開來說了好幾次？', explain: '是類疊：「我看到」說了三次，讀起來有節奏。' },
            { id: 'rh-rp-y2', sentence: '我在山上看到大海。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['加油'], options: ['加油！加油！就快到山頂了！', '就快到山頂了，大家要努力。'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「加油！加油！」是類疊：「加油」說了兩次。' },
            { id: 'rh-rp-p2', mark: ['一顆'], options: ['一顆，一顆，又一顆，石頭疊成了小山。', '我們把石頭疊成了小山。'], clue: '提示：哪一句有同一個詞，隔開來說了好幾次？', explain: '「一顆，一顆，又一顆」是類疊：「一顆」重複說了好幾次。' },
            { id: 'rh-rp-p3', mark: ['我愛'], options: ['我愛高山，我愛大海，我愛古道。', '我很喜歡去古道玩。', '古道的風景好美。'], clue: '提示：哪一句有同一句話，隔開來說了好幾次？', explain: '「我愛高山，我愛大海，我愛古道」是類疊：「我愛」說了三次。' },
            { id: 'rh-rp-p4', mark: ['小心'], options: ['小心，小心，石頭很滑！', '石頭很滑，走路要注意。', '石頭滑得像溜冰場。'], clue: '提示：哪一句有同一句話，連著說了兩次？', explain: '「小心，小心」是類疊：「小心」說了兩次。' },
            { id: 'rh-rp-p5', mark: ['好藍'], options: ['天空好藍，海水也好藍。', '天空和海水都是藍色的。', '海水藍藍的。', '大海在對我們招手。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「天空好藍，海水也好藍」是類疊：「好藍」說了兩次。' },
            { id: 'rh-rp-p6', mark: ['往前走'], options: ['往前走，往前走，前面還有更美的風景。', '我們繼續往前走。', '前面的風景很美。', '小路彎彎曲曲的。'], clue: '提示：哪一句有同一句話，隔開來說了兩次？', explain: '「往前走，往前走」是類疊：同一句話說了兩次。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '浪花在岸邊跳舞，玩得好開心。', answer: '擬人', mark: ['跳舞', '玩得好開心'], clue: '提示：浪花會不會像人一樣跳舞？', explain: '答案是「擬人」：浪花不會跳舞，這句把浪花寫得像人一樣。' },
        { id: 'rh2', sentence: '高山爺爺靜靜的看著大海。', answer: '擬人', mark: ['看著大海'], clue: '提示：高山有沒有眼睛，會不會看？', explain: '答案是「擬人」：高山不會看，這句把高山寫得像人一樣。' },
        { id: 'rh3', sentence: '海水藍藍的，石頭圓圓的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「藍藍」、「圓圓」都是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '我們開開心心的走在古道上。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「開開心心」是同一個字連在一起重複用。' },
        { id: 'rh5', sentence: '爬呀爬，爬呀爬，我們爬到了山頂。', answer: '類疊', mark: ['爬呀爬'], clue: '提示：有沒有同一句話，隔開來說了好幾次？', explain: '答案是「類疊」：「爬呀爬」說了兩次。' },
        { id: 'rh6', sentence: '好美呀，好美呀，這裡的風景真好看！', answer: '類疊', mark: ['好美呀'], clue: '提示：有沒有同一句話，說了兩次？', explain: '答案是「類疊」：「好美呀」說了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L09 = d; }
})(this);

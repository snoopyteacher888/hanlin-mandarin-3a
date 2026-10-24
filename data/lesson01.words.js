/* 第 1 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」學習單）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。
       只放題號，不放課文 */
    quizLevels: { qa: 'extract', qc: 'extract', qe: 'extract', qh: 'extract', qb: 'infer', qd: 'infer', qf: 'infer',
      qg: 'interpret', qi: 'interpret', qj: 'evaluate', k1: 'evaluate', k2: 'interpret' },
    hanzi: [
      { id: 'h-待', combo: {'layout': 'lr', 'parts': [['彳', 'm', '走路'], ['寺', 's', '']]}, char: '待', zhuyin: 'ㄉㄞˋ', radical: '彳', strokes: 9, words: ['等待', '招待'], say: '待，等待的待', cloze: '等＿', img: 'waiting.png', options: ['待', '持', '侍', '特'], clue: '這個字的左邊，是雙人旁。', explain: '答案是「待」，左邊是雙人旁；「持」的左邊是提手旁，「特」的左邊是牛字旁。', parts: ['彳', '寺'], story: '左邊的雙人旁和走路有關，右邊的「寺」念起來有點像「待」。走到一個地方停下來，等人來，就是「等待」。', sentence: '我在門口等待爸爸回家。', build: { layout: 'lr', show: ['？', '寺'], answer: '彳', options: ['彳', '扌', '亻', '牛'], clue: '想一想：等人的時候常常走來走去，左邊放哪一個跟走路有關的部首？' } },
      { id: 'h-蝸', combo: {'layout': 'lr', 'parts': [['虫', 'm', '小蟲'], ['咼', 's', '']]}, char: '蝸', zhuyin: 'ㄍㄨㄚ', radical: '虫', strokes: 15, words: ['蝸牛'], say: '蝸，蝸牛的蝸', cloze: '＿牛', img: 'snail.png', options: ['蝸', '鍋', '過', '渦'], clue: '這個字的左邊，是虫字旁。', explain: '答案是「蝸」，左邊是「虫」；「鍋」是煮飯的鍋，左邊是「金」。', parts: ['虫', '咼'], story: '左邊是「虫」，表示小小的、會爬的動物。右邊的「咼」念起來像「蝸」。背著殼慢慢爬的，就是「蝸牛」。', sentence: '下雨後，葉子上爬著一隻蝸牛。', build: { layout: 'lr', show: ['？', '咼'], answer: '虫', options: ['虫', '金', '辶', '氵'], clue: '想一想：小小的、會爬的小動物，左邊要放什麼？' } },
      { id: 'h-牛', combo: {'type': '象形字', 'pict': '很久以前的「牛」，是畫一個牛頭，上面有兩隻彎彎的角。'}, char: '牛', zhuyin: 'ㄋㄧㄡˊ', radical: '牛', strokes: 4, words: ['牛奶', '蝸牛'], say: '牛，牛奶的牛', cloze: '＿奶', img: 'cow.png', options: ['牛', '午', '生', '年'], clue: '這個字中間的一豎，要穿出上面。', explain: '答案是「牛」，中間一豎穿出上面；「午」是中午的午，一豎沒有穿出上面。', parts: ['牛'], story: '很久以前的「牛」，是畫一個牛頭，上面兩隻角翹起來。所以中間那一豎要穿出上面。', sentence: '早餐我喝了一杯牛奶。' },
      { id: 'h-牠', combo: {'layout': 'lr', 'parts': [['牛', 'm', '動物'], ['也', 's', '']]}, char: '牠', zhuyin: 'ㄊㄚ', radical: '牛', strokes: 7, words: ['牠', '牠們'], say: '牠，牠們的牠', cloze: '＿們', img: 'dog-tail.png', options: ['牠', '他', '她', '它'], clue: '這個字的左邊是牛字旁，說的是動物。', explain: '答案是「牠」，說動物用牛字旁；「他」說男生，「她」說女生，「它」說東西。', parts: ['牛', '也'], story: '左邊是牛字旁，右邊是「也」。說到小狗、小貓這些動物，就用「牠」。', sentence: '小狗好可愛，牠一直搖尾巴。', build: { layout: 'lr', show: ['？', '也'], answer: '牛', options: ['牛', '亻', '女', '宀'], clue: '想一想：說小動物的時候，左邊放一種會耕田的動物。' } },
      { id: 'h-吞', combo: {'layout': 'tb', 'parts': [['天', 's', ''], ['口', 'm', '嘴巴']]}, char: '吞', zhuyin: 'ㄊㄨㄣ', radical: '口', strokes: 7, words: ['慢吞吞', '吞下'], say: '吞，吞下去的吞', cloze: '＿下', img: 'slow-eat.png', options: ['吞', '天', '吐', '杏'], clue: '這個字的上面是「天」，下面是「口」。', explain: '答案是「吞」，上面是「天」，下面是「口」；「吐」是吐出來的吐，左邊是「口」。', parts: ['天', '口'], story: '上面的「天」念起來像「吞」，下面是「口」，就是嘴巴。沒有咬，直接從嘴巴吃進去，就是「吞」。', sentence: '青蛙一口把蚊子吞下去。', build: { layout: 'tb', show: ['天', '？'], answer: '口', options: ['口', '日', '木', '心'], clue: '想一想：把東西吞下去，要用身體的哪個部分？' } },
      { id: 'h-寸', combo: {'type': '指事字', 'pict': '「寸」像一隻手，下面那一點指著手腕，離手掌大約一寸，是很短的長度。'}, char: '寸', zhuyin: 'ㄘㄨㄣˋ', radical: '寸', strokes: 3, words: ['一小寸', '尺寸'], say: '寸，尺寸的寸', cloze: '尺＿', img: 'ruler.png', options: ['寸', '才', '村', '付'], clue: '這個字很簡單，只有三畫，下面有一點。', explain: '答案是「寸」；「才」是才能的才，有一撇；「村」的左邊多了「木」。', parts: ['寸'], story: '「寸」像一隻手，下面那一點指著手腕。從手掌到手腕，大約是一寸，所以「寸」是很短的長度。', sentence: '這雙鞋的尺寸剛剛好。' },
      { id: 'h-碌', combo: {'layout': 'lr', 'parts': [['石', 'm', '石頭'], ['彔', 's', '']]}, char: '碌', zhuyin: 'ㄌㄨˋ', radical: '石', strokes: 13, words: ['忙碌'], say: '碌，忙碌的碌', cloze: '忙＿', img: 'busy-mom.png', options: ['碌', '綠', '錄', '祿'], clue: '這個字的左邊，是石字旁。', explain: '答案是「碌」，左邊是「石」；「綠」是綠色的綠，左邊是絲線。', parts: ['石', '彔'], story: '左邊是「石」，右邊的「彔」念起來像「碌」。像搬石頭一樣做很多事，一直停不下來，就是「忙碌」。', sentence: '爸爸工作很忙碌。', build: { layout: 'lr', show: ['？', '彔'], answer: '石', options: ['石', '糸', '金', '示'], clue: '想一想：「綠」的左邊是絲線，這個字的左邊是一塊硬硬的什麼？' } },
      { id: 'h-奔', combo: {'type': '會意字', 'pict': '上面是「大」，像一個人張開手腳；下面像很多隻腳。人張開手腳、腳步飛快的跑，就是「奔」。'}, char: '奔', zhuyin: 'ㄅㄣ', radical: '大', strokes: 8, words: ['飛奔', '奔跑'], say: '奔，奔跑的奔', cloze: '＿跑', img: 'run-fast.png', options: ['奔', '奇', '奈', '套'], clue: '這個字的上面是「大」，下面像好多隻腳。', explain: '答案是「奔」；「奇」的下面是「可」，「奈」的下面是「示」。', parts: ['大', '卉'], story: '上面的「大」像一個人張開手腳，下面像好多隻腳。腳動得好快好快，就是「奔」。', sentence: '小狗在草地上奔跑。' },
      { id: 'h-彈', combo: {'layout': 'lr', 'parts': [['弓', 'm', '弓箭'], ['單', 's', '']]}, char: '彈', zhuyin: 'ㄊㄢˊ', radical: '弓', strokes: 15, words: ['彈簧', '彈琴'], say: '彈，彈琴的彈', cloze: '＿琴', img: 'spring.png', options: ['彈', '單', '蟬', '強'], clue: '這個字的左邊，是弓字旁。', explain: '答案是「彈」，左邊是「弓」；「單」沒有弓字旁，「蟬」的左邊是「虫」。', parts: ['弓', '單'], story: '左邊是「弓」，弓拉開以後會彈回來。右邊的「單」念起來像「彈」。會彈回來的，就是「彈」。', sentence: '姐姐在客廳彈琴。', build: { layout: 'lr', show: ['？', '單'], answer: '弓', options: ['弓', '虫', '口', '扌'], clue: '想一想：以前射箭用的東西，拉開又會彈回來。' } },
      { id: 'h-簧', combo: {'layout': 'tb', 'parts': [['竹', 'm', '竹子'], ['黃', 's', '']]}, char: '簧', zhuyin: 'ㄏㄨㄤˊ', radical: '竹', strokes: 18, words: ['彈簧'], say: '簧，彈簧的簧', cloze: '彈＿', img: 'spring.png', options: ['簧', '黃', '籃', '橫'], clue: '這個字的上面是竹字頭，下面是「黃」。', explain: '答案是「簧」，上面是竹字頭；「黃」是黃色的黃，上面沒有竹字頭。', parts: ['竹', '黃'], story: '上面是竹字頭，下面的「黃」念起來像「簧」。很久以前，有彈力的薄片是用竹子做的，就是「簧」。', sentence: '原子筆裡有一個小彈簧。', build: { layout: 'tb', show: ['？', '黃'], answer: '竹', options: ['竹', '艹', '雨', '穴'], clue: '想一想：很久以前，有彈力的薄片是用一種一節一節的植物做的。' } },
      { id: 'h-它', combo: {'type': '象形字', 'pict': '很久以前的「它」，是畫一條蛇。後來大家借它來說東西。'}, char: '它', zhuyin: 'ㄊㄚ', radical: '宀', strokes: 5, words: ['它們', '其它'], say: '它，它們的它', cloze: '其＿', img: 'blue-bag.png', options: ['它', '他', '她', '牠'], clue: '這個字的上面是寶蓋頭，說的是東西。', explain: '答案是「它」，說東西用寶蓋頭的「它」；「牠」說動物，「他」、「她」說人。', parts: ['宀', '匕'], story: '很久以前的「它」是畫一條蛇。現在說到書包、杯子這些東西，就用「它」。', sentence: '這是我的新書包，它是藍色的。' },
      { id: 'h-短', combo: {'layout': 'lr', 'parts': [['矢', 'm', '箭'], ['豆', 's', '']]}, char: '短', zhuyin: 'ㄉㄨㄢˇ', radical: '矢', strokes: 12, words: ['縮短', '短褲'], say: '短，短褲的短', cloze: '＿褲', img: 'hem-pants.png', options: ['短', '豆', '知', '逗'], clue: '這個字的左邊是「矢」，右邊是「豆」。', explain: '答案是「短」；「知」的右邊是「口」，「逗」有辵字旁。', parts: ['矢', '豆'], story: '左邊的「矢」是箭，右邊是「豆」。很久以前，用箭和豆子來量長短，量起來不長的，就是「短」。', sentence: '夏天我喜歡穿短褲。', build: { layout: 'lr', show: ['？', '豆'], answer: '矢', options: ['矢', '辶', '頁', '木'], clue: '想一想：很久以前用一支箭來量東西，左邊放什麼？' } },
      { id: 'h-悲', combo: {'layout': 'tb', 'parts': [['非', 's', ''], ['心', 'm', '心情']]}, char: '悲', zhuyin: 'ㄅㄟ', radical: '心', strokes: 12, words: ['悲傷'], say: '悲，悲傷的悲', cloze: '＿傷', img: 'sad-girl.png', options: ['悲', '非', '排', '想'], clue: '這個字的上面是「非」，下面是「心」。', explain: '答案是「悲」，下面是「心」；「非」沒有「心」，「排」的左邊是提手旁。', parts: ['非', '心'], story: '上面的「非」念起來像「悲」，下面是「心」。心裡很難過，就是「悲傷」。', sentence: '小狗走丟了，妹妹很悲傷。', build: { layout: 'tb', show: ['非', '？'], answer: '心', options: ['心', '口', '木', '土'], clue: '想一想：難過的感覺，是在身體的哪裡？' } },
      { id: 'h-流', combo: {'layout': 'lr', 'parts': [['氵', 'm', '水'], ['㐬', 's', '']]}, char: '流', zhuyin: 'ㄌㄧㄡˊ', radical: '水', strokes: 10, words: ['流水', '流汗'], say: '流，流水的流', cloze: '＿汗', img: 'flowing-water.png', options: ['流', '留', '硫', '梳'], clue: '這個字的左邊，是三點水。', explain: '答案是「流」，左邊是三點水；「留」是留下來的留，沒有三點水。', parts: ['氵', '㐬'], story: '左邊是三點水，就是水。水一直往前跑，停不下來，就是「流」。', sentence: '天氣好熱，大家都在流汗。', build: { layout: 'lr', show: ['？', '㐬'], answer: '氵', options: ['氵', '石', '木', '扌'], clue: '想一想：小河裡一直往前跑的，是什麼？' } },
      { id: 'h-永', combo: {'type': '象形字', 'pict': '很久以前的「永」，像一條彎彎曲曲的長河，一直流到很遠很遠的地方，所以有很久很久的意思。'}, char: '永', zhuyin: 'ㄩㄥˇ', radical: '水', strokes: 5, words: ['永遠'], say: '永，永遠的永', cloze: '＿遠', img: 'forever-friends.png', options: ['永', '水', '冰', '泳'], clue: '這個字長得很像「水」，上面多了一點。', explain: '答案是「永」；「水」的上面沒有一點，「泳」的左邊多了三點水。', parts: ['永'], story: '「永」長得像「水」，上面多一點。很久以前的「永」像一條長長的河，流呀流，一直流不完，所以是很久很久的意思。', sentence: '我們要永遠做好朋友。' }
    ],
    vocab: [
      { id: 'v-等待', cloze: true, clozeOptions: ['等待', '跑走', '吵架', '忘記'], word: '等待', meaning: '停下來，盼望人來或事情發生。', example: '公車還沒來，我們在站牌下＿＿。', img: 'waiting.png', options: ['等待', '忙碌', '悲傷', '飛奔'] },
      { id: 'v-蝸牛', word: '蝸牛', meaning: '背上有殼、頭上有觸角，爬得很慢的小動物。', example: '下雨後，葉子上爬著一隻＿＿。', img: 'snail.png', options: ['蝸牛', '彈簧', '流水', '寸'] },
      { id: 'v-牠', cloze: true, clozeOptions: ['牠', '它', '我', '你'], word: '牠', meaning: '說到動物的時候，用來代替那隻動物。', example: '小狗好可愛，＿一直對我搖尾巴。', img: 'dog-tail.png', options: ['牠', '它', '永', '寸'] },
      { id: 'v-慢吞吞', cloze: true, clozeOptions: ['慢吞吞', '亮晶晶', '冷冰冰', '香噴噴'], word: '慢吞吞', meaning: '做事情、走路都不快的樣子。', example: '弟弟吃飯＿＿＿的，大家都吃完了他還在吃。', img: 'slow-eat.png', options: ['慢吞吞', '忙碌', '飛奔', '悲傷'] },
      { id: 'v-寸', cloze: true, clozeOptions: ['寸', '斤', '杯', '本'], word: '寸', meaning: '量長短的單位，十個加起來才一尺。', example: '這支鉛筆用到只剩下一公＿長。', img: 'ruler.png', options: ['寸', '永', '牠', '它'] },
      { id: 'v-忙碌', cloze: true, clozeOptions: ['忙碌', '輕鬆', '空閒', '無聊'], word: '忙碌', meaning: '事情很多，一直沒有休息。', example: '媽媽每天都很＿＿，從早做到晚。', img: 'busy-mom.png', options: ['忙碌', '等待', '縮短', '悲傷'] },
      { id: 'v-飛奔', cloze: true, clozeOptions: ['飛奔', '吃飯', '坐下', '睡覺'], word: '飛奔', meaning: '跑得非常快。', example: '下課鐘一響，弟弟就＿＿到操場。', img: 'run-fast.png', options: ['飛奔', '等待', '忙碌', '縮短'] },
      { id: 'v-彈簧', word: '彈簧', meaning: '一圈一圈的鐵絲，壓下去以後會再彈起來。', example: '原子筆裡有一個小小的＿＿。', img: 'spring.png', options: ['彈簧', '蝸牛', '流水', '寸'] },
      { id: 'v-它', cloze: true, clozeOptions: ['它', '牠', '他', '她'], word: '它', meaning: '說到東西的時候，用來代替那樣東西。', example: '這是我的新書包，＿是藍色的。', img: 'blue-bag.png', options: ['它', '牠', '永', '寸'] },
      { id: 'v-縮短', cloze: true, clozeOptions: ['縮短', '拉長', '變大', '加高'], word: '縮短', meaning: '讓長度變小。', example: '褲子太長了，媽媽把褲管＿＿，弟弟穿起來剛剛好。', img: 'hem-pants.png', options: ['縮短', '飛奔', '等待', '忙碌'] },
      { id: 'v-悲傷', cloze: true, clozeOptions: ['悲傷', '快樂', '興奮', '得意'], word: '悲傷', meaning: '很難過、心裡很痛。', example: '小狗走丟了，妹妹＿＿的哭了。', img: 'sad-girl.png', options: ['悲傷', '忙碌', '慢吞吞', '等待'] },
      { id: 'v-流水', word: '流水', meaning: '一直往前流動的水。', example: '小河裡的＿＿嘩啦嘩啦的響。', img: 'flowing-water.png', options: ['流水', '彈簧', '蝸牛', '牠'] },
      { id: 'v-永', cloze: true, clozeOptions: ['永', '快', '早', '剛'], word: '永', meaning: '很久很久，一直都是這樣。', example: '我們要＿遠做好朋友。', img: 'forever-friends.png', options: ['永', '寸', '它', '牠'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-待', char: '待', img: 'cw-host-guest.png', charMeaning: '等；也可以是好好照顧別人。', word: '招待', meaning: '請客人吃東西，好好照顧客人。', example: '家裡來了客人，媽媽拿水果＿＿他們。', options: ['招待', '牛奶', '奔跑', '永遠'] },
      { id: 'cw-蝸', char: '蝸', img: 'cw-snail-shell.png', charMeaning: '背著殼的小動物。', word: '蝸牛', meaning: '背著圓圓的殼，爬得很慢的小動物。', example: '＿＿背著圓圓的殼，慢慢的爬。', options: ['蝸牛', '短褲', '彈琴', '流汗'] },
      { id: 'cw-牛', char: '牛', img: 'cw-milk.png', charMeaning: '一種頭上有角的大動物。', word: '牛奶', meaning: '從乳牛身上擠出來的白白的奶。', example: '早餐我喝了一杯＿＿。', options: ['牛奶', '尺寸', '招待', '它們'] },
      { id: 'cw-牠', char: '牠', img: 'cw-ducks.png', charMeaning: '說動物的時候用的字。', word: '牠們', meaning: '說到很多隻動物的時候用的詞。', example: '池塘裡有三隻鴨子，＿＿在游泳。', options: ['牠們', '它們', '奔跑', '永遠'] },
      { id: 'cw-吞', char: '吞', img: 'cw-frog-eat.png', charMeaning: '沒有咬就吃進去。', word: '吞下', meaning: '沒有咬，直接吃進肚子裡。', example: '青蛙一口把蚊子＿＿去。', options: ['吞下', '彈琴', '短褲', '招待'] },
      { id: 'cw-寸', char: '寸', img: 'cw-shoe-size.png', charMeaning: '很短的長度。', word: '尺寸', meaning: '東西的大小、長短。', example: '這雙鞋子的＿＿太小了，我穿不下。', options: ['尺寸', '牛奶', '悲傷', '奔跑'] },
      { id: 'cw-碌', char: '碌', img: 'cw-busy-ants.png', charMeaning: '事情很多，停不下來。', word: '忙忙碌碌', meaning: '一直很忙、沒有停下來的樣子。', example: '螞蟻＿＿＿＿的搬著食物。', options: ['忙忙碌碌', '彈簧床', '尺寸', '永遠'] },
      { id: 'cw-奔', char: '奔', img: 'cw-dog-run.png', charMeaning: '跑得很快。', word: '奔跑', meaning: '很快的跑。', example: '小狗在草地上快樂的＿＿。', options: ['奔跑', '吞下', '它們', '流汗'] },
      { id: 'cw-彈', char: '彈', img: 'cw-piano.png', charMeaning: '用手指撥、按，讓樂器發出聲音。', word: '彈琴', meaning: '用手指按琴鍵，發出好聽的音樂。', example: '姐姐每天都在練習＿＿。', options: ['彈琴', '招待', '牛奶', '短褲'] },
      { id: 'cw-簧', char: '簧', img: 'cw-spring-bed.png', charMeaning: '有彈力的東西。', word: '彈簧床', meaning: '裡面有很多彈簧，躺起來軟軟的床。', example: '這張＿＿＿躺起來好舒服。', options: ['彈簧床', '忙忙碌碌', '牠們', '尺寸'] },
      { id: 'cw-它', char: '它', img: 'cw-apples.png', charMeaning: '說東西的時候用的字。', word: '它們', meaning: '說到很多樣東西的時候用的詞。', example: '桌上有三顆蘋果，＿＿都紅紅的。', options: ['它們', '牠們', '彈琴', '吞下'] },
      { id: 'cw-短', char: '短', img: 'cw-shorts.png', charMeaning: '不長。', word: '短褲', meaning: '褲管很短，只到膝蓋上面的褲子。', example: '夏天好熱，我穿＿＿去公園。', options: ['短褲', '奔跑', '永遠', '招待'] },
      { id: 'cw-悲', char: '悲', img: 'cw-sad-bird.png', charMeaning: '難過。', word: '悲傷', meaning: '很難過、心裡很痛。', example: '看到小鳥受傷了，我覺得好＿＿。', options: ['悲傷', '彈簧床', '牛奶', '尺寸'] },
      { id: 'cw-流', char: '流', img: 'cw-sweat.png', charMeaning: '像水一樣一直往前跑。', word: '流汗', meaning: '身上冒出汗水。', example: '天氣好熱，大家跑完步都在＿＿。', options: ['流汗', '吞下', '它們', '短褲'] },
      { id: 'cw-永', char: '永', img: 'cw-hug-friends.png', charMeaning: '很久很久。', word: '永遠', meaning: '很久很久，一直不會改變。', example: '我會＿＿記得這一天。', options: ['永遠', '奔跑', '牠們', '彈琴'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-迫不及待', situationImg: 'id-cant-wait.png', idiom: '迫不及待', char: '待', meaning: '心裡很急，一刻也不想再等。', example: '放學鐘一響，弟弟迫不及待的跑回家拆禮物。', situation: '生日禮物送來了，弟弟連鞋子都還沒脫，就急著把禮物盒打開。',
        fill: { options: ['聽到要去遊樂園，妹妹＿＿＿＿的穿好鞋子。', '他＿＿＿＿的慢慢走，一點也不急。'], clue: '提示：哪一句是心裡很急、不想再等？', explain: '第一句用得對：要去遊樂園，妹妹急著穿鞋子。慢慢走、一點也不急，剛好相反。' } },
      { id: 'i-忍氣吞聲', situationImg: 'id-hold-back.png', idiom: '忍氣吞聲', char: '吞', meaning: '被欺負了，心裡不高興，卻不敢說出來。', example: '被欺負的時候不要忍氣吞聲，要告訴老師或爸媽。', situation: '小明排隊時被別人插隊，他心裡很生氣，可是不敢說話，只好低著頭。',
        fill: { options: ['被別人插隊，他不敢說話，只好＿＿＿＿。', '他＿＿＿＿的大聲吵架，吵得大家都聽到了。'], clue: '提示：哪一句是心裡不高興，卻不敢說出來？', explain: '第一句用得對：他不敢說話，只好忍著。大聲吵架就是說出來了，不是這個意思。' } },
      { id: 'i-疲於奔命', situationImg: 'id-too-busy.png', idiom: '疲於奔命', char: '奔', meaning: '事情太多，跑來跑去，累得不得了。', example: '一下要煮飯、一下要接弟弟，媽媽真是疲於奔命。', situation: '媽媽一下要煮飯，一下要去接弟弟，一下又要去買菜，忙得滿頭大汗。',
        fill: { options: ['作業和比賽都擠在同一天，哥哥忙得＿＿＿＿。', '假日在家睡午覺，真是＿＿＿＿。'], clue: '提示：哪一句是事情太多、忙得好累？', explain: '第一句用得對：事情擠在一起，哥哥忙得好累。在家睡午覺很輕鬆，剛好相反。' } },
      { id: 'i-對牛彈琴', situationImg: 'id-baby-math.png', idiom: '對牛彈琴', char: '牛', meaning: '跟聽不懂的人說道理，說了也沒有用。', example: '跟小嬰兒講數學，簡直是對牛彈琴。', situation: '哥哥一直跟兩歲的弟弟講數學題目怎麼算，弟弟只顧著玩玩具，一句也聽不懂。',
        fill: { options: ['跟小嬰兒講大道理，簡直是＿＿＿＿。', '老師說的故事，大家都聽得很懂，真是＿＿＿＿。'], clue: '提示：哪一句是說了對方也聽不懂？', explain: '第一句用得對：小嬰兒聽不懂大道理。大家都聽得懂，就不是這個意思。' } },
      { id: 'i-長話短說', situationImg: 'id-quick-talk.png', idiom: '長話短說', char: '短', meaning: '把很長的話說得簡單，只說最重要的。', example: '時間快到了，請你長話短說。', situation: '下課鐘快響了，小美只用一句話，就把最重要的事情告訴大家。',
        fill: { options: ['時間不多了，請你＿＿＿＿，只說重點。', '他講了一個小時還沒講完，真是＿＿＿＿。'], clue: '提示：哪一句是只說重點、說得很短？', explain: '第一句用得對：時間不多，只說重點。講了一個小時，剛好相反。' } },
      { id: 'i-一勞永逸', situationImg: 'id-fix-roof.png', idiom: '一勞永逸', char: '永', meaning: '辛苦做一次，以後就一直不用再麻煩了。', example: '把漏水的屋頂整個修好，就能一勞永逸。', situation: '爸爸把會漏水的屋頂整個換新，以後下雨天就不用再拿水桶接水了。',
        fill: { options: ['把壞掉的水管整條換新，就能＿＿＿＿。', '每天都要重新再做一次，真是＿＿＿＿。'], clue: '提示：哪一句是辛苦一次，以後就不用再麻煩？', explain: '第一句用得對：換新水管，以後就不用再修。每天都要重做，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。
       clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-待', char: '待', wrong: '持', sentence: '我在門口等待爸爸回家。', options: ['待', '持', '特'], clue: '這裡是說停下來等人，想一想，哪一個字的左邊是雙人旁？', explain: '要改成「待」。停下來等人是「等待」，左邊是雙人旁；「持」的左邊是提手旁。' },
      { id: 'fx-蝸', char: '蝸', wrong: '鍋', sentence: '一隻蝸牛在葉子上爬。', options: ['蝸', '鍋', '過'], clue: '這裡說的是背著殼的小動物，跟煮飯沒有關係。', explain: '要改成「蝸」。背著殼的小動物是「蝸牛」，左邊是「虫」；「鍋」是煮飯的鍋。' },
      { id: 'fx-牛', char: '牛', wrong: '午', sentence: '早餐我喝了一杯牛奶。', options: ['牛', '午', '年'], clue: '這裡說的是一種頭上有角、會產奶的動物，想一想，哪一個字的中間一豎穿出上面？', explain: '要改成「牛」。白白的奶是「牛奶」，中間一豎穿出上面；「午」是中午的午。' },
      { id: 'fx-牠', char: '牠', wrong: '他', sentence: '小狗餓了，牠一直汪汪叫。', options: ['牠', '他', '它'], clue: '這裡說的是一隻動物，想一想，哪一個字的左邊是牛字旁？', explain: '要改成「牠」。說動物用「牠」；「他」是說男生。' },
      { id: 'fx-吞', char: '吞', wrong: '天', sentence: '青蛙一口把蚊子吞下去。', options: ['吞', '天', '吐'], clue: '這裡是說沒有咬就吃進肚子，想一想，哪一個字的下面有「口」？', explain: '要改成「吞」。沒有咬就吃下去是「吞」，下面有「口」；「天」是天空的天。' },
      { id: 'fx-寸', char: '寸', wrong: '才', sentence: '這雙鞋的尺寸太小了。', options: ['寸', '才', '付'], clue: '這裡說的是東西的大小，跟才能沒有關係。', explain: '要改成「寸」。東西的大小是「尺寸」；「才」是才能的才。' },
      { id: 'fx-碌', char: '碌', wrong: '綠', sentence: '爸爸工作很忙碌。', options: ['碌', '綠', '錄'], clue: '這裡是說事情很多，跟顏色沒有關係。', explain: '要改成「碌」。事情很多是「忙碌」，左邊是「石」；「綠」是綠色的綠。' },
      { id: 'fx-奔', char: '奔', wrong: '奇', sentence: '小狗在草地上奔跑。', options: ['奔', '奇', '奈'], clue: '這裡是說很快的跑，想一想，哪一個字的下面像好多隻腳？', explain: '要改成「奔」。很快的跑是「奔跑」；「奇」是奇怪的奇。' },
      { id: 'fx-彈', char: '彈', wrong: '單', sentence: '姐姐在客廳彈琴。', options: ['彈', '單', '蟬'], clue: '這裡是說用手指讓琴發出聲音，想一想，哪一個字的左邊是弓字旁？', explain: '要改成「彈」。讓琴發出聲音是「彈琴」，左邊是「弓」；「單」沒有弓字旁。' },
      { id: 'fx-簧', char: '簧', wrong: '黃', sentence: '原子筆裡有一個小彈簧。', options: ['簧', '黃', '橫'], clue: '這裡說的是壓下去會彈起來的東西，想一想，哪一個字的上面是竹字頭？', explain: '要改成「簧」。會彈起來的是「彈簧」，上面是竹字頭；「黃」是黃色的黃。' },
      { id: 'fx-它', char: '它', wrong: '牠', sentence: '這是我的新書包，它是藍色的。', options: ['它', '牠', '他'], clue: '這裡說的是一樣東西，不是動物。', explain: '要改成「它」。說東西用寶蓋頭的「它」；「牠」是說動物。' },
      { id: 'fx-短', char: '短', wrong: '豆', sentence: '夏天我喜歡穿短褲。', options: ['短', '豆', '知'], clue: '這裡說的是褲管不長的褲子，想一想，哪一個字的左邊是「矢」？', explain: '要改成「短」。褲管不長是「短褲」，左邊是「矢」；「豆」是紅豆的豆。' },
      { id: 'fx-悲', char: '悲', wrong: '非', sentence: '小狗走丟了，妹妹很悲傷。', options: ['悲', '非', '排'], clue: '這裡是說很難過，想一想，哪一個字的下面有「心」？', explain: '要改成「悲」。很難過是「悲傷」，下面有「心」；「非」沒有「心」。' },
      { id: 'fx-流', char: '流', wrong: '留', sentence: '天氣好熱，大家都在流汗。', options: ['流', '留', '梳'], clue: '這裡是說汗水一直冒出來，想一想，哪一個字的左邊是三點水？', explain: '要改成「流」。汗水冒出來是「流汗」，左邊是三點水；「留」是留下來的留。' },
      { id: 'fx-永', char: '永', wrong: '水', sentence: '我們要永遠做好朋友。', options: ['永', '水', '冰'], clue: '這裡是說很久很久，想一想，哪一個字比「水」多一點？', explain: '要改成「永」。很久很久是「永遠」；「水」上面少了一點。' }
    ],
    similar: [
      { id: 's1', meaning: '「等＿」是停下來等人或等車。', sentence: '我在站牌下等＿公車。', frame: '等＿', options: ['待', '侍'], answer: '待', clue: '提示：這個字的左邊是雙人旁，跟走路有關。', explain: '答案是「待」；「侍」的左邊是單人旁，是侍衛的侍。' },
      { id: 's2', meaning: '「＿牛」是背著殼的小動物。', sentence: '葉子上有一隻＿牛。', frame: '＿牛', options: ['蝸', '過'], answer: '蝸', clue: '提示：這個字的左邊是虫字旁。', explain: '答案是「蝸」；「過」是過年的過，有辵字旁。' },
      { id: 's3', meaning: '「＿年」是迎接新的一年。', sentence: '＿年時，大家都會貼春聯。', frame: '＿年', options: ['過', '蝸'], answer: '過', clue: '提示：這句話在說新年，這個字有辵字旁。', explain: '答案是「過」；「蝸」是蝸牛的蝸，左邊是虫字旁。' },
      { id: 's4', meaning: '「＿們」是說很多隻動物。', sentence: '小貓餓了，＿們一直喵喵叫。', frame: '＿們', options: ['牠', '他'], answer: '牠', clue: '提示：這句話在說小貓，是動物。', explain: '答案是「牠」，說動物用牛字旁；「他」是說男生。' },
      { id: 's5', meaning: '「＿下」是沒有咬就吃進肚子。', sentence: '他把藥＿下去了。', frame: '＿下', options: ['吞', '舌'], answer: '吞', clue: '提示：這個字的上面是「天」。', explain: '答案是「吞」；「舌」是舌頭的舌。' },
      { id: 's6', meaning: '「尺＿」是東西的大小。', sentence: '這件衣服的尺＿剛剛好。', frame: '尺＿', options: ['寸', '才'], answer: '寸', clue: '提示：這個字的下面有一點，沒有一撇。', explain: '答案是「寸」；「才」是才能的才，有一撇。' },
      { id: 's7', meaning: '「天＿」是說一個人生下來就很厲害。', sentence: '他畫畫好厲害，真是個天＿。', frame: '天＿', options: ['才', '寸'], answer: '才', clue: '提示：這句話在說很厲害，這個字有一撇。', explain: '答案是「才」；「寸」是尺寸的寸。' },
      { id: 's8', meaning: '「忙＿」是事情很多，沒有休息。', sentence: '媽媽每天都很忙＿。', frame: '忙＿', options: ['碌', '綠'], answer: '碌', clue: '提示：這個字的左邊是石字旁。', explain: '答案是「碌」；「綠」是綠色的綠。' },
      { id: 's9', meaning: '「＿色」是草和樹葉的顏色。', sentence: '草地是＿色的。', frame: '＿色', options: ['綠', '碌'], answer: '綠', clue: '提示：這句話在說顏色，這個字的左邊是絲線。', explain: '答案是「綠」；「碌」是忙碌的碌。' },
      { id: 's10', meaning: '「＿褲」是褲管不長的褲子。', sentence: '夏天我穿＿褲。', frame: '＿褲', options: ['短', '逗'], answer: '短', clue: '提示：這個字的左邊是「矢」。', explain: '答案是「短」；「逗」是逗號的逗。' },
      { id: 's11', meaning: '「＿遠」是很久很久，一直都是。', sentence: '我會＿遠記得你。', frame: '＿遠', options: ['永', '水'], answer: '永', clue: '提示：這個字比「水」多一點。', explain: '答案是「永」；「水」是喝水的水。' }
    ],
    listen: [
      { id: 'l1', text: '背著圓圓的殼，在葉子上慢慢的爬。', answer: 0, options: [{ text: '蝸牛', img: 'snail.png' }, { text: '彈簧', img: 'spring.png' }, { text: '流水', img: 'flowing-water.png' }, { text: '飛奔', img: 'run-fast.png' }] },
      { id: 'l2', text: '公車還沒來，我們站在站牌下。', answer: 0, options: [{ text: '等待', img: 'waiting.png' }, { text: '忙碌', img: 'busy-mom.png' }, { text: '飛奔', img: 'run-fast.png' }, { text: '悲傷', img: 'sad-girl.png' }] },
      { id: 'l3', text: '從早做到晚，一直沒有休息。', answer: 0, options: [{ text: '忙碌', img: 'busy-mom.png' }, { text: '等待', img: 'waiting.png' }, { text: '慢吞吞', img: 'slow-eat.png' }, { text: '縮短', img: 'hem-pants.png' }] },
      { id: 'l4', text: '下課鐘一響，就用最快的速度跑出去。', answer: 0, options: [{ text: '飛奔', img: 'run-fast.png' }, { text: '慢吞吞', img: 'slow-eat.png' }, { text: '等待', img: 'waiting.png' }, { text: '流水', img: 'flowing-water.png' }] },
      { id: 'l5', text: '一圈一圈的鐵絲，壓下去又會彈起來。', answer: 0, options: [{ text: '彈簧', img: 'spring.png' }, { text: '蝸牛', img: 'snail.png' }, { text: '寸', img: 'ruler.png' }, { text: '它', img: 'blue-bag.png' }] },
      { id: 'l6', text: '小狗走丟了，妹妹難過得哭了。', answer: 0, options: [{ text: '悲傷', img: 'sad-girl.png' }, { text: '忙碌', img: 'busy-mom.png' }, { text: '飛奔', img: 'run-fast.png' }, { text: '永', img: 'forever-friends.png' }] },
      { id: 'l7', text: '大家都吃完了，弟弟還在一口一口慢慢吃。', answer: 0, options: [{ text: '慢吞吞', img: 'slow-eat.png' }, { text: '飛奔', img: 'run-fast.png' }, { text: '忙碌', img: 'busy-mom.png' }, { text: '彈簧', img: 'spring.png' }] },
      { id: 'l8', text: '小河裡的水嘩啦嘩啦，一直往前跑。', answer: 0, options: [{ text: '流水', img: 'flowing-water.png' }, { text: '彈簧', img: 'spring.png' }, { text: '蝸牛', img: 'snail.png' }, { text: '等待', img: 'waiting.png' }] }
    ],
    /* ---------- B 批：短語短句、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看事情是怎麼樣。',
      /* 短語一：做什麼＋得實在＋怎麼樣（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '笑得實在太開心了', img: 'pr-laugh.png',
        parts: [{ text: '笑', role: '做什麼' }, { text: '得' }, { text: '實在' }, { text: '太開心了', role: '怎麼樣' }],
        explain: '先說做什麼，再說「得實在」，最後說怎麼樣。「實在」表示真的、非常的意思。' },
      pick: [
        { id: 'ph1', img: 'pr-sleep-late.png', before: '睡得實在', noun: '了', join: '', ask: '他睡得怎麼樣', look: '再看看圖片，太陽是不是已經很高了？他還在睡嗎？', options: ['太晚', '太早', '太矮', '太冷'], clue: '提示：太陽都曬到屁股了，他還在睡。', explain: '答案是「太晚」，太陽已經很高了，所以「睡得實在太晚了」。' },
        { id: 'ph2', img: 'pr-sing.png', before: '唱得實在', noun: '了', join: '', ask: '她唱得怎麼樣', look: '再看看圖片，大家聽了是不是很喜歡？', options: ['太好聽', '太難吃', '太矮', '太冷'], clue: '提示：大家聽了都在拍手。', explain: '答案是「太好聽」，大家都在拍手，所以「唱得實在太好聽了」。' },
        { id: 'ph3', img: 'pr-tall-books.png', before: '書堆得實在', noun: '了', join: '', ask: '書堆得怎麼樣', look: '再看看圖片，書堆得比小朋友還高嗎？', options: ['太高', '太矮', '太慢', '太甜'], clue: '提示：書堆得比小朋友的頭還要高。', explain: '答案是「太高」，書堆得比人還高，所以「書堆得實在太高了」。' },
        { id: 'ph4', img: 'pr-big-balloon.png', before: '氣球吹得實在', noun: '了', join: '', ask: '氣球吹得怎麼樣', look: '再看看圖片，氣球是不是大到快破了？', options: ['太大', '太小', '太香', '太慢'], clue: '提示：氣球大到快要破掉了。', explain: '答案是「太大」，氣球快破了，所以「氣球吹得實在太大了」。' },
        { id: 'ph5', img: 'pr-clean-dishes.png', before: '碗洗得實在', noun: '了', join: '', ask: '碗洗得怎麼樣', look: '再看看圖片，碗是不是亮晶晶的？', options: ['太乾淨', '太髒', '太吵', '太冷'], clue: '提示：碗亮得可以照出人的臉。', explain: '答案是「太乾淨」，碗亮晶晶的，所以「碗洗得實在太乾淨了」。' },
        { id: 'ph6', img: 'pr-slow-snail.png', before: '蝸牛爬得實在', noun: '了', join: '', ask: '蝸牛爬得怎麼樣', look: '再看看圖片，蝸牛爬了很久，才前進一點點嗎？', options: ['太慢', '太快', '太大聲', '太香'], clue: '提示：蝸牛爬了好久，才前進一點點。', explain: '答案是「太慢」，蝸牛前進得很少，所以「蝸牛爬得實在太慢了」。' },
        { id: 'ph7', img: 'pr-heavy-rain.png', before: '雨下得實在', noun: '了', join: '', ask: '雨下得怎麼樣', look: '再看看圖片，雨傘擋得住大雨嗎？', options: ['太大', '太小', '太甜', '太矮'], clue: '提示：雨大到雨傘都快擋不住了。', explain: '答案是「太大」，雨好大，所以「雨下得實在太大了」。' },
        { id: 'ph8', img: 'pr-long-line.png', before: '隊伍排得實在', noun: '了', join: '', ask: '隊伍排得怎麼樣', look: '再看看圖片，排隊的人多不多？隊伍長不長？', options: ['太長', '太短', '太甜', '太吵'], clue: '提示：排隊的人好多，看不到最後面。', explain: '答案是「太長」，人好多，所以「隊伍排得實在太長了」。' }
      ],
      say: [],
      /* 第二個短語：誰＋的＋哪裡＋三個字的疊字（課本的例子是課文原句，這裡換成自己寫的） */
      phrase2: {
        intro: { example: '小豬的肚子圓滾滾', img: 'pz-pig.png',
          parts: [{ text: '小豬', role: '誰' }, { text: '的' }, { text: '肚子', role: '哪裡' }, { text: '圓滾滾', role: '什麼樣子（疊字）' }],
          explain: '先說是誰，加上「的」，再說是哪個地方，最後用三個字的疊字說它的樣子。' },
        fill: [
          { id: 'pz1', img: 'pz-cat-fur.png', parts: ['小貓', '的', '毛', '軟綿綿'] },
          { id: 'pz2', img: 'pz-bread.png', parts: ['麵包', '的', '味道', '香噴噴'] },
          { id: 'pz3', img: 'pz-grass.png', parts: ['草地', '的', '顏色', '綠油油'] },
          { id: 'pz4', img: 'pz-apple.png', parts: ['蘋果', '的', '外皮', '紅通通'] },
          { id: 'pz5', img: 'pz-stars.png', parts: ['夜空', '的', '星星', '亮晶晶'] }
        ]
      },
      words: [
        { word: '慢吞吞', meaning: '動作很慢的樣子。', img: 'slow-eat.png' },
        { word: '縮短', meaning: '讓長度變小。', img: 'hem-pants.png' }
      ],
      choose: [
        { id: 'pw1', word: '慢吞吞', options: ['快遲到了，他還慢吞吞的穿鞋子。', '他跑得好快，真是慢吞吞。'], clue: '提示：想一想，「慢吞吞」是快，還是慢？', explain: '第一句用得對：快遲到了，他還慢慢穿鞋。跑得好快就不是慢吞吞。' },
        { id: 'pw2', word: '縮短', options: ['剪掉一段以後，繩子縮短了。', '我吃了好多飯，肚子縮短了。'], clue: '提示：想一想，什麼東西會從長變短？', explain: '第一句用得對：繩子剪掉一段，就變短了。吃飯不會讓肚子變短。' }
      ],
      make: [
        { id: 'pm1', word: '慢吞吞', clue: '提示：想想看，誰做事或走路很慢？', model: '妹妹寫功課慢吞吞的。' },
        { id: 'pm2', word: '縮短', clue: '提示：想想看，什麼東西剪一剪、改一改，會變短？', model: '媽媽把我的褲子縮短了。' }
      ]
    },
    pattern: [
      { key: 'yihuier', id: 'yh', title: '……一會兒……一會兒……', img: 'yihuier.png',
        meaning: '兩種不一樣的情況，換來換去、輪流出現。',
        examples: ['小貓一會兒追球，一會兒追自己的尾巴。'],
        match: [
          { id: 'pt-yh-m1', img: 'pt-fog-sun.png', front: '山上的天氣變得好快，一會兒起大霧，', options: ['一會兒又出太陽。', '一會兒變成一顆蘋果。', '一會兒去游泳。'], clue: '提示：看看圖片，山上的天氣還會變成怎麼樣？', explain: '答案是「一會兒又出太陽」：天氣一下起霧，一下出太陽。' },
          { id: 'pt-yh-m2', img: 'pt-baby-mood.png', front: '小嬰兒一會兒哭，', options: ['一會兒笑。', '一會兒開車。', '一會兒煮飯。'], clue: '提示：小嬰兒除了哭，還會怎麼樣？', explain: '答案是「一會兒笑」：小嬰兒一下哭，一下笑。' },
          { id: 'pt-yh-m3', img: 'pt-traffic-light.png', front: '路口的燈一會兒亮紅燈，', options: ['一會兒亮綠燈。', '一會兒唱歌。', '一會兒長出葉子。'], clue: '提示：紅綠燈除了紅燈，還會亮什麼燈？', explain: '答案是「一會兒亮綠燈」：紅綠燈一下紅，一下綠。' }
        ],
        conj: [
          { id: 'pt-yh-c1', full: '妹妹一會兒畫畫，一會兒看書，忙個不停。', img: 'pt-sister-busy.png', sentence: '妹妹＿＿＿畫畫，＿＿＿看書，忙個不停。', options: ['……一會兒……一會兒……', '……，沒想到……', '除了……還……'], clue: '提示：妹妹換來換去做兩件事。數數看有幾個空格。', explain: '答案是「……一會兒……一會兒……」：妹妹一會兒畫畫，一會兒看書。' },
          { id: 'pt-yh-c2', full: '小狗一會兒跑到門口，一會兒跑回沙發上。', img: 'pt-dog-back.png', sentence: '小狗＿＿＿跑到門口，＿＿＿跑回沙發上。', options: ['……一會兒……一會兒……', '……，沒想到……', '除了……還……'], clue: '提示：小狗跑過來又跑過去。數數看有幾個空格。', explain: '答案是「……一會兒……一會兒……」：小狗一會兒跑到門口，一會兒跑回沙發上。' },
          { id: 'pt-yh-c3', full: '海浪一會兒衝上沙灘，一會兒又退回海裡。', img: 'pt-waves.png', sentence: '海浪＿＿＿衝上沙灘，＿＿＿又退回海裡。', options: ['……一會兒……一會兒……', '……，沒想到……', '除了……還……'], clue: '提示：海浪上來又下去。數數看有幾個空格。', explain: '答案是「……一會兒……一會兒……」：海浪一會兒衝上沙灘，一會兒又退回海裡。' }
        ],
        half: [
          { id: 'pt-yh-h1', front: '弟弟一會兒玩積木，', clue: '提示：弟弟還會玩什麼？記得要說「一會兒」。', model: '一會兒玩小汽車。' },
          { id: 'pt-yh-h2', front: '天上的雲一會兒像棉花糖，', clue: '提示：雲還會變成像什麼？記得要說「一會兒」。', model: '一會兒像一艘大船。' }
        ],
        whole: [
          { id: 'pt-yh-w1', clue: '提示：先說是誰，再用兩個「一會兒」說他換來換去做的事。想想看：下課時，你會玩哪些東西？', model: '下課時，我一會兒盪鞦韆，一會兒溜滑梯。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '用「像」、「好像」把一樣東西比成另一樣東西，讓人更容易想像。', example: '課文把時間比成蝸牛、斑馬、彈簧和流水。',
          show: { sentence: '雲朵像一團軟軟的棉花糖。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '月亮彎彎的，像一艘小船。', answer: true, clue: '提示：這句話有沒有把月亮比成另一樣東西？', explain: '是譬喻：把月亮比成一艘小船。' },
            { id: 'rh-si-y2', sentence: '月亮出來了。', answer: false, clue: '提示：這句話有沒有用「像」把東西比成別的東西？', explain: '不是譬喻：這句話只是說月亮出來了。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['小烏龜爬得好慢，像在散步。', '小烏龜爬得好慢。'], clue: '提示：哪一句用了「像」，把烏龜爬的樣子比成散步？', explain: '「小烏龜爬得好慢，像在散步」是譬喻。' },
            { id: 'rh-si-p2', options: ['下課時間像一陣風，一下子就過去了。', '下課時間很短。'], clue: '提示：哪一句把下課時間比成另一樣東西？', explain: '「下課時間像一陣風」是譬喻：把下課時間比成風。' },
            { id: 'rh-si-p3', options: ['弟弟跑得像一陣風。', '弟弟跑得很快。', '弟弟一直跑。'], clue: '提示：哪一句用「像」把弟弟跑步比成別的東西？', explain: '「弟弟跑得像一陣風」是譬喻。' },
            { id: 'rh-si-p4', options: ['妹妹的臉圓得像蘋果。', '妹妹有一張圓臉。', '妹妹在吃蘋果。'], clue: '提示：哪一句把妹妹的臉比成另一樣東西？', explain: '「妹妹的臉圓得像蘋果」是譬喻：把臉比成蘋果。' },
            { id: 'rh-si-p5', options: ['操場上的小朋友，像一群快樂的小鳥。', '操場上有很多小朋友。', '小朋友在操場玩。', '小朋友跑呀跑。'], clue: '提示：哪一句用「像」把小朋友比成別的東西？', explain: '「像一群快樂的小鳥」是譬喻：把小朋友比成小鳥。' },
            { id: 'rh-si-p6', options: ['等人的時間好長，像一條拉不完的繩子。', '我等了很久。', '我看著時鐘。', '時鐘滴答滴答響。'], clue: '提示：哪一句把等人的時間比成另一樣東西？', explain: '「像一條拉不完的繩子」是譬喻：把等待的時間比成長長的繩子。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「慢吞吞」，把「吞」重複說。',
          show: { sentence: '冰塊冷冰冰的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '弟弟起床慢吞吞的。', answer: true, clue: '提示：形容弟弟的字裡，有沒有同一個字連在一起？', explain: '是疊字：「吞吞」是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '弟弟起床很慢。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['麵包香噴噴的。', '麵包很香。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「香噴噴」是疊字：「噴噴」重複了。' },
            { id: 'rh-re-p2', options: ['夜空亮晶晶的。', '夜空很亮。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「亮晶晶」是疊字：「晶晶」重複了。' },
            { id: 'rh-re-p3', options: ['草地綠油油的。', '草地很綠。', '草地像一張大地毯。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「綠油油」是疊字：「油油」重複了。' },
            { id: 'rh-re-p4', options: ['小狗的毛軟綿綿的。', '小狗的毛很軟。', '小狗的毛像雲朵。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「軟綿綿」是疊字：「綿綿」重複了。' },
            { id: 'rh-re-p5', options: ['蘋果紅通通的。', '蘋果很紅。', '蘋果像小燈籠。', '蘋果在對我笑。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「紅通通」是疊字：「通通」重複了。' },
            { id: 'rh-re-p6', options: ['小豬的肚子圓滾滾的。', '小豬的肚子很圓。', '小豬的肚子像氣球。', '小豬在跟我說話。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「圓滾滾」是疊字：「滾滾」重複了。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，重複說兩次以上，讀起來有節奏。', example: '課文裡的「一會兒是……一會兒是……」，把「一會兒」重複說。',
          show: { sentence: '快一點，快一點，時間不多了！', mark: ['快一點'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '有人說好，有人說不好。', answer: true, mark: ['有人說'], clue: '提示：找找看，有沒有同一句話說了好幾次？', explain: '是類疊：「有人說」說了兩次。' },
            { id: 'rh-rp-y2', sentence: '大家的想法不一樣。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['等一下'], options: ['等一下，等一下，我馬上來！', '我馬上就來！'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「等一下」說了兩次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['好慢'], options: ['好慢，好慢，時間過得好慢。', '時間過得很慢。'], clue: '提示：哪一句有同一個詞，說了好幾次？', explain: '「好慢」說了好幾次，是類疊。' },
            { id: 'rh-rp-p3', mark: ['一會兒'], options: ['小貓一會兒跳，一會兒跑。', '小貓在玩。', '小貓像一顆毛球。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「一會兒」說了兩次，是類疊。' },
            { id: 'rh-rp-p4', mark: ['快跑'], options: ['快跑，快跑，要遲到了！', '要遲到了。', '時鐘走得好快。'], clue: '提示：哪一句有同一句話，連著說了兩次？', explain: '「快跑」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['有人'], options: ['有人喜歡夏天，有人喜歡冬天。', '大家喜歡的季節不一樣。', '夏天熱得像火爐。', '冬天在敲門。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「有人」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['一年'], options: ['一年過去了，一年又來了。', '又過了一年。', '日子像小河。', '新年在敲門。'], clue: '提示：哪一句有同一個詞，說了兩次？', explain: '「一年」說了兩次，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '月亮像一個大圓餅。', answer: '譬喻', clue: '提示：這句話有沒有把月亮比成別的東西？', explain: '答案是「譬喻」：把月亮比成大圓餅。' },
        { id: 'rh2', sentence: '弟弟跑得像小火車一樣快。', answer: '譬喻', clue: '提示：這句話有沒有用「像」？', explain: '答案是「譬喻」：把弟弟比成小火車。' },
        { id: 'rh3', sentence: '蛋糕甜滋滋的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「滋滋」是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '小兔子的耳朵毛茸茸的。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說？', explain: '答案是「疊字」：「茸茸」是同一個字連在一起重複用。' },
        { id: 'rh5', sentence: '快來看，快來看，下雪了！', answer: '類疊', mark: ['快來看'], clue: '提示：有沒有同一句話，說了好幾次？', explain: '答案是「類疊」：「快來看」說了好幾次。' },
        { id: 'rh6', sentence: '有人跑，有人跳，大家玩得好開心。', answer: '類疊', mark: ['有人'], clue: '提示：有沒有同一個詞，隔開來說了好幾次？', explain: '答案是「類疊」：「有人」說了好幾次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L01 = d; }
})(this);

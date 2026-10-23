/* 第 7 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    hanzi: [
      { id: 'h-鹹', char: '鹹', zhuyin: 'ㄒㄧㄢˊ', radical: '鹵', strokes: 20, words: ['鹹味', '鹹蛋'], say: '鹹，鹹味的鹹', cloze: '＿味', img: 'salty.png', options: ['鹹', '減', '喊', '感'], clue: '這個字跟鹽巴有關。', explain: '答案是「鹹」。左邊的「鹵」是鹽巴，鹽巴的味道就是鹹。', parts: ['鹵', '咸'], story: '左邊的「鹵」是鹽巴，右邊的「咸」念起來很像「鹹」。鹽巴的味道，就是「鹹」。', sentence: '海水喝起來鹹鹹的。', build: { layout: 'lr', show: ['？', '咸'], answer: '鹵', options: ['鹵', '口', '氵', '扌'] } },
      { id: 'h-蔚', char: '蔚', zhuyin: 'ㄨㄟˋ', radical: '艸', strokes: 15, words: ['蔚藍'], say: '蔚，蔚藍的蔚', cloze: '＿藍', img: 'blue-sea.png', options: ['蔚', '慰', '衛', '位'], clue: '這個字的上面，是草字頭。', explain: '答案是「蔚」，上面是草字頭；「慰」是安慰的慰，下面是「心」。', parts: ['艹', '尉'], story: '上面是草字頭，下面的「尉」念起來很像「蔚」。「蔚藍」就是很漂亮的深藍色。', sentence: '蔚藍的天空飄著白雲。', build: { layout: 'tb', show: ['？', '尉'], answer: '艹', options: ['艹', '心', '竹', '雨'] } },
      { id: 'h-航', char: '航', zhuyin: 'ㄏㄤˊ', radical: '舟', strokes: 10, words: ['回航', '航行'], say: '航，回航的航', cloze: '回＿', img: 'ship-return.png', options: ['航', '抗', '杭', '行'], clue: '這個字跟船有關。', explain: '答案是「航」。左邊的「舟」是小船，開船就是航行。', parts: ['舟', '亢'], story: '左邊的「舟」是小船。開著船在水上走，就是「航」。', sentence: '大船在海上航行。', build: { layout: 'lr', show: ['？', '亢'], answer: '舟', options: ['舟', '扌', '木', '氵'] } },
      { id: 'h-乘', char: '乘', zhuyin: 'ㄔㄥˊ', radical: '丿', strokes: 10, words: ['搭乘', '乘法'], say: '乘，搭乘的乘', cloze: '搭＿', img: 'ride-bus.png', options: ['乘', '乖', '剩', '成'], clue: '這個字和「乖」長得很像，中間多了一些筆畫。', explain: '答案是「乘」。「乘」是坐、搭的意思；「乖」是乖巧的乖。', parts: ['禾', '北'], story: '「乘」和「乖」長得很像，要小心！「乘」的中間像「禾」，兩邊像「北」。「乘」就是坐、搭。', sentence: '我們搭乘公車去動物園。' },
      { id: 'h-橇', char: '橇', zhuyin: 'ㄑㄧㄠ', radical: '木', strokes: 16, words: ['雪橇'], say: '橇，雪橇的橇', cloze: '雪＿', img: 'sled.png', options: ['橇', '撬', '喬', '敲'], clue: '這個字跟木頭有關。', explain: '答案是「橇」。以前的雪橇是用木頭做的，所以左邊是「木」；「撬」是用手撬開的撬。', parts: ['木', '毳'], story: '左邊是「木」，以前的雪橇是用木頭做的。右邊是三個「毛」。', sentence: '小狗拉著雪橇在雪地上跑。', build: { layout: 'lr', show: ['？', '毳'], answer: '木', options: ['木', '扌', '氵', '金'], clue: '想一想：以前的雪橇，是用什麼材料做的？' } },
      { id: 'h-坡', char: '坡', zhuyin: 'ㄆㄛ', radical: '土', strokes: 8, words: ['山坡', '斜坡'], say: '坡，山坡的坡', cloze: '山＿', img: 'slope.png', options: ['坡', '波', '披', '被'], clue: '這個字跟泥土有關。', explain: '答案是「坡」，左邊是「土」；「波」是水的波浪，左邊是三點水。', parts: ['土', '皮'], story: '左邊是「土」，右邊的「皮」念起來很像「坡」。土堆成斜斜的地方，就是「坡」。', sentence: '我們從山坡上慢慢走下來。', build: { layout: 'lr', show: ['？', '皮'], answer: '土', options: ['土', '氵', '扌', '衤'], clue: '想一想：山坡上踩的地面，是什麼東西？' } },
      { id: 'h-野', char: '野', zhuyin: 'ㄧㄝˇ', radical: '里', strokes: 11, words: ['原野', '野餐'], say: '野，原野的野', cloze: '原＿', img: 'field.png', options: ['野', '舒', '理', '預'], clue: '這個字跟田地有關。', explain: '答案是「野」。左邊的「里」是有田有土的地方，很大的田野就是「野」。', parts: ['里', '予'], story: '左邊的「里」是有田有土的地方，右邊的「予」念起來像「野」。很大很大的田地和草地，就是「野」。', sentence: '星期天我們去公園野餐。', build: { layout: 'lr', show: ['？', '予'], answer: '里', options: ['里', '舍', '扌', '王'] } },
      { id: 'h-閉', char: '閉', zhuyin: 'ㄅㄧˋ', radical: '門', strokes: 11, words: ['閉上', '關閉'], say: '閉，閉上的閉', cloze: '＿上', img: 'eyes-closed.png', options: ['閉', '閃', '開', '問'], clue: '這個字跟門有關。', explain: '答案是「閉」。門裡面一個「才」，把門關起來就是閉。', parts: ['門', '才'], story: '外面是「門」，裡面是「才」。把門關起來，就是「閉」。', sentence: '睡覺的時候要閉上眼睛。' },
      { id: 'h-深', char: '深', zhuyin: 'ㄕㄣ', radical: '水', strokes: 11, words: ['深呼吸', '很深'], say: '深，深呼吸的深', cloze: '＿呼吸', img: 'deep-breath.png', options: ['深', '探', '森', '身'], clue: '這個字跟水有關。', explain: '答案是「深」，左邊是三點水；「探」是探頭的探，左邊是提手旁。', parts: ['氵', '罙'], story: '左邊是三點水。水很多、踩不到底，就是「深」。', sentence: '這個游泳池很深，要小心。', build: { layout: 'lr', show: ['？', '罙'], answer: '氵', options: ['氵', '扌', '木', '土'] } },
      { id: 'h-吸', char: '吸', zhuyin: 'ㄒㄧ', radical: '口', strokes: 7, words: ['呼吸', '吸管'], say: '吸，呼吸的吸', cloze: '呼＿', img: 'deep-breath.png', options: ['吸', '級', '及', '希'], clue: '這個字跟嘴巴有關。', explain: '答案是「吸」，左邊是「口」；「級」是年級的級，左邊是糸字旁。', parts: ['口', '及'], story: '左邊是「口」，右邊的「及」念起來很像「吸」。用嘴巴把空氣吸進去，就是「吸」。', sentence: '我用吸管喝果汁。', build: { layout: 'lr', show: ['？', '及'], answer: '口', options: ['口', '糸', '木', '氵'] } },
      { id: 'h-欣', char: '欣', zhuyin: 'ㄒㄧㄣ', radical: '欠', strokes: 8, words: ['欣賞'], say: '欣，欣賞的欣', cloze: '＿賞', img: 'enjoy-view.png', options: ['欣', '新', '心', '辛'], clue: '這個字的右邊，像一個人張開嘴巴。', explain: '答案是「欣」，右邊是「欠」，像人張開嘴巴，開心的樣子。', parts: ['斤', '欠'], story: '右邊的「欠」，像一個人張開嘴巴。開心得張大嘴巴，就是「欣」，高興的意思。', sentence: '我們一起欣賞美麗的煙火。', build: { layout: 'lr', show: ['斤', '？'], answer: '欠', options: ['欠', '力', '口', '心'] } },
      { id: 'h-賞', char: '賞', zhuyin: 'ㄕㄤˇ', radical: '貝', strokes: 15, words: ['欣賞', '賞月'], say: '賞，欣賞的賞', cloze: '欣＿', img: 'enjoy-view.png', options: ['賞', '常', '堂', '掌'], clue: '這個字跟錢有關。', explain: '答案是「賞」，下面是「貝」；「常」的下面是「巾」，「堂」的下面是「土」。', parts: ['尚', '貝'], story: '下面的「貝」是貝殼，以前的人把貝殼當作錢。把錢或禮物送給別人，就是「賞」。現在也說「欣賞」，就是很喜歡的看。', sentence: '中秋節晚上，我們一起賞月。', build: { layout: 'tb', show: ['尚', '？'], answer: '貝', options: ['貝', '巾', '土', '手'] } },
      { id: 'h-瞞', char: '瞞', zhuyin: 'ㄇㄢˊ', radical: '目', strokes: 16, words: ['瞞著', '瞞不了'], say: '瞞，瞞著的瞞', cloze: '＿著', img: 'keep-secret.png', options: ['瞞', '滿', '慢', '曼'], clue: '這個字跟眼睛有關。', explain: '答案是「瞞」，左邊是「目」；「滿」的左邊是三點水。', parts: ['目', '滿的右邊'], story: '左邊的「目」是眼睛，右邊和「滿」的右邊一樣。不讓別人的眼睛看到、不讓人知道，就是「瞞」。', sentence: '弟弟打破杯子，沒有瞞著媽媽。' }
    ],
    vocab: [
      { id: 'v-鹹味', word: '鹹味', meaning: '像鹽巴一樣的味道。', example: '海邊的風，有一股淡淡的＿＿。', img: 'salty.png', options: ['鹹味', '蔚藍', '山坡', '原野'] },
      { id: 'v-蔚藍', word: '蔚藍', meaning: '很漂亮的深藍色，像晴天的天空和大海。', example: '今天天氣很好，天空是＿＿色的。', img: 'blue-sea.png', options: ['蔚藍', '鹹味', '雪橇', '閉上'] },
      { id: 'v-回航', cloze: true, clozeOptions: ['回航', '起飛', '降落', '下山'], word: '回航', meaning: '船或飛機開到當初出發的地方。', also: '返航', example: '天快黑了，漁船都＿＿了。', img: 'ship-return.png', options: ['回航', '欣賞', '深呼吸', '原野'] },
      { id: 'v-乘', cloze: true, clozeOptions: ['乘', '拿', '叫', '跳'], word: '乘', meaning: '坐、搭。', example: '我們搭＿公車去外婆家。', img: 'ride-bus.png', options: ['乘', '瞞', '閉上', '回航'] },
      { id: 'v-雪橇', word: '雪橇', meaning: '在雪地上滑的車子，下面沒有輪子。', example: '小狗拉著＿＿，在雪地上跑。', img: 'sled.png', options: ['雪橇', '山坡', '原野', '鹹味'] },
      { id: 'v-山坡', word: '山坡', meaning: '山上斜斜的地方。', example: '我們爬上＿＿，看山下的風景。', img: 'slope.png', options: ['山坡', '雪橇', '蔚藍', '回航'] },
      { id: 'v-原野', word: '原野', meaning: '很大很大、平平的草地和田地。', example: '綠色的＿＿上，有很多牛羊在吃草。', img: 'field.png', options: ['原野', '山坡', '鹹味', '欣賞'] },
      { id: 'v-閉上', word: '閉上', meaning: '合起來、關起來。', example: '睡覺的時候要＿＿眼睛。', img: 'eyes-closed.png', options: ['閉上', '欣賞', '乘', '瞞'] },
      { id: 'v-深呼吸', word: '深呼吸', meaning: '用力吸一大口氣，再慢慢吐出來。', example: '上臺前很緊張，我先＿＿＿。', img: 'deep-breath.png', options: ['深呼吸', '回航', '閉上', '欣賞'] },
      { id: 'v-欣賞', cloze: true, clozeOptions: ['欣賞', '打掃', '收拾', '修理'], word: '欣賞', meaning: '很喜歡的看或聽。', example: '我們坐在海邊，＿＿美麗的夕陽。', img: 'enjoy-view.png', options: ['欣賞', '瞞', '深呼吸', '乘'] },
      { id: 'v-瞞', cloze: true, clozeOptions: ['瞞', '陪', '抱', '等'], word: '瞞', meaning: '把事情藏起來，不讓別人知道。', example: '做錯事要說實話，不要＿著爸爸媽媽。', img: 'keep-secret.png', options: ['瞞', '乘', '閉上', '回航'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-鹹', char: '鹹', img: 'cw-salted-egg.png', charMeaning: '像鹽巴一樣的味道。', word: '鹹蛋', meaning: '用鹽巴醃過的蛋，吃起來鹹鹹的。', example: '早餐的稀飯，配一顆＿＿最好吃。', options: ['鹹蛋', '吸管', '斜坡', '賞月'] },
      { id: 'cw-蔚', char: '蔚', img: 'cw-blue-sky.png', charMeaning: '顏色很漂亮、很濃。', word: '蔚藍天空', meaning: '晴天時，又藍又漂亮的天空。', example: '飛機飛過＿＿＿＿，留下一條白線。', options: ['蔚藍天空', '深水區', '狗拉雪橇', '欣賞音樂'] },
      { id: 'cw-航', char: '航', img: 'cw-sailing.png', charMeaning: '開船或開飛機。', word: '航行', meaning: '船在水上開，或飛機在天上飛。', example: '大船在海上＿＿了好幾天。', options: ['航行', '野餐', '關閉', '乘法'] },
      { id: 'cw-乘', char: '乘', img: 'cw-times.png', charMeaning: '坐、搭；數學裡也有乘。', word: '乘法', meaning: '數學的算法，例如二乘三等於六。', example: '數學課，老師教我們背＿＿表。', options: ['乘法', '吸管', '航行', '鹹蛋'] },
      { id: 'cw-橇', char: '橇', img: 'cw-dog-sled.png', word: '狗拉雪橇', meaning: '很多隻狗在前面跑，拉著雪橇在雪地上走。', example: '在下雪的國家，可以坐＿＿＿＿。', options: ['狗拉雪橇', '蔚藍天空', '欣賞音樂', '深水區'] },
      { id: 'cw-坡', char: '坡', img: 'cw-ramp.png', charMeaning: '斜斜的地方。', word: '斜坡', meaning: '一邊高、一邊低，斜斜的路。', example: '腳踏車騎上＿＿，要用力踩。', options: ['斜坡', '鹹蛋', '賞月', '關閉'] },
      { id: 'cw-野', char: '野', img: 'cw-picnic.png', charMeaning: '外面很大的田地和草地。', word: '野餐', meaning: '帶著食物，到外面的草地上吃東西。', example: '天氣很好，我們帶著三明治去公園＿＿。', options: ['野餐', '航行', '乘法', '吸管'] },
      { id: 'cw-閉', char: '閉', img: 'cw-closed.png', charMeaning: '關起來、合起來。', word: '關閉', meaning: '關起來，不開了。', example: '圖書館晚上九點就＿＿了。', options: ['關閉', '野餐', '斜坡', '航行'] },
      { id: 'cw-深', char: '深', img: 'cw-deep-pool.png', charMeaning: '從上面到下面，距離很遠。', word: '深水區', meaning: '游泳池裡水比較深的地方。', example: '還不會游泳的小朋友，不可以去＿＿＿。', options: ['深水區', '狗拉雪橇', '蔚藍天空', '欣賞音樂'] },
      { id: 'cw-吸', char: '吸', img: 'cw-straw.png', charMeaning: '用嘴巴或鼻子把東西吸進去。', word: '吸管', meaning: '喝飲料用的細細長長的管子。', example: '我用＿＿喝珍珠奶茶。', options: ['吸管', '鹹蛋', '關閉', '乘法'] },
      { id: 'cw-欣', char: '欣', img: 'cw-music.png', charMeaning: '高興。', word: '欣賞音樂', meaning: '很喜歡的聽音樂。', example: '晚上，爸爸喜歡坐在沙發上＿＿＿＿。', options: ['欣賞音樂', '深水區', '狗拉雪橇', '蔚藍天空'] },
      { id: 'cw-賞', char: '賞', img: 'cw-moon.png', charMeaning: '很喜歡的看。', word: '賞月', meaning: '晚上看又大又圓的月亮。', example: '中秋節晚上，全家人一起＿＿、吃月餅。', options: ['賞月', '斜坡', '野餐', '吸管'] },
      { id: 'cw-瞞', char: '瞞', img: 'cw-hide-paper.png', word: '瞞不了', meaning: '藏不住，別人還是會知道。', example: '他把考卷藏起來，可是＿＿＿爸爸。', options: ['瞞不了', '關閉', '航行', '賞月'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-欣欣向榮', situationImg: 'id-spring.png', idiom: '欣欣向榮', char: '欣', meaning: '花草樹木長得很好、很有精神；也可以說事情越來越好。', example: '春天到了，公園裡的花草欣欣向榮。', situation: '下過春雨以後，小草和花都長得又綠又高，看起來很有精神。',
        fill: { options: ['春天一到，花園裡的植物都長得＿＿＿＿。', '冬天的樹葉都掉光了，看起來＿＿＿＿。'], clue: '提示：哪一句的花草樹木長得很好、很有精神？', explain: '第一句用得對：春天植物長得又綠又好。冬天葉子掉光光，沒有精神，剛好相反。' } },
      { id: 'i-賞心悅目', situationImg: 'id-flowers.png', idiom: '賞心悅目', char: '賞', meaning: '看了覺得很舒服、很開心。', example: '媽媽把客廳布置得賞心悅目。', situation: '花園裡開滿五顏六色的花，大家看了心情都好好。',
        fill: { options: ['這幅畫的顏色好漂亮，讓人看了＿＿＿＿。', '垃圾堆又臭又髒，讓人看了＿＿＿＿。'], clue: '提示：哪一句是看了覺得很舒服、很開心？', explain: '第一句用得對：漂亮的畫讓人看了很開心。又臭又髒的垃圾堆，看了不會開心。' } },
      { id: 'i-乘風破浪', situationImg: 'id-swim-race.png', idiom: '乘風破浪', char: '乘', meaning: '船順著風，衝過大浪往前走；也比喻不怕困難，勇敢往前。', example: '畢業典禮上，老師祝我們到了新學校也能乘風破浪，勇敢往前。', situation: '小明第一次參加游泳比賽，一點都不怕，一路勇敢的往前衝，什麼困難都擋不住他。',
        fill: { options: ['新的學期開始了，祝大家都能＿＿＿＿，勇敢學習新東西。', '小貓躺在沙發上＿＿＿＿，睡得好香。'], clue: '提示：哪一句是在說不怕困難、勇敢往前？', explain: '第一句用得對：祝大家不怕困難、勇敢往前。小貓在沙發上睡覺，沒有往前衝。' } },
      { id: 'i-發人深省', situationImg: 'id-think-earth.png', idiom: '發人深省', char: '深', meaning: '讓人想很久，想通一個道理。', example: '老師說的話發人深省，讓我知道要珍惜每一粒米飯。', situation: '看完愛護地球的影片，大家都安靜的想：我能為地球做什麼呢？',
        fill: { options: ['這部講愛護動物的影片＿＿＿＿，讓大家想了好久。', '這部卡通好好笑，大家看完都＿＿＿＿的大笑。'], clue: '提示：哪一句是讓人想很久、想通一個道理？', explain: '第一句用得對：影片讓大家想了很久，想通要愛護動物。大笑不是在想道理。' } }
    ],
    similar: [
      { id: 's1', meaning: '「＿味」是像鹽巴一樣的味道。', sentence: '海風有淡淡的＿味。', frame: '＿味', options: ['鹹', '減'], answer: '鹹', clue: '提示：這句話在說味道，像鹽巴一樣。', explain: '答案是「鹹」。「鹹味」是鹽巴的味道；「減」是減少、減法的減。' },
      { id: 's2', meaning: '「＿藍」是很漂亮的深藍色。', sentence: '晴天時，天空是＿藍色的。', frame: '＿藍', options: ['蔚', '慰'], answer: '蔚', clue: '提示：這句話在說顏色，不是在說心情。', explain: '答案是「蔚」。「蔚藍」是漂亮的深藍色；「慰」是安慰的慰，下面有「心」。' },
      { id: 's3', meaning: '「＿行」是開著船在水上走。', sentence: '大船在海上＿行。', frame: '＿行', options: ['航', '抗'], answer: '航', clue: '提示：這句話在說開船，跟船有關。', explain: '答案是「航」。「航行」是開船，左邊的「舟」是船；「抗」是抵抗的抗。' },
      { id: 's4', meaning: '「搭＿」是坐上車子、搭車。', sentence: '我們搭＿公車去學校。', frame: '搭＿', options: ['乘', '乖'], answer: '乘', clue: '提示：這句話在說坐車，不是在說聽話。', explain: '答案是「乘」。「搭乘公車」是坐公車；「乖」是乖巧、聽話的乖。' },
      { id: 's5', meaning: '「雪＿」是在雪地上滑的車子。', sentence: '小狗拉著雪＿往前跑。', frame: '雪＿', options: ['橇', '撬'], answer: '橇', clue: '提示：雪地上的車子，以前是用木頭做的。', explain: '答案是「橇」，左邊是「木」；「撬」是用手把東西撬開，左邊是提手旁。' },
      { id: 's6', meaning: '「山＿」是山上斜斜的地方。', sentence: '我們從山＿上走下來。', frame: '山＿', options: ['坡', '波'], answer: '坡', clue: '提示：山上斜斜的地方，是泥土，不是水。', explain: '答案是「坡」，左邊是「土」；「波」是水的波浪，左邊是三點水。' },
      { id: 's7', meaning: '「＿管」是喝飲料用的細管子。', sentence: '我用＿管喝果汁。', frame: '＿管', options: ['吸', '級'], answer: '吸', clue: '提示：喝果汁要用嘴巴。', explain: '答案是「吸」，左邊是「口」；「級」是年級的級。' },
      { id: 's8', meaning: '「好＿」是裝得很多、快要裝不下了。', sentence: '杯子裡的水裝得好＿。', frame: '好＿', options: ['滿', '瞞'], answer: '滿', clue: '提示：這句話在說水很多、快要裝不下了。', explain: '答案是「滿」，左邊是三點水；「瞞」是把事情藏起來，左邊是眼睛。' },
      { id: 's9', meaning: '「＿著」是把事情藏起來，不讓別人知道。', sentence: '做錯事不要＿著媽媽。', frame: '＿著', options: ['瞞', '滿'], answer: '瞞', clue: '提示：這句話在說把事情藏起來，不讓別人看到。', explain: '答案是「瞞」，左邊是「目」，不讓別人的眼睛看到；「滿」是裝滿的滿。' },
      { id: 's10', meaning: '「＿服」是身體覺得很好、很輕鬆。', sentence: '這件衣服穿起來很＿服。', frame: '＿服', options: ['舒', '野'], answer: '舒', clue: '提示：這句話在說身體的感覺很好。', explain: '答案是「舒」。「舒服」是感覺很好；「野」是原野、野餐的野。' }
    ],
    listen: [
      { id: 'l1', text: '風從海上吹來，聞起來有鹽巴的味道。', answer: 0, options: [{ text: '鹹味', img: 'salty.png' }, { text: '雪橇', img: 'sled.png' }, { text: '山坡', img: 'slope.png' }, { text: '原野', img: 'field.png' }] },
      { id: 'l2', text: '大船在海上開了很久，終於開回港口了。', answer: 0, options: [{ text: '回航', img: 'ship-return.png' }, { text: '搭乘公車', img: 'ride-bus.png' }, { text: '雪橇', img: 'sled.png' }, { text: '欣賞', img: 'enjoy-view.png' }] },
      { id: 'l3', text: '小狗拉著一台沒有輪子的車，在雪地上跑。', answer: 0, options: [{ text: '雪橇', img: 'sled.png' }, { text: '搭乘公車', img: 'ride-bus.png' }, { text: '回航', img: 'ship-return.png' }, { text: '山坡', img: 'slope.png' }] },
      { id: 'l4', text: '這裡斜斜的，我們從上面慢慢走下來。', answer: 0, options: [{ text: '山坡', img: 'slope.png' }, { text: '原野', img: 'field.png' }, { text: '大海', img: 'blue-sea.png' }, { text: '鹹味', img: 'salty.png' }] },
      { id: 'l5', text: '一大片綠綠的草地，一眼看不到邊。', answer: 0, options: [{ text: '原野', img: 'field.png' }, { text: '山坡', img: 'slope.png' }, { text: '大海', img: 'blue-sea.png' }, { text: '雪橇', img: 'sled.png' }] },
      { id: 'l6', text: '我把眼睛合起來，什麼都看不見。', answer: 0, options: [{ text: '閉上眼睛', img: 'eyes-closed.png' }, { text: '深呼吸', img: 'deep-breath.png' }, { text: '欣賞', img: 'enjoy-view.png' }, { text: '瞞著', img: 'keep-secret.png' }] },
      { id: 'l7', text: '我用力吸一大口氣，再慢慢吐出來。', answer: 0, options: [{ text: '深呼吸', img: 'deep-breath.png' }, { text: '閉上眼睛', img: 'eyes-closed.png' }, { text: '鹹味', img: 'salty.png' }, { text: '搭乘公車', img: 'ride-bus.png' }] },
      { id: 'l8', text: '我們坐在山上，開心的看著美麗的風景。', answer: 0, options: [{ text: '欣賞', img: 'enjoy-view.png' }, { text: '瞞著', img: 'keep-secret.png' }, { text: '閉上眼睛', img: 'eyes-closed.png' }, { text: '回航', img: 'ship-return.png' }] }
    ],
    /* ---------- B 批：短語短句、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      intro: { example: '冰涼的雪花', img: 'snowflake.png',
        parts: [{ text: '冰涼', role: '形容東西的樣子' }, { text: '的' }, { text: '雪花', role: '是什麼東西' }] },
      pick: [
        { id: 'ph1', img: 'cold-juice.png', noun: '果汁', options: ['冰涼', '熱鬧', '烏黑', '高大'], clue: '提示：杯子外面有小水珠，摸起來會怎麼樣？', explain: '答案是「冰涼」，剛從冰箱拿出來的果汁冰冰涼涼的，所以說「冰涼的果汁」。' },
        { id: 'ph2', img: 'tree-shade.png', noun: '樹蔭', options: ['涼爽', '熱鬧', '烏黑', '柔軟'], clue: '提示：大熱天躲到大樹下面，感覺怎麼樣？', explain: '答案是「涼爽」，大樹下面不熱，很舒服，所以說「涼爽的樹蔭」。' },
        { id: 'ph3', img: 'soft-quilt.png', noun: '棉被', options: ['柔軟', '熱鬧', '高大', '烏黑'], clue: '提示：摸摸看棉被，是硬硬的還是軟軟的？', explain: '答案是「柔軟」，棉被摸起來軟軟的，所以說「柔軟的棉被」。' },
        { id: 'ph4', img: 'night-market.png', noun: '夜市', options: ['熱鬧', '柔軟', '冰涼', '烏黑'], clue: '提示：夜市裡的人多不多？聲音大不大？', explain: '答案是「熱鬧」，夜市裡人很多、很有活力，所以說「熱鬧的夜市」。' },
        { id: 'ph5', img: 'black-hair.png', noun: '頭髮', options: ['烏黑', '熱鬧', '冰涼', '涼爽'], clue: '提示：看看頭髮是什麼顏色？', explain: '答案是「烏黑」，頭髮又黑又亮，所以說「烏黑的頭髮」。' },
        { id: 'ph6', img: 'warm-sun.png', noun: '陽光', options: ['溫暖', '烏黑', '柔軟', '熱鬧'], clue: '提示：冬天曬太陽，身體覺得怎麼樣？', explain: '答案是「溫暖」，冬天的太陽照在身上暖暖的，所以說「溫暖的陽光」。' },
        { id: 'ph7', img: 'clear-river.png', noun: '河水', options: ['清澈', '烏黑', '熱鬧', '柔軟'], clue: '提示：看得到河底的小石頭嗎？', explain: '答案是「清澈」，河水很乾淨，看得到河底，所以說「清澈的河水」。' },
        { id: 'ph8', img: 'tall-tree.png', noun: '大樹', options: ['高大', '柔軟', '冰涼', '熱鬧'], clue: '提示：這棵樹跟旁邊的小朋友比，誰比較高？', explain: '答案是「高大」，這棵樹又高又大，所以說「高大的大樹」。' }
      ],
      say: [
        { id: 'ps1', img: 'snowflake.png', noun: '雪花', accept: ['冰涼的雪花', '冰冰的雪花', '白白的雪花', '雪白的雪花'], clue: '提示：雪花摸起來冰冰的，先說它的樣子，再說「的雪花」。', model: '冰涼的雪花' },
        { id: 'ps2', img: 'night-market.png', noun: '夜市', accept: ['熱鬧的夜市'], clue: '提示：夜市裡人很多、很好玩，先說它的樣子，再說「的夜市」。', model: '熱鬧的夜市' }
      ],
      words: [
        { word: '欣賞', meaning: '很喜歡的看或聽。', img: 'enjoy-view.png' },
        { word: '瞞', meaning: '把事情藏起來，不讓別人知道。', img: 'keep-secret.png' }
      ],
      choose: [
        { id: 'pw1', word: '欣賞', options: ['我們坐在海邊，欣賞美麗的夕陽。', '我欣賞了一碗飯，肚子好飽。'], clue: '提示：想一想，夕陽和飯，哪一個是用來看的？', explain: '第一句用得對：夕陽很美，大家很喜歡的看著它。飯是用來吃的，不是欣賞。' },
        { id: 'pw2', word: '欣賞', options: ['姐姐喜歡欣賞好聽的音樂。', '弟弟把玩具欣賞到地上。'], clue: '提示：想一想，聽音樂和丟玩具，哪一個是很喜歡的聽？', explain: '第一句用得對：姐姐很喜歡聽音樂。把玩具丟到地上，不是欣賞。' },
        { id: 'pw3', word: '瞞', options: ['他把考壞的考卷藏起來，想瞞著爸爸。', '小鳥瞞在樹上唱歌。'], clue: '提示：想一想，哪一句有把事情藏起來，不讓別人知道？', explain: '第一句用得對：他把考卷藏起來，不想讓爸爸知道。小鳥唱歌，沒有藏什麼事情。' },
        { id: 'pw4', word: '瞞', options: ['我打破了碗，沒有瞞著媽媽，馬上告訴她。', '我瞞了一杯牛奶，喝光光。'], clue: '提示：想一想，打破碗的事和牛奶，哪一個是可以藏起來不說的事情？', explain: '第一句用得對：打破碗的事沒有藏起來，馬上說出來。牛奶是喝的，不能「瞞」。' }
      ],
      make: [
        { id: 'pm1', word: '欣賞', clue: '提示：想想看，你很喜歡看什麼、聽什麼？', model: '我喜歡在晚上欣賞天上的星星。' },
        { id: 'pm2', word: '瞞', clue: '提示：想想看，做錯事的時候，應該說實話還是藏起來？', model: '我不會瞞著媽媽，做錯事就說實話。' }
      ]
    },
    rhetoric: {
      cards: [
        { key: 'personify', name: '擬人', meaning: '把東西寫得像人一樣，會說話、會玩、會開心。', example: '課文說：風會「流浪」，還會在原野上「快樂的打滾」。',
          show: { sentence: '小草在風裡開心的跳舞。' },
          yesno: [
            { id: 'rh-pe-y1', sentence: '白雲在天上散步。', answer: true, mark: ['散步'], clue: '提示：白雲會不會像人一樣散步？', explain: '是擬人：白雲不會散步，這句把白雲寫得像人一樣。' },
            { id: 'rh-pe-y2', sentence: '天上有很多白雲。', answer: false, clue: '提示：這句話裡的白雲，有沒有做人才會做的事？', explain: '不是擬人：天上有白雲是真的會看到的，沒有把白雲寫得像人。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['唱著歌'], options: ['小河唱著歌，往山下流去。', '小河往山下流去。'], clue: '提示：哪一句的小河，做了人才會做的事？', explain: '「小河唱著歌，往山下流去」是擬人：小河不會唱歌。' },
            { id: 'rh-pe-p2', mark: ['摸摸我的臉'], options: ['海風輕輕的摸摸我的臉。', '海邊的風很大。'], clue: '提示：風有沒有手？會不會摸人的臉？', explain: '「海風輕輕的摸摸我的臉」是擬人：風沒有手，這句把風寫得像人。' },
            { id: 'rh-pe-p3', mark: ['害羞的躲到', '雲後面'], options: ['太陽害羞的躲到雲後面。', '今天的太陽很大。', '太陽紅得像一顆蘋果。'], clue: '提示：哪一句的太陽，有人的心情？', explain: '「太陽害羞的躲到雲後面」是擬人：太陽不會害羞。' },
            { id: 'rh-pe-p4', mark: ['伸出手', '跟我打招呼'], options: ['大樹伸出手，跟我打招呼。', '公園裡有一棵大樹。', '大樹高得像一座山。'], clue: '提示：大樹會不會跟人打招呼？', explain: '「大樹伸出手，跟我打招呼」是擬人：大樹不會打招呼。' },
            { id: 'rh-pe-p5', mark: ['在窗外哭了一整晚'], options: ['雨在窗外哭了一整晚。', '昨天晚上下了大雨。', '雨滴滴答答的下著。', '雨大得像倒水一樣。'], clue: '提示：哪一句的雨，做了人才會做的事？', explain: '「雨在窗外哭了一整晚」是擬人：雨不會哭。' },
            { id: 'rh-pe-p6', mark: ['到處去旅行'], options: ['風背著小背包，到處去旅行。', '今天的風很涼。', '風呼呼呼的吹。', '風快得像一匹馬。'], clue: '提示：風會不會背背包、去旅行？', explain: '「風背著小背包，到處去旅行」是擬人：這句把風寫得像人一樣。' }
          ] },
        { key: 'redup', name: '疊字', meaning: '同一個字連在一起重複用，讀起來更好聽。', example: '課文裡的「淡淡的鹹味」。',
          show: { sentence: '海風輕輕的吹，海水藍藍的。' },
          yesno: [
            { id: 'rh-re-y1', sentence: '冰淇淋涼涼的、甜甜的。', answer: true, clue: '提示：形容冰淇淋的字裡，有沒有同一個字連在一起？', explain: '是疊字：「涼涼」、「甜甜」都是同一個字重複用。' },
            { id: 'rh-re-y2', sentence: '我喜歡吃冰淇淋。', answer: false, clue: '提示：仔細聽，有沒有同一個字連在一起？', explain: '不是疊字：這句話沒有重複的字。' }
          ],
          pick: [
            { id: 'rh-re-p1', options: ['草地綠綠的，好舒服。', '草地上有一隻小狗。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「草地綠綠的，好舒服」是疊字：「綠綠」重複了。' },
            { id: 'rh-re-p2', options: ['我閉上眼睛，靜靜的聽風聲。', '我閉上眼睛聽風聲。'], clue: '提示：仔細聽，哪一句多了重複的字？', explain: '「我閉上眼睛，靜靜的聽風聲」是疊字：「靜靜」重複了。' },
            { id: 'rh-re-p3', options: ['山坡上的雪白白的。', '山坡上下雪了。', '雪花在空中跳舞。'], clue: '提示：哪一句有同一個字連在一起？', explain: '「山坡上的雪白白的」是疊字：「白白」重複了。' },
            { id: 'rh-re-p4', options: ['小船慢慢的開回港口。', '小船開回港口了。', '小船像一片小樹葉。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「小船慢慢的開回港口」是疊字：「慢慢」重複了。' },
            { id: 'rh-re-p5', options: ['剛下過雨，空氣香香的。', '剛剛下了一場雨。', '雨後的天空像洗過一樣。', '小雨點在屋頂上跳舞。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「剛下過雨，空氣香香的」是疊字：「香香」重複了。' },
            { id: 'rh-re-p6', options: ['我大大的吸了一口氣。', '我吸了一口氣。', '風像一個調皮的孩子。', '風在我耳邊說話。'], clue: '提示：仔細聽，哪一句有重複的字？', explain: '「我大大的吸了一口氣」是疊字：「大大」重複了。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個詞或同一句話，隔開來重複說好幾次，讀起來有節奏。', example: '課文裡「風的身上」、「我知道」都說了好幾次。',
          show: { sentence: '我喜歡春天，我喜歡夏天，我也喜歡秋天。' },
          yesno: [
            { id: 'rh-rp-y1', sentence: '我聽到鳥叫，我聽到蟲鳴，我聽到風聲。', answer: true, mark: ['我聽到'], clue: '提示：找找看，有沒有同一句話隔開來說了好幾次？', explain: '是類疊：「我聽到」說了三次，讀起來有節奏。' },
            { id: 'rh-rp-y2', sentence: '我聽到窗外有鳥在叫。', answer: false, clue: '提示：這句話裡，有沒有同一句話說了好幾次？', explain: '不是類疊：這句話沒有重複說同一句話。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['風來了'], options: ['風來了，風來了，樹葉沙沙響。', '風來了，樹葉沙沙響。'], clue: '提示：哪一句有同一句話說了兩次？', explain: '「風來了，風來了，樹葉沙沙響」是類疊：「風來了」說了兩次。' },
            { id: 'rh-rp-p2', mark: ['一步'], options: ['一步，一步，再一步，我爬上了山頂。', '我慢慢的爬上了山頂。'], clue: '提示：哪一句有同一個詞，隔開來說了好幾次？', explain: '「一步，一步，再一步，我爬上了山頂」是類疊：「一步」重複說了好幾次。' },
            { id: 'rh-rp-p3', mark: ['我愛'], options: ['我愛大海，我愛高山，我愛原野。', '我很喜歡去大海玩。', '大海藍藍的，好漂亮。'], clue: '提示：哪一句有同一句話，隔開來說了好幾次？', explain: '「我愛大海，我愛高山，我愛原野」是類疊：「我愛」說了三次。' },
            { id: 'rh-rp-p4', mark: ['快一點'], options: ['快一點，快一點，公車要開了！', '公車要開了，我們要趕快。', '公車像一條長長的毛毛蟲。'], clue: '提示：哪一句有同一句話，連著喊了兩次？', explain: '「快一點，快一點，公車要開了」是類疊：「快一點」說了兩次。' },
            { id: 'rh-rp-p5', mark: ['風的身上'], options: ['風的身上有花香，風的身上有雨的味道。', '風吹過來，有花香和雨的味道。', '風香香的。', '風在花園裡快樂的玩耍。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「風的身上有花香，風的身上有雨的味道」是類疊：「風的身上」說了兩次。' },
            { id: 'rh-rp-p6', mark: ['一閃一閃', '亮晶晶'], options: ['一閃一閃亮晶晶，滿天都是小星星。', '天上有很多星星。', '星星像一顆顆鑽石。', '星星對著我眨眼睛。'], clue: '提示：哪一句有同一個詞，隔開來說了兩次？', explain: '「一閃一閃亮晶晶」是類疊：「一閃」隔開來說了兩次。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '風在草地上翻跟斗，玩得好開心。', answer: '擬人', mark: ['翻跟斗', '玩得好開心'], clue: '提示：風會不會像人一樣翻跟斗、玩得很開心？', explain: '答案是「擬人」：風不會翻跟斗，這句把風寫得像人一樣。' },
        { id: 'rh2', sentence: '月亮姐姐對我笑一笑。', answer: '擬人', mark: ['對我笑一笑'], clue: '提示：月亮會不會笑？', explain: '答案是「擬人」：月亮不會笑，這句把月亮寫得像人一樣。' },
        { id: 'rh3', sentence: '風吹在臉上，涼涼的。', answer: '疊字', clue: '提示：找找看，有沒有同一個字連在一起？', explain: '答案是「疊字」：「涼涼」是同一個字連在一起重複用。' },
        { id: 'rh4', sentence: '海水藍藍的，沙子白白的。', answer: '疊字', clue: '提示：仔細聽，有沒有同一個字連著說兩次？', explain: '答案是「疊字」：「藍藍」、「白白」都是同一個字連在一起。' },
        { id: 'rh5', sentence: '我知道風去過大海，我知道風去過山坡。', answer: '類疊', mark: ['我知道'], clue: '提示：有沒有同一句話，隔開來說了好幾次？', explain: '答案是「類疊」：「我知道」隔開來說了兩次。' },
        { id: 'rh6', sentence: '下雨了，下雨了，快把衣服收進來！', answer: '類疊', mark: ['下雨了'], clue: '提示：有沒有同一句話，說了兩次？', explain: '答案是「類疊」：「下雨了」說了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L07 = d; }
})(this);

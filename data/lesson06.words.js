/* 第 6 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    hanzi: [
      { id: 'h-墨', char: '墨', zhuyin: 'ㄇㄛˋ', radical: '土', strokes: 15, words: ['石墨', '墨水'], say: '墨，石墨的墨', cloze: '石＿', img: 'graphite.png', options: ['墨', '黑', '默', '磨'], hint: '下面是「土」' },
      { id: 'h-製', char: '製', zhuyin: 'ㄓˋ', radical: '衣', strokes: 14, words: ['製成', '製作'], say: '製，製成的製', cloze: '＿成', img: 'materials.png', options: ['製', '制', '治', '至'], hint: '下面是「衣」' },
      { id: 'h-部', char: '部', zhuyin: 'ㄅㄨˋ', radical: '邑', strokes: 11, words: ['部分', '全部'], say: '部，部分的部', cloze: '＿分', img: 'part.png', options: ['部', '陪', '步', '布'], hint: '右邊是「阝」' },
      { id: 'h-芯', char: '芯', zhuyin: 'ㄒㄧㄣ', radical: '艸', strokes: 8, words: ['筆芯', '燈芯'], say: '芯，筆芯的芯', cloze: '筆＿', img: 'core.png', options: ['芯', '心', '新', '辛'], hint: '上面有草字頭' },
      { id: 'h-斷', char: '斷', zhuyin: 'ㄉㄨㄢˋ', radical: '斤', strokes: 18, words: ['斷裂', '斷掉'], say: '斷，斷裂的斷', cloze: '＿裂', img: 'broken.png', options: ['斷', '繼', '段', '短'], hint: '右邊是「斤」' },
      { id: 'h-機', char: '機', zhuyin: 'ㄐㄧ', radical: '木', strokes: 16, words: ['機器', '削鉛筆機'], say: '機，機器的機', cloze: '＿器', img: 'machine.png', options: ['機', '幾', '雞', '基'], hint: '左邊是「木」' },
      { id: 'h-器', char: '器', zhuyin: 'ㄑㄧˋ', radical: '口', strokes: 16, words: ['機器', '樂器'], say: '器，機器的器', cloze: '機＿', img: 'machine.png', options: ['器', '氣', '汽', '哭'], hint: '有四個「口」' },
      { id: 'h-凹', char: '凹', zhuyin: 'ㄠ', radical: '凵', strokes: 5, words: ['凹槽', '凹凸'], say: '凹，凹槽的凹', cloze: '＿槽', img: 'groove.png', options: ['凹', '凸', '山', '出'], hint: '中間往下凹進去' },
      { id: 'h-槽', char: '槽', zhuyin: 'ㄘㄠˊ', radical: '木', strokes: 15, words: ['凹槽', '水槽'], say: '槽，凹槽的槽', cloze: '凹＿', img: 'groove.png', options: ['槽', '遭', '糟', '曹'], hint: '左邊是「木」' },
      { id: 'h-入', char: '入', zhuyin: 'ㄖㄨˋ', radical: '入', strokes: 2, words: ['放入', '進入'], say: '入，放入的入', cloze: '放＿', img: 'put-core.png', options: ['入', '人', '八', '如'], hint: '左邊的筆畫比較短' },
      { id: 'h-另', char: '另', zhuyin: 'ㄌㄧㄥˋ', radical: '口', strokes: 5, words: ['另外', '另一片'], say: '另，另外的另', cloze: '＿外', options: ['另', '別', '令', '加'], hint: '上面是「口」，下面是「力」' },
      { id: 'h-治', char: '治', zhuyin: 'ㄓˋ', radical: '水', strokes: 8, words: ['三明治', '治病'], say: '治，三明治的治', cloze: '三明＿', img: 'food-sandwich.png', options: ['治', '抬', '至', '製'], hint: '左邊是三點水' },
      { id: 'h-桿', char: '桿', zhuyin: 'ㄍㄢˇ', radical: '木', strokes: 11, words: ['筆桿', '電線桿'], say: '桿，筆桿的桿', cloze: '筆＿', img: 'barrel.png', options: ['桿', '趕', '干', '竿'], hint: '左邊是「木」' },
      { id: 'h-削', char: '削', zhuyin: 'ㄒㄧㄠ', radical: '刀', strokes: 9, words: ['削鉛筆', '削皮'], say: '削，削鉛筆的削', cloze: '＿鉛筆', img: 'sharpener.png', options: ['削', '消', '梢', '肖'], hint: '右邊是立刀旁' }
    ],
    vocab: [
      { id: 'v-石墨', word: '石墨', meaning: '一種黑黑亮亮的礦物，可以用來做筆芯。', img: 'graphite.png', options: ['石墨', '筆芯', '凹槽', '筆桿'] },
      { id: 'v-製成', word: '製成', meaning: '做成。', img: 'materials.png', noPic: true, options: ['製成', '斷裂', '放入', '部分'] },
      { id: 'v-部分', word: '部分', meaning: '整個東西裡面的其中一塊。', img: 'part.png', options: ['部分', '機器', '三明治', '另'] },
      { id: 'v-筆芯', word: '筆芯', meaning: '筆裡面用來寫字的那一條。', img: 'core.png', options: ['筆芯', '筆桿', '石墨', '削鉛筆機'] },
      { id: 'v-斷裂', word: '斷裂', meaning: '斷掉、裂開。', img: 'broken.png', options: ['斷裂', '製成', '凹槽', '放入'] },
      { id: 'v-機器', word: '機器', meaning: '用很多零件做成，可以幫人做工作的東西。', img: 'machine.png', options: ['機器', '三明治', '筆芯', '部分'] },
      { id: 'v-凹槽', word: '凹槽', meaning: '東西表面往下凹的長條溝。', img: 'groove.png', options: ['凹槽', '筆桿', '石墨', '機器'] },
      { id: 'v-放入', word: '放入', meaning: '放進去。', img: 'put-core.png', options: ['放入', '斷裂', '製成', '另'] },
      { id: 'v-另', word: '另', meaning: '別的、另外的。', img: 'pencil-sandwich.png', noPic: true, options: ['另', '部分', '放入', '製成'] },
      { id: 'v-三明治', word: '三明治', meaning: '兩片麵包中間夾著菜或肉的食物。', img: 'food-sandwich.png', options: ['三明治', '機器', '石墨', '凹槽'] },
      { id: 'v-筆桿', word: '筆桿', meaning: '筆拿在手上的那一段。', img: 'barrel.png', options: ['筆桿', '筆芯', '削鉛筆機', '三明治'] },
      { id: 'v-削鉛筆機', word: '削鉛筆機', meaning: '把鉛筆削尖的機器。', img: 'sharpener.png', options: ['削鉛筆機', '凹槽', '筆桿', '石墨'] }
    ],
    similar: [
      { id: 's1', sentence: '爸爸寫毛筆字要用＿汁。', options: ['墨', '黑'], answer: '墨', hint: '「墨汁」的墨，下面是「土」' },
      { id: 's2', sentence: '這件衣服是用棉花＿成的。', options: ['製', '制'], answer: '製', hint: '「製作」的製，下面是「衣」' },
      { id: 's3', sentence: '我把蛋糕分成好幾個＿分。', options: ['部', '陪'], answer: '部', hint: '「部分」的部，右邊是「阝」' },
      { id: 's4', sentence: '我的鉛筆筆＿斷掉了。', options: ['芯', '心'], answer: '芯', hint: '「筆芯」的芯，上面有草字頭' },
      { id: 's5', sentence: '休息一下，我們再＿續練習。', options: ['斷', '繼'], answer: '繼', hint: '「繼續」的繼，左邊是「糸」' },
      { id: 's6', sentence: '你今年＿歲了？', options: ['機', '幾'], answer: '幾', hint: '問「多少」的幾，左邊沒有「木」' },
      { id: 's7', sentence: '牛奶打翻了，真＿糕！', options: ['槽', '遭', '糟'], answer: '糟', hint: '「糟糕」的糟，左邊是「米」' },
      { id: 's8', sentence: '請大家＿起頭來看黑板。', options: ['治', '抬'], answer: '抬', hint: '「抬頭」的抬，左邊是提手旁' },
      { id: 's9', sentence: '快遲到了，我們要＿快出門。', options: ['桿', '趕'], answer: '趕', hint: '「趕快」的趕，左下是「走」' },
      { id: 's10', sentence: '媽媽用刀子＿蘋果皮。', options: ['削', '消', '梢'], answer: '削', hint: '「削皮」的削，右邊是立刀旁' },
      { id: 's11', sentence: '木板上有一道一道往下陷的＿槽。', options: ['凹', '凸'], answer: '凹', hint: '往下凹進去的是「凹」' }
    ],
    listen: [
      { id: 'l1', text: '我把鉛筆放進削鉛筆機，把它削尖。', answer: 0, options: [{ text: '削鉛筆機', img: 'sharpener.png' }, { text: '橡皮擦', img: 'eraser.png' }, { text: '顏料', img: 'paint.png' }, { text: '木板', img: 'wood.png' }] },
      { id: 'l2', text: '這枝筆不用削，按一按，筆芯就會跑出來。', answer: 0, options: [{ text: '自動鉛筆', img: 'mech-pencil.png' }, { text: '色鉛筆', img: 'color-pencil.png' }, { text: '短鉛筆', img: 'short-pencil.png' }, { text: '一般的鉛筆', img: 'pencil.png' }] },
      { id: 'l3', text: '筆芯斷成兩截，我的手也變黑了。', answer: 0, options: [{ text: '筆芯斷了', img: 'broken.png' }, { text: '新鉛筆', img: 'finished.png' }, { text: '香香的鉛筆', img: 'nice-smell.png' }, { text: '保護', img: 'protect.png' }] },
      { id: 'l4', text: '這塊粉紅色的東西，可以把寫錯的字擦掉。', answer: 0, options: [{ text: '橡皮擦', img: 'eraser.png' }, { text: '黏土', img: 'clay.png' }, { text: '顏料', img: 'paint.png' }, { text: '三明治', img: 'food-sandwich.png' }] },
      { id: 'l5', text: '兩片木板中間，夾著好幾根黑黑的筆芯。', answer: 0, options: [{ text: '筆芯三明治', img: 'pencil-sandwich.png' }, { text: '三明治', img: 'food-sandwich.png' }, { text: '凹槽', img: 'groove.png' }, { text: '三枝鉛筆', img: 'three-pencils.png' }] },
      { id: 'l6', text: '工廠裡的大機器，有好多齒輪在轉動。', answer: 0, options: [{ text: '機器', img: 'machine.png' }, { text: '削鉛筆機', img: 'sharpener.png' }, { text: '切鉛筆', img: 'cut.png' }, { text: '攪拌', img: 'mix.png' }] },
      { id: 'l7', text: '木板上有一道一道往下凹的長條溝。', answer: 0, options: [{ text: '凹槽', img: 'groove.png' }, { text: '小洞', img: 'hole.png' }, { text: '木板', img: 'wood.png' }, { text: '畫畫', img: 'picture.png' }] },
      { id: 'l8', text: '這枝鉛筆用了好久，變得好短好短。', answer: 0, options: [{ text: '短鉛筆', img: 'short-pencil.png' }, { text: '一般的鉛筆', img: 'pencil.png' }, { text: '三枝鉛筆', img: 'three-pencils.png' }, { text: '筆桿', img: 'barrel.png' }] }
    ]
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L06 = d; }
})(this);

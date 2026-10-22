const test = require('node:test');
const assert = require('node:assert/strict');
const { validateWords } = require('../../assets/core/wordsschema.js');
const fresh = () => JSON.parse(JSON.stringify(require('../fixtures/words.fake.js')));

test('fixture valid', () => { assert.deepEqual(validateWords(fresh()), []); });
test('hanzi answer must be first option and in options', () => {
  const w = fresh(); w.hanzi[0].options = ['盃', '背', '悲', '碑']; assert.ok(validateWords(w).length);
});
test('options unique', () => { const w = fresh(); w.hanzi[0].options = ['杯', '杯', '背', '悲']; assert.ok(validateWords(w).some(e => e.includes('重複'))); });
test('similar answer in options', () => { const w = fresh(); w.similar[0].answer = '背'; assert.ok(validateWords(w).length); });
test('similar sentence has one blank', () => { const w = fresh(); w.similar[0].sentence = '我用杯子喝水。'; assert.ok(validateWords(w).length); });
test('listen answer index valid', () => { const w = fresh(); w.listen[0].answer = 4; assert.ok(validateWords(w).length); });
test('ids unique across kinds', () => { const w = fresh(); w.listen[0].id = 's1'; assert.ok(validateWords(w).some(e => e.includes('重複'))); });
test('vocab answer is first option', () => { const w = fresh(); w.vocab[0].options = ['木頭', '紙', '布', '鐵']; assert.ok(validateWords(w).length); });

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { buildReviewQuestions, mapStepQuestion } = require('../../assets/core/reviewgen.js');
const { rng } = require('../../assets/core/quizgen.js');
const lesson = JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures/fake06.plain.json'), 'utf8'));

test('map step question asks for the step after the previous one', () => {
  const q = mapStepQuestion(lesson.mapSteps, 1, rng(1));
  assert.equal(q.id, 'm2'); assert.equal(q.prompt, '「準備沙子」之後，下一步是什麼？');
  assert.equal(q.options[q.answer].text, '把沙子燒熱'); assert.equal(q.evidence, lesson.mapSteps[1].evidence);
});
test('first step prompt', () => {
  assert.equal(mapStepQuestion(lesson.mapSteps, 0, rng(1)).prompt, '第一步是什麼？');
});
test('options are at most 4 and unique', () => {
  const q = mapStepQuestion(lesson.mapSteps, 2, rng(5));
  assert.ok(q.options.length <= 4); assert.equal(new Set(q.options.map(o => o.text)).size, q.options.length);
});
test('buildReviewQuestions finds quiz, testExtra and map ids', () => {
  const qs = buildReviewQuestions(lesson, ['q2', 't1', 'm3', 'gone'], rng(2));
  assert.deepEqual(qs.map(q => q.id).sort(), ['m3', 'q2', 't1']);
  qs.forEach(q => assert.ok(q.answer >= 0 && q.answer < q.options.length));
});

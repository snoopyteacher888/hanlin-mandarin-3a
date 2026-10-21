const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validateLesson } = require('../../assets/core/lessonschema.js');

const fixture = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures/fake06.plain.json'), 'utf8'));

test('fixture is valid', () => { assert.deepEqual(validateLesson(fixture()), []); });
test('quiz must have 4 options', () => {
  const l = fixture(); l.quiz[0].options.pop();
  assert.ok(validateLesson(l).some(e => e.includes(l.quiz[0].id)));
});
test('answer out of range', () => {
  const l = fixture(); l.quiz[0].answer = 4; assert.ok(validateLesson(l).length > 0);
});
test('duplicate ids rejected', () => {
  const l = fixture(); l.quiz[1].id = l.quiz[0].id; assert.ok(validateLesson(l).some(e => e.includes('重複')));
});
test('empty evidence rejected', () => {
  const l = fixture(); l.mapSteps[0].evidence = ''; assert.ok(validateLesson(l).length > 0);
});
test('missing paragraphs rejected', () => {
  const l = fixture(); delete l.paragraphs; assert.ok(validateLesson(l).length > 0);
});
test('real lesson06 is valid (if present)', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson06.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson06.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.quiz.length, 10); assert.equal(l.mapSteps.length, 7); assert.equal(l.testExtra.length, 3);
});

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHash, buildTaskLink } = require('../../assets/core/links.js');

test('parseHash', () => {
  assert.deepEqual(parseHash('#/L06/quiz?s=bear&auto=1'), { path: ['L06', 'quiz'], params: { s: 'bear', auto: true } });
  assert.deepEqual(parseHash(''), { path: [], params: {} });
  assert.deepEqual(parseHash('#/'), { path: [], params: {} });
});
test('buildTaskLink', () => {
  assert.equal(buildTaskLink('https://x.github.io/h3a/', { lesson: 'L06', activity: 'map', student: 'bear', auto: false }),
    'https://x.github.io/h3a/#/L06/map?s=bear');
  assert.equal(buildTaskLink('https://x.github.io/h3a/', { lesson: 'L06', activity: 'quiz', student: 'bear', auto: true }),
    'https://x.github.io/h3a/#/L06/quiz?s=bear&auto=1');
});
test('round trip', () => {
  const url = buildTaskLink('https://x/', { lesson: 'L06', activity: 'test', student: 'cat', auto: true });
  assert.deepEqual(parseHash(url.slice(url.indexOf('#'))), { path: ['L06', 'test'], params: { s: 'cat', auto: true } });
});

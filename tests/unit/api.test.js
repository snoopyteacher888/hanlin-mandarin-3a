const test = require('node:test');
const assert = require('node:assert/strict');
const { make } = require('../../assets/api.js');
const store = require('../../assets/store.js');

const okResp = body => ({ json: async () => body });

test('outbox keeps failed and flushes later', async () => {
  let ok = false;
  const api = make({ fetch: async () => { if (!ok) throw new Error('net'); return okResp({ ok: true }); }, store: store.make(null), url: 'u' });
  await api.submit({ id: '1' }); assert.equal(api.pending(), 1);
  ok = true; assert.equal(await api.flush(), 1); assert.equal(api.pending(), 0);
});
test('server error keeps record in outbox', async () => {
  const api = make({ fetch: async () => okResp({ error: 'BAD' }), store: store.make(null), url: 'u' });
  await api.submit({ id: '1' }); assert.equal(api.pending(), 1);
});
test('call posts text/plain JSON with action', async () => {
  let seen; const api = make({ fetch: async (url, init) => { seen = { url, init }; return okResp({ roster: [] }); }, store: store.make(null), url: 'https://b' });
  assert.deepEqual(await api.call('roster', {}), { roster: [] });
  assert.equal(seen.url, 'https://b'); assert.equal(seen.init.method, 'POST');
  assert.equal(seen.init.headers['Content-Type'], 'text/plain;charset=utf-8'); assert.equal(JSON.parse(seen.init.body).action, 'roster');
});
test('empty url does not fetch', async () => {
  let n = 0; const api = make({ fetch: async () => { n++; }, store: store.make(null), url: '' });
  await api.submit({ id: '1' }); assert.equal(n, 0); assert.equal(api.pending(), 1);
  await assert.rejects(api.call('roster', {}), /NO_BACKEND/);
});
test('concurrent flush sends each record once', async () => {
  const sent = []; const api = make({ fetch: async (u, i) => { sent.push(JSON.parse(i.body).record.id); return okResp({ ok: true }); }, store: store.make(null), url: 'u' });
  await Promise.all([api.submit({ id: 'a' }), api.flush(), api.flush()]);
  assert.deepEqual(sent, ['a']);
});

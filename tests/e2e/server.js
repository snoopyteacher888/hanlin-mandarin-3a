// 測試用伺服器：提供靜態檔，把 data/lesson06.enc.js 換成虛構的 fake06，並模擬 Apps Script 後端
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.join(__dirname, '../..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.json': 'application/json' };

function start(port, opts = {}) {
  const posts = [];
  const roster = opts.roster || [{ id: 'bear', emoji: '🐻', name: '小熊' }, { id: 'cat', emoji: '🐱', name: '小貓' }];
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname === '/fake-backend' && req.method === 'POST') {
      let body = ''; req.on('data', c => { body += c; }); req.on('end', () => {
        const msg = JSON.parse(body); posts.push(msg);
        res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Content-Type', 'application/json');
        if (msg.action === 'roster') return res.end(JSON.stringify({ roster }));
        if (msg.action === 'login') return res.end(JSON.stringify(msg.password === 'teacher-pass' ? { token: 't1' } : { error: 'BAD_PASSWORD' }));
        if (msg.action === 'records') return res.end(JSON.stringify(msg.token === 't1' ? { records: posts.filter(p => p.action === 'submit').map(p => p.record), roster } : { error: 'AUTH' }));
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
    let file = url.pathname === '/' ? '/index.html' : url.pathname;
    if (file === '/data/lesson06.enc.js') { if (opts.encFile) { res.setHeader('Content-Type', TYPES['.js']); return fs.createReadStream(opts.encFile).pipe(res); } file = '/tests/fixtures/fake06.enc.js'; }
    if (file === '/config.js') { res.setHeader('Content-Type', TYPES['.js']); return res.end(`window.H3A_CONFIG = { backendUrl: '${opts.backend === false ? '' : `http://localhost:${port}/fake-backend`}' };`); }
    const full = path.join(ROOT, decodeURIComponent(file));
    if (!full.startsWith(ROOT) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
    res.setHeader('Content-Type', TYPES[path.extname(full)] || 'application/octet-stream');
    fs.createReadStream(full).pipe(res);
  });
  return new Promise(r => server.listen(port, () => r({ server, posts, close: () => new Promise(c => server.close(c)) })));
}
module.exports = { start };
if (require.main === module) start(Number(process.argv[2] || 8080)).then(() => console.log('serving'));

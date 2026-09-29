// Tiny static server for local previews: node tools/serve.js [port]
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), port = +process.argv[2] || 3000;
const types = {'.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain', '.xml': 'application/xml'};
http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    fs.readFile(f, (err, data) => {
        if (err) { res.writeHead(404, {'Content-Type': 'text/plain'}); return res.end('Not found'); }
        res.writeHead(200, {'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream'});
        res.end(data);
    });
}).listen(port, () => console.log('Serving ' + root + ' on http://localhost:' + port));

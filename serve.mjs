// Local test server for the iPad. Run:  node serve.mjs
// Serves this folder on the local network over HTTPS (port 8443) and HTTP (port 8080).
// Safari only allows the microphone on HTTPS, so open the https:// address on the iPad. The certificate is
// self-signed (made once with openssl into .cert/), so Safari shows a warning the first time: tap
// "Show Details" -> "visit this website".
import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const HTTPS_PORT = 8443, HTTP_PORT = 8080;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.mov': 'video/quicktime',
};

const lanIps = Object.values(os.networkInterfaces()).flat()
  .filter(a => a && a.family === 'IPv4' && !a.internal).map(a => a.address);

// self-signed certificate covering localhost and this machine's LAN addresses
const certDir = path.join(root, '.cert');
const keyFile = path.join(certDir, 'key.pem'), certFile = path.join(certDir, 'cert.pem');
const ipsFile = path.join(certDir, 'ips.txt');
const wantIps = ['127.0.0.1', ...lanIps].join(',');
if (!fs.existsSync(certFile) || (fs.existsSync(ipsFile) && fs.readFileSync(ipsFile, 'utf8') !== wantIps)) {
  fs.mkdirSync(certDir, { recursive: true });
  const san = ['DNS:localhost', ...wantIps.split(',').map(ip => 'IP:' + ip)].join(',');
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '825', '-subj', '/CN=Tenna face test',
    '-addext', 'subjectAltName=' + san, '-keyout', keyFile, '-out', certFile], { stdio: 'ignore' });
  fs.writeFileSync(ipsFile, wantIps);
}

function handler(req, res) {
  let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (rel.endsWith('/')) rel += 'README.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root) || path.basename(file).startsWith('.') || rel.includes('/.')) { res.writeHead(403).end(); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end('Not found'); return; }
    const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
    // Safari needs byte ranges to play video
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (m) {
      const start = m[1] ? +m[1] : st.size - +m[2];
      const end = m[1] && m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1 });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { ...headers, 'Content-Length': st.size });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file).pipe(res);
    }
  });
}

https.createServer({ key: fs.readFileSync(keyFile), cert: fs.readFileSync(certFile) }, handler).listen(HTTPS_PORT, '0.0.0.0');
http.createServer(handler).listen(HTTP_PORT, '0.0.0.0');
console.log('Tenna face server running. On the iPad (same Wi-Fi), open:');
for (const ip of lanIps) console.log(`  https://${ip}:${HTTPS_PORT}/face.html     (face, with mic)`);
for (const ip of lanIps) console.log(`  https://${ip}:${HTTPS_PORT}/README.html   (instructions)`);
console.log(`Plain http://<ip>:${HTTP_PORT}/ also works for looking, but the mic needs https. Ctrl+C stops it.`);

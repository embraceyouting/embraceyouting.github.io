const { createServer } = require('node:http');
const { createReadStream } = require('node:fs');
const { stat } = require('node:fs/promises');
const { join } = require('node:path');

const port = Number(process.env.PORT || 8080);
const host = '127.0.0.1';
const staticFiles = new Map([
    ['/', ['index.html', 'text/html; charset=utf-8']],
    ['/index.html', ['index.html', 'text/html; charset=utf-8']],
    ['/Index.html', ['index.html', 'text/html; charset=utf-8']],
    ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
    ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
    ['/photo-store.mjs', ['photo-store.mjs', 'text/javascript; charset=utf-8']],
    ['/scene.mjs', ['scene.mjs', 'text/javascript; charset=utf-8']],
    ['/gestures.mjs', ['gestures.mjs', 'text/javascript; charset=utf-8']],
    ...['ky1.jpg', 'ky2.jpg', 'ky3.jpg'].map(name => [
        '/images/' + name, ['images/' + name, 'image/jpeg'],
    ]),
]);

function text(response, status, message) {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(message);
}

createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.setHeader('Allow', 'GET, HEAD');
        text(response, 405, 'Method Not Allowed');
        return;
    }

    const entry = staticFiles.get(request.url.split('?')[0]);
    if (!entry) {
        text(response, 404, 'Not Found');
        return;
    }

    const [relativePath, type] = entry;
    const file = join(__dirname, relativePath);
    try {
        const { size } = await stat(file);
        response.writeHead(200, { 'Content-Type': type, 'Content-Length': size });
        if (request.method === 'HEAD') response.end();
        else createReadStream(file).on('error', () => response.destroy()).pipe(response);
    } catch (error) {
        if (error.code === 'ENOENT') text(response, 404, 'Not Found');
        else text(response, 500, 'Internal Server Error');
    }
}).listen(port, host, () => console.log(`圣诞相册预览 http://${host}:${port}/`));

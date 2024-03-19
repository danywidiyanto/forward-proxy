// proxy.js

const http = require('http');
const https = require('https');

const proxyPort = 3456;

const requestHandler = (req, res) => {
    const options = {
        hostname: req.headers.host,
        port: req.headers.port || (req.url.startsWith('https') ? 443 : 80),
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    const proxyReq = (req.url.startsWith('https') ? https : http).request(options, (proxyRes) => {
        let responseData = '';

        proxyRes.on('data', (chunk) => {
            responseData += chunk;
        });

        proxyRes.on('end', () => {
            if (req.url.startsWith('http') && responseData.toString().toLowerCase().includes('html')) {
                responseData += 'NODEJS';
            }
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            res.end(responseData);
        });
    });

    req.on('data', (chunk) => {
        proxyReq.write(chunk);
    });

    req.on('end', () => {
        proxyReq.end();
    });

    proxyReq.on('error', (error) => {
        console.error('Proxy request error:', error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Proxy request error');
    });
};

const server = http.createServer(requestHandler);

server.listen(proxyPort, () => {
    console.log(`Forward proxy is running on port ${proxyPort}`);
});

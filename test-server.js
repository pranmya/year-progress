const http = require('http');
const url = require('url');
const wallpaperApi = require('./api/wallpaper.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Simulate Vercel routing
    if (parsedUrl.pathname === '/api/wallpaper') {
        req.query = parsedUrl.query; // Attach query params like Vercel does
        
        // Mock res.send and res.status which Vercel provides automatically
        res.send = (body) => res.end(body);
        res.status = (code) => { res.statusCode = code; return res; };
        
        wallpaperApi(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found. Visit /api/wallpaper');
    }
});

server.listen(3000, () => {
    console.log('Local simulator running at http://localhost:3000');
    console.log('Test the API at: http://localhost:3000/api/wallpaper?w=1080&h=2400');
});

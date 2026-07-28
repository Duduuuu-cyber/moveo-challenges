const http = require('http');

// Configuration via Environment Variables
const PORT = process.env.PORT || 3000;
const ENV_NAME = process.env.ENV_NAME || 'Development';

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Moveo.AI DevOps Challenge</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding-top: 80px; }
        .card { background: #1e293b; max-width: 500px; margin: 0 auto; padding: 40px; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        h1 { color: #38bdf8; font-size: 24px; margin-bottom: 12px; }
        .badge { background: #0284c7; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Frontend Service is Running</h1>
        <p>Environment: <span class="badge">${ENV_NAME}</span></p>
        <p><i>If you see this, your Ingress/Service orchestration is working correctly.</i></p>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    console.log(`[Frontend] Request received: ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(htmlContent);
});

server.listen(PORT, () => {
    console.log(`Frontend Service running on port ${PORT}`);
});

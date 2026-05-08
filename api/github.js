const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'GITHUB_TOKEN not set in Vercel env vars' });
    return;
  }

  // Strip /api/github → /repos/owner/repo etc
  const githubPath = req.url.replace(/^\/api\/github/, '') || '/';

  let bodyData = '';
  if (!['GET', 'DELETE'].includes(req.method) && req.body) {
    bodyData = JSON.stringify(req.body);
  }

  const options = {
    hostname: 'api.github.com',
    path: githubPath,
    method: req.method,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Shopify-AI-Agency'
    }
  };

  if (bodyData) options.headers['Content-Length'] = Buffer.byteLength(bodyData);

  const upstream = https.request(options, (upRes) => {
    if (upRes.statusCode === 204) { res.status(204).end(); return; }
    let data = '';
    upRes.on('data', chunk => data += chunk);
    upRes.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.status(upRes.statusCode).send(data);
    });
  });

  upstream.on('error', err => res.status(500).json({ error: err.message }));
  if (bodyData) upstream.write(bodyData);
  upstream.end();
};

const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const token = process.env.SHOPIFY_CLI_THEME_TOKEN;
  const store = process.env.SHOPIFY_STORE_URL;
  if (!token || !store) {
    res.status(500).json({ error: 'SHOPIFY_CLI_THEME_TOKEN or SHOPIFY_STORE_URL not set in Vercel env vars' });
    return;
  }

  // Strip /api/shopify from path → /shop.json, /themes.json etc
  const shopifyPath = req.url.replace(/^\/api\/shopify/, '') || '/shop.json';
  const cleanStore  = store.replace(/https?:\/\//, '').replace(/\/$/, '');
  const fullPath    = `/admin/api/2024-01${shopifyPath}`;

  let bodyData = '';
  if (!['GET', 'DELETE'].includes(req.method)) {
    bodyData = JSON.stringify(req.body || {});
  }

  const options = {
    hostname: cleanStore,
    path: fullPath,
    method: req.method,
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    }
  };

  if (bodyData) options.headers['Content-Length'] = Buffer.byteLength(bodyData);

  const upstream = https.request(options, (upRes) => {
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

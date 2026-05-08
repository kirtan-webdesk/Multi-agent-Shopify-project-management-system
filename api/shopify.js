const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Accept several common env var names so the user can pick whichever they prefer.
  const token =
    process.env.SHOPIFY_ADMIN_API_TOKEN ||
    process.env.SHOPIFY_ADMIN_TOKEN ||
    process.env.SHOPIFY_ACCESS_TOKEN ||
    process.env.SHOPIFY_CLI_THEME_TOKEN;
  const store = process.env.SHOPIFY_STORE_URL;

  if (!token || !store) {
    res.status(500).json({
      error: 'Shopify credentials not set. Add SHOPIFY_ADMIN_API_TOKEN (preferred) or SHOPIFY_CLI_THEME_TOKEN, plus SHOPIFY_STORE_URL, in Vercel env vars.'
    });
    return;
  }

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

      // On 401, augment the error body with actionable guidance.
      if (upRes.statusCode === 401) {
        let parsed = {};
        try { parsed = JSON.parse(data); } catch {}
        res.status(401).json({
          errors: parsed.errors || 'Invalid API key or access token',
          hint: 'The token must be a Shopify Admin API access token (starts with "shpat_") from a Custom App in your Shopify admin. Theme Access tokens (used by Shopify CLI for `theme push`) will NOT work here — they cannot access /shop.json, /themes.json, products, or webhooks. Create a custom app under Settings → Apps and sales channels → Develop apps → Create an app, configure Admin API scopes (read_themes, write_themes, read_products, write_products, write_metafields, write_webhooks), install it, and copy the Admin API access token.',
          store: cleanStore,
        });
        return;
      }

      res.status(upRes.statusCode).send(data);
    });
  });

  upstream.on('error', err => res.status(500).json({ error: err.message }));
  if (bodyData) upstream.write(bodyData);
  upstream.end();
};

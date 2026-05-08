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

      // Augment 401 / 404 with actionable guidance — GitHub's default message is too terse.
      if (upRes.statusCode === 401 || upRes.statusCode === 404) {
        let parsed = {};
        try { parsed = JSON.parse(data); } catch {}
        const isAuth = upRes.statusCode === 401;
        res.status(upRes.statusCode).json({
          message: parsed.message || (isAuth ? 'Bad credentials' : 'Not Found'),
          status: upRes.statusCode,
          path: githubPath,
          hint: isAuth
            ? 'GITHUB_TOKEN is invalid or expired. Generate a new Personal Access Token at github.com → Settings → Developer settings → Personal access tokens.'
            : 'GitHub returned 404. The token authenticated, but it cannot see this resource. Common causes: (1) The repo is private and your token lacks the "repo" scope (Classic PAT) — regenerate with full "repo" checked. (2) You are using a Fine-grained PAT that was not granted access to this specific repo — go to Settings → Developer settings → Fine-grained tokens → edit → add this repo to "Repository access". (3) The repo path is wrong — verify github.com' + githubPath.split('/').slice(0, 3).join('/') + ' opens in your browser.',
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

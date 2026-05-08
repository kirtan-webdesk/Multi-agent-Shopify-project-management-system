module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const e = process.env;
  const env = {
    anthropic:     !!(e.ANTHROPIC_API_KEY    && e.ANTHROPIC_API_KEY.startsWith('sk-')),
    shopify_token: !!(e.SHOPIFY_CLI_THEME_TOKEN),
    shopify_store:   (e.SHOPIFY_STORE_URL    || ''),
    dev_theme_id:    (e.SHOPIFY_DEV_THEME_ID || ''),
    github_token:  !!(e.GITHUB_TOKEN),
    github_owner:    (e.GITHUB_OWNER || ''),
    github_repo:     (e.GITHUB_REPO  || ''),
  };

  const allOk = env.anthropic && env.shopify_token && env.shopify_store &&
                env.github_token && env.github_owner && env.github_repo;

  res.status(200).json({ status: allOk ? 'ok' : 'missing_env', env });
};

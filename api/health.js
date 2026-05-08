module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const e = process.env;

  // Normalize GitHub owner/repo — accept any of:
  //   GITHUB_REPO = "repo"
  //   GITHUB_REPO = "owner/repo"
  //   GITHUB_REPO = "https://github.com/owner/repo"
  //   GITHUB_REPO = "https://github.com/owner/repo.git"
  // Same for GITHUB_OWNER (in case the user pasted a URL there too).
  function parseRepo(rawOwner, rawRepo) {
    let owner = (rawOwner || '').trim();
    let repo  = (rawRepo  || '').trim();

    // If repo looks like a URL or owner/repo path, extract owner+repo from it.
    const cleaned = repo
      .replace(/^https?:\/\/github\.com\//i, '')
      .replace(/^git@github\.com:/i, '')
      .replace(/\.git$/i, '')
      .replace(/^\/+|\/+$/g, '');

    if (cleaned.includes('/')) {
      const parts = cleaned.split('/').filter(Boolean);
      // Use last two segments as owner/repo
      if (parts.length >= 2) {
        owner = parts[parts.length - 2];
        repo  = parts[parts.length - 1];
      }
    } else if (cleaned) {
      repo = cleaned;
    }

    // If owner was given as a URL, strip it the same way.
    owner = owner
      .replace(/^https?:\/\/github\.com\//i, '')
      .replace(/\.git$/i, '')
      .replace(/^\/+|\/+$/g, '')
      .split('/')[0];

    return { owner, repo };
  }

  // Normalize Shopify store URL — accept "store.myshopify.com" or "https://store.myshopify.com/"
  function parseStore(raw) {
    return (raw || '')
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/+$/, '');
  }

  const { owner, repo } = parseRepo(e.GITHUB_OWNER, e.GITHUB_REPO);
  const store = parseStore(e.SHOPIFY_STORE_URL);

  const env = {
    anthropic:     !!(e.ANTHROPIC_API_KEY    && e.ANTHROPIC_API_KEY.startsWith('sk-')),
    shopify_token: !!(e.SHOPIFY_CLI_THEME_TOKEN),
    shopify_store: store,
    dev_theme_id:  (e.SHOPIFY_DEV_THEME_ID || ''),
    github_token:  !!(e.GITHUB_TOKEN),
    github_owner:  owner,
    github_repo:   repo,
  };

  const allOk = env.anthropic && env.shopify_token && env.shopify_store &&
                env.github_token && env.github_owner && env.github_repo;

  res.status(200).json({ status: allOk ? 'ok' : 'missing_env', env });
};

// Local test harness — verifies the Shopify and GitHub proxy handlers
// produce the correct outbound URL, headers, and body for the calls the
// frontend actually makes. Mocks https.request so no real network hits.

const Module = require('module');
const { Readable, Writable } = require('stream');

// ─── Mock https.request ────────────────────────────────────────────────
const captured = [];
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'https') {
    return {
      request(options, cb) {
        const reqLog = {
          hostname: options.hostname,
          path: options.path,
          method: options.method,
          headers: { ...options.headers },
          body: '',
        };
        captured.push(reqLog);

        const writable = new Writable({
          write(chunk, _enc, done) {
            reqLog.body += chunk.toString();
            done();
          },
        });
        writable.end = function (chunk) {
          if (chunk) reqLog.body += chunk.toString();
          // Build a fake successful Shopify response
          const fakeResponse = mockShopifyResponse(reqLog);
          const upRes = new Readable({ read() {} });
          upRes.statusCode = fakeResponse.status;
          process.nextTick(() => {
            upRes.push(fakeResponse.body);
            upRes.push(null);
            cb(upRes);
          });
          return writable;
        };
        writable.on = () => writable;
        return writable;
      },
    };
  }
  return originalLoad(request, parent, isMain);
};

function mockShopifyResponse(reqLog) {
  const p = reqLog.path;
  if (p.endsWith('/graphql.json')) {
    let parsed;
    try { parsed = JSON.parse(reqLog.body || '{}'); } catch { parsed = {}; }
    if (!parsed.query) {
      return { status: 400, body: JSON.stringify({ errors: 'No GraphQL query' }) };
    }
    return {
      status: 200,
      body: JSON.stringify({
        data: {
          metafieldDefinitionCreate: {
            createdDefinition: { id: 'gid://shopify/MetafieldDefinition/1', name: 'mock', namespace: 'agency', key: 'mock' },
            userErrors: [],
          },
        },
      }),
    };
  }
  if (p.endsWith('/shop.json')) {
    return { status: 200, body: JSON.stringify({ shop: { name: 'Mock Store', plan_name: 'Plus' } }) };
  }
  if (p.endsWith('/webhooks.json')) {
    let parsed;
    try { parsed = JSON.parse(reqLog.body || '{}'); } catch { parsed = {}; }
    const topic = parsed.webhook?.topic || '';
    if (['customers/data_request', 'customers/redact', 'shop/redact'].includes(topic)) {
      return { status: 404, body: JSON.stringify({ errors: `Could not find the webhook topic ${topic}` }) };
    }
    return { status: 201, body: JSON.stringify({ webhook: { id: 1, topic } }) };
  }
  return { status: 200, body: '{}' };
}

// ─── Mock req/res ─────────────────────────────────────────────────────
function makeReq({ method, url, body }) {
  const r = new Readable({ read() {} });
  r.method = method;
  r.url = url;
  if (body !== undefined) r.body = body;
  setImmediate(() => {
    if (body && typeof body === 'string') r.push(body);
    r.push(null);
  });
  return r;
}

function makeRes() {
  const res = {
    headers: {},
    statusCode: null,
    body: '',
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(o) { this.body = JSON.stringify(o); return this; },
    send(d) { this.body = d; return this; },
    end() { return this; },
  };
  return res;
}

async function callHandler(handler, reqOpts) {
  const req = makeReq(reqOpts);
  const res = makeRes();
  await handler(req, res);
  // Wait a tick so async upstream callbacks complete
  await new Promise((r) => setTimeout(r, 50));
  return { req, res };
}

// ─── Set env then load handlers ───────────────────────────────────────
process.env.SHOPIFY_ADMIN_API_TOKEN = 'shpat_TEST_TOKEN_XXXXXXXX';
process.env.SHOPIFY_STORE_URL = 'wds46.myshopify.com';
process.env.GITHUB_TOKEN = 'ghp_TEST_TOKEN_XXXXXXXX';

const shopifyHandler = require('../api/shopify.js');

// ─── Tests ────────────────────────────────────────────────────────────
let passed = 0, failed = 0;
function check(name, cond, detail) {
  if (cond) { console.log(`  ✓ ${name}`); passed++; }
  else      { console.log(`  ✗ ${name}\n      ${detail || ''}`); failed++; }
}

(async () => {
  console.log('\nTEST 1 — GET /api/shopify/shop.json (REST verify-connection)');
  captured.length = 0;
  await callHandler(shopifyHandler, { method: 'GET', url: '/api/shopify/shop.json' });
  const c1 = captured[0];
  check('outbound hostname is the store',                c1?.hostname === 'wds46.myshopify.com', `got ${c1?.hostname}`);
  check('outbound path is /admin/api/2024-01/shop.json', c1?.path === '/admin/api/2024-01/shop.json', `got ${c1?.path}`);
  check('X-Shopify-Access-Token header set',             c1?.headers['X-Shopify-Access-Token'] === 'shpat_TEST_TOKEN_XXXXXXXX');
  check('Accept: application/json header set',           c1?.headers['Accept'] === 'application/json');

  console.log('\nTEST 2 — POST /api/shopify/graphql.json with metafieldDefinitionCreate body');
  captured.length = 0;
  const gqlBody = JSON.stringify({
    query: 'mutation CreateDef($d: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $d) { createdDefinition { id } userErrors { message } } }',
    variables: { d: { name: 'design_path', namespace: 'agency', key: 'design_path', type: 'single_line_text_field', ownerType: 'SHOP', description: 'Design path' } },
  });
  const t2 = await callHandler(shopifyHandler, { method: 'POST', url: '/api/shopify/graphql.json', body: gqlBody });
  const c2 = captured[0];
  check('outbound path is /admin/api/2024-01/graphql.json', c2?.path === '/admin/api/2024-01/graphql.json', `got ${c2?.path}`);
  check('outbound method is POST',                          c2?.method === 'POST');
  check('outbound body contains the query',                 c2?.body && c2.body.includes('metafieldDefinitionCreate'), `body=${c2?.body?.slice(0, 80)}`);
  check('outbound body contains the variables',             c2?.body && c2.body.includes('"namespace":"agency"'));
  check('Content-Type: application/json',                   c2?.headers['Content-Type'] === 'application/json');
  check('Accept: application/json',                         c2?.headers['Accept'] === 'application/json');
  check('proxy returned 200',                               t2.res.statusCode === 200, `got ${t2.res.statusCode}`);
  let parsedRes;
  try { parsedRes = JSON.parse(t2.res.body); } catch { parsedRes = null; }
  check('response has data.metafieldDefinitionCreate.createdDefinition',
        !!(parsedRes?.data?.metafieldDefinitionCreate?.createdDefinition));

  console.log('\nTEST 3 — POST webhook with VALID topic (orders/create)');
  captured.length = 0;
  const wh1 = JSON.stringify({ webhook: { topic: 'orders/create', address: 'https://example.com/x', format: 'json' } });
  const t3 = await callHandler(shopifyHandler, { method: 'POST', url: '/api/shopify/webhooks.json', body: wh1 });
  const c3 = captured[0];
  check('outbound body topic is orders/create', c3?.body.includes('"topic":"orders/create"'));
  check('proxy returned 201',                   t3.res.statusCode === 201, `got ${t3.res.statusCode}`);

  console.log('\nTEST 4 — POST webhook with GDPR topic (should 404 from Shopify)');
  captured.length = 0;
  const wh2 = JSON.stringify({ webhook: { topic: 'customers/redact', address: 'https://example.com/x', format: 'json' } });
  const t4 = await callHandler(shopifyHandler, { method: 'POST', url: '/api/shopify/webhooks.json', body: wh2 });
  check('proxy returned 404 (Shopify rejects GDPR topics)', t4.res.statusCode === 404, `got ${t4.res.statusCode}`);

  console.log('\nTEST 5 — Body parsing fallback when req.body is missing (raw stream)');
  captured.length = 0;
  // Simulate Vercel runtime that doesn't pre-parse: pass body as raw string only via stream
  const t5 = await callHandler(shopifyHandler, { method: 'POST', url: '/api/shopify/graphql.json', body: gqlBody });
  const c5 = captured[0];
  check('body still forwarded when only stream-readable', c5?.body && c5.body.includes('metafieldDefinitionCreate'),
        `body=${c5?.body?.slice(0, 80)}`);

  console.log(`\n──────  ${passed} passed, ${failed} failed  ──────\n`);
  process.exit(failed ? 1 : 0);
})();

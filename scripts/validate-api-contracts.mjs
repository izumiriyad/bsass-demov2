import { spawn } from 'node:child_process';

const port = Number(process.env.PORT || 3070);
const base = `http://127.0.0.1:${port}`;
function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function startServer() {
  const child = spawn(process.execPath, ['.next/standalone/server.js'], {
    env: { ...process.env, PORT: String(port), HOSTNAME: '0.0.0.0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (d) => process.stdout.write(`[server] ${d}`));
  child.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  return child;
}
async function getJSON(path) {
  const res = await fetch(`${base}${path}`, { redirect: 'manual' });
  const data = await res.json().catch(() => null);
  return { status: res.status, data, headers: res.headers };
}
async function postJSON(path, body, cookie = '') {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body),
    redirect: 'manual',
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data, headers: res.headers };
}
function cookieFrom(res) {
  const raw = res.headers.get('set-cookie') ?? '';
  const pairs = [];
  for (const name of ['bsl-session', 'bsl-role']) {
    const match = raw.match(new RegExp(`${name}=([^;,]+)`));
    if (match) pairs.push(`${name}=${match[1]}`);
  }
  return pairs.join('; ');
}
function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const server = startServer();
try {
  await wait(3500);
  const failures = [];

  const getChecks = [
    ['/api/health', ['ok']],
    ['/api/readiness', ['status', 'checks']],
    ['/api/version', ['name', 'version']],
    ['/api/feature-flags', ['flags']],
    ['/api/payment-methods', ['methods', 'currency']],
    ['/api/odds', ['events', 'currency']],
    ['/api/exchange/markets', ['markets', 'currency']],
    ['/api/sports/results', ['results']],
    ['/api/risk/self-assessment', ['questions', 'actions']],
    ['/api/site-map', ['navigation']],
    ['/api/search?q=cricket', ['results']],
  ];

  for (const [path, keys] of getChecks) {
    const { status, data } = await getJSON(path);
    const ok = status === 200 && data && keys.every((key) => Object.prototype.hasOwnProperty.call(data, key));
    console.log(`${ok ? '✓' : '✗'} GET ${path} ${status}`);
    assert(ok, `GET ${path} contract failed`, failures);
  }

  const user = `contract_${Date.now()}`;
  const register = await postJSON('/api/auth/register', { username: user, email: `${user}@bslgaming.com.bd`, password: 'secret123' });
  const setCookie = register.headers.get('set-cookie') ?? '';
  assert(register.status === 200 && register.data?.user?.username === user, 'Register contract failed', failures);
  assert(setCookie.includes('HttpOnly'), 'Auth cookie missing HttpOnly', failures);
  assert(setCookie.includes('SameSite=lax') || setCookie.includes('SameSite=Lax'), 'Auth cookie missing SameSite=Lax', failures);
  assert(setCookie.includes('Secure'), 'Production auth cookie missing Secure', failures);

  const cookie = cookieFrom(register);
  const quote = await postJSON('/api/betslip/quote', { stake: 100, odds: [1.5, 2] }, cookie);
  assert(quote.status === 200 && quote.data?.possibleReturn === 300, 'Bet slip quote contract failed', failures);

  const claim = await postJSON('/api/promotions/claim', { promotionId: 'welcome' }, cookie);
  assert(claim.status === 202 && claim.data?.promotionId === 'welcome', 'Promotion claim contract failed', failures);

  const wallet = await postJSON('/api/wallet', { action: 'deposit', amount: 250, method: 'bkash' }, cookie);
  assert(wallet.status === 200, 'Wallet deposit contract failed', failures);

  if (failures.length) {
    console.error('\nAPI contract validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log('\nAPI contract validation passed.');
  }
} finally {
  server.kill('SIGTERM');
}

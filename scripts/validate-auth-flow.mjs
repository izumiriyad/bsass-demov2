import { spawn } from 'node:child_process';

const port = Number(process.env.PORT || 3060);
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
function cookieFrom(res) {
  const raw = res.headers.get('set-cookie') ?? '';
  const pairs = [];
  for (const name of ['bsl-session', 'bsl-role']) {
    const match = raw.match(new RegExp(`${name}=([^;,]+)`));
    if (match) pairs.push(`${name}=${match[1]}`);
  }
  return pairs.join('; ');
}
async function post(path, body, cookie = '') {
  return fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body),
    redirect: 'manual',
  });
}
async function get(path, cookie = '') {
  return fetch(`${base}${path}`, { headers: cookie ? { Cookie: cookie } : {}, redirect: 'manual' });
}

const server = startServer();
try {
  await wait(3500);
  const failures = [];

  const anonymousDashboard = await get('/dashboard');
  if (![307, 308].includes(anonymousDashboard.status) || !(anonymousDashboard.headers.get('location') ?? '').includes('/login')) {
    failures.push(`Anonymous dashboard did not redirect to login: ${anonymousDashboard.status}`);
  }

  const username = `qa_${Date.now()}`;
  const register = await post('/api/auth/register', { username, email: `${username}@bslgaming.com.bd`, password: 'secret123' });
  const userCookie = cookieFrom(register);
  if (register.status !== 200 || !userCookie) failures.push(`Registration failed: ${register.status}`);

  const me = await get('/api/auth/me', userCookie);
  if (me.status !== 200) failures.push(`Authenticated /api/auth/me failed: ${me.status}`);

  const dashboard = await get('/dashboard', userCookie);
  if (dashboard.status !== 200) failures.push(`Authenticated dashboard failed: ${dashboard.status}`);

  const wallet = await post('/api/wallet', { action: 'deposit', amount: 500, method: 'bkash' }, userCookie);
  if (wallet.status !== 200) failures.push(`Wallet deposit failed: ${wallet.status}`);

  const userAdmin = await get('/admin', userCookie);
  if (![307, 308].includes(userAdmin.status) || !(userAdmin.headers.get('location') ?? '').includes('/unauthorized')) {
    failures.push(`Regular user admin access did not redirect to unauthorized: ${userAdmin.status} ${userAdmin.headers.get('location')}`);
  }

  const adminLogin = await post('/api/auth/login', { username: 'admin', password: 'admin123' });
  const adminCookie = cookieFrom(adminLogin);
  if (adminLogin.status !== 200 || !adminCookie) failures.push(`Admin login failed: ${adminLogin.status}`);

  const admin = await get('/admin', adminCookie);
  if (admin.status !== 200) failures.push(`Admin page failed for admin role: ${admin.status}`);

  const adminApi = await get('/api/admin/summary', adminCookie);
  if (adminApi.status !== 200) failures.push(`Admin API failed for admin role: ${adminApi.status}`);

  const logout = await post('/api/auth/logout', {}, userCookie);
  if (logout.status !== 200) failures.push(`Logout failed: ${logout.status}`);

  if (failures.length) {
    console.error('\nAuth flow validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log('\nAuth flow validation passed.');
  }
} finally {
  server.kill('SIGTERM');
}

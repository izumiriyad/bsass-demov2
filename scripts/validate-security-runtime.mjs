import { spawn } from 'node:child_process';

const port = Number(process.env.PORT || 3030);
const base = `http://127.0.0.1:${port}`;
const requiredHeaders = [
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'cross-origin-opener-policy',
  'cross-origin-resource-policy',
  'strict-transport-security',
];

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

const server = startServer();
try {
  await wait(3500);
  const failures = [];

  const home = await fetch(`${base}/`, { redirect: 'manual' });
  for (const header of requiredHeaders) {
    if (!home.headers.get(header)) failures.push(`Missing security header: ${header}`);
  }
  const csp = home.headers.get('content-security-policy') ?? '';
  for (const directive of ['default-src', 'frame-ancestors', 'object-src', 'report-uri']) {
    if (!csp.includes(directive)) failures.push(`CSP missing directive: ${directive}`);
  }

  for (const path of ['/dashboard', '/admin']) {
    const res = await fetch(`${base}${path}`, { redirect: 'manual' });
    const location = res.headers.get('location') ?? '';
    const ok = [301, 302, 303, 307, 308].includes(res.status) && location.includes('/login');
    console.log(`${ok ? '✓' : '✗'} protected redirect ${path} ${res.status} ${location}`);
    if (!ok) failures.push(`Protected route did not redirect to login: ${path} ${res.status} ${location}`);
  }

  const apiAdmin = await fetch(`${base}/api/admin/summary`, { redirect: 'manual' });
  const apiAdminOk = apiAdmin.status === 307 || apiAdmin.status === 308 || apiAdmin.status === 403;
  console.log(`${apiAdminOk ? '✓' : '✗'} protected admin API ${apiAdmin.status}`);
  if (!apiAdminOk) failures.push(`Admin API is not protected: ${apiAdmin.status}`);

  const cspReport = await fetch(`${base}/api/csp-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'csp-report': { 'violated-directive': 'script-src' } }),
  });
  if (cspReport.status !== 202) failures.push(`CSP report endpoint failed: ${cspReport.status}`);

  if (failures.length) {
    console.error('\nSecurity runtime validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log('\nSecurity runtime validation passed.');
  }
} finally {
  server.kill('SIGTERM');
}

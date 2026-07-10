import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';

const port = Number(process.env.PORT || 3020);
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

async function request(path) {
  const res = await fetch(`${base}${path}`, { redirect: 'manual' });
  const body = await res.text();
  return { status: res.status, body };
}

const inventory = readFileSync('docs/ROUTE_INVENTORY.md', 'utf8');
const allRoutes = [...inventory.matchAll(/- `([^`]+)`/g)].map((m) => m[1]);
const pages = allRoutes.filter((route) => !route.startsWith('/api') && !route.includes(':'));
const publicPages = pages.filter((route) => !route.startsWith('/dashboard') && !route.startsWith('/admin'));
const apiRoutes = ['/api/health', '/api/readiness', '/api/version', '/api/feature-flags', '/api/payment-methods'];
const staticRoutes = ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/icon.svg'];
const checks = [...publicPages, ...apiRoutes, ...staticRoutes];

const server = startServer();
try {
  await wait(3500);
  const failures = [];
  for (const route of checks) {
    try {
      const { status, body } = await request(route);
      const ok = status >= 200 && status < 400 && !body.includes('id="__next_error__"') && !body.includes('This page couldn');
      console.log(`${ok ? '✓' : '✗'} ${route} ${status}`);
      if (!ok) failures.push({ route, status, body: body.slice(0, 160).replace(/\s+/g, ' ') });
    } catch (error) {
      failures.push({ route, status: 0, body: error instanceof Error ? error.message : String(error) });
      console.log(`✗ ${route} 0`);
    }
  }

  if (failures.length) {
    console.error('\nProduction validation failed:');
    for (const failure of failures) console.error(`${failure.route} ${failure.status} ${failure.body}`);
    process.exitCode = 1;
  } else {
    console.log(`\nProduction validation passed for ${checks.length} routes.`);
  }
} finally {
  server.kill('SIGTERM');
}

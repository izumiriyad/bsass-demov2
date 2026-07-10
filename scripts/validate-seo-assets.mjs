import { spawn } from 'node:child_process';

const port = Number(process.env.PORT || 3050);
const base = `http://127.0.0.1:${port}`;
const requiredSitemapRoutes = ['/', '/games', '/sports', '/sports/live', '/casino', '/promotions', '/responsible-gaming', '/bd/bn'];
const staticAssets = ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/icon.svg', '/og.svg', '/humans.txt', '/llms.txt', '/.well-known/security.txt'];

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
async function text(path) {
  const res = await fetch(`${base}${path}`);
  return { status: res.status, body: await res.text(), contentType: res.headers.get('content-type') ?? '' };
}

const server = startServer();
try {
  await wait(3500);
  const failures = [];

  for (const asset of staticAssets) {
    const res = await text(asset);
    const ok = res.status === 200;
    console.log(`${ok ? '✓' : '✗'} ${asset} ${res.status}`);
    if (!ok) failures.push(`${asset} returned ${res.status}`);
  }

  const sitemap = await text('/sitemap.xml');
  for (const route of requiredSitemapRoutes) {
    if (!sitemap.body.includes(route === '/' ? 'https://bslgaming.com.bd/' : `https://bslgaming.com.bd${route}`)) {
      failures.push(`Sitemap missing route: ${route}`);
    }
  }

  const robots = await text('/robots.txt');
  for (const disallow of ['Disallow: /admin', 'Disallow: /dashboard', 'Disallow: /api']) {
    if (!robots.body.includes(disallow)) failures.push(`robots.txt missing ${disallow}`);
  }

  const manifest = JSON.parse((await text('/manifest.webmanifest')).body);
  for (const key of ['name', 'short_name', 'start_url', 'display', 'icons']) {
    if (!manifest[key]) failures.push(`manifest missing ${key}`);
  }

  const home = await text('/');
  for (const marker of ['application/ld+json', 'og:image', 'twitter:card', 'BSL Gaming Bangladesh']) {
    if (!home.body.includes(marker)) failures.push(`Home metadata missing ${marker}`);
  }

  if (failures.length) {
    console.error('\nSEO/static validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log('\nSEO/static validation passed.');
  }
} finally {
  server.kill('SIGTERM');
}

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';

const port = Number(process.env.PORT || 3040);
const base = `http://127.0.0.1:${port}`;
const ignoredSchemes = ['mailto:', 'tel:', 'sms:', 'whatsapp:', 'javascript:'];
const allowedExternalHosts = ['bslgaming.com.bd'];

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

function getPublicPages() {
  const inventory = readFileSync('docs/ROUTE_INVENTORY.md', 'utf8');
  const routes = [...inventory.matchAll(/- `([^`]+)`/g)].map((m) => m[1]);
  return routes.filter((route) =>
    !route.startsWith('/api') &&
    !route.includes(':') &&
    !route.startsWith('/dashboard') &&
    !route.startsWith('/admin')
  );
}

function normalizeHref(href) {
  if (!href || href.startsWith('#')) return null;
  if (ignoredSchemes.some((scheme) => href.startsWith(scheme))) return null;
  try {
    const url = new URL(href, base);
    if (url.origin !== base) {
      if (allowedExternalHosts.includes(url.hostname)) return url.pathname + url.search;
      return null;
    }
    return url.pathname + url.search;
  } catch {
    return null;
  }
}

async function fetchText(path) {
  const res = await fetch(`${base}${path}`, { redirect: 'manual' });
  const text = await res.text();
  return { status: res.status, text };
}

const server = startServer();
try {
  await wait(3500);
  const pages = getPublicPages();
  const links = new Map();
  const failures = [];

  for (const page of pages) {
    const { status, text } = await fetchText(page);
    if (!(status >= 200 && status < 400)) {
      failures.push(`Page failed while crawling: ${page} ${status}`);
      continue;
    }
    const hrefs = [...text.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      const normalized = normalizeHref(href);
      if (!normalized) continue;
      if (normalized.startsWith('/_next')) continue;
      if (!links.has(normalized)) links.set(normalized, new Set());
      links.get(normalized).add(page);
    }
  }

  for (const [link, sources] of links.entries()) {
    const res = await fetch(`${base}${link}`, { redirect: 'manual' }).catch(() => ({ status: 0 }));
    const ok = res.status >= 200 && res.status < 400;
    if (!ok) failures.push(`Broken internal link: ${link} status=${res.status} sources=${[...sources].slice(0, 5).join(', ')}`);
  }

  if (failures.length) {
    console.error('\nInternal link validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`\nInternal link validation passed. Crawled ${pages.length} pages and checked ${links.size} unique internal links.`);
  }
} finally {
  server.kill('SIGTERM');
}

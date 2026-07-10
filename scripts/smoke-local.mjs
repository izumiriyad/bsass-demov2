const base = process.env.BASE_URL || 'http://localhost:3000';
const routes = ['/', '/bd/en', '/bd/bn', '/games', '/sports/live', '/casino', '/promotions', '/help', '/status', '/api/health', '/api/readiness', '/manifest.webmanifest', '/robots.txt', '/sitemap.xml'];
let failed = 0;
for (const route of routes) {
  const url = `${base}${route}`;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`${ok ? '✓' : '✗'} ${route} ${res.status}`);
    if (!ok) failed += 1;
  } catch (err) {
    failed += 1;
    console.log(`✗ ${route} ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);

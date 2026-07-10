import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src', 'app');
const pages = [];
const apis = [];

function toRoute(rel, kind) {
  if (kind === 'page' && rel === 'page.tsx') return '/';
  if (kind === 'route' && rel === 'route.ts') return '/api-root';
  return '/' + rel
    .replace(/\/page\.tsx$/, '')
    .replace(/\/route\.ts$/, '')
    .replace(/\(.*?\)\//g, '')
    .replace(/\/index$/, '')
    .replace(/\[([^\]]+)\]/g, ':$1');
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    if (stat.isFile() && (name === 'page.tsx' || name === 'route.ts')) {
      const rel = relative(root, full).replaceAll('\\', '/');
      const route = toRoute(rel, name === 'page.tsx' ? 'page' : 'route');
      if (name === 'route.ts') apis.push(route); else pages.push(route);
    }
  }
}

walk(root);
pages.sort(); apis.sort();
const md = `# BSL Gaming Route Inventory\n\nGenerated: ${new Date().toISOString()}\n\n## Pages (${pages.length})\n\n${pages.map((r) => `- \`${r}\``).join('\n')}\n\n## API Routes (${apis.length})\n\n${apis.map((r) => `- \`${r}\``).join('\n')}\n`;
writeFileSync(join(process.cwd(), 'docs', 'ROUTE_INVENTORY.md'), md);
console.log(`Route inventory written: ${pages.length} pages, ${apis.length} API routes`);

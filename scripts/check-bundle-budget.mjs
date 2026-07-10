import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const staticDir = join(process.cwd(), '.next', 'static');
const maxChunkBytes = Number(process.env.MAX_CHUNK_BYTES || 1_500_000);
const maxTotalBytes = Number(process.env.MAX_TOTAL_BYTES || 12_000_000);
const extensions = new Set(['.js', '.css']);
const files = [];

function ext(name) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i) : '';
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (extensions.has(ext(name))) files.push({ path: full, size: stat.size });
  }
}

walk(staticDir);
const total = files.reduce((sum, file) => sum + file.size, 0);
const oversized = files.filter((file) => file.size > maxChunkBytes).sort((a, b) => b.size - a.size);

console.log(`Static JS/CSS assets: ${files.length}`);
console.log(`Total JS/CSS size: ${(total / 1024 / 1024).toFixed(2)} MB`);
console.log(`Largest assets:`);
for (const file of [...files].sort((a, b) => b.size - a.size).slice(0, 10)) {
  console.log(`- ${(file.size / 1024).toFixed(1)} KB ${file.path.replace(process.cwd() + '/', '')}`);
}

if (oversized.length) {
  console.error(`\nBundle budget failed: ${oversized.length} assets exceed ${(maxChunkBytes / 1024).toFixed(0)} KB.`);
  process.exit(1);
}
if (total > maxTotalBytes) {
  console.error(`\nBundle budget failed: total exceeds ${(maxTotalBytes / 1024 / 1024).toFixed(1)} MB.`);
  process.exit(1);
}
console.log('\nBundle budget passed.');

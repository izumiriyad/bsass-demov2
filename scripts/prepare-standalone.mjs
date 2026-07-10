import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const standalone = join(root, '.next', 'standalone');
if (!existsSync(standalone)) {
  console.log('Standalone output not found; skipping standalone asset preparation.');
  process.exit(0);
}

const publicSrc = join(root, 'public');
const publicDest = join(standalone, 'public');
if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log('Copied public assets to .next/standalone/public');
}

const staticSrc = join(root, '.next', 'static');
const staticDest = join(standalone, '.next', 'static');
if (existsSync(staticSrc)) {
  mkdirSync(join(standalone, '.next'), { recursive: true });
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log('Copied .next/static to .next/standalone/.next/static');
}

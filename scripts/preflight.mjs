import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const required = [
  'Dockerfile', 'docker-compose.yml', 'k8s/bsl-gaming.yaml', 'ops/nginx.conf',
  'openapi.yaml', '.env.example', 'SECURITY.md', 'ARCHITECTURE.md', 'RUNBOOK.md',
  'INCIDENT_RESPONSE.md', 'DEPLOYMENT_CHECKLIST.md', 'docs/OBSERVABILITY.md',
  'docs/deploy/PLATFORM_DEPLOYMENT.md', 'public/sw.js', 'public/og.svg',
  'public/.well-known/security.txt', 'src/app/global-error.tsx'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing required production files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const grep = execFileSync('bash', ['-lc', "grep -R \"BJ88\\|bj88\\|Bournemouth\\|PHP\\|Philippines\" -n src README.md docs *.md package.json 2>/dev/null || true"], { encoding: 'utf8' }).trim();
if (grep) {
  console.error('Forbidden/reference branding detected:');
  console.error(grep);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
for (const script of ['build', 'start', 'lint', 'typecheck', 'validate:production']) {
  if (!pkg.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

console.log('Production preflight passed.');

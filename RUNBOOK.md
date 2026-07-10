# BSL Gaming Production Runbook

## Deploy

1. Set environment variables from `.env.example`.
2. Build container: `docker build -t bsl-gaming:latest .`.
3. Run smoke checks after deploy: `BASE_URL=https://your-domain npm run smoke:local`.
4. Confirm `/api/readiness`, `/api/health`, `/sitemap.xml`, `/manifest.webmanifest`.

## Rollback

1. Revert to previous container image tag.
2. Re-run smoke checks.
3. Monitor client events and web vitals endpoints.

## Incident checks

- Website reachable
- API readiness OK
- Wallet/payment API reachable
- Provider status OK
- Error rate and web vitals within SLO

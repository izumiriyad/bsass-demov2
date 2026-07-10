# BSL Gaming Go-Live Checklist

## Frontend release gate

- [ ] `npm ci`
- [ ] `npm run validate:all`
- [ ] `npm run validate:security`
- [ ] Smoke test production URL with `BASE_URL=https://domain npm run smoke:local`
- [ ] Verify `/api/readiness`, `/api/health`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- [ ] Verify protected dashboard/admin redirects
- [ ] Verify mobile bottom navigation
- [ ] Verify PWA install prompt on supported browsers
- [ ] Verify service worker offline fallback
- [ ] Verify support, complaint and responsible-gaming routes

## Production integrations required

- [ ] Licensed sportsbook/casino providers
- [ ] Production authentication and role management
- [ ] Bangladesh mobile OTP provider
- [ ] KYC/NID provider
- [ ] bKash/Nagad/Rocket/Upay gateway contracts
- [ ] Wallet ledger with idempotency and reconciliation
- [ ] Bet placement/settlement engine
- [ ] Risk/fraud/AML rules engine
- [ ] Audit log storage
- [ ] Customer support tooling
- [ ] Observability and incident response rota

## Final sign-off

- [ ] Product owner
- [ ] Frontend lead
- [ ] Backend lead
- [ ] Security/compliance
- [ ] Legal/licensing
- [ ] Operations/support

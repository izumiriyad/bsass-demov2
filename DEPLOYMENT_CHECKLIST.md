# BSL Gaming Deployment Checklist

## Frontend checks

- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] App metadata configured
- [x] PWA manifest configured
- [x] Robots and sitemap configured
- [x] Security headers configured
- [x] 18+ age gate UI configured
- [x] Cookie/local-storage consent UI configured
- [x] Responsive desktop/tablet/mobile navigation
- [x] Loading and error states
- [x] Bangladesh-local payment UI
- [x] KYC verification UI
- [x] Responsible gaming limits UI

## Backend required before real-money launch

- [ ] Licensed sportsbook/casino provider integration
- [ ] Production authentication and session storage
- [ ] Password hashing and account recovery
- [ ] Mobile OTP provider integration
- [ ] KYC provider integration for Bangladesh users
- [ ] AML/sanctions/duplicate account checks
- [ ] bKash/Nagad/Rocket/Upay payment gateway contracts
- [ ] Ledger-grade wallet service with idempotency
- [ ] Bet placement and settlement engine
- [ ] Real-time balance and notification service
- [ ] Audit logs and admin monitoring
- [ ] Fraud/risk engine
- [ ] Responsible gaming enforcement backend
- [ ] Terms/legal/licensing review
- [ ] Observability: error tracking, logs, uptime, analytics

## Recommended production environment

- Node.js 22+
- HTTPS-only deployment
- CDN/WAF in front of app
- Secure cookies and rate-limiting at edge/backend
- Separate staging and production environments

# API Contract QA

Run:

```bash
npm run validate:api
```

This starts the standalone production server and verifies key API contracts:

- health/readiness/version
- feature flags
- payment methods
- odds/exchange/results
- risk self-assessment
- search/site map
- auth register cookies
- bet slip quote
- promotion claim
- wallet deposit

It also verifies production auth cookies include:

- HttpOnly
- SameSite=Lax
- Secure

Production backend replacement should keep these response shapes stable or version them.

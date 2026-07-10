# Environment Configuration

## Validate environment

```bash
NODE_ENV=production NEXT_PUBLIC_SITE_URL=https://bslgaming.com.bd npm run validate:env
```

## Required frontend variables

- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://bslgaming.com.bd`

## Required before real-money launch

- `AUTH_API_URL`
- `WALLET_API_URL`
- payment gateway URLs for bKash, Nagad, Rocket, Upay
- KYC provider API
- realtime provider keys
- error monitoring DSN

Use `.env.production.example` as the production template.

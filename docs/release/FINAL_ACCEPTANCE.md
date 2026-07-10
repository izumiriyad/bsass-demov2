# Final Acceptance Criteria

The frontend release is accepted only when all checks pass:

```bash
npm run validate:env
npm run preflight
npm run validate:production
npm run validate:security
npm run validate:links
npm run validate:seo
npm run validate:budget
npm run validate:auth
npm run validate:api
```

## Runtime endpoints

- `/healthz`
- `/readyz`
- `/api/health`
- `/api/readiness`
- `/api/livez`
- `/api/version`

## Manual go/no-go checks

- homepage loads in live preview
- Bengali route loads
- sports live board works
- bet slip opens and validates
- deposit/withdraw modals open
- dashboard redirects anonymously
- admin rejects non-admin users
- PWA manifest and offline page work
- footer legal/support links work

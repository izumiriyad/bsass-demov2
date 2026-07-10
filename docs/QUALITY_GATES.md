# BSL Gaming Quality Gates

Every release should pass these gates before deployment.

## Mandatory checks

```bash
npm run preflight
npm run typecheck
npm run lint
npm run build
npm run validate:production
npm run validate:security
npm run validate:links
npm run validate:seo
npm run validate:budget
```

Or run all gates:

```bash
npm run validate:all
```

## What the gates cover

- TypeScript correctness
- ESLint rules
- Production build
- Standalone runtime route checks
- Security headers and protected routes
- Internal link integrity
- SEO/static asset validation
- Bundle-size budget
- Required production files
- Reference-branding guard

## Manual QA smoke list

- Desktop sidebar collapse/expand
- Mobile drawer and bottom nav
- Login/register modals
- Deposit/withdraw modals
- Bet slip add/remove/submit flow
- Games search/filter/list/grid
- Sports live and cricket boards
- Bengali route `/bd/bn`
- PWA install prompt
- Offline fallback
- Global error fallback

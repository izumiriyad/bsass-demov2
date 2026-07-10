# BSL Gaming Frontend Architecture

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Server components for pages and client components for app interactions

## Main layers

- `src/app` — routes, pages, API contracts, SEO files
- `src/components/bsl` — reusable BSL Gaming product/UI components
- `src/components/layout` — app shell, header, sidebar, footer, mobile nav
- `src/components/providers` — auth, modal, theme, bet slip, telemetry, PWA, session guards
- `src/lib` — catalog, auth/session helpers, utilities

## Production boundaries

The frontend contains API contract stubs for future backend replacement. Real production launch should connect these to licensed provider APIs, wallet ledger, auth, KYC, AML, payment gateways, risk engine and observability platform.

# BSL Gaming Bangladesh Frontend

Production-grade Next.js frontend for **BSL Gaming**, a Bangladesh-focused betting and gaming platform UI.

## Highlights

- Bangladesh-first brand/content: BDT, Bangla labels, cricket/football context.
- Responsive app shell with collapsible desktop sidebar and mobile bottom navigation.
- Game lobby: Popular, Sports, Cockfighting, Slots, Casino, Table, Fishing, Lottery, Arcade, Crash.
- Category search, provider filters, sorting and empty states.
- Authentication UI, mobile OTP registration UI, wallet modals, dashboard and account pages.
- Bangladesh payment methods: bKash, Nagad, Rocket, Upay and BD bank transfer.
- Dashboard: overview, wallet, bet history, transactions, favorites, notifications, profile, security, KYC verification and responsible gaming limits.
- Production UX: loading skeletons, error boundary, toast notifications, age gate, cookie consent, floating support, theme switch.
- SEO/PWA: manifest, icon, sitemap, robots, OpenGraph/Twitter metadata.
- Security headers configured in `next.config.ts`.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Deploy

The app uses Next.js App Router and `output: "standalone"`. It can be deployed to platforms supporting Next.js server output such as Netlify, Vercel, Docker or a Node server.

## Compliance note

This repository completes the **frontend**. Public real-money operation requires production backend services, licensing/legal review, KYC/AML, fraud monitoring, payment gateway contracts, audit logging, responsible-gaming enforcement and operational security controls.

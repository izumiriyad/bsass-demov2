# Live Preview Fix Report

## Problem

After deployment/live preview, pages displayed the generic error:

> This page couldn’t load

## Root cause found

The runtime error was caused by provider nesting order:

- `BetSlipProvider` rendered `BetSlipDrawer`.
- `BetSlipDrawer` called `useModal()`.
- But `ModalProvider` was nested *inside* the children passed to `BetSlipProvider`, so `useModal()` executed outside its required provider.

Runtime error:

```txt
Error: useModal must be used within ModalProvider
```

This caused public pages such as `/`, `/games`, `/casino`, `/promotions`, `/sports/live`, etc. to return HTTP 500 in live preview.

## Fix applied

### Provider tree corrected

Changed provider order to:

```tsx
ThemeProvider
  AuthProvider
    ModalProvider
      BetSlipProvider
        AppShell / pages
      Global providers
```

So all components that call `useModal()` now execute inside `ModalProvider`.

### Removed duplicate ModalProvider wrapper

`ModalProvider` was removed from `src/app/layout.tsx` and moved into `src/components/providers/index.tsx` where it wraps all modal-dependent providers/components.

### Start script fixed for standalone output

Because `next.config.ts` uses:

```ts
output: "standalone"
```

`npm start` was changed from:

```bash
next start
```

to:

```bash
node .next/standalone/server.js
```

A fallback script remains:

```bash
npm run start:next
```

## Validation performed

Commands passed:

```bash
npm run routes:inventory
npm run typecheck
npm run lint
npm run build
```

Standalone runtime smoke test passed using:

```bash
PORT=3006 npm run start
```

Verified routes returned HTTP 200:

- `/`
- `/games`
- `/sports/live`
- `/casino`
- `/promotions`
- `/bd/bn`
- `/api/health`
- `/api/readiness`

## Current status

The live preview loading issue is fixed. The app now builds and runs correctly in standalone production mode.

# Step 08 — Internationalization

This lesson uses the Next.js 16 App Router and demonstrates OnekiJS internationalization alongside form authentication, notifications, error handling, cart APIs, and statically generated product pages.

## Routes

- `/` redirects to the configured default locale, `/en`.
- `app/[locale]` is the locale segment. Its `generateStaticParams` enumerates `en` and `fr`.
- Product routes use `app/[locale]/products/[productId]` and statically generate every product for each locale.
- App Router route handlers under `app/api` provide login, logout, user information, and cart endpoints.

The navigation bar uses `next/link` for locale-prefixed links. Its language controls retain OnekiJS `useI18nService().changeLocale()` behavior to switch the current route between `/en` and `/fr`.

## Run locally

From this directory, run `npm run dev`, then open http://localhost:3000. Use `npm run build` to create a production build and `npm start` to serve it.

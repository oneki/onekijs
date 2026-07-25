# React 19 migration

This workspace now targets Node.js 22.22+, React 19, React Router 8, and Next.js 16.

## Install and validate

Use the root lockfile for deterministic installs:

```text
npm ci
npm run typecheck
npm run build
```

The root build produces JavaScript bundles and TypeScript declarations for every published `onekijs*` package. Active Vite examples can be verified individually with their workspace build scripts.

## React 19

React 19 uses module-scoped JSX types. Application code should use `React.JSX.Element` (or `import('react').JSX.Element`) instead of the global `JSX.Element` namespace. A `useRef` call must always receive an initial value; use `useRef<T | undefined>(undefined)` for an initially empty ref.

`styled-components` is version 6. Applications using Oneki themes must include a `styled-components` `DefaultTheme` module augmentation when defining their own styled components:

```ts
import type { Theme } from 'onekijs-ui';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

## React Router 8

Router imports now come from the `react-router` package. Migrate application imports away from `react-router-dom` and avoid legacy global `JSX` types. Existing Oneki route wrappers remain supported during the transition; new routes should favor route objects and data-router APIs.

### Data routers with `<App>`

Keep `<App>` as the Oneki application provider and render `DataRouterProvider` as its direct child. It renders React Router's `RouterProvider`, synchronizes `useRouter()` with every data-router location change, and preserves Oneki `push`, `replace`, `back`, and `forward` navigation.

```tsx
import { App, createBrowserRouter, DataRouterProvider, type RouteObject } from 'onekijs';

const routes: RouteObject[] = [{ path: '/', element: <HomePage /> }];
const router = createBrowserRouter(routes);

export function Root() {
  return (
    <App>
      <DataRouterProvider router={router} />
    </App>
  );
}
```

`createHashRouter`, `createMemoryRouter`, `RouterProvider`, `DataRouter`, and loader/action types are also exported from `onekijs`. Do not render JSX `<Routes>` alongside `DataRouterProvider`; continue using the existing `<App><Routes>…</Routes></App>` setup for legacy JSX routing.

## Next.js 16

`onekijs-next` supports the App Router only. Mount the provider inside a client component in the `app` directory; do not use `_app`, `next/router`, `passHref`, or Pages Router shallow routing APIs.

```tsx
'use client';

import { App } from 'onekijs-next';

export function OnekiProvider({ children }: { children: React.ReactNode }) {
  return <App>{children}</App>;
}
```

## UI positioning

Dropdowns, tooltips, and context menus now use Floating UI. The old `react-popper` integration is no longer part of the published UI package.

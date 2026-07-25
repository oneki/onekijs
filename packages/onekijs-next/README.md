# OnekiJS Next

`onekijs-next` targets React 19 and the Next.js App Router.

Create a client provider and render it from the root layout:

```tsx
// app/providers.tsx
'use client';

import { NextApp } from 'onekijs-next';

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextApp settings={{}}>{children}</NextApp>;
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
```

The Pages Router `_app` API, `withNotFound`, `next/router`, `shallow` navigation, and Pages Router locales are not supported in v1.

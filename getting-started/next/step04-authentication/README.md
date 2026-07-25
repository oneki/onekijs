This lesson is a [Next.js](https://nextjs.org/) 16 App Router authentication example.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Oneki provider and form-auth settings are mounted in `src/app/providers.tsx`. Login, logout, cart, and product routes use App Router pages; form authentication endpoints are implemented as route handlers in `src/app/api`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js App Router documentation](https://nextjs.org/docs/app) - learn about client components and route handlers.
- [Oneki migration guide](../../../MIGRATION.md) - React 19 and Next.js 16 compatibility notes.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

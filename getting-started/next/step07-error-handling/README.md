This lesson is a [Next.js](https://nextjs.org/) 16 App Router error-handling example.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The App Router pages preserve the form authentication flow, server-backed cart, notifications, and the lesson's custom Oneki error boundary. The invalid product intentionally throws during client rendering so the boundary can show its error UI. Product detail routes remain statically generated, while authentication and cart APIs are implemented as route handlers in `src/app/api`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js App Router documentation](https://nextjs.org/docs/app) - learn about route handlers and dynamic routes.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Oneki migration guide](../../../MIGRATION.md) - React 19 and Next.js 16 compatibility notes.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deployment

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for deployment options.

This is a Next 16 App Router form guide with locale-prefixed `/en` and `/fr` routes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The App Router source is under `src/app`. Login and signup use OnekiJS `Form`, `useFormController`, `useValue`, `useValidation`, and `useSubmit`; signup validates `/api/users/[username]` asynchronously before posting to `/api/auth/signup`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deployment

This server-capable application uses App Router handlers under `src/app/api` and does not support static export.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

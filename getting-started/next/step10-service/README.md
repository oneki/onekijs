This is a Next 16 App Router service guide with locale-prefixed `/en` and `/fr` routes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) with your browser to see the result.

The App Router source is under `src/app`. Login, signup, cart, user, and product-availability endpoints are route handlers under `src/app/api`. Signup uses OnekiJS `Form`, `useFormController`, `useValue`, `useValidation`, and `useSubmit` for client-side validation.

Product details retain the OnekiJS `AvailabilityService` decorator and `useLocalService` pattern in a client component. The availability handler is `src/app/api/products/[productId]/availability/route.ts`; it keeps the delayed response, unavailable product, and simulated server-error behavior from the original guide.

## Deployment

This server-capable application uses App Router route handlers and does not support static export.

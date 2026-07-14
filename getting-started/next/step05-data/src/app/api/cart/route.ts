import { cookies } from 'next/headers';
import { cart } from './store';

async function authenticated() {
  return Boolean((await cookies()).get('username')?.value);
}

export async function GET() {
  if (!(await authenticated())) {
    return new Response(null, { status: 401 });
  }

  return Response.json(cart);
}

export async function DELETE() {
  if (!(await authenticated())) {
    return new Response(null, { status: 401 });
  }

  cart.products = [];
  return new Response(null, { status: 200 });
}

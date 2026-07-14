import { cookies } from 'next/headers';
import { cart } from './store';

async function authenticated() {
  return Boolean((await cookies()).get('username')?.value);
}

export async function GET() {
  return (await authenticated()) ? Response.json(cart) : new Response(null, { status: 401 });
}

export async function DELETE() {
  if (!(await authenticated())) return new Response(null, { status: 401 });
  cart.products = [];
  return new Response(null, { status: 200 });
}

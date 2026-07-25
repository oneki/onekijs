import { cookies } from 'next/headers';
import { ProductType } from '../../../../../data/products';
import { cart } from '../store';

export async function POST(request: Request) {
  if (!(await cookies()).get('username')?.value) return new Response(null, { status: 401 });
  const product = (await request.json()) as ProductType;
  cart.products.push(product);
  return Response.json(cart);
}

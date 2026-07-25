import { ProductType } from '../../../../../data/products';

export async function POST(request: Request) {
  const product = (await request.json()) as ProductType;

  return Response.json(
    { message: `The product ${product.name} is not available at this moment` },
    { status: 400 },
  );
}

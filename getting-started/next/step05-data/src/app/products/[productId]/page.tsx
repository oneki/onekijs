import { products } from '../../../../data/products';
import ProductDetailsClient from './ProductDetailsClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((_, productId) => ({ productId: String(productId) }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products[Number(productId)];

  if (!product) {
    return null;
  }

  return <ProductDetailsClient product={product} />;
}

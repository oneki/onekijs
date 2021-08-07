import { Link, useGet, useParams, usePost } from 'onekijs';
import React from 'react';
import { URL_ADD_PRODUCT, URL_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { ProductType } from '../../../__server__/api/dto/product';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [product] = useGet<ProductType>(`${URL_PRODUCT}/${productId}`, {
    pollingMs: 2000,
  });
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      window.alert('Product added succesfully to the cart!');
    },
    onError: (error) => {
      window.alert(`An error occured while adding the product to the cart: ${error.message}`);
    },
  });

  // const product = products[+productId];
  if (!product) return null;
  return (
    <div>
      <Link href="/products/1">Product 1</Link>
      <ProductDetails product={product} onBuy={() => submit(product)} />
    </div>
  );
};

// const products: ProductType[] = [
//   {
//     name: 'Phone XL',
//     price: 799,
//     description: 'A large phone with one of the best screens',
//   },
//   {
//     name: 'Phone Mini',
//     price: 699,
//     description: 'A great phone with one of the best cameras',
//   },
//   {
//     name: 'Phone Standard',
//     price: 299,
//   },
// ];

export default ProductDetailsPage;

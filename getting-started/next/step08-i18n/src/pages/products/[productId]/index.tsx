import { GetServerSideProps } from 'next';
import { Link, useNotificationService, usePost, useTranslation, useParams } from 'onekijs-next';
import React, { FC } from 'react';
import { URL_ADD_PRODUCT } from '../../../modules/core/libs/constants';
import ProductDetails from '../../../modules/products/components/ProductDetails';
import { products } from '../../../modules/products/data/products';
import { ProductType } from '../../../__server__/api/dto/product';

type ProductDetailsParams = {
  productId: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params;
  return {
    props: {
      product: products[+productId],
    },
  };
};

type ProductParams = {
  productId: string;
};
const ProductDetailsPage: FC = () => {
  const { productId } = useParams<ProductParams>();
  const notificationService = useNotificationService();
  const [, t] = useTranslation();
  const [submit] = usePost<ProductType>(URL_ADD_PRODUCT, {
    onSuccess: () => {
      notificationService.send({
        topic: 'success',
        payload: {
          message: t('Product added succesfully to the cart!'),
        },
      });
    },
    onError: (error) => {
      notificationService.send({
        topic: 'error',
        payload: {
          message: error.message,
        },
      });
    },
  });

  let product = products[+productId];
  if (product.name === 'Phone Invalid') {
    // to simulate an error, we pickup a non entry in the array
    product = products[9999];
  }
  return (
    <>
      <div>
        <ProductDetails product={product} onBuy={() => submit(product)} />
      </div>
      <Link href="/products/0">Product 0</Link>
      <Link href="/products/1">Product 1</Link>
    </>
  );
};

export default ProductDetailsPage;

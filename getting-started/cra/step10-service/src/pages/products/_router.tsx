import React from 'react';
import { Routes, Route } from 'onekijs';
import ProductDetailsPage from './[productId]/details';
import ProductsPage from '.';

const ProductsRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path=":productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default ProductsRouter;

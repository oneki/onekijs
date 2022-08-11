import { Route, Routes } from 'onekijs';
import ProductsPage from '.';
import ProductDetailsPage from './[productId]';

const ProductsRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path=":productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default ProductsRouter;

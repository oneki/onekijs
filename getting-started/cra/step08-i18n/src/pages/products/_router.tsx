import { Route, Routes } from 'onekijs';
import ProductsPage from '.';
import ProductDetailsPage from './[productId]/details';

const ProductsRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path=":productId" element={<ProductDetailsPage />} />
      <Route index element={<ProductsPage />} />
    </Routes>
  );
};

export default ProductsRouter;

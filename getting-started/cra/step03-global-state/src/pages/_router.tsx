import { Navigate, Route, Routes } from 'onekijs';
import AppLayout from '../modules/core/layouts/AppLayout';
import CartPage from './cart';
import ProductsRouter from './products/_router';

const RootRouter = (): JSX.Element => {
  return (
    <AppLayout>
      {/* AppLayout is a layout common to all pages */}
      <Routes>
        <Route path="/products/*" element={<ProductsRouter />} />
        <Route path="/cart" element={<CartPage />} />
        <Route index element={<Navigate to="/products" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default RootRouter;

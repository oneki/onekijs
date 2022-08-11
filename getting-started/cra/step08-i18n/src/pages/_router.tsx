import { Navigate, Route, Routes } from 'onekijs';
import AppLayout from '../modules/core/layouts/AppLayout';
import CartPage from './cart';
import ProductsRouter from './products/_router';
import LoginPage from './login';
import LogoutPage from './logout';

const RootRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route element={<AppLayout />}>
        <Route path="/products/*" element={<ProductsRouter />} />
        <Route path="/cart" element={<CartPage />} />
        <Route index element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

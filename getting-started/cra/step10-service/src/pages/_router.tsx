import { Navigate, Route, Routes } from 'onekijs';
import AppLayout from '../modules/core/layouts/AppLayout';
import CartPage from './cart';
import LoginPage from './login';
import LogoutPage from './logout';
import ProductsRouter from './products/_router';
import SignupPage from './signup';

const RootRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="logout" element={<LogoutPage />} />
      <Route element={<AppLayout />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="products/*" element={<ProductsRouter />} />
        <Route path="cart" element={<CartPage />} />
        <Route index element={<Navigate to="products" />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

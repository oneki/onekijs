import { Route, Routes } from 'onekijs';
import IndexPage from './IndexPage';
import SecurePage from './SecurePage';
import LoginRouter from './login/router';
import UltraSecurePage from './UltraSecurePage';
import LogoutRouter from './logout/router';

const AuthRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="login/*" element={<LoginRouter />} />
      <Route path="logout/*" element={<LogoutRouter />} />       
      <Route path="secure" element={<SecurePage />} />
      <Route path="ultra-secure" element={<UltraSecurePage />} />
      <Route index element={<IndexPage />} />
    </Routes>
  );
};

export default AuthRouter;

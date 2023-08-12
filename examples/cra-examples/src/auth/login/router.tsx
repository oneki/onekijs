import { Route, Routes } from 'onekijs';
import FormLoginPage from './FormLoginPage';
import LoginCallbackPage from './google/LoginCallbackPage';
import GoogleLoginPage from './GoogleLoginPage';
import GoogleRouter from './google/router';


const LoginRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="form" element={<FormLoginPage />} />
      <Route path="google/*" element={<GoogleRouter />} />
      <Route path="google" element={<GoogleLoginPage />} />
    </Routes>
  );
};

export default LoginRouter;

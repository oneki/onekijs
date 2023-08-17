import { Route, Routes } from 'onekijs';
import GoogleRouter from './google/router';
import ExternalLoginRouter from './external-login/router';
import FormLoginRouter from './form/router';
import LoginPage from './IndexPage';


const LoginRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="external-login/*" element={<ExternalLoginRouter />} />
      <Route path="form/*" element={<FormLoginRouter />} />
      <Route path="google/*" element={<GoogleRouter />} />
      <Route index element={<LoginPage />} />
    </Routes>
  );
};

export default LoginRouter;

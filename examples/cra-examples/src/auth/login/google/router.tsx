import { Route, Routes } from 'onekijs';
import LoginCallbackPage from './LoginCallbackPage';
import GoogleLoginPage from './IndexPage';


const GoogleRouter = (): import('react').JSX.Element => {
  return (
    <Routes>
      <Route path="callback" element={<LoginCallbackPage />} />
      <Route index element={<GoogleLoginPage />} />
    </Routes>
  );
};

export default GoogleRouter;

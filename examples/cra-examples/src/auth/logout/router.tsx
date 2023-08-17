import { Route, Routes } from 'onekijs';
import CallbackPage from './CallbackPage';
import LogoutPage from './IndexPage';


const LogoutRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="callback" element={<CallbackPage />} />
      <Route index element={<LogoutPage />} />
    </Routes>
  );
};

export default LogoutRouter;

import { Route, Routes } from 'onekijs';
import CallbackPage from './CallbackPage';


const LogoutRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default LogoutRouter;

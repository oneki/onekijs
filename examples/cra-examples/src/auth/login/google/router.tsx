import { Route, Routes } from 'onekijs';
import LoginCallbackPage from './LoginCallbackPage';


const GoogleRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="callback" element={<LoginCallbackPage />} />

    </Routes>
  );
};

export default GoogleRouter;

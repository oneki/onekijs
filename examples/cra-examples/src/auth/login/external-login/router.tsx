import { Route, Routes } from 'onekijs';
import ExternalLoginCallbackPage from './ExternalLoginCallbackPage';
import ExternalLoginPage from './IndexPage';


const ExternalLoginRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="callback" element={<ExternalLoginCallbackPage />} />
      <Route index element={<ExternalLoginPage />} />
    </Routes>
  );
};

export default ExternalLoginRouter;

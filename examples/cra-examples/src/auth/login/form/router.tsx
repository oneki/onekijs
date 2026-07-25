import { Route, Routes } from 'onekijs';
import ExternalLoginPage from './IndexPage';
import FormLoginPage from './IndexPage';

const FormLoginRouter = (): import('react').JSX.Element => {
  return (
    <Routes>
      <Route index element={<FormLoginPage />} />
    </Routes>
  );
};

export default FormLoginRouter;

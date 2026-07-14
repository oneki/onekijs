import { Route, Routes } from 'onekijs';
import FormInputBasicPage from './FormInputBasicPage';

const FormInputRouter = (): import('react').JSX.Element => {
  return (
    <Routes>
      <Route path="basic" element={<FormInputBasicPage />} />
    </Routes>
  );
};

export default FormInputRouter;

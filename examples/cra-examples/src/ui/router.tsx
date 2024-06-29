import { Route, Routes } from 'onekijs';
import FormInputRouter from './FormInput/router';
import UiPage from './UiPage';

const UiRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="FormInput/*" element={<FormInputRouter />} />
      <Route index element={<UiPage />} />
    </Routes>
  );
};

export default UiRouter;

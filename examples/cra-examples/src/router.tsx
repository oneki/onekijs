import { Route, Routes } from 'onekijs';
import AppLayout from './@layout/AppLayout';
import SettingsRouter from './settings/router';
import AuthRouter from './auth/router';

const RootRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/settings/*" element={<SettingsRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route index element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

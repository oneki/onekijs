import { Route, Routes } from 'onekijs';
import AppLayout from './@layout/AppLayout';
import SettingsRouter from './settings/router';
import AuthRouter from './auth/router';
import StateManagementRouter from './state-management/router';
import UiRouter from './ui/router';

const RootRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/settings/*" element={<SettingsRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/state-management/*" element={<StateManagementRouter />} />
        <Route path="/ui/*" element={<UiRouter />} />
        <Route index element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

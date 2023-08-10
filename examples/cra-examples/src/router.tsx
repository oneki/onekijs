import { Route, Routes } from 'onekijs';
import AppLayout from './@common/layout/AppLayout';
import SettingsRouter from './settings/router';

const RootRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/settings/*" element={<SettingsRouter />} />
        <Route index element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

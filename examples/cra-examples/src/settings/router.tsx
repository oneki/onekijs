import { Route, Routes } from 'onekijs';
import UseSettingsPage from './UseSettingsPage';
import UseSettingPage from './UseSettingPage';
import SettingsIndexPage from './IndexPage';

const SettingsRouter = (): import('react').JSX.Element => {
  return (
    <Routes>
      <Route path="use-setting" element={<UseSettingPage />} />
      <Route path="use-settings" element={<UseSettingsPage />} />
      <Route index element={<SettingsIndexPage />} />
    </Routes>
  );
};

export default SettingsRouter;

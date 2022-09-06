import { Outlet } from 'onekijs';
import { DashboardBody, DashboardHeader, useDashboard } from 'onekijs-ui';
import { FC } from 'react';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FC = () => {
  const [Dashboard] = useDashboard();
  return (
    <div>
      <NotificationCenter />
      <Dashboard>
        <DashboardHeader>
          <Navbar />
        </DashboardHeader>

        <DashboardBody>
          <Outlet />
        </DashboardBody>
      </Dashboard>
    </div>
  );
};

export default AppLayout;

import { FCC } from 'onekijs';
import { DashboardBody, DashboardHeader, useDashboard } from 'onekijs-ui';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FCC = ({ children }) => {
  const [Dashboard] = useDashboard();
  return (
    <div>
      <NotificationCenter />
      <Dashboard>
        <DashboardHeader>
          <Navbar />
        </DashboardHeader>

        <DashboardBody>{children}</DashboardBody>
      </Dashboard>
    </div>
  );
};

export default AppLayout;

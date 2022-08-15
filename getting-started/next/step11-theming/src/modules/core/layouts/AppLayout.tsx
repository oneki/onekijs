import { FCC, layout } from 'onekijs-next';
import { Dashboard, DashboardBody, DashboardHeader } from 'onekijs-ui';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FCC = ({ children }) => {
  return (
    <div>
      <NotificationCenter />
      <Dashboard>
        <DashboardHeader>
          <Navbar />
        </DashboardHeader>
        <DashboardBody>{children}</DashboardBody>
      </Dashboard>
      <Navbar />
    </div>
  );
};

export default layout(AppLayout);

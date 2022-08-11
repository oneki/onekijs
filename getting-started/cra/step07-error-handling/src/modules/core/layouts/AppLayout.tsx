import { FCC } from 'onekijs';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FCC = ({ children }) => {
  return (
    <div>
      <NotificationCenter />
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;

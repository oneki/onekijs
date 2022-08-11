import { FCC } from 'onekijs';
import Navbar from '../components/Navbar';

const AppLayout: FCC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;

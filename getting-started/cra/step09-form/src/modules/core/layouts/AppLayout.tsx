import { Outlet } from 'onekijs';
import { FC } from 'react';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FC = () => {
  return (
    <div>
      <NotificationCenter />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

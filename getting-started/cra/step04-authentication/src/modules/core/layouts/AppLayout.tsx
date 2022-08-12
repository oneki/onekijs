import { Outlet } from 'onekijs';
import { FC } from 'react';
import Navbar from '../components/Navbar';

const AppLayout: FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

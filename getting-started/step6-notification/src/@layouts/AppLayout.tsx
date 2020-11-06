import React, { FC } from 'react';
import Navbar from '../@components/Navbar';
import NotificationCenter from '../@components/NotificationCenter';

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
      <NotificationCenter />
    </div>
  );
};

export default AppLayout;

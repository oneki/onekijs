import React, { FC } from 'react';
import Navbar from '../components/Navbar';
import NotificationCenter from '../components/NotificationCenter';

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <NotificationCenter />
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;

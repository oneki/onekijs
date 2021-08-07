import React, { FC } from 'react';
import { layout } from 'onekijs';
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

export default layout(AppLayout);

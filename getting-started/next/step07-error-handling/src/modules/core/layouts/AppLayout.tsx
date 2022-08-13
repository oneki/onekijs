import React from 'react';
import { FCC, layout } from 'onekijs-next';
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

export default layout(AppLayout);

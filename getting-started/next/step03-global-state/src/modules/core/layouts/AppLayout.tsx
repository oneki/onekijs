import React from 'react';
import { FCC, layout } from 'onekijs-next';
import Navbar from '../components/Navbar';

const AppLayout: FCC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default layout(AppLayout);

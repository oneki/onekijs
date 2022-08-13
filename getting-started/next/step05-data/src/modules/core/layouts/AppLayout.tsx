import { FCC, layout } from 'onekijs-next';
import React from 'react';
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

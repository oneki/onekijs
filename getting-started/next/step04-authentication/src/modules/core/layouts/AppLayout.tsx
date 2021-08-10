import React, { FC } from 'react';
import { layout } from 'onekijs-next';
import Navbar from '../components/Navbar';

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default layout(AppLayout);

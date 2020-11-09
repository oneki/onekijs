import React, { FC } from 'react';
import Navbar from '../@components/Navbar';

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;

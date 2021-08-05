import React from 'react';
import Navbar from '../components/Navbar';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;

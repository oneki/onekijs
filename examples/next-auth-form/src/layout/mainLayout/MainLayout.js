import React from 'react';
import Header from '../../component/header';
import Body from '../../component/body';
import { layout } from 'onekijs-next';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-white antialiased">
      <Header />
      <Body>{children}</Body>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default layout(MainLayout);

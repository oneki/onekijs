import { NextApp, NextAppProps } from 'onekijs-next';
import React, { FC } from 'react';

const MyApp: FC<NextAppProps> = (props) => {
  return <NextApp {...props} />;
};

export default MyApp;

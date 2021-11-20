import { NextApp, NextAppProps } from 'onekijs-next';
import React, { FC } from 'react';
import { settings } from '../settings';

const MyApp: FC<NextAppProps> = (props) => {
  return <NextApp settings={settings} {...props} />;
};

export default MyApp;

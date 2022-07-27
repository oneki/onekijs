import { FCC } from 'onekijs-framework';
import { TabsProps } from '../typings';
import React from 'react';
import { addClassname } from '../../../utils/style';

const TabsContainer: FCC<Omit<TabsProps, 'Component'>> = ({ className, children }) => {
  const classNames = addClassname('o-tabs-container', className);
  return <div className={classNames}>{children}</div>;
};

export default TabsContainer;

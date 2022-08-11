import { FCC } from 'onekijs-framework';
import React from 'react';
import { TabsProps } from '../typings';
import ControlledTabsComponent from './ControlledTabsComponent';
import UncontrolledTabsComponent from './UncontrolledTabsComponent';

const TabsComponent: FCC<TabsProps> = (props) => {
  if (props.controller) {
    return <ControlledTabsComponent {...props} controller={props.controller} />;
  } else {
    return <UncontrolledTabsComponent {...props} />;
  }
};

export default TabsComponent;

import { FCC } from 'onekijs-framework';
import React from 'react';
import useTabsController from '../hooks/useTabsController';
import { TabsProps } from '../typings';
import ControlledTabsComponent from './ControlledTabsComponent';

const UncontrolledTabsComponent: FCC<TabsProps> = (props) => {
  const controller = useTabsController({ animate: props.animate });

  return <ControlledTabsComponent {...props} controller={controller} />;
};

export default UncontrolledTabsComponent;

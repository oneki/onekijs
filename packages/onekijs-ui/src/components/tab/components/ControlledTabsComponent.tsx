import { FCC } from 'onekijs-framework';
import React from 'react';
import { TabsServiceContext } from '../hooks/useTabsService';
import { TabsStateContext } from '../hooks/useTabsState';
import { ControlledTabsProps } from '../typings';
import TabsContainer from './TabsContainer';

const ControlledTabsComponent: FCC<ControlledTabsProps> = ({ Component = TabsContainer, controller, ...props }) => {
  return (
    <TabsServiceContext.Provider value={controller}>
      <TabsStateContext.Provider value={controller.state}>
        <Component {...props} />
      </TabsStateContext.Provider>
    </TabsServiceContext.Provider>
  );
};

export default ControlledTabsComponent;

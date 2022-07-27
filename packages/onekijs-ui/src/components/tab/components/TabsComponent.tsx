import { FCC, useService } from 'onekijs-framework';
import React from 'react';
import { TabsServiceContext } from '../hooks/useTabsService';
import { TabsStateContext } from '../hooks/useTabsState';
import { TabsService } from '../TabsService';
import { TabsProps, TabsState } from '../typings';
import TabsContainer from './TabContainer';

const TabsComponent: FCC<TabsProps> = ({ Component = TabsContainer, ...props }) => {
  const [state, service] = useService(TabsService, {
    tabs: {},
    animate: props.animate ?? 150,
  } as TabsState);

  return (
    <TabsServiceContext.Provider value={service}>
      <TabsStateContext.Provider value={state}>
        <Component {...props} />
      </TabsStateContext.Provider>
    </TabsServiceContext.Provider>
  );
};

export default TabsComponent;

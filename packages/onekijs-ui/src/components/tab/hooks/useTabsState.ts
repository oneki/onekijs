import React, { useContext } from 'react';
import { TabsState } from '../typings';

export const TabsStateContext = React.createContext<TabsState>(null!);
export const useTabsState = (): TabsState => {
  return useContext(TabsStateContext);
};

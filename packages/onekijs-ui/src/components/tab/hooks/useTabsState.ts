import React, { useContext } from 'react';
import { TabsState } from '../typings';

export const TabsStateContext = React.createContext<TabsState<any>>(null!);
export const useTabsState = <T>(): TabsState<T> => {
  return useContext(TabsStateContext);
};

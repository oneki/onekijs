import React, { useContext } from 'react';
import { TabsService } from '../TabsService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TabsServiceContext = React.createContext<TabsService>(null!);

const useTabsService = (): TabsService => {
  return useContext(TabsServiceContext);
};

export default useTabsService;

import React, { useContext } from 'react';
import { DashboardService } from '../DashboardService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DashboardServiceContext = React.createContext<DashboardService>(null!);

const useDashboardService = (): DashboardService => {
  return useContext(DashboardServiceContext);
};

export default useDashboardService;

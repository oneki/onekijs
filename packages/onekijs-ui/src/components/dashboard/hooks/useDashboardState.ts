import React, { useContext } from 'react';
import { DashboardState } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DashboardStateContext = React.createContext<DashboardState>(null!);

const useDashboardState = (): DashboardState => {
  return useContext(DashboardStateContext);
};

export default useDashboardState;

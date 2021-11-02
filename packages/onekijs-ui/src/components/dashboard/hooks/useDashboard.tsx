import { useLazyRef, useService } from 'onekijs-framework';
import React, { FC } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import { DashboardService } from '../DashboardService';
import { DashboardProps, DashboardState } from '../typings';

const useDashboard = (): [FC<DashboardProps>, DashboardService] => {
  const [, service] = useService(DashboardService, {} as DashboardState);

  const DashboardRef = useLazyRef<FC<DashboardProps>>(
    (): FC<DashboardProps> => {
      const Dashboard: FC<DashboardProps> = (props) => {
        return <DashboardComponent {...props} service={service} />;
      };
      return Dashboard;
    },
  );
  return [DashboardRef.current, service];
};

export default useDashboard;

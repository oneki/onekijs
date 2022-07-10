import { FCC, useLazyRef, useService } from 'onekijs-framework';
import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import { DashboardService } from '../DashboardService';
import { DashboardProps, DashboardState } from '../typings';

const useDashboard = (): [FCC<DashboardProps>, DashboardService] => {
  const [, service] = useService(DashboardService, {} as DashboardState);

  const DashboardRef = useLazyRef<FCC<DashboardProps>>(
    (): FCC<DashboardProps> => {
      const Dashboard: FCC<DashboardProps> = (props) => {
        return <DashboardComponent {...props} service={service} />;
      };
      return Dashboard;
    },
  );
  return [DashboardRef.current, service];
};

export default useDashboard;

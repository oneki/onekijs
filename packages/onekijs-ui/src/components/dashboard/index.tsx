import { FCC, useService } from 'onekijs-framework';
import React from 'react';
import DashboardComponent from './components/DashboardComponent';
import { DashboardService } from './DashboardService';
import { DashboardProps, DashboardState } from './typings';

const Dashboard: FCC<DashboardProps> = (props) => {
  const [_, service] = useService(DashboardService, {} as DashboardState);

  return <DashboardComponent {...props} service={service} />;
};

export default Dashboard;

import { FCC, useService } from 'onekijs-framework';
import React from 'react';
import DashboardComponent from './components/DashboardComponent';
import { DashboardService } from './DashboardService';
import {  DashboardProps, DashboardState } from './typings';

const UncontrolledDashboard: FCC<DashboardProps> = (props) => {
  const [_, service] = useService(DashboardService, {} as DashboardState);

  return <DashboardComponent {...props} service={service} />;
}


const Dashboard: FCC<DashboardProps> = (props) => {
  const { controller, ...dashboardProps } = props;
  if (controller) {
    return <DashboardComponent {...dashboardProps} service={controller} />;
  } else {
    return <UncontrolledDashboard {...dashboardProps} />
  }
};

export default Dashboard;

import { useService } from 'onekijs-framework';
import { DashboardService } from '../DashboardService';
import { DashboardState } from '../typings';

const useDashboardController = (): DashboardService => {
  const [, service] = useService(DashboardService, {} as DashboardState);

  return service;
};

export default useDashboardController;

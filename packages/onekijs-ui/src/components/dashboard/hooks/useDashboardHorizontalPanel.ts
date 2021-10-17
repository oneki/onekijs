import { useEffect } from 'react';
import { DashboardHorizontalArea, DashboardHorizontalPanel, DashboardHorizontalPanelProps } from '../typings';
import useDashboardService from './useDashboardService';
import useDashboardState from './useDashboardState';

const useDashboardHorizontalPanel = (
  area: DashboardHorizontalArea,
  props: DashboardHorizontalPanelProps,
): DashboardHorizontalPanel | undefined => {
  const service = useDashboardService();
  const state = useDashboardState();
  useEffect(() => {
    service.initHorizontalPanel(area, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state[area];
};

export default useDashboardHorizontalPanel;

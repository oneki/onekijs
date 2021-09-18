import { useEffect } from 'react';
import { DashboardVerticalArea, DashboardVerticalPanel, DashboardVerticalPanelProps } from '../typings';
import useDashboardService from './useDashboardService';
import useDashboardState from './useDashboardState';

const useDashboardVerticalPanel = (
  area: DashboardVerticalArea,
  props: DashboardVerticalPanelProps,
): DashboardVerticalPanel | undefined => {
  const service = useDashboardService();
  const state = useDashboardState();
  useEffect(() => {
    service.initVerticalPanel(area, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state[area];
};

export default useDashboardVerticalPanel;

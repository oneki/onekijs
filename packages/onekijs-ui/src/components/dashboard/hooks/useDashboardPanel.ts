import { useContext } from 'react';
import {
  DashboardBodyPanel,
  DashboardHorizontalArea,
  DashboardHorizontalPanel,
  DashboardVerticalArea,
  DashboardVerticalPanel,
} from '../typings';
import { DashboardStateContext } from './useDashboardState';

export const useDashboardHorizontalPanel = (area: DashboardHorizontalArea): DashboardHorizontalPanel | undefined => {
  const state = useContext(DashboardStateContext);
  return area === 'header' ? state.header : state.footer;
};

export const useDashboardVerticalPanel = (area: DashboardVerticalArea): DashboardVerticalPanel | undefined => {
  const state = useContext(DashboardStateContext);
  return area === 'left' ? state.left : state.right;
};

export const useDashoardBodyPanel = (): DashboardBodyPanel | undefined => {
  const state = useContext(DashboardStateContext);
  return state.body;
};

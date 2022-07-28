import { ReactNode, useEffect, useId } from 'react';
import { TabState } from '../typings';
import useTabsService from './useTabsService';
import { useTabsState } from './useTabsState';

const useTab = <T = string>(
  title: T,
  active = false,
  disabled = false,
  visible = true,
  closable = false,
  icon?: ReactNode,
): TabState<T> | undefined => {
  const uid = useId();
  const service = useTabsService<T>();
  const state = useTabsState<T>();
  const tab = state.tabs[uid];
  useEffect(() => {
    if (tab === undefined) {
      service.initTab({
        uid,
        active,
        disabled,
        visible,
        closable,
        title,
        icon,
      });
    }
  }, [disabled, visible, uid, active, closable, tab, service, title, icon]);
  return tab;
};

export default useTab;

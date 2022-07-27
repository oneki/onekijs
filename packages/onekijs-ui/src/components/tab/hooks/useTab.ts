import { useEffect, useId } from 'react';
import { TabState } from '../typings';
import useTabsService from './useTabsService';
import { useTabsState } from './useTabsState';

const useTab = (initialActive = false, disabled = false, visible = true): TabState | undefined => {
  const uid = useId();
  const service = useTabsService();
  const state = useTabsState();
  const tab = state.tabs[uid];
  useEffect(() => {
    if (tab === undefined) {
      service.initTab({
        uid,
        active: initialActive,
        disabled,
        visible,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, visible, uid]);
  return tab;
};

export default useTab;

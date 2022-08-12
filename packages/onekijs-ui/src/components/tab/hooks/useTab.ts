import { useEffect } from 'react';
import { TabState } from '../typings';
import useTabsService from './useTabsService';
import { useTabsState } from './useTabsState';

const useTab = (props: TabState & { uid: string }): TabState | undefined => {
  const service = useTabsService();
  const state = useTabsState();
  const tab = state.members[state.membersIndex[props.uid]];
  useEffect(() => {
    if (tab === undefined) {
      service.initMember(Object.assign({ uid: props.uid }, props));
    }
  }, [props, service, tab]);
  return tab;
};

export default useTab;

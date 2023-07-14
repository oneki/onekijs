import { useService } from 'onekijs-framework';
import { TabsService } from '../TabsService';
import { TabsState, UseTabsController } from '../typings';

const useTabsController: UseTabsController = (props = {}) => {
  const [_, service] = useService<TabsState, TabsService>(TabsService, {
    members: [],
    membersIndex: {},
    animate: props.animate ?? 300,
  } as TabsState);

  return service;
};

export default useTabsController;

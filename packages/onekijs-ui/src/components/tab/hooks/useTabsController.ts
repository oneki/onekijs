import { useService } from 'onekijs-framework';
import { TabsService } from '../TabsService';
import { TabsState, UseTabsController } from '../typings';

const useTabsController: UseTabsController = ({ animate }) => {
  const [_, service] = useService<TabsState, TabsService>(TabsService, {
    members: [],
    membersIndex: {},
    animate: animate ?? 300,
  } as TabsState);

  return service;
};

export default useTabsController;

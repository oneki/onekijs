import { useService } from 'onekijs-framework';
import { TabsService } from '../TabsService';
import { TabsState, UseTabsController } from '../typings';

const useTabsController: UseTabsController = ({ animate }) => {
  const [_, service] = useService(TabsService, {
    tabs: {},
    animate: animate ?? 150,
  } as TabsState);

  return service;
};

export default useTabsController;

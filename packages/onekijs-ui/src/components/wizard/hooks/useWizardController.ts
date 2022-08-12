import { useService } from 'onekijs-framework';
import { WizardService } from '../WizardService';
import { WizardState, UseWizardController } from '../typings';

const useWizardController: UseWizardController = ({ animate }) => {
  const [_, service] = useService<WizardState, WizardService>(WizardService, {
    members: [],
    membersIndex: {},
    animate: animate ?? 300,
  } as WizardState);

  return service;
};

export default useWizardController;

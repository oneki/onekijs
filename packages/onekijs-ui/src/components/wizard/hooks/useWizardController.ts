import { useService } from 'onekijs-framework';
import { WizardService } from '../WizardService';
import { WizardState, UseWizardController } from '../typings';

const useWizardController: UseWizardController = ({ animate = 300, forwardOnly = true }) => {
  const [_, service] = useService<WizardState, WizardService>(WizardService, {
    members: [],
    membersIndex: {},
    animate,
    forwardOnly,
  } as WizardState);

  return service;
};

export default useWizardController;

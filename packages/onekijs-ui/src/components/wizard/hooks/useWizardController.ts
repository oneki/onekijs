import { useService } from 'onekijs-framework';
import { UseWizardController, WizardState } from '../typings';
import { WizardService } from '../WizardService';

const useWizardController: UseWizardController = ({
  animate = 300,
  forwardOnly = true,
  onCancel,
  onDone,
  onNext,
  onPrevious,
}) => {
  const [_, service] = useService<WizardState, WizardService>(WizardService, {
    members: [],
    membersIndex: {},
    animate,
    forwardOnly,
    onCancel,
    onDone,
    onNext,
    onPrevious,
  } as WizardState);

  return service;
};

export default useWizardController;

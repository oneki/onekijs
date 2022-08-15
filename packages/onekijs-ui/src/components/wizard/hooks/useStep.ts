import { useEffect } from 'react';
import { StepState } from '../typings';
import useWizardService from './useWizardService';
import { useWizardState } from './useWizardState';

const useStep = (props: StepState & { uid: string }): StepState | undefined => {
  const service = useWizardService();
  const state = useWizardState();
  const step = state.members[state.membersIndex[props.uid]];
  useEffect(() => {
    if (step === undefined) {
      service.initMember(Object.assign({ uid: props.uid }, props));
    }
  }, [props, service, step]);
  return step;
};

export default useStep;

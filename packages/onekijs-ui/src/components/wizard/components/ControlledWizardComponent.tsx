import { FCC } from 'onekijs-framework';
import React from 'react';
import { WizardServiceContext } from '../hooks/useWizardService';
import { WizardStateContext } from '../hooks/useWizardState';
import { ControlledWizardProps } from '../typings';
import WizardContainer from './WizardContainer';

const ControlledWizardComponent: FCC<ControlledWizardProps> = ({
  Component = WizardContainer,
  controller,
  ...props
}) => {
  return (
    <WizardServiceContext.Provider value={controller}>
      <WizardStateContext.Provider value={controller.state}>
        <Component {...props} />
      </WizardStateContext.Provider>
    </WizardServiceContext.Provider>
  );
};

export default ControlledWizardComponent;

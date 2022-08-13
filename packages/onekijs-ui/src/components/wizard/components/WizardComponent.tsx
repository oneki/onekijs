import { FCC } from 'onekijs-framework';
import { WizardProps } from '../typings';
import React from 'react';
import ControlledWizardComponent from './ControlledWizardComponent';
import UncontrolledWizardComponent from './UncontrolledWizardComponent';

const WizardComponent: FCC<WizardProps> = (props) => {
  if (props.controller) {
    return <ControlledWizardComponent {...props} controller={props.controller} />;
  } else {
    return <UncontrolledWizardComponent {...props} />;
  }
};

export default WizardComponent;

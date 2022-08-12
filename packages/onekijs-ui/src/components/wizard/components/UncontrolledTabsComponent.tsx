import { FCC } from 'onekijs-framework';
import React from 'react';
import useWizardController from '../hooks/useWizardController';
import { WizardProps } from '../typings';
import ControlledWizardComponent from './ControlledWizardComponent';

const UncontrolledWizardComponent: FCC<WizardProps> = (props) => {
  const controller = useWizardController({ animate: props.animate });

  return <ControlledWizardComponent {...props} controller={controller} />;
};

export default UncontrolledWizardComponent;

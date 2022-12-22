import { FCC, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React, { useEffect } from 'react';
import useWizardService from '../hooks/useWizardService';
import { FormStepProps } from '../typings';
import Step from './Step';

const FormCard: FCC<FormStepProps> = ({ name, disabled, visible, ...stepProps }) => {
  const decorator = useFormDecorator(name);
  const metadata = useFormMetadata(decorator.name);
  const service = useWizardService();

  useEffect(() => {
    const step = service.getMember(name);
    if (step && metadata.visible !== undefined && step.visible !== metadata.visible) {
      metadata.visible ? service.show(name) : service.hide(name);
    }

    if (step && metadata.disabled !== undefined && step.disabled !== metadata.disabled) {
      metadata.disabled ? service.disable(name) : service.enable(name);
    }
  });

  return <Step {...stepProps} uid={name} />;
};

export default FormCard;

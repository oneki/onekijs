import {
  FCC,
  FormContext,
  FormDisplayerProps,
  useFieldContainer,
  useFormDecorator,
  useFormMetadata,
} from 'onekijs-framework';
import React, { useEffect } from 'react';
import AccordionPanel from '../../accordion/components/AccordionPanel';
import useWizardService from '../hooks/useWizardService';
import { FormStepProps } from '../typings';
import Step from './Step';

const FormStep: FCC<FormStepProps> = ({ name, disabled, visible, ...stepProps }) => {
  const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      return (
        <AccordionPanel title={stepProps.title} initialActive={displayerProps.index === 0} initialExpand={displayerProps.index === 0}>
          {Object.values(displayerProps.children ?? {}).map((field, index) => {
            const Displayer = field.Displayer;
            return <Displayer {...field} depth={displayerProps.depth + 1} index={index} />;
          })}
        </AccordionPanel>
      );
    },
  });
  const metadata = useFormMetadata(decorator.name);
  const service = useWizardService();

  const fieldContainer = useFieldContainer({
    container: name,
    onValidationChange: (touchedValidation, allValidation) => {
      service.onValidationChange(name, touchedValidation, allValidation);
    },
  });

  const { touchAllFields, hide, show, disable, enable } = fieldContainer;

  useEffect(() => {
    const visible = metadata.visible ?? true;
    const disabled = metadata.disabled ?? false;
    if (!visible) {
      if (disabled) {
        service.disable(name);
        disable();
      } else {
        service.enable(name);
        enable();
      }
      service.hide(name);
      hide();
    } else {
      service.show(name);
      show();
      if (disabled) {
        service.disable(name);
        disable();
      } else {
        service.enable(name);
        enable();
      }
    }
  }, [name, metadata.visible, metadata.disabled]);

  useEffect(() => {
    if (!visible) {
      if (disabled) {
        disable();
      } else {
        enable();
      }
      hide();
    } else {
      show();
      if (disabled) {
        disable();
      } else {
        enable();
      }
    }
  }, [visible, disabled, hide, show, disable, enable]);

  return (
    <FormContext.Provider value={fieldContainer.context}>
      <Step {...stepProps} uid={name} onTouch={touchAllFields} />;
    </FormContext.Provider>
  );
};

export default FormStep;

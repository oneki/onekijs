import {
  DefaultDisplayer,
  FCC,
  FormContext,
  FormDisplayerProps,
  useFieldContainer,
  useFormDecorator,
  useFormMetadata,
} from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import AccordionPanel from '../../accordion/components/AccordionPanel';
import useWizardService from '../hooks/useWizardService';
import { FormStepProps } from '../typings';
import Step from './Step';

const FormStep: FCC<FormStepProps> = ({ name, disabled = false, visible = true, ...stepProps }) => {
  const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      const total = Object.values(displayerProps.children ?? {}).length
      return (
        <AccordionPanel title={stepProps.title} initialActive={displayerProps.index === 0} initialExpand={displayerProps.index === 0}>
          {Object.values(displayerProps.children ?? {}).map((field, index) => {
            const Displayer = field.Displayer ?? DefaultDisplayer;
            return <Displayer {...field} index={index} key={`field-${index}`} first={index === 0} last={index === total-1} format={displayerProps.format} />;
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

  const initializedRef = useRef(false);

  useEffect(() => {
    const visible = metadata.visible ?? true;
    const disabled = metadata.disabled ?? false;
    if (!visible) {
      if (disabled) {
        service.disable(name);
        disable();
      } else {
        service.enable(name);
        if (initializedRef.current === true) {
          // we only use the enable method if this is a change and not a initialization
          enable();
        }
      }
      service.hide(name);
      hide();
    } else {
      service.show(name);
      if (initializedRef.current === true) {
        // we only use the show method if this is a change and not a initialization
        show();
      }
      if (disabled) {
        service.disable(name);
        disable();
      } else {
        service.enable(name);
        if (initializedRef.current === true) {
          // we only use the enable method if this is a change and not a initialization
          enable();
        }
      }
    }
    initializedRef.current = true;
  }, [name, metadata.visible, metadata.disabled]);

  // useEffect(() => {
  //   if (!visible) {
  //     if (disabled) {
  //       disable();
  //     } else {
  //       enable();
  //     }
  //     hide();
  //   } else {
  //     show();
  //     if (disabled) {
  //       disable();
  //     } else {
  //       enable();
  //     }
  //   }
  // }, [visible, disabled, hide, show, disable, enable]);

  return (
    <FormContext.Provider value={fieldContainer.context}>
      <Step {...stepProps} uid={name} onTouch={touchAllFields} />
    </FormContext.Provider>
  );
};

export default FormStep;

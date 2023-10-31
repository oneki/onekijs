import { FCC, FormContext, FormDisplayerProps, useFieldContainer, useForm, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Card from '.';
import { FormCardProps } from './typings';
import { titlelize } from '../../utils/misc';
import FormCardDisplayer from './FormCardDisplayer';


const FormCard: FCC<FormCardProps> = ({ name, disabled, visible, ...cardProps }) => {
  const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      return <FormCardDisplayer {...displayerProps} name={typeof cardProps.title === 'string' ? cardProps.title : titlelize(name)} />
    },
   });
  const form = useForm();
  const metadata = useFormMetadata(decorator.name);

  const fieldContainer = useFieldContainer({
    container: name,
  });
  const { hide, show, disable, enable } = fieldContainer;

  useEffect(() => {
    if (!metadata.visible) {
      if (metadata.disabled) {
        disable();
      } else {
        enable();
      }
      hide();
    } else {
      show();
      if (metadata.disabled) {
        disable();
      } else {
        enable();
      }
    }
  }, [metadata.visible, metadata.disabled, hide, show, disable, enable]);

  if (metadata.visible === false) {
    return null;
  }

  return (
    <FormContext.Provider value={fieldContainer.context}>
      <Card
        {...cardProps}
        open={!metadata.disabled}
        onToggle={() => (metadata.disabled ? form.enable(decorator.name) : form.disable(decorator.name))}
      />
    </FormContext.Provider>
  );
};

export default FormCard;

import { FCC, FormContext, FormDisplayerProps, useFieldContainer, useForm, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import Card from '.';
import { FormCardProps } from './typings';
import { titlelize } from '../../utils/misc';
import FormCardDisplayer from './FormCardDisplayer';
import Alert from '../alert';


const FormCard: FCC<FormCardProps> = ({ name, help, children, visible, disabled, ...cardProps }) => {
  const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      return <FormCardDisplayer {...displayerProps} name={typeof cardProps.title === 'string' ? cardProps.title : titlelize(name)} />
    },
    visible,
    disabled,
   });
  const form = useForm();
  const metadata = useFormMetadata(decorator.name);

  const fieldContainer = useFieldContainer({
    container: name,
  });
  const { hide, show, disable, enable } = fieldContainer;

  const initializedRef = useRef(false);

  useEffect(() => {
    const visible = metadata.visible ?? true;
    const disabled = metadata.disabled ?? false;
    if (!visible) {
      if (disabled) {
        disable();
      } else {
        if (initializedRef.current === true) {
          // we only use the enable method if this is a change and not a initialization
          enable();
        }
      }
      hide();
    } else {
      if (initializedRef.current === true) {
        // we only use the show method if this is a change and not a initialization
        show();
      }
      if (disabled) {
        disable();
      } else {
        if (initializedRef.current === true) {
          // we only use the enable method if this is a change and not a initialization
          enable();
        }
      }
    }
    initializedRef.current = true;
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
      >
        <>
          {help && <Alert kind="info" size="small" marginBottom="2xl">{help}</Alert>}
          {children}
        </>
      </Card>
    </FormContext.Provider>
  );
};

export default FormCard;

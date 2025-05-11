import { FCC, FormContext, FormDisplayerProps, useFieldContainer, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import { addClassname } from 'utils/style';
import Alert from '../alert';
import FormBlockDisplayer from './FormBlockDisplayer';
import { FormBlockProps } from './typings';


const FormBlock: FCC<FormBlockProps> = ({ name, help, children, visible, disabled, className }) => {
    const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      return <FormBlockDisplayer {...displayerProps} />
    },
    visible,
    disabled,
   });
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
      <div className={addClassname('o-form-block', className)}>
          {help && <Alert kind="info" size="small" marginBottom="2xl">{help}</Alert>}
          {children}
      </div>
    </FormContext.Provider>
  );
};

export default FormBlock;

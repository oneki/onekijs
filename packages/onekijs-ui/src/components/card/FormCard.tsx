import { FCC, FormContext, FormDisplayerProps, useFieldContainer, useForm, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Card from '.';
import { FormCardProps } from './typings';
import { titlelize } from '../../utils/misc';

const FormCard: FCC<FormCardProps> = ({ name, disabled, visible, ...cardProps }) => {
  const decorator = useFormDecorator(name, {
    Displayer: (displayerProps: FormDisplayerProps) => {
      return (
        <>
          <div className="o-displayer-step">{typeof cardProps.title === 'string' ? cardProps.title : titlelize(name)}</div>
          {Object.values(displayerProps.children ?? {}).map((field, index) => {
            const Displayer = field.Displayer;
            return <Displayer {...field} depth={displayerProps.depth + 1} index={index} />;
          })}
        </>
      );
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

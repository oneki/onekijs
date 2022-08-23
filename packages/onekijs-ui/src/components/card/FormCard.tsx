import { FCC, useForm, useFormDecorator, useFormMetadata } from 'onekijs-framework';
import React from 'react';
import Card from '.';
import { FormCardProps } from './typings';

const FormCard: FCC<FormCardProps> = ({ name, disabled, visible, ...cardProps }) => {
  const decorator = useFormDecorator(name);
  const form = useForm();
  const metadata = useFormMetadata(decorator.name);

  if (metadata.visible === false) {
    return null;
  }

  return (
    <Card
      {...cardProps}
      open={!metadata.disabled}
      onToggle={() => (metadata.disabled ? form.enable(decorator.name) : form.disable(decorator.name))}
    />
  );
};

export default FormCard;

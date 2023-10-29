import { FormDisplayerProps, useForm } from '..';
import React from 'react';

const DefaultDisplayer: React.FC<FormDisplayerProps> = ({ name }) => {
  const form = useForm();
  const value = form.getValue(name, '');
  return <>{`${value}`}</>
}

export default DefaultDisplayer;

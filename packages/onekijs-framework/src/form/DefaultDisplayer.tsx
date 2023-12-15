import React from 'react';
import { FormDisplayerProps, useForm } from '..';

const DefaultDisplayer: React.FC<FormDisplayerProps> = ({ name, label, format }) => {
  const form = useForm();
  const value = form.getValue(name, '');
  if (format === 'form_summary' || format === 'form_summary_table') {
    return (
      <>
        {label && <b>{label}: </b>}
        <span>{`${value}`}</span>
      </>
    )
  }

  if (format === 'csv') {
    if (typeof value === 'string') return value;
    return JSON.stringify(value);
  }

  return null;

}

export default DefaultDisplayer;

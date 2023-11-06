import { get, useForm } from 'onekijs-framework';
import { TableCellDisplayerProps } from '../typings';
import React from 'react';

const DefaultFormCellDisplayer: React.FC<TableCellDisplayerProps<any>> = (props) => {
  const form = useForm();
  if (['form_summary', 'form_summary_table'].includes(props.format)) {
    if (props.column) {
      const name = props.column.id ? `${props.rowName}.${props.column.id}` : `${props.rowName}`;
      const field = form.fields[name];
      if (field && field.Displayer) {
        const Component = field.Displayer
        return <Component name={name} label={props.column.id ? props.column.title : ''} Displayer={field.Displayer} children={{}} index={0} first={true} last={true} format={props.format} />
      }
    }
  }
  if (props.format === 'csv') {
    const value = get(props.value, props.column.id, '');
    if (typeof value === 'string') return value;
    return JSON.stringify(value);
  }

  return null;
}

export default DefaultFormCellDisplayer;

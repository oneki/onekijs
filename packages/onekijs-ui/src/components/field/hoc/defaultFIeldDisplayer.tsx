import { AnonymousObject, FormDisplayerProps, useForm } from 'onekijs-framework';
import React from 'react';
import FieldDisplayer from '../FieldDisplayer';
import { titlelize } from '../../../utils/misc';

const defaultFieldDisplayer = (props: AnonymousObject) : React.FC<FormDisplayerProps> => {
  const Component = (displayerProps: FormDisplayerProps) => {
    const form = useForm();
    let value = form.getValue(displayerProps.name) ?? '';
    const ValueDisplayer = props.ValueDisplayer ?? (() => <><>{`${value || ''}`}</></>);
    return (
      <FieldDisplayer
        label={displayerProps.label ?? titlelize(displayerProps.name)}
        help={props.help}
        first={displayerProps.first}
        last={displayerProps.last}
        value={<ValueDisplayer value={value} />}
        format={displayerProps.format}
      />
    );
  };
  return Component;
}

export default defaultFieldDisplayer;

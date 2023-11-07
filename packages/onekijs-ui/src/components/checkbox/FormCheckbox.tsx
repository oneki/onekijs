import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import Checkbox from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import RemoveIcon from '../icon/RemoveIcon';
import SuccessIcon from '../icon/SuccessIcon';
import { CheckboxProps, FormCheckboxProps } from './typings';

const FormCheckboxValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: value ? '2px' : '4px' }}>
      {value ? <SuccessIcon /> : <RemoveIcon color="red" width="14px" height="14px" />}
    </div>
  );
};

const FormCheckbox: FC<FormCheckboxProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<CheckboxProps>(
    Object.assign(
      {},
      props,
      {
        isUndefined: (value: any) => value !== true && value !== false,
        defaultValue: props.defaultValue !== true ? false : true,
        Displayer: props.Displayer === undefined ? ((displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? false;
          const ValueDisplayer = props.ValueDisplayer ?? FormCheckboxValueDisplayer;
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
        }): props.Displayer,
      },
    ),
  );
  const Component = props.FieldComponent || Checkbox;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormCheckbox.displayName = 'FormCheckbox';
export default FormCheckbox;

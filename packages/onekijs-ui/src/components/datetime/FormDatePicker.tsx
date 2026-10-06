import { FormDisplayerProps, FormFieldValueDisplayerProps, isNull, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import { DatePicker } from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { dateAdapter } from './hooks/useDateAdapter';
import { timestampMilliSecondAdapter } from './hooks/useTimestampAdapter';
import { FormDatePickerProps } from './typings';

export const FormDateValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return <span className="o-date-picker-displayer-value">{value ?? ''}</span>;
};

export const formDateDisplayerProps = (props: FormDatePickerProps<any>) => ({
  defaultValue: props.defaultValue === undefined ? null : props.defaultValue,
  isUndefined:
    props.isUndefined === undefined ? (value: any) => value === undefined || value === null : props.isUndefined,
  Displayer:
    props.Displayer === undefined
      ? (displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? null;
          const ValueDisplayer = props.ValueDisplayer ?? FormDateValueDisplayer;
          const adapter =
            props.adapter === 'timestamp'
              ? timestampMilliSecondAdapter
              : props.adapter === 'date'
              ? dateAdapter
              : props.adapter;
          if (adapter) {
            value = adapter.toDate(value);
          }
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
        }
      : props.Displayer,
});

/**
 * `<FormDatePicker/>` is a DataPicker component designed to be managed by a Form.
 * It must therefore be a nested component of a Form
 *
 * Some properties are handled entirely by a form controller.
 *   * value
 *   * onChange
 *   * onFocus
 *   * onBlur
 *   * validations
 *   * visibility
 *   * disabled
 * The value is synchronized in both directions (it can be modified manually by the user or by the controller).
 *
 * @group Form
 * @category Components
 */
const FormDatePicker: FC<FormDatePickerProps<any>> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<FormDatePickerProps<any>>(
    Object.assign({}, props, formDateDisplayerProps(props)),
  );

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <DatePicker {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormDatePicker.displayName = 'FormDatePicker';
export default FormDatePicker;

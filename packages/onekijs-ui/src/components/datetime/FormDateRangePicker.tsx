import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import { DateRangePicker } from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { dateRangeAdapter } from './hooks/useDateRangeAdapter';
import { timestampMilliSecondRangeAdapter } from './hooks/useTimestampRangeAdapter';
import { FormDateRangePickerProps } from './typings';

export const FormDateRangeValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return <span className="o-date-picker-range-displayer-value">{value ? `${value.from} - ${value.to}` : ''}</span>;
};

export const formDateRangeDisplayerProps = (props: FormDateRangePickerProps<any>) => ({
  defaultValue: props.defaultValue === undefined ? null : props.defaultValue,
  isUndefined:
    props.isUndefined === undefined ? (value: any) => value === undefined || value === null : props.isUndefined,
  Displayer:
    props.Displayer === undefined
      ? (displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? null;
          const ValueDisplayer = props.ValueDisplayer ?? FormDateRangeValueDisplayer;
          const adapter =
            props.adapter === 'timestamp'
              ? timestampMilliSecondRangeAdapter
              : props.adapter === 'date'
              ? dateRangeAdapter
              : props.adapter;
          if (adapter) {
            value = adapter.toDateRange(value);
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
 * `<FormDateRangePicker/>` is a DataPicker component designed to be managed by a Form.
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
const FormDateRangePicker: FC<FormDateRangePickerProps<any>> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<FormDateRangePickerProps<any>>(
    Object.assign({}, props, formDateRangeDisplayerProps(props)),
  );

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <DateRangePicker {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormDateRangePicker.displayName = 'FormDateRangePicker';
export default FormDateRangePicker;

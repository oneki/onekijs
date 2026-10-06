import React, { FC } from 'react';
import { DateTimeRangePicker } from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { formDateRangeDisplayerProps } from './FormDateRangePicker';
import { FormDateTimeRangePickerProps } from './typings';

/**
 * `<FormDateTimeRangePicker/>` is a DataTimeRangePicker component designed to be managed by a Form.
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
const FormDateTimeRangePicker: FC<FormDateTimeRangePickerProps<any>> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<FormDateTimeRangePickerProps<any>>(
    Object.assign({}, props, formDateRangeDisplayerProps(props)),
  );

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <DateTimeRangePicker {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormDateTimeRangePicker.displayName = 'FormDateTimeRangePicker';
export default FormDateTimeRangePicker;

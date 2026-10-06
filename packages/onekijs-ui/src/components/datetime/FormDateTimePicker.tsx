import { FormDisplayerProps, FormFieldValueDisplayerProps, isNull, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormDateTimePickerProps } from './typings';
import { DateTimePicker } from '.';
import { timestampMilliSecondAdapter } from './hooks/useTimestampAdapter';
import { dateAdapter } from './hooks/useDateAdapter';
import { formDateDisplayerProps } from './FormDatePicker';

/**
 * `<FormDateTimePicker/>` is a DataTimePicker component designed to be managed by a Form.
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
const FormDateTimePicker: FC<FormDateTimePickerProps<any>> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<FormDateTimePickerProps<any>>(
    Object.assign({}, props, formDateDisplayerProps(props)),
  );

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <DateTimePicker {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormDateTimePicker.displayName = 'FormDateTimePicker';
export default FormDateTimePicker;

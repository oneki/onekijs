import { FormFieldProps, ValidationStatus } from 'onekijs-framework';
import { TshirtSize } from '../../styles/typings';
import { FieldDisplayerProps, FieldLayoutProps } from '../field/typings';
import React from 'react';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /**
   * A component rendered in front of the input component (actually inside the border of the input component)
   */
  PrefixComponent?: React.FC<InputProps>;
  /*
   * When the component is focus, the text is auto-selected
  */
  selectOnFocus?: boolean;
  /**
   * A component rendered in after the input component (actually inside the border of the input component)
   */
  SuffixComponent?: React.FC<InputProps>;
  /**
   * The status of the input
   * Valid values are:
   *   * ValidationStatus.Loading
   *   * ValidationStatus.Error
   *   * ValidationStatus.Warning
   *   * ValidationStatus.OK
   *   * ValidationStatus.None
   * If the input is used in a form, the status is controlled by the form and this prop is ignored
   *
   * @defaultValue ValidationStatus.None
   */
  status?: ValidationStatus;
  /**
   * The size of the input
   * Valid values are:
   *   * small
   *   * medium
   *   * large
   *   * xlarge
   *
   * @defaultValue medium
   */
  size?: TshirtSize;
};

export type FormInputProps = InputProps &
  FormFieldProps &
  FieldLayoutProps & {
    /**
     * The default value of the field if no specific value has been specified
     * A value can be passed to field
     *   * either manually by the user filling the form
     *   * via the setValue of the form controller (if the field is inside a <Form> component)
     *   * via an initial value transmitted to the form
     *
     * @remarks #important#
     */
    defaultValue?: string;
    /**
     * Replace the default component that display the input
     *
     * @defaultValue Input
     */
    FieldComponent?: React.FC<InputProps>;
    /**
     * There are three components used to display the value of an FormInput in the summary step
     *   * Displayer: display (label + value)
     *   * FieldDisplayer: extract the value from the field and display it
     *   * ValueDisplayer: customize how the value is displayed
     */
    FieldDisplayer?: React.FC<FieldDisplayerProps>;
  };

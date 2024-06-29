import {
  AnonymousObject,
  ContainerValidation,
  FieldValidation,
  FormDisplayerProps,
  FormFieldProps,
  FormLayout,
  ValidationStatus,
} from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { StylableProps, TshirtSize } from '../../styles/typings';
import { GridSize } from '../grid/typings';
import { LabelProps } from '../label/typings';

export type FieldComponentProps<T extends AnonymousObject> = T & {
  name: string;
  value?: T['value'];
  onFocus?: T['onFocus'];
  onBlur?: T['onBlur'];
  onChange?: T['onChange'];
  status?: ValidationStatus;
  size?: T['size'];
};

export type FieldDisplayerProps = StylableProps & {
  label: ReactNode;
  value: ReactNode;
  help?: ReactNode;
  first: boolean;
  last: boolean;
  format: FormDisplayerProps['format'];
};

export type FieldDescriptionProps = {
  className?: string;
  content: ReactNode;
  size?: TshirtSize;
  layout?: FormLayout;
};

export type FieldHelpProps = {
  className?: string;
  content?: ReactNode;
  visible?: boolean;
  size?: TshirtSize;
  layout?: FormLayout;
};

export type FieldLayoutProps = {
  /**
   * A CSS class name to be added to the field's root element
   * Each internal element is generally associated with a class name to let you can easily style it via CSS
   *
   * Multiple classNames must be separated by commas
   */
  className?: string;
  /**
   * A quick description of the field (should not be too long)
   * This message is rendered below the field
   *
   * @remarks #important#
   */
  description?: ReactNode;
  /**
   * Indicates if the field is disabled.
   * If the field is managed by a form, changing this value will have no effect, and this property should only be used to set the initial value.
   * If the field is container
   *   * if it's disabled, any field inside the container will also be disabled
   *   * if it's enabled, any field inside the container will be disabled or enabled depending on their own disabled property
   *
   * @defaultValue false
   * @remarks #important#
   */
  disabled?: boolean;
  /**
   * Replace the default component used to display the description
   *
   * @defaultValue FieldDescription
   */
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  /**
   * A message describing the field.
   * It can be a long message since the content is displayed in a tooltip
   *
   * @remarks #important#
   */
  help?: ReactNode;
  /**
   * Replace the default component used to display the help message
   *
   * @defaultValue FieldHelp
   */
  HelpComponent?: React.FC<FieldHelpProps>;
  /**
   * The id of the field. Must be unique within the app
   * This id is attached to the HTML object and can be used to manipulate the field via standard JS methods
   *
   */
  id?: string | number;
  /**
   * The label is placed in front of the field (if the layout is horizontal) or above the field (if the layout is vertical).
   * It should describe in one word the value expected by the field
   * The label is not rendered if the noLabel option is active. If the noLabel option is not active, an empty label always takes up space in the form (to maintain alignment).
   *
   * @example First Name
   * @remarks #important#
   */
  label?: string;
  /**
   * Replace the default component used to display the label
   *
   * @defaultValue Label
   */
  LabelComponent?: React.FC<LabelProps>;
  /**
   * The width reserved for the label. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * The "width" value can be replaced by a breakpoint width (used to specify a different "width" value for a smartphone or desktop computer, for example).
   *
   * Note that the labelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   *
   * @defaultValue 3
   */
  labelWidth?: GridSize;
  /**
   * The width reserved for the label for extra small screen. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * If it's not defined, the labelWidth is used for extra small screen
   * By default, the breakpoint for very small screens is 576px, but this can be modified by a custom theme.
   *
   * Note that the xsLabelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  xsLabelWidth?: GridSize;
  /**
   * The width reserved for the label for small screens. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * If it's not defined, the labelWidth is used for small screens
   * By default, the breakpoint for small screens is 768px, but this can be modified by a custom theme.
   *
   * Note that the smLabelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  smLabelWidth?: GridSize;
  /**
   * The width reserved for the label for medium screens. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * If it's not defined, the labelWidth is used for medium screens
   * By default, the breakpoint for medium screens is 992px, but this can be modified by a custom theme.
   *
   * Note that the mdLabelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  mdLabelWidth?: GridSize;
  /**
   * The width reserved for the label for large screens. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * If it's not defined, the labelWidth is used for large screens
   * By default, the breakpoint for large screens is 1200px, but this can be modified by a custom theme.
   *
   * Note that the lgLabelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  lgLabelWidth?: GridSize;
  /**
   * The width reserved for the label for extra large screens. It only makes sense if the layout is horizontal.
   * The expected value is between 1 and 12 (see the grid component)
   * If it's not defined, the labelWidth is used for extra large screens
   * By default, the breakpoint for extra large screens is 1850px, but this can be modified by a custom theme.
   *
   * Note that the lgLabelWidth can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  xlLabelWidth?: GridSize;
  /**
   * The layout of the field. Can be vertical or horizontal
   * If the layout is horizontal, the label is displayed in front of the field
   * If the layout is vertical, the label is diplayed above the field
   *
   * Note that the layout can be defined at the form level (every field inside the form will inherit the value) or in the settings file (for every form)
   */
  layout?: FormLayout;
  /**
   * Indicates if the field is mandatory
   * If a field is mandatory, a small red star will be visible next to the label.
   * If a field is disabled, the required property is automatically removed
   *
   * @remarks #important#
   */
  required?: boolean;
  /**
   * The size of the field
   * Valid values are:
   *   * small
   *   * medium
   *   * large
   *   * xlarge
   *
   * @defaultValue medium
   */
  size?: TshirtSize;

  /**
   * The status of the validation of the field
   * If the field is managed by a form, this property is ignored (since everything is controlled by the form)
   */
  validation?: FieldValidation | ContainerValidation;
  /**
   * The visibility of the field
   * If the field is managed by a form, changing this value will have no effect, and this property should only be used to set the initial visibility.
   *
   * @defaultValue true
   * @remarks #important#
   */
  visible?: boolean;
};

export type UseFieldLayoutProps<T extends AnonymousObject> = T &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue: T['value'];
    FieldComponent?: React.FC<T>;
  };

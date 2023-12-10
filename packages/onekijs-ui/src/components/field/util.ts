import { AnonymousObject, extractValidators, FieldOptions, Validator } from 'onekijs-framework';
import defaultFieldDisplayer from './hoc/defaultFIeldDisplayer';
import { FieldLayoutProps } from './typings';
// extract validators from props
export const extractFieldLayoutProps = (
  props: AnonymousObject,
): {
  validators: AnonymousObject<Validator>;
  fieldLayoutProps: FieldLayoutProps;
  name: string;
  fieldOptions: FieldOptions;
  fieldProps: AnonymousObject;
} => {
  const [validators, nonValidatorProps] = extractValidators(props);
  const fieldLayoutProps: FieldLayoutProps = {};
  const fieldOptions: FieldOptions = {};
  const fieldProps: AnonymousObject = {};
  const fieldLayoutKeys = [
    'className',
    'description',
    'DescriptionComponent',
    'help',
    'id',
    'label',
    'LabelComponent',
    'labelWidth',
    'layout',
    'required',
    'size',
    'xsLabelWidth',
    'smLabelWidth',
    'mdLabelWidth',
    'lgLabelWidth',
    'xlLabelWidth',
  ];
  const fieldOptionsKeys = [
    'defaultValue',
    'touchOn',
    'disabled',
    'visible',
    'editable',
    'protected',
    'isUndefined',
    'Displayer',
    'containers',
    'ValueDisplayer',
    'label',
  ];
  Object.keys(nonValidatorProps).forEach((k) => {
    if (!fieldLayoutKeys.includes(k) && !fieldOptionsKeys.includes(k)) {
      fieldProps[k] = props[k];
    }
    if (fieldLayoutKeys.includes(k)) {
      (fieldLayoutProps as any)[k] = props[k];
    }
    if (fieldOptionsKeys.includes(k)) {
      (fieldOptions as any)[k] = props[k];
    }
  });
  fieldOptions.Displayer = fieldOptions.Displayer ?? defaultFieldDisplayer(props);
  return {
    name: props.name,
    validators,
    fieldOptions,
    fieldLayoutProps,
    fieldProps,
  };
};

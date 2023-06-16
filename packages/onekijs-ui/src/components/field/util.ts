import { AnonymousObject, extractValidators, FieldOptions, Validator } from 'onekijs-framework';
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
  isUndefined: ((value: any) => boolean) | undefined;
} => {
  const { isUndefined, ...remainingProps } = props;
  const [validators, nonValidatorProps] = extractValidators(remainingProps);
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
  const fieldOptionsKeys = ['defaultValue', 'touchedOn', 'disabled', 'visible', 'editable', 'protected', 'isUndefined'];
  Object.keys(nonValidatorProps).forEach((k) => {
    if (fieldLayoutKeys.includes(k)) {
      (fieldLayoutProps as any)[k] = props[k];
    } else if (fieldOptionsKeys.includes(k)) {
      (fieldOptions as any)[k] = props[k];
    } else if (k !== 'name') {
      fieldProps[k] = props[k];
    }
  });
  return {
    name: props.name,
    validators,
    fieldOptions,
    fieldLayoutProps,
    fieldProps,
    isUndefined,
  };
};

import { AnonymousObject, extractValidators, FieldOptions, Validator } from "onekijs-core";
import { FieldLayoutProps } from "./typings";

// extract validators from props
export const extractFieldLayoutProps = (props: AnonymousObject): {validators: Validator[], fieldLayoutProps: FieldLayoutProps, name: string, fieldOptions: FieldOptions, fieldProps: AnonymousObject} => {
  const [validators, nonValidatorProps] = extractValidators(props);
  let fieldLayoutProps: FieldLayoutProps = {};
  let fieldOptions: FieldOptions = {};
  let fieldProps: AnonymousObject = {};
  let fieldLayoutKeys = ['className', 'description', 'DescriptionComponent', 'help', 'id', 'label', 'LabelComponent', 'labelWidth', 'layout', 'required', 'size'];
  let fieldOptionsKeys = ['defaultValue', 'touchedOn']
  Object.keys(nonValidatorProps).forEach(k => {
    if (fieldLayoutKeys.includes(k)) {
      (fieldLayoutProps as any)[k] = props[k];
    } else if (fieldOptionsKeys.includes(k)) {
      (fieldOptions as any)[k] = props[k];
    } else if (k !== 'name') {
      fieldProps[k] = props[k]
    } 
  })
  return {
    name: props.name,
    validators,
    fieldOptions,
    fieldLayoutProps,
    fieldProps,
  }

};

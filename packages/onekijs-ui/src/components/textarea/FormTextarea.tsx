import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import Textarea from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormTextareaProps, TextareaProps } from './typings';

const FormTextareaValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return (
    <span className="o-input-displayer-value">
      {value ? value.split('\n').map((v: string, index: number) => <div key={`line-${index}`}>{v}</div>) : ''}
    </span>
  );
};

const FormTextarea: FC<FormTextareaProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<TextareaProps>(
    Object.assign({}, props, {
      isUndefined: (value: any) => value === undefined || value === null,
      defaultValue: props.defaultValue === undefined ? '' : props.defaultValue,
      Displayer:
        props.Displayer === undefined
          ? (displayerProps: FormDisplayerProps) => {
              const form = useForm();
              let value = form.getValue(displayerProps.name) ?? '';
              const ValueDisplayer = props.ValueDisplayer ?? FormTextareaValueDisplayer;
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
    }),
  );
  const Component = props.FieldComponent || Textarea;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} value={!fieldComponentProps.value ? '' : fieldComponentProps.value} />
    </FieldLayout>
  );
});

FormTextarea.displayName = 'FormTextarea';
export default FormTextarea;

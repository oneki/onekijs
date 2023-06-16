import React, { FC } from 'react';
import Textarea from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormTextareaProps, TextareaProps } from './typings';

const FormTextarea: FC<FormTextareaProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<TextareaProps>(
    Object.assign(
      {
        defaultValue: props.defaultValue === undefined ? '' : props.defaultValue,
      },
      props,
      {
        isUndefined: (value: any) => value === undefined || value === null,
      },
    ),
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

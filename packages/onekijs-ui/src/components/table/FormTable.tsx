import React, { FC } from 'react';
import styled from 'styled-components';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import FormTableComponent from './components/FormTableComponent';
import { tableStyle } from './style';
import { FormTableProps, TableItem } from './typings';

const StyledFormTableComponent = styled(FormTableComponent)`
  ${tableStyle}
`;

const FormTable: FC<FormTableProps<any, TableItem<any>>> = React.memo((props) => {
  let defaultValue = props.defaultValue;
  if (defaultValue === undefined) {
    let minLength = (props.minLength ?? props.min) || 0;
    if (props.required && minLength < 1) {
      minLength = 1;
    }
    const isSingleColumnTable = props.controller.columns.find((c) => c.id === '');
    defaultValue = minLength > 0 ? Array(minLength).fill(isSingleColumnTable ? undefined : {}) : [];
  }
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<FormTableProps<any, TableItem<any>>>(
    Object.assign(
      {
        defaultValue,
      },
      props,
    ),
  );
  const Component = props.FieldComponent || StyledFormTableComponent;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component
        {...fieldComponentProps}
        name={props.name}
        required={props.required}
        minLength={props.minLength ?? props.min}
        maxLength={props.maxLength ?? props.max}
      />
    </FieldLayout>
  );
});

FormTable.displayName = 'FormTable';
export default FormTable;

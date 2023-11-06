import { FormContext, FormDisplayerProps, useFieldContainer, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import styled from 'styled-components';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import FormTableComponent from './components/FormTableComponent';
import FormTableValueDisplayer from './displayers/FormTableValueDisplayer';
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
        Displayer: (displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? [];
          const ValueDisplayer = props.ValueDisplayer ?? FormTableValueDisplayer;
          return (
            <FieldDisplayer
              label={displayerProps.label ?? titlelize(displayerProps.name)}
              help={props.help}
              first={displayerProps.first}
              last={displayerProps.last}
              value={
                <ValueDisplayer
                  name={displayerProps.name}
                  value={value}
                  columns={props.controller.columns}
                  format={displayerProps.format}
                />
              }
              format={displayerProps.format}
            />
          );
        },
      },
      props,
    ),
  );

  const fieldContainer = useFieldContainer({
    container: props.name,
  });

  const Component = props.FieldComponent || StyledFormTableComponent;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <FormContext.Provider value={fieldContainer.context}>
        <Component
          {...fieldComponentProps}
          name={props.name}
          required={props.required}
          minLength={props.minLength ?? props.min}
          maxLength={props.maxLength ?? props.max}
        />
      </FormContext.Provider>
    </FieldLayout>
  );
});

FormTable.displayName = 'FormTable';
export default FormTable;

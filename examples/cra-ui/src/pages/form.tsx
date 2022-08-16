import { SubmitButton, useForm } from 'onekijs';
import { ComponentStyle, FormCheckbox, FormInput, FormSelect, FormTable, useInputColumn, useSelectColumn, useTableController } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const fomStyle: ComponentStyle<{}> = () => {
  return css`
    input {
      border: 1px solid gray;
    }
    input.o-input-error {
      border: 1px solid red;
    }
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const { Form, values, validations } = useForm((value) => console.log(value), {
    layout: 'vertical',
    fieldSize: 'small',
  });
  //console.log('form1', values, validations);

  const { Form: Form2, values: values2, validations: validations2 } = useForm((value) => console.log(value), {
    layout: 'horizontal',
  });


  const streetColumn = useInputColumn({
    id: 'street',
    title: 'Street',
    required: true,
    size: 'small',
    placeholder: 'Street',
  });

  const stateColumn = useSelectColumn({
    id: 'state',
    dataSource: [
      { id: 1, text: 'Alabama' },
      { id: 2, text: 'California' },
      { id: 3, text: 'NY' },
    ],
    title: 'State',
    size: 'small',
    placeholder: 'State',
  });

  const tableController = useTableController(undefined, [streetColumn, stateColumn]);

  return (
    <>
      <div>
        <Form className={className}>
          <FormInput label="Firstname" name="firstname" required={true} />
          <FormSelect label="Role" name="role" dataSource={['admin', 'user']} required={true} />
          <FormCheckbox label="Backup" name="backup" />
          <FormTable label="Address" name="addresses" controller={tableController} addLabel="Add address" />
          <SubmitButton />
        </Form>
      </div>
      <div style={{marginTop: '500px'}}>
        <Form2 className={className}>
          <FormInput
            label="Firstname"
            name="firstname"
            required={true}
            description="Can only contain alphanumeric characters"
            help="This is an help message for this field"
            autoFocus={true}
          />
          <FormSelect label="Role" name="role" dataSource={['admin', 'user']} required={true} />
          <FormCheckbox label="Backup" name="backup" required={true} />
          <SubmitButton />
        </Form2>
      </div>
    </>
  );
};

export const FormPage = styled(Page)`
  ${fomStyle}
`;

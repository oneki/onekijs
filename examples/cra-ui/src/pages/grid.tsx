import { FormSubmitCallback, SubmitButton, useForm } from 'onekijs';
import { Button, ComponentStyle, FormGrid, useGrid, useInputColumn, useSelectColumn } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { users } from '../data/users';

const gridStyle: ComponentStyle<{}> = () => {
  return css``;
};

const addresses = [
  {
    street: 'rue Jean Allard 10',
    state: 'NY',
  },
  {
    street: 'rue de la Jardiniere',
    state: 'Alabama',
  },
];

const u = ['1', '2'];

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const onSubmit: FormSubmitCallback = (data) => {
    console.log(data);
  };
  const { Form } = useForm(onSubmit, {
    initialValues: {
      addresses,
      users: u,
    },
  });

  const streetColumn = useInputColumn({
    id: 'street',
    title: 'Street',
    required: true,
  });

  const stateColumn = useSelectColumn({
    id: 'state',
    dataSource: [
      { id: 1, text: 'Alabama' },
      { id: 2, text: 'California' },
      { id: 2, text: 'NY' },
    ],
    title: 'State',
  });

  const addFilter = () => {
    stateColumn.broker.addFilter({
      id: 'state',
      operator: 'eq',
      not: true,
      value: 'California',
      field: 'text',
    });
  };

  const removeFilter = () => {
    stateColumn.broker.removeFilter('state');
  };

  const controller = useGrid({
    columns: [streetColumn, stateColumn],
    //grow: 'address.city'
  });

  const controller2 = useGrid({
    dataSource: users,
    columns: [
      {
        id: 'id',
        minWidth: '50px',
        maxWidth: '50px',
        title: 'ID',
      },
      {
        id: 'firstname',
        width: '10px',
        title: 'Firstname',
      },
      {
        id: 'lastname',
        width: '20px',
        title: 'Lastname',

      },
      {
        id: 'address.street',
        width: '600px',
        title: 'Street',
      },
      {
        id: 'address.postalCode',
        title: 'Postal Code',
      },
      {
        id: 'address.city',
        title: 'City',
      },
    ],
    //grow: 'address.city'
  });


  return (
    <Form>
      <FormGrid name="addresses" controller={controller} className={className} />
      <Button onClick={addFilter}>Add Filter</Button> <Button onClick={removeFilter}>Remove Filter</Button> <SubmitButton>Submit</SubmitButton>

      <FormGrid name="users" controller={controller2} className={className} />
    </Form>
  );
};

export const GridPage = styled(Page)`
  ${gridStyle}
`;

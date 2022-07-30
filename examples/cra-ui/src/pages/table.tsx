import { FormSubmitCallback, SubmitButton, useForm } from 'onekijs';
import { Button, ComponentStyle, FormTable, useInputColumn, useSelectColumn, useTableController } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { users } from '../data/users';

const tableStyle: ComponentStyle<{}> = () => {
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

const u = [
  {
    id: 1,
    firstname: 'Alyce',
    lastname: 'Warren',
    address: {
      street: 'Abbey Court',
      postalCode: 4517,
      city: 'Zortman',
    },
    phones: ['+32 (941) 540-2562', '+32 (804) 558-2088', '+32 (844) 418-3245'],
  },
  {
    id: 2,
    firstname: 'Hale',
    lastname: 'Stuart',
    address: {
      street: 'Fillmore Avenue',
      postalCode: 2166,
      city: 'Winston',
    },
    phones: [],
  },
];

const ExpandedComponent = () => {
  return <div></div>
}

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const onSubmit: FormSubmitCallback = (data) => {
    console.log(data);
  };
  const { Form, values } = useForm(onSubmit, {
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

  const controller = useTableController(undefined, [streetColumn, stateColumn]);

  const controller2 = useTableController(users,  [
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
        //title: 'Street',
        filterable: true,
        sortable: false,
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
  );

  return (
    <Form>
      <FormTable name="addresses" controller={controller} className={className} />
      <Button onClick={addFilter}>Add Filter</Button> <Button onClick={removeFilter}>Remove Filter</Button>{' '}
      <SubmitButton>Submit</SubmitButton>
      <FormTable name="users" controller={controller2} className={className} height="500px" ExpandedComponent={ExpandedComponent} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Form>
  );
};

export const TablePage = styled(Page)`
  ${tableStyle}
`;

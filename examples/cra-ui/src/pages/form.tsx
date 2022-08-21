import { Form, useFormController, useFormWatcher } from 'onekijs';
import {
  ComponentStyle,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTable,
  SubmitButton,
  useCheckboxColumn,
  useInputColumn,
  useSelectColumn,
  useTableController,
} from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const fomStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const form1 = useFormController();

  useFormWatcher<string>(form1, 'addresses.0.street', (value: string) => {
  });

  useFormWatcher<string>(form1, 'addresses.street', (value: string, _previousValue: string | undefined, watch) => {
  });

  const formController2 = useFormController({ firstname: 'toto' });

  const streetColumn = useInputColumn({
    id: 'street',
    title: 'Street',
    required: true,
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
    placeholder: 'State',
    required: true,
  });

  const privateColumn = useCheckboxColumn({
    id: 'private',
    title: 'Private address',
    defaultValue: true,
    required: true,
  });

  useFormWatcher<string>(form1, 'firstname', (value: string) => {
    if (value === 'toto') {
      stateColumn.broker.addFilterCriteria('text', 'eq', 'California', false, 'toto');
    } else {
      stateColumn.broker.removeFilter('toto');
    }
  });

  const tableController = useTableController(undefined, [streetColumn, stateColumn, privateColumn]);

  return (
    <>
      <div>
        <Form
          controller={form1}
          layout="vertical"
          fieldSize="small"
          className={className}
          onSubmit={(values) => console.log(values)}
        >
          <FormInput label="Firstname" name="firstname" required={true} autoFocus={true} />
          <FormSelect label="Role" name="role" dataSource={['admin', 'user']} required={true} visible={false} />
          <FormCheckbox label="Backup" name="backup" />
          <FormTable label="Address" name="addresses" controller={tableController} addLabel="Add address" />
          <SubmitButton showErrors={true}>Submit</SubmitButton>
        </Form>
        <div>
          Values: <pre>{JSON.stringify(form1.state.values)}</pre>
        </div>
        <div>
          Validations: <pre>{JSON.stringify(form1.state.validations)}</pre>
        </div>
        <div>
          Metadata: <pre>{JSON.stringify(form1.state.metadata)}</pre>
        </div>
      </div>
      <div style={{ marginTop: '500px' }}>
        <Form
          controller={formController2}
          className={className}
          onSubmit={(values) => console.log(values)}
          layout="horizontal"
        >
          <FormInput
            label="Firstname"
            name="firstname"
            defaultValue="defaultFirstname"
            required={true}
            description="Can only contain alphanumeric characters"
            help="This is an help message for this field"
          />
          <FormSelect label="Role" name="role" dataSource={['admin', 'user']} defaultValue="admin" required={true} />
          <FormCheckbox label="Backup" name="backup" required={true} />
          <SubmitButton />
        </Form>
      </div>
    </>
  );
};

export const FormPage = styled(Page)`
  ${fomStyle}
`;

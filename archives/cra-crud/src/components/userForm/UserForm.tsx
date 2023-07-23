import React, { useCallback, FC } from 'react';
import { useForm, Input, SubmitButton, FormSubmitCallback } from 'onekijs';
import { User } from '../../types';

// eslint-disable-next-line react/prop-types
const UserForm: FC<{ onSubmit: FormSubmitCallback; type?: 'edit' | 'create'; user?: User; loading?: boolean }> = ({
  type = 'edit',
  user = {},
  onSubmit,
}) => {
  const doSubmit = useCallback(
    async (data) => {
      // user.id is not part of the form. Add it now in case of an edit
      const nextUser = Object.assign({}, user, data);
      await onSubmit(nextUser);
    },
    [onSubmit, user],
  );

  const { Form, getValidation } = useForm(doSubmit, {
    initialValues: user,
  });

  return (
    <>
      <h2>{type === 'edit' ? 'Edit' : 'Create'} a user</h2>
      <Form>
        <div>
          <b>Name: </b>
          <Input name="name" defaultValue={user.name} required />
          {getValidation('name').message}
        </div>

        <div>
          <b>Firstname: </b>
          <Input name="firstname" defaultValue={user.firstname} required />
          {getValidation('firstname').message}
        </div>

        <SubmitButton>Submit</SubmitButton>
      </Form>
    </>
  );
};

export default UserForm;

import React, { FC } from 'react';
import { LoginOptions } from '../../typings';
import useLogin from '../../useLogin';
import useForm from '../../../form/useForm';
import Input from '../../../form/components/Input';
import SubmitButton from '../../../form/components/SubmitButton';
import useSecurityContext from '../../useSecurityContext';

type FormLoginProps = {
  idpName?: string;
  options?: LoginOptions;
};

const UseLoginFormWidget: FC<FormLoginProps> = ({ idpName, options }) => {
  const [error, , submit] = useLogin(idpName, options);
  const [email] = useSecurityContext('email', 'not logged');
  const { Form } = useForm(submit, {
    initialValues: {
      username: 'john.doe',
      password: 'secret',
    },
  });

  return (
    <>
      {error && <div data-test-id="error-container">{error.message || error.payload.message}</div>}
      <div data-testid="logged-user">{email}</div>
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Input id="username" name="username" />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <Input type="password" id="password" name="password" />
        </div>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </>
  );
};

export default UseLoginFormWidget;

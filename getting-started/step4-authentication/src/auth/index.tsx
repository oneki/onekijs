import { Input, SubmitButton, useForm, useLogin } from 'onekijs';
import React, { FC } from 'react';

const AuthPage: FC = () => {
  const [error, , submit] = useLogin();

  const { Form, submitting } = useForm(submit);

  return (
    <Form className="w-full">
      {error && <div className="error">Error: {error.message}</div>}
      <div>
        <label>Username</label>
        <Input name="username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <Input name="password" type="password" />
      </div>
      <SubmitButton type="submit">
        {!submitting && 'Submit'}
        {submitting && 'Submitting...'}
      </SubmitButton>
    </Form>
  );
};

export default AuthPage;

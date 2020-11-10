import { Input, SubmitButton, useForm, useLogin } from 'onekijs';
import React, { FC } from 'react';

const LoginPage: FC = () => {
  const [error, , submit] = useLogin();

  const { Form, submitting } = useForm(submit);

  return (
    <div className="login-container">
      <Form className="login-form">
        {error && <div className="error">Error: {error.message}</div>}
        <p>Use any username / password (no check performed)</p>
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
    </div>
  );
};

export default LoginPage;

import { Form, Input, SubmitButton, useFormController, useLogin } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error, , submit] = useLogin();

  const form = useFormController();
  const { submitting } = form.state;

  return (
    <div className="login-container">
      <Form className="login-form" controller={form} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}
        <p>Use any username / password (no check performed)</p>
        <div>
          <label>Username</label>
         <Input name="username" type="text" defaultValue="demo"/>
        </div>
        <div>
          <label>Password</label>
          <Input name="password" type="password" defaultValue="demo" />
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

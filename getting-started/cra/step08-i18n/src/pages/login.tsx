import { Form, Input, SubmitButton, useFormController, useLogin, useTranslation } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error, , submit] = useLogin();
  const [T, t] = useTranslation();
  const form = useFormController();
  const { submitting } = form.state;

  return (
    <div className="login-container">
      <Form className="login-form" controller={form} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}
        <p>
          <T>Use any username / password (no check performed)</T>
        </p>
        <div>
          <label>
            <T>Username</T>
          </label>
         <Input name="username" type="text" defaultValue="demo"/>
        </div>
        <div>
          <label>
            <T>Password</T>
          </label>
          <Input name="password" type="password" defaultValue="demo" />
        </div>
        <SubmitButton type="submit">
          {!submitting && t('Submit')}
          {submitting && t('Submitting...')}
        </SubmitButton>
      </Form>
    </div>
  );
};

export default LoginPage;

import { Input, SubmitButton, useForm, useLogin, useTranslation } from 'onekijs-next';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error, , submit] = useLogin();
  const [T, t] = useTranslation();
  const { Form, submitting } = useForm(submit);

  return (
    <div className="login-container">
      <Form className="login-form">
        {error && <div className="error">Error: {error.message}</div>}
        <p>
          <T>Use any username / password (no check performed)</T>
        </p>
        <div>
          <label>
            <T>Username</T>
          </label>
          <Input name="username" type="text" />
        </div>
        <div>
          <label>
            <T>Password</T>
          </label>
          <Input name="password" type="password" />
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

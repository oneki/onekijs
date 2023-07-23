import { Form, Input, Link, SubmitButton, useFormController, useLogin, useTranslation } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error, , submit] = useLogin();
  const [T, t] = useTranslation();
  const form = useFormController();
  const { values } = form.state;

  return (
    <div className="login-container">
      <Form className="login-form" controller={form} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}
        <div className="no-account">
          <T>Dont have an account yet ?</T>
          <Link href="/signup">
            <T>Sign up here!</T>
          </Link>
        </div>
        <div>
          <label>
            <T>Username</T>
            <span className="error">{form.getValidation('username').message}</span>
          </label>
          <Input
            name="username"
            type="text"
            required={true}
            requiredMessage={t('Username is mandatory')}
            regex="^[a-zA-Z0-9.]{1,20}$"
            regexMessage={t('Username must contain only alphanumeric chars (max 20)')}
          />
        </div>
        <div>
          <label>
            <T>Password</T>
            <span className="error">{form.getValidation('password').message}</span>
          </label>
          <Input name="password" type="password" required={true} requiredMessage={t('Password is mandatory')} />
        </div>
        <SubmitButton>
          <T>Submit</T>
        </SubmitButton>
        <pre className="debug">{JSON.stringify(values, null, 2)}</pre>
      </Form>
    </div>
  );
};

export default LoginPage;

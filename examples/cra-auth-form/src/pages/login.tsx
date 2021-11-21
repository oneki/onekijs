import { Input, SubmitButton, useForm, useLogin } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error, , submit] = useLogin();

  const { Form, submitting } = useForm(submit);

  return (
    <div className="login-container">
      <Form className="login-form">
        <p>
          Two profiles are available
          <ul>
            <li>Admin profile: username = admin / password = admin</li>
            <li>User profile: username = user / password = user</li>
          </ul>
        </p>
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
        {error && (
          <div style={{ color: 'red' }}>
            Error: {error.code} {error.message}
          </div>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;

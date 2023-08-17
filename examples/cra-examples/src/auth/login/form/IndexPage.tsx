import { Form, Input, SubmitButton, useFormController, useLogin } from 'onekijs';
import React from 'react';

const FormLoginPage: React.FC = () => {
  // useLogin provides a 'submit' method that sends the credentials
  // to a backend server. The URL/path of the backend server is
  // configured in src/settings.ts like this
  // const settings = {
  //   ...
  //   idp: {
  //     default: {
  //       type: 'form',
  //       loginEndpoint: '/api/auth/login',
  //       logoutEndpoint: '/api/auth/logout',
  //       userinfoEndpoint: '/api/userinfo', // backend api to retrieve the profile of the logged-in user
  //     },
  //   },
  //   routes: {
  //     login: '/auth-form/login',
  //     logout: '/auth-form/logout',
  //     home: '/', // redirected to this URL after a logout
  //   },
  // }
  const [error, , submit] = useLogin();

  const form = useFormController();
  const { submitting } = form.state;

  return (
    <div className="login-container">
      <Form className="login-form" controller={form} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}

        <div>
          <label>Username2</label>
          <Input name="username" type="text"  defaultValue="demo"/>
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

export default FormLoginPage;

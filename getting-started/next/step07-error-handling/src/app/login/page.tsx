'use client';

import { Form, Input, SubmitButton, useFormController, useLogin, useSubmit } from 'onekijs-next';

function LoginSubmitButton() {
  const { submitting } = useSubmit();
  return <SubmitButton type="submit">{submitting ? 'Submitting...' : 'Submit'}</SubmitButton>;
}

export default function LoginPage() {
  const [error, , submit] = useLogin();
  const controller = useFormController();

  return (
    <div className="login-container">
      <Form className="login-form" controller={controller} onSubmit={submit}>
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
        <LoginSubmitButton />
      </Form>
    </div>
  );
}

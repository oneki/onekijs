'use client';

import { Form, Input, SubmitButton, useFormController, useLogin, useSubmit, useTranslation } from 'onekijs-next';

function LoginSubmitButton() {
  const { submitting } = useSubmit();
  const [, t] = useTranslation();
  return <SubmitButton type="submit">{submitting ? t('Submitting...') : t('Submit')}</SubmitButton>;
}

export default function LoginPage() {
  const [error, , submit] = useLogin();
  const [T] = useTranslation();
  const controller = useFormController();

  return (
    <div className="login-container">
      <Form className="login-form" controller={controller} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}
        <p>
          <T>Use any username / password (no check performed)</T>
        </p>
        <div>
          <label><T>Username</T></label>
          <Input name="username" type="text" />
        </div>
        <div>
          <label><T>Password</T></label>
          <Input name="password" type="password" />
        </div>
        <LoginSubmitButton />
      </Form>
    </div>
  );
}

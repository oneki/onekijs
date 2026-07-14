'use client';

import Link from 'next/link';
import {
  Form,
  Input,
  SubmitButton,
  useFormController,
  useLogin,
  useSubmit,
  useTranslation,
  useValidation,
  useValue,
} from 'onekijs-next';

function LoginFields() {
  const [T, t] = useTranslation();
  const usernameValidation = useValidation('username');
  const passwordValidation = useValidation('password');
  const values = useValue();

  return (
    <>
      <div>
        <label>
          <T>Username</T>
          <span className="error">{usernameValidation.message}</span>
        </label>
        <Input
          name="username"
          type="text"
          required
          requiredMessage={t('Username is mandatory')}
          regex="^[a-zA-Z0-9.]{1,20}$"
          regexMessage={t('Username must contain only alphanumeric chars (max 20)')}
        />
      </div>
      <div>
        <label>
          <T>Password</T>
          <span className="error">{passwordValidation.message}</span>
        </label>
        <Input name="password" type="password" required requiredMessage={t('Password is mandatory')} />
      </div>
      <pre className="debug">{JSON.stringify(values, null, 2)}</pre>
    </>
  );
}

function LoginSubmitButton() {
  const { submitting } = useSubmit();
  const [T] = useTranslation();
  return <SubmitButton type="submit">{submitting ? <T>Submitting</T> : <T>Submit</T>}</SubmitButton>;
}

export default function LoginPage() {
  const [error, , submit] = useLogin();
  const [T, , locale] = useTranslation();
  const controller = useFormController();

  return (
    <div className="login-container">
      <Form className="login-form" controller={controller} onSubmit={submit}>
        {error && <div className="error">Error: {error.message}</div>}
        <div className="no-account">
          <T>Dont have an account yet ?</T>
          <Link href={`/${locale}/signup`}><T>Sign up here!</T></Link>
        </div>
        <LoginFields />
        <LoginSubmitButton />
      </Form>
    </div>
  );
}

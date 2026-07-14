'use client';

import {
  Form,
  Input,
  SubmitButton,
  asyncGet,
  useAuthService,
  useForm,
  useFormController,
  usePost,
  useRouter,
  useSubmit,
  useTranslation,
  useValidation,
  useValue,
} from 'onekijs-next';
import { useEffect } from 'react';
import { SignupRequest } from '../../../../data/dto/signup';

function UsernameAvailability() {
  const username = useValue('username') as string;
  const form = useForm<SignupRequest>();
  const [, t] = useTranslation();

  useEffect(() => {
    let cancelled = false;

    const validate = async () => {
      if (!username) {
        form.setError('username', 'usernameAlreadyExists', t('Username already exists'), false);
        return;
      }

      try {
        await asyncGet(`/api/users/${encodeURIComponent(username)}`);
        if (!cancelled) form.setError('username', 'usernameAlreadyExists', t('Username already exists'), true);
      } catch {
        if (!cancelled) form.setError('username', 'usernameAlreadyExists', t('Username already exists'), false);
      }
    };

    void validate();
    return () => {
      cancelled = true;
    };
  }, [form, t, username]);

  return null;
}

function SignupFields() {
  const [T, t] = useTranslation();
  const usernameValidation = useValidation('username');
  const passwordValidation = useValidation('password');

  return (
    <>
      <UsernameAvailability />
      <div>
        <label>
          <T>Username</T>
          <span className="error">{usernameValidation.message}</span>
        </label>
        <Input name="username" type="text" required requiredMessage={t('Username is mandatory')} regex="^[a-zA-Z0-9.]{1,20}$" regexMessage={t('Username must contain only alphanumeric chars (max 20)')} />
      </div>
      <div>
        <label>
          <T>Password</T>
          <span className="error">{passwordValidation.message}</span>
        </label>
        <Input name="password" type="password" required requiredMessage={t('Password is mandatory')} />
      </div>
    </>
  );
}

function SignupSubmitButton() {
  const { submitting } = useSubmit();
  const [T] = useTranslation();
  return <SubmitButton type="submit">{submitting ? <T>Submitting</T> : <T>Submit</T>}</SubmitButton>;
}

export default function SignupPage() {
  const authService = useAuthService();
  const router = useRouter();
  const [, , locale] = useTranslation();
  const [submit] = usePost<SignupRequest>('/api/auth/signup', {
    onSuccess: (user) => {
      authService.setSecurityContext(user);
      router.push(`/${locale}`);
    },
  });
  const controller = useFormController<SignupRequest>();

  return (
    <div className="signup-container">
      <Form className="signup-form" controller={controller} onSubmit={(values) => submit(values as SignupRequest)}>
        <SignupFields />
        <SignupSubmitButton />
      </Form>
    </div>
  );
}

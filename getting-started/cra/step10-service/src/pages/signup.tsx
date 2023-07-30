import {
  asyncGet,
  Form,
  Input,
  SubmitButton,
  useAuthService,
  useFormController,
  useFormWatcher,
  usePost,
  useRouter,
  useTranslation,
} from 'onekijs';
import React from 'react';

const SignupPage: React.FC = () => {
  const [T, t] = useTranslation();
  const authService = useAuthService();
  const router = useRouter();
  const [submit] = usePost('/auth/signup', {
    onSuccess: (user) => {
      // the API returns the user in the response
      // we set the user in the securityContext
      authService.setSecurityContext(user);
      router.push('/');
    },
  });

  const form = useFormController();

  useFormWatcher(form, 'username', async (username) => {
    let isError = false;
    try {
      await asyncGet(`/users/${username}`);
      isError = true; // user already exists on the server
    } catch {} // server returned a 404 response
    form.setError(
      'username', // field to put in error
      'usernameAlreadyExists', // validator name - must be unique by field
      t('Username already exists'), // error message
      isError, //flag indicating if there is an error or not
    );
  });

  return (
    <div className="signup-container">
      <Form className="signup-form" controller={form} onSubmit={submit}>
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
          <Input name="password" type="password" defaultValue="demo" required={true} requiredMessage={t('Password is mandatory')} />
        </div>
        <SubmitButton>
          <T>Submit</T>
        </SubmitButton>
      </Form>
    </div>
  );
};

export default SignupPage;

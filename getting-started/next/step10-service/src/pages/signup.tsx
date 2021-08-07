import {
  asyncGet,
  Input,
  SubmitButton,
  useAuthService,
  useForm,
  useRouter,
  usePost,
  useRule,
  useTranslation,
} from 'onekijs';
import React from 'react';

const SignupPage: React.FC = () => {
  const [T, t] = useTranslation();
  const authService = useAuthService();
  const router = useRouter();
  const [submit] = usePost('/api/auth/signup', {
    onSuccess: (user) => {
      // the API returns the user in the response
      // we set the securityContext to log in the user
      authService.setSecurityContext(user);
      router.push('/');
    },
  });
  const { Form, getValidation, getValue, setError } = useForm(submit);

  useRule(
    async (username) => {
      // username is coming from getValue('username') below
      // (second parameter of useRule)
      let isError = false;
      try {
        await asyncGet(`/api/users/${username}`);
        isError = true; // user already exists on the server
      } catch {} // server returned a 404 response
      setError(
        'username', // field to put in error
        'usernameAlreadyExists', // validator name - must be unique by field
        t('Username already exists'), // error message
        isError, //flag indicating if there is an error or not
      );
    },
    [getValue('username')], // a list of fields on which the rule reacts
  );

  return (
    <div className="signup-container">
      <Form className="signup-form">
        <div>
          <label>
            <T>Username</T>
            <span className="error">{getValidation('username').message}</span>
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
            <span className="error">{getValidation('password').message}</span>
          </label>
          <Input name="password" type="password" required={true} requiredMessage={t('Password is mandatory')} />
        </div>
        <SubmitButton>
          <T>Submit</T>
        </SubmitButton>
      </Form>
    </div>
  );
};

export default SignupPage;

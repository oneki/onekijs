import { Input, Select, SubmitButton, useBind, useForm, useLogin, useTranslation } from 'onekijs';
import React, { FC } from 'react';

const SignupPage: FC = () => {
  const [error, , submit] = useLogin();
  const [T, t] = useTranslation();
  const { Form, submitting, getValue } = useForm(submit);
  const showState = useBind((country: string) => country === 'usa', [getValue('country')]);
  const states: string[] = [];
  return (
    <div>
      <Form>
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
        <div>
          <label>
            <T>Confirm password</T>
          </label>
          <Input name="password" type="password" />
        </div>
        <div>
          <label>
            <T>Country</T>
          </label>
          <Select name="country" defaultValue="belgium">
            <option value="belgium">Belgium</option>
            <option value="usa">United States of America</option>
          </Select>
        </div>
        {showState && (
          <div>
            <label>
              <T>State</T>
            </label>
            <Select name="state">
              {states.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </Select>
          </div>
        )}
        <SubmitButton type="submit">
          {!submitting && t('Submit')}
          {submitting && t('Submitting...')}
        </SubmitButton>
      </Form>
    </div>
  );
};

export default SignupPage;

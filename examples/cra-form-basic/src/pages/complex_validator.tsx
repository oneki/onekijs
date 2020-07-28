import { Input, useForm } from 'onekijs';
import React, { useCallback, useEffect, useState } from 'react';

/**
 * This example explains how to create a complex validator
 */
export const ComplexValidatorPage = () => {
  const [result, setResult] = useState<string>();

  const submit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, getValidation, setError, getValue } = useForm(submit);

  const password = getValue('password');
  const confirmPassword = getValue('confirmPassword');

  // check the rules section for a better solution
  useEffect(() => {
    setError(
      'confirmPassword',
      'password-validator',
      "Passwords don't match",
      password !== confirmPassword
    );
  }, [setError, password, confirmPassword]);

  return (
    <>
      <Form>
        <div>
          <div>
            <b>Password: </b>
            <Input type="password" name="password" />
          </div>
          <div>
            <b>Confirm password: </b>
            <Input type="password" name="confirmPassword" />{' '}
            {getValidation('confirmPassword').status} :{' '}
            {getValidation('confirmPassword').message}
          </div>
          <button type="submit">Submit</button>
        </div>
      </Form>

      {result && (
        <div>
          <h2>Result</h2>
          <pre>{result}</pre>
        </div>
      )}
    </>
  );
};

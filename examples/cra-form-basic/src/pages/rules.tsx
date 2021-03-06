import {
  Input,
  Select,
  useForm,
  email,
  useRule,
  useFormContext,
  useValidation,
  InputProps,
} from 'onekijs';
import React, { useCallback, useState, FC } from 'react';

export const ConfirmPassword: FC<InputProps & { peer: string }> = props => {
  const { peer, ...inputProps } = props;
  const validation = useValidation(props.name);
  const { setError } = useFormContext();

  useRule(
    (password, confirmPassword) => {
      setError(
        props.name,
        'match',
        'Passwords do not match',
        password !== confirmPassword
      );
    },
    [peer, props.name]
  );

  return (
    <>
      <Input {...inputProps} type="password" />
      {validation.status} : {validation.message}
    </>
  );
};

export const RulesPage = () => {
  const [result, setResult] = useState<string>();

  const doSubmit = useCallback(data => {
    console.log('doSubmit')
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // Never pass any props of useForm to nested components. A nested component should always use useFormContext
  // to get these props (for performance reasons)
  const { Form, getValidation, setError, values } = useForm(doSubmit);

  // assignee must be set if status is not waiting_approval
  useRule(
    (status, assignee) => {
      setError(
        'assignee',
        'required',
        'Assignee is mandatory if status is not Waiting for approval',
        !assignee && status && status !== 'waiting_approval'
      );
    },
    [values.status, values.assignee]
  );

  return (
    <>
      {/* 
        The Form component acts as a FormContext.Provider and handle the submit action
        */}
      <Form>
        <div>
          <div>
            <b>Status: </b>
            <Select name="status" required>
              <option value="">Choose</option>
              <option value="waiting_approval">Waiting approval</option>
              <option value="started">Started</option>
              <option value="closed">Closed</option>
            </Select>
            {getValidation('status').status} : {getValidation('status').message}
          </div>
          <div>
            <b>Assignee: </b>
            <Input name="assignee" validators={[email('Invalid email')]} />
            {getValidation('assignee').status} :{' '}
            {getValidation('assignee').message}
          </div>
          <div>
            <b>Repository password: </b>
            <Input name="repo_password" type="password"  autoComplete="new-password" required />
            {getValidation('repo_password').status} :{' '}
            {getValidation('repo_password').message}
          </div>
          <div>
            <b>Confirm password: </b>
            <ConfirmPassword
              name="repo_confirm_password"
              peer="repo_password"
            />
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

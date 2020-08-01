import React, { FC } from 'react';
import { LoginOptions } from '../../typings';
import useLogin from '../../useLogin';
import useForm from '../../../form/useForm';
import Input from '../../../form/components/Input';
import SubmitButton from '../../../form/components/SubmitButton';

type FormLoginProps = {
  idpName?: string;
  options?: LoginOptions;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseLoginFormWidget: FC<FormLoginProps> = ({ idpName, options }) => {
  const [error, , submit] = useLogin(idpName, options);
  const { Form } = useForm(submit, {
    initialValues: {
      username: 'john.doe',
      password: 'secret',
    },
  });

  return (
    <>
      {error && <div data-test-id="error-container">{error.message || error.payload.message}</div>}
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Input id="username" name="username" />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <Input type="password" id="password" name="password" />
        </div>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </>
  );
};

export default UseLoginFormWidget;

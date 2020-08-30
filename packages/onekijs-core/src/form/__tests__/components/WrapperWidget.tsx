import React, { FC } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import useForm from '../../useForm';
import { FormProps } from '../utils/typings';

const WrapperWidget: FC<FormProps> = ({ submit, options }) => {
  const { Form, getValidation, reset } = useForm(submit, options);

  return (
    <>
      <Form>
        <div>
          <div>
            <label htmlFor="username">username</label>
            <Input id="username" name="username" required requiredMessage="This field is required" />
            <span data-testid="username-validation-code">{getValidation('username').code}</span>
            <span data-testid="username-validation-status">{getValidation('username').status}</span>
            <span data-testid="username-validation-message">{getValidation('username').message}</span>
          </div>
          <div>
            <label htmlFor="password">password</label>
            <Input id="password" type="password" name="password" />
            <span data-testid="password-validation-code">{getValidation('password').code}</span>
            <span data-testid="password-validation-status">{getValidation('password').status}</span>
            <span data-testid="password-validation-message">{getValidation('password').message}</span>
          </div>
          <div>
            <label htmlFor="gender">gender</label>
            <Select id="gender" name="gender" defaultValue="male">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
            <span data-testid="gender-validation-code">{getValidation('gender').code}</span>
            <span data-testid="gender-validation-status">{getValidation('gender').status}</span>
            <span data-testid="gender-validation-message">{getValidation('gender').message}</span>
          </div>
          <div>
            <label htmlFor="admin">admin</label>
            <Input id="admin" name="admin" type="checkbox" />
            <span data-testid="admin-validation-code">{getValidation('admin').code}</span>
            <span data-testid="admin-validation-status">{getValidation('admin').status}</span>
            <span data-testid="admin-validation-message">{getValidation('admin').message}</span>
          </div>
          <button data-testid="submit" type="submit">
            Submit
          </button>
          <div onClick={reset}>Reset</div>
        </div>
      </Form>
    </>
  );
};

export default WrapperWidget;

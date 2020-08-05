import React, { FC } from 'react';
import { FormSubmitCallback, FormOptions } from '../../typings';
import useForm from '../../useForm';
import regex from '../../validators/regex';
import required from '../../validators/required';

export type FormData = {
  name?: string;
  firstname?: string;
  gender?: string;
};

type FieldWidgetProps = {
  submit: FormSubmitCallback;
  options?: FormOptions;
};

const FieldValidationWidget: FC<FieldWidgetProps> = ({ submit, options }) => {
  const { Form, field, getValidation } = useForm(submit, options);

  return (
    <>
      <Form>
        <div>
          <div>
            <b>Name: </b>
            <input data-testid="name" {...field('name')} />
            <span data-testid="name-validation-code">{getValidation('name').code}</span>
            <span data-testid="name-validation-status">{getValidation('name').status}</span>
            <span data-testid="name-validation-message">{getValidation('name').message}</span>
          </div>
          <div>
            <b>Firstname: </b>
            <input
              data-testid="firstname"
              {...field('firstname', [
                required(),
                regex('^[a-zA-Z0-9-_]*$', 'Can only contains alphanumeric characters, dashes or underscores'),
              ])}
            />
            <span data-testid="firstname-validation-code">{getValidation('firstname').code}</span>
            <span data-testid="firstname-validation-status">{getValidation('firstname').status}</span>
            <span data-testid="firstname-validation-message">{getValidation('firstname').message}</span>
          </div>
          <div>
            <b>Gender: </b>

            <select data-testid="gender" {...field('gender', [], { defaultValue: 'male' })}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <span data-testid="gender-validation-code">{getValidation('gender').code}</span>
            <span data-testid="gender-validation-status">{getValidation('gender').status}</span>
            <span data-testid="gender-validation-message">{getValidation('gender').message}</span>
          </div>

          <button type="submit" data-testid="submit">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default FieldValidationWidget;

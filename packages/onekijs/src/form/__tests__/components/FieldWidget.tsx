import React, { FC } from 'react';
import { FormSubmitCallback } from '../../typings';
import useForm from '../../useForm';
import regex from '../../validators/regex';
import required from '../../validators/required';

export type FormData = {
  name?: string;
  firstname?: string;
  gender?: string;
  address?: {
    street?: string;
  };
};

type FieldWidgetProps = {
  submit: FormSubmitCallback;
  initialValues?: FormData;
};

const FieldWidget: FC<FieldWidgetProps> = ({ submit, initialValues }) => {
  const { Form, field, getValidation } = useForm(submit, {
    initialValues,
  });

  return (
    <>
      <Form>
        <div>
          <div>
            <b>Name: </b>
            <input data-testid="name" {...field('name')} />
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
            {getValidation('firstname').status} : {getValidation('firstname').message}
          </div>
          <div>
            <b>Street: </b>
            <input data-testid="address.street" {...field('address.street')} />
          </div>
          <div>
            <b>Gender: </b>

            <select data-testid="gender" {...field('gender', [], { defaultValue: 'male' })}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <button type="submit" data-testid="submit">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default FieldWidget;

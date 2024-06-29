import { Form, useFormController } from 'onekijs';
import { FormInput, SubmitButton } from 'onekijs-ui';
import { FC } from 'react';
import FormExample from '../../core/components/FormExample';

const FormInputBasicPage: FC = () => {
  // initiliaze the form controller that listens to any input changes
  const form = useFormController();

  // the method called when the form is submitted (can be an async method)
  const onSubmit = (value: any) => console.log(value);

  return (
    <FormExample form={form}> {/* FormExample is a decorator to print the content of the form on the second column */}
      <Form controller={form} onSubmit={onSubmit}>
        <FormInput
          name="email"
          label="Email"
          required={true}
          help={
            <>
              Your <b>email</b> will be used as username to log in
            </>
          }
          email={true}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password" // any "standard" input property is supported
          touchOn="focus" // trigger the validation as soon as there is a change (by default, the validation is triggered when the field loses focus)
          description="Must contains at least 8 characters"
          minLength={8}
          required={true}
        />
        <SubmitButton showErrors={true} />
      </Form>
    </FormExample>
  );
};

export default FormInputBasicPage;

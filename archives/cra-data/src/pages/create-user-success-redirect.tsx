import { Input, SubmitButton, useForm, usePost } from 'onekijs';
import React, { useState } from 'react';

const CreateUserSuccessRedirectPage: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>();

  const [submit] = usePost('/users', {
    onSuccess: '/', // redirect to / if the user is created successfully
    onError: (error) => {
      setErrorMsg(`An error occured while adding the product to the cart: ${error.code} ${error.message}`);
    },
  });
  const { Form } = useForm(submit);
  return (
    <div>
      {errorMsg && <div>{errorMsg}</div>}
      <Form>
        <div>
          First name: <Input name="firstname" type="text" />
        </div>
        <div>
          Name: <Input name="name" type="text" />
        </div>
        <SubmitButton>Create user</SubmitButton>
      </Form>
    </div>
  );
};

export default CreateUserSuccessRedirectPage;

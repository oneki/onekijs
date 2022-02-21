import { Input, SubmitButton, useForm, useParams, usePut } from 'onekijs';
import React from 'react';

const EditUserPage: React.FC = () => {
  const { userId } = useParams();
  const [submit] = usePut(`/users/${userId}`, {
    onSuccess: '/', // redirect to / if the user is created successfully
    onError: (error) => {
      window.alert(`An error occured while editing the user: ${error.code} ${error.message}`);
    },
  });
  const { Form, fetching } = useForm(submit, {
    initialValues: `/users/${userId}`,
  });

  if (fetching) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <Form>
        <div>
          First name: <Input name="firstname" type="text" />
        </div>
        <div>
          Name: <Input name="name" type="text" />
        </div>
        <SubmitButton>Edit user</SubmitButton>
      </Form>
    </div>
  );
};

export default EditUserPage;

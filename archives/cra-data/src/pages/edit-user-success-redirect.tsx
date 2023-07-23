import { Input, SubmitButton, useForm, useGet, useParams, usePut } from 'onekijs';
import React from 'react';

const EditForm: React.FC<any> = ({ submit, user }) => {
  const { Form } = useForm(submit, {
    initialValues: user,
  });
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

const EditUserSuccessRedirectPage: React.FC = () => {
  const { userId } = useParams();
  const [user, loading] = useGet(`/users/${userId}`);
  const [submit] = usePut(`/users/${userId}`, {
    onSuccess: '/', // redirect to / if the user is created successfully
    onError: (error) => {
      window.alert(`An error occured while editing the user: ${error.code} ${error.message}`);
    },
  });

  if (loading) {
    return <div>loading ...</div>;
  }

  if (user) {
    return <EditForm submit={submit} user={user} />;
  }

  return null;
};

export default EditUserSuccessRedirectPage;

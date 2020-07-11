import { useGet, usePut, useSetting } from 'onekijs-cra';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../../../components/userForm';

export default () => {
  // userId is present in the URL: /users/:userId
  // useParams is a hook coming from react-router-dom
  const { userId } = useParams();

  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  // useGet sends a ajax GET request. Check useGet documentation for more info.
  const [user, loading] = useGet(`${baseUrl}/api/users/${userId}`);
  const [put, submitLoading] = usePut(`${baseUrl}/api/users/${userId}`, {
    onSuccess: `/users/${userId}`, // redirect to /users/:userId if no error
  });

  if (loading) return <div>Loading ...</div>;
  return (
    <div>
      {user && (
        <UserForm
          type="edit"
          user={user}
          loading={submitLoading}
          onSubmit={put}
        />
      )}
    </div>
  );
};

import { useGet, usePut, useSetting, useParams } from 'onekijs';
import React from 'react';
import UserForm from '../../../components/userForm';
import { User } from '../../../types';

export default (): JSX.Element => {
  // userId is present in the URL: /users/:userId
  // useParams is a hook coming from react-router-dom
  const { userId } = useParams();

  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  // useGet sends a ajax GET request. Check useGet documentation for more info.
  const [user, loading] = useGet<User>(`${baseUrl}/api/users/${userId}`);
  const [put, submitLoading] = usePut(`${baseUrl}/api/users/${userId}`, {
    onSuccess: `/users/${userId}`, // redirect to /users/:userId if no error
  });

  if (loading) return <div>Loading ...</div>;
  return <div>{user && <UserForm type="edit" user={user} loading={submitLoading} onSubmit={put} />}</div>;
};

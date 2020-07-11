import { usePost, useSetting } from 'onekijs-cra';
import React from 'react';
import UserForm from '../../../components/userForm';

export default () => {
  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  const [post, submitLoading] = usePost(`${baseUrl}/api/users`, {
    // if the ajax POST request is successful, redirect to the /users page
    onSuccess: '/users',
  });

  return (
    <div>
      <UserForm type="create" loading={submitLoading} onSubmit={post} />
    </div>
  );
};

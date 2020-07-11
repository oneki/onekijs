import { useGet, useSetting, useDelete } from 'onekijs-cra';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default () => {
  // userId is present in the URL: /users/:userId
  // useParams is a hook coming from react-router-dom
  const { userId } = useParams();

  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  // retrieve the user via an ajax GET request
  const [user, loading] = useGet(`${baseUrl}/api/users/${userId}`);

  const [del, deleteLoading] = useDelete(`${baseUrl}/api/users/${userId}`, {
    onSuccess: '/users',
  });

  if (loading) return <div>Loading ...</div>;

  return (
    <>
      {user && (
        <div>
          <h2>Details of user {userId}</h2>[
          <Link to={location => `${location.pathname}/edit`}>edit</Link>]
          <li>
            <b>Name: </b> {user.name}
          </li>
          <li>
            <b>Firstname: </b> {user.firstname}
          </li>
          <button onClick={() => del()}>
            {deleteLoading ? 'loading ...' : 'delete'}
          </button>
        </div>
      )}
    </>
  );
};

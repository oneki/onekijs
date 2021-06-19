import { Link, useDelete, useGet, useLocation, useParams, useSetting } from 'onekijs';
import React from 'react';
import { User } from '../../../types';

export default (): JSX.Element => {
  // userId is present in the URL: /users/:userId
  // useParams is a hook coming from react-router-dom
  const { userId } = useParams();
  const location = useLocation();

  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  // retrieve the user via an ajax GET request
  const [user, loading] = useGet<User>(`${baseUrl}/api/users/${userId}`);

  const [del, deleteLoading] = useDelete(`${baseUrl}/api/users/${userId}`, {
    onSuccess: '/users',
  });

  if (loading) return <div>Loading ...</div>;

  return (
    <>
      {user && (
        <div>
          <h2>Details of user {userId}</h2>[<Link href={`${location.pathname}/edit`}>edit</Link>]
          <li>
            <b>Name: </b> {user.name}
          </li>
          <li>
            <b>Firstname: </b> {user.firstname}
          </li>
          <button onClick={() => del()}>{deleteLoading ? 'loading ...' : 'delete'}</button>
        </div>
      )}
    </>
  );
};

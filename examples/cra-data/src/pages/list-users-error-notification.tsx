import { useGet, useNotifications } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const ListUsersErrorNotificationPage: React.FC = () => {
  const [usersResponse, loading] = useGet<UsersResponse>('/users-error');
  const errors = useNotifications('error');

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (errors) {
    return (
      <>
        {errors.map((error) => (
          <div key={error.id}>
            <span>
              An error occured: {error.payload.code} {error.payload.message} <button onClick={error.remove}>x</button>
            </span>
          </div>
        ))}
      </>
    );
  }
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {usersResponse?.users &&
          usersResponse.users.map((user, index) => (
            <li key={index}>
              {user.firstname} {user.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListUsersErrorNotificationPage;

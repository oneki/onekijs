import { useGet } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const ListUsersDelayPage: React.FC = () => {
  const [usersResponse, loading] = useGet<UsersResponse>('/users', {
    delayLoading: 100,
    defaultValue: {
      users: [],
    },
  });

  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <ul>
        {usersResponse.users.map((user, index) => (
          <li key={index}>
            {user.firstname} {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsersDelayPage;

import { useGet } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const ListUsersOnErrorPage: React.FC = () => {
  const [usersResponse, loading] = useGet<UsersResponse>('/users-error', {
    onError: (error) => {
      window.alert(`An error occured: ${error.code} ${error.message}`);
    },
  });

  if (loading) {
    return <div>Loading ...</div>;
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

export default ListUsersOnErrorPage;

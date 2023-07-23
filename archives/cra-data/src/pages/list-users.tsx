import { useGet } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const ListUsersPage: React.FC = () => {
  // perform an AJAX GET request to retrieve all users
  // the response looks like this:
  // {
  //   "users": [{...}]
  // }
  const [usersResponse, loading] = useGet<UsersResponse>('/users');
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

export default ListUsersPage;

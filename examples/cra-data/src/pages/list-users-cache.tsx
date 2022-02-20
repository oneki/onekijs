import { useCache } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const ListUsersCachePage: React.FC = () => {
  const [usersResponse, loading] = useCache<UsersResponse>('/users', {
    ttl: 3600, // cache the data for one hour
  });
  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <p>Tip: navigating to another page and coming back to this one will not execute an AJAX GET request</p>
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

export default ListUsersCachePage;

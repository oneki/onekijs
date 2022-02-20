import { Link, useDelete, useGet, useRouter } from 'onekijs';
import React from 'react';
import { UsersResponse } from '../__server__/dto/user';

const IndexPage: React.FC = () => {
  // perform an AJAX GET request to retrieve all users
  // the response looks like this:
  // {
  //   "users": [{...}]
  // }
  const router = useRouter();
  const [usersResponse, loading, refresh] = useGet<UsersResponse>('/users');
  const [del] = useDelete('/users/:userId', {
    onSuccess: refresh,
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
              {user.firstname} {user.name} <button onClick={() => router.push(`/edit-user/${user.id}`)}>Edit</button>{' '}
              <button
                onClick={() =>
                  del({
                    params: { userId: `${user.id}` },
                  })
                }
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <Link href="/create-user-success-redirect">Add user</Link>
    </div>
  );
};

export default IndexPage;

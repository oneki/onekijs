import { useGet, useNotificationService, useSetting } from 'onekijs-cra';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const notificationService = useNotificationService();
  const onError = useCallback(
    e => {
      notificationService.error(e);
      // the Time to Leave of the error is taken from
      // settings.notification.error.ttl
      // if you want a custom ttl for this error, you have to use
      // the send method
      // notificationService.send({
      //   topic: 'error',
      //   ttl: 1000,
      //   payload: e
      // })
    },
    [notificationService]
  );

  // baseUrl is defined in settings.js
  const baseUrl = useSetting('server.baseUrl');

  // call useGet to retrieve the list of users
  const [users, loading] = useGet(`${baseUrl}/api/users`, {
    onError,
  });

  // Display a loading indicator while the request is pending
  if (loading) return <div>Loading ...</div>;

  return (
    <>
      {users && (
        <ul>
          {users.map(user => (
            <li key={`key-${user.id}`}>
              <Link to={location => `${location.pathname}/${user.id}`}>
                {user.firstname} {user.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to={location => `${location.pathname}/create`}>Add a user</Link>
    </>
  );
};

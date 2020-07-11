/* eslint-disable react/prop-types */
import { useNotifications, useNotificationService } from 'onekijs-cra';
import React, { useCallback } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Users from '../../routes/users/Users';

const Main = React.memo(() => {
  const errors = useNotifications('error');
  const successes = useNotifications('success');

  return (
    <div>
      {/* Simple Notification handler */}
      {errors.map((error, index) => (
        <ErrorMessage key={`error-${index}`} error={error} />
      ))}
      {successes.map((success, index) => (
        <div
          style={{ padding: '10px', background: 'green', color: 'white' }}
          key={`success-${index}`}
        >
          {success.payload.message}
        </div>
      ))}

      {/* Simple Menu */}
      <div style={headerStyle}>
        <Link to="/">Home</Link> | <Link to="/users">Users</Link>
      </div>

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <div>Homepage</div>
        </Route>
      </Switch>

      <div style={footerStyle}>This is the footer</div>
    </div>
  );
});
Main.displayName = 'Main';

const ErrorMessage = React.memo(({ error }) => {
  // inject the notification service
  const notificationService = useNotificationService();

  const removeError = useCallback(() => {
    notificationService.remove(error.id);
  }, [notificationService, error]);

  return (
    <div style={{ padding: '10px', background: 'red', color: 'white' }}>
      <span
        style={{ paddingRight: '10px', paddingLeft: '10px', cursor: 'pointer' }}
        onClick={removeError}
      >
        X
      </span>
      {error.payload.message}
    </div>
  );
});
ErrorMessage.displayName = 'Main';

const headerStyle = {
  backgroundColor: '#ccc',
  lineHheight: '40px',
  fontSize: '18px',
  paddingLeft: '20px',
};

const footerStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: '#666',
  color: 'white',
  textAlign: 'center',
  lineHeight: '100px',
};

export default Main;

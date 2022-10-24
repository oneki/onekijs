import { useNotifications, useNotificationService, useSecurityContext } from 'onekijs';
import React, { FC } from 'react';

// Very simple Notification Widget
const NotificationCenter: FC = () => {
  const errors = useNotifications('error');
  const successes = useNotifications('success');
  const notificationService = useNotificationService();

  return (
    <>
      <div>
        {errors.map((notification) => (
          <div style={{ backgroundColor: 'red', margin: '5px', padding: '5px' }} key={notification.id}>
            {notification.payload.message}
            <button onClick={() => notificationService.remove(notification.id)}>X</button>
          </div>
        ))}
        {successes.map((notification) => (
          <div style={{ backgroundColor: 'green', margin: '5px', padding: '5px' }} key={notification.id}>
            {notification.payload.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationCenter;

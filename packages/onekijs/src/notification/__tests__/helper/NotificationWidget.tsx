import React, { FC } from 'react';
import useNotifications from '../../useNotifications';

const NotificationWidget: FC = () => {
  const errors = useNotifications('error');
  const successes = useNotifications('success');

  return (
    <>
      <div>
        {errors.map((notification) => (
          <div style={{ backgroundColor: 'red' }} key={notification.id} data-testid={notification.id}>
            {notification.payload.message}
          </div>
        ))}
        {successes.map((notification) => (
          <div style={{ backgroundColor: 'green' }} key={notification.id} data-testid={notification.id}>
            {notification.payload.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationWidget;

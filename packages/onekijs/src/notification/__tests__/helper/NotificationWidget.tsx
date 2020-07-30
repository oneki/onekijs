import React, { FC } from 'react';
import useNotifications from '../../useNotifications';

const NotificationWidget: FC = () => {
  const errors = useNotifications('error');
  const successes = useNotifications('success');

  return (
    <>
      <div>
        {errors.length > 0 && (
          <div data-testid="notifications-error-container">
            {errors.map((notification) => (
              <div style={{ backgroundColor: 'red' }} key={notification.id} data-testid={notification.id}>
                {notification.payload.message}
              </div>
            ))}
          </div>
        )}
        {successes.length > 0 && (
          <div data-testid="notifications-success-container">
            {successes.map((notification) => (
              <div style={{ backgroundColor: 'green' }} key={notification.id} data-testid={notification.id}>
                {notification.payload.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationWidget;

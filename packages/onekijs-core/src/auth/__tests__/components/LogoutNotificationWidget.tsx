import React, { FC } from 'react';
import useNotifications from '../../../notification/useNotifications';

const LogoutNotificationWidget: FC = () => {
  const errors = useNotifications('logout-error');

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
      </div>
    </>
  );
};

export default LogoutNotificationWidget;

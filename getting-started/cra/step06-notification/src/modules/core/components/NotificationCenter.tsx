import { useNotifications } from 'onekijs';
import React from 'react';

const NotificationCenter: React.FC = () => {
  const notifications = useNotifications();
  console.log(notifications);
  return (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`snackbar ${notification.topic}`}
          style={{ bottom: `${60 * index + 30}px` }}
        >
          <span>{notification.payload.message}</span>
          <span className="close" onClick={() => notification.remove()}>
            x
          </span>
        </div>
      ))}
    </>
  );
};

export default NotificationCenter;

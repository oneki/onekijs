import { Notification, useNotifications } from 'onekijs-next';
import React from 'react';
import { NOTIF_TOPIC_ERROR, NOTIF_TOPIC_SUCCESS } from '../libs/constants';

const NotificationCenter: React.FC = () => {
  const errors = useNotifications(NOTIF_TOPIC_ERROR);
  const successes = useNotifications(NOTIF_TOPIC_SUCCESS);
  const notifications = mergeNotifications(errors, successes);

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

// Merge all notifications and order them by timestamp
const mergeNotifications = (a: Notification[], b: Notification[]): Notification[] => {
  return a.concat(b).sort((a, b) => a.timestamp - b.timestamp);
};

export default NotificationCenter;

import { useNotificationService } from 'onekijs';
import React, { useCallback } from 'react';

const NotificationPage: React.FC = () => {
  const notificationService = useNotificationService();

  // Function to send a notification on the topic referenced by the attribute "type"
  const sendNotification = useCallback(
    (type, msg, ttl = 0) => {
      notificationService.send({
        topic: type,
        ttl: ttl,
        payload: {
          message: msg,
        },
      });
    },
    [notificationService],
  );

  return (
    <div>
      <button onClick={() => sendNotification('error', 'This is an error message')}>Send an error notification</button>|
      <button onClick={() => sendNotification('success', 'This is a sucess message', 2000)}>
        Send a success notification
      </button>
    </div>
  );
};

export default NotificationPage;

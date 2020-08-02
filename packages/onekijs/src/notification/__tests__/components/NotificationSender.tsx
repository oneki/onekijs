import React, { FC } from 'react';
import { NotificationContent } from '../../typings';
import useNotificationService from '../../useNotificationService';

type NotificationSenderProps = {
  notifications: NotificationContent[];
};

const NotificationSender: FC<NotificationSenderProps> = ({ notifications }) => {
  // inject the central notificationService
  const notificationService = useNotificationService();
  return (
    <div>
      {notifications.map((notification) => (
        <button onClick={() => notificationService.send(notification)} key={notification.id}>
          {`Send a ${notification.payload.message} notification`}
        </button>
      ))}
    </div>
  );
};

export default NotificationSender;

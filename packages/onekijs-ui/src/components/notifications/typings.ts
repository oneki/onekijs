import { Notification } from 'onekijs-framework';
import { FC } from 'react';

export type NotificationsProps = {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animate?: number;
  topics?: string[];
  NotificationComponent?: FC<NotificationProps>;
  max?: number;
};

export type NotificationProps = {
  className?: string;
  notification: Notification;
  index: number;
};

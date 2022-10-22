import { Notification } from 'onekijs-framework';
import { FC } from 'react';

export type NotificationsProps = {
  animate?: number;
  className?: string;
  NotificationComponent?: FC<NotificationProps>;
  max?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showTimer?: boolean;
  topics?: string[];
};

export type NotificationProps = {
  className?: string;
  notification: Notification;
  index: number;
  showTimer?: boolean;
};

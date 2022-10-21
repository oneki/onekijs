import React, { ReactNode } from 'react';
import { NotificationContent } from './typings';

export const isNotificationContent = (
  notification: NotificationContent | ReactNode,
): notification is NotificationContent => {
  return !React.isValidElement(notification) && !(typeof notification === 'string');
};

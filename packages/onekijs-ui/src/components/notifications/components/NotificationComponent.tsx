import { get, NotificationLevel, useNotificationService } from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { addClassname } from '../../../utils/style';
import CloseIcon from '../../icon/CloseIcon';
import DebugIcon from '../../icon/DebugIcon';
import ErrorIcon from '../../icon/ErrorIcon';
import InfoIcon from '../../icon/InfoIcon';
import SuccessIcon from '../../icon/SuccessIcon';
import WarningIcon from '../../icon/WarningIcon';
import { NotificationProps } from '../typings';

const NotificationComponent: React.FC<NotificationProps> = ({ className, notification }) => {
  const classNames = addClassname(`o-notification o-notification-${notification.topic}`, className);
  const notificationService = useNotificationService();
  const content = get<ReactNode>(notification, 'payload.message', get(notification, 'payload', null));
  let Icon = null;
  switch (notification.topic) {
    case NotificationLevel.Error:
      Icon = <ErrorIcon width="32px" height="32px" />;
      break;
    case NotificationLevel.Success:
      Icon = <SuccessIcon width="32px" height="32px" />;
      break;
    case NotificationLevel.Info:
      Icon = <InfoIcon width="32px" height="32px" />;
      break;
    case NotificationLevel.Debug:
      Icon = <DebugIcon width="32px" height="32px" />;
      break;
    case NotificationLevel.Warning:
      Icon = <WarningIcon width="32px" height="32px" />;
      break;
  }

  return (
    <div className={classNames}>
      <span className="o-notification-close">
        <CloseIcon width="20px" height="20px" onClick={() => notificationService.remove(notification.id)} />
      </span>
      {Icon && <div className="o-notification-icon">{Icon}</div>}
      <div className="o-notification-content">{content}</div>
    </div>
  );
};

export default NotificationComponent;

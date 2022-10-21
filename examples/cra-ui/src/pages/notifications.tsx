import { NotificationLevel, useNotificationService } from 'onekijs';
import { Button, ComponentStyle, Notifications, paddingX } from 'onekijs-ui';
import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

const notifcationsStyle: ComponentStyle<{}> = () => {
  return css`
    ${paddingX('400px')}
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const [position, setPosition] = useState('bottom-right');
  const service = useNotificationService();
  const sendNotification = (level: NotificationLevel, message: ReactNode) => {
    switch (level) {
      case NotificationLevel.Error:
        service.error(message);
        break;
      case NotificationLevel.Info:
        service.info(message);
        break;
      case NotificationLevel.Success:
        service.success(message);
        break;
      case NotificationLevel.Debug:
        service.debug(message);
        break;
      case NotificationLevel.Warning:
        service.warning(message);
        break;
      default:
        service.send(message);
        break;
    }
  };

  return (
    <div className={className}>
      <Button
        kind="danger"
        onClick={() =>
          sendNotification(
            NotificationLevel.Error,
            <>
              This is an <b>error</b>
            </>,
          )
        }
      >
        Send Error
      </Button>
      <Button kind="info" onClick={() => sendNotification(NotificationLevel.Info, 'This is an info')}>
        Send Info
      </Button>
      <Button kind="success" onClick={() => sendNotification(NotificationLevel.Success, 'This is a success')}>
        Send Success
      </Button>
      <Button kind="light" onClick={() => sendNotification(NotificationLevel.Debug, 'This is a debug')}>
        Send Debug
      </Button>
      <Button kind="warning" onClick={() => sendNotification(NotificationLevel.Warning, 'This is a warning')}>
        Send Warning
      </Button>
      <br />
      <br />
      <Button onClick={() => setPosition('top-left')}>Top Left</Button>
      <Button onClick={() => setPosition('bottom-left')}>Bottom Left</Button>
      <Button onClick={() => setPosition('bottom-right')}>Bottom Right</Button>
      <Button onClick={() => setPosition('top-right')}>Top Right</Button>
      <Notifications position={position as any} />
    </div>
  );
};

export const NotificationsPage = styled(Page)`
  ${notifcationsStyle}
`;

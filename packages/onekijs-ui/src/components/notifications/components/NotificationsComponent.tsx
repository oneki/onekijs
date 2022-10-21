import { useNotifications } from 'onekijs-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { NotificationsProps } from '../typings';
import DefaultNotificationComponent from './NotificationComponent';

const NotificationsComponent: React.FC<NotificationsProps> = ({
  className,
  topics,
  NotificationComponent = DefaultNotificationComponent,
  max,
  animate = 500,
}) => {
  const classNames = addClassname('o-notifications', className);
  let notifications = useNotifications(topics);
  if (max) {
    notifications = notifications.slice(0, max);
  }

  const onExiting = (node: HTMLElement) => {
    node.style.transform = 'translateX(0px)';
    node.style.opacity = '1';
    node.style.transition = `all ${animate}ms`;
    setTimeout(() => {
      node.style.transform = 'translateX(-100px)';
      node.style.opacity = '0';
    }, 0);
  };

  const onEntering = (node: HTMLElement) => {
    node.style.transform = 'translateX(-100px)';
    node.style.opacity = '0';
    node.style.transition = `all ${animate}ms`;
    setTimeout(() => {
      node.style.transform = 'translateX(0px)';
      node.style.opacity = '1';
    }, 0);
  };

  const element = (
    <div className={classNames}>
      <TransitionGroup component={null}>
        {notifications.map((notification, index) => (
          <CSSTransition
            timeout={animate}
            classNames="o-notification-animation"
            mountOnEnter={true}
            appear={true}
            unmountOnExit={true}
            key={`o-notification-${notification.id}`}
            onEntering={onEntering}
            onExiting={onExiting}
          >
            <NotificationComponent notification={notification} index={index} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
  return <>{ReactDOM.createPortal(element, document.body)}</>;
};

export default NotificationsComponent;

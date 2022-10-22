import { useNotifications } from 'onekijs-framework';
import React, { useRef } from 'react';
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
  position = 'bottom-right',
  showTimer,
}) => {
  const classNames = addClassname('o-notifications', className);
  const translateX = position === 'top-right' || position === 'bottom-right' ? '250px' : '-250px';
  let notifications = useNotifications(topics);
  if (max) {
    notifications = notifications.slice(0, max);
  }
  const bodyOverflowXRef = useRef<string>('unset');
  const bodyOverflowYRef = useRef<string>('unset');

  const onExiting = (node: HTMLElement) => {
    bodyOverflowXRef.current = document.body.style.overflowX || document.body.style.overflow || 'unset';
    bodyOverflowYRef.current = document.body.style.overflowY || document.body.style.overflow || 'unset';
    node.style.transform = 'translateX(0px)';
    node.style.opacity = '1';
    node.style.transition = `transform ${animate}ms, opacity ${animate}ms, height ${animate / 2}ms ease-out ${
      animate / 2
    }ms`;

    node.style.height = `${node.getBoundingClientRect().height}px`;
    if (document.body.scrollWidth <= document.body.clientWidth) {
      document.body.style.overflowX = 'hidden';
    }
    setTimeout(() => {
      node.style.transform = `translateX(${translateX})`;
      node.style.opacity = '0';
      node.style.overflowY = 'hidden';
      node.style.height = '0';
    }, 0);
  };

  const onExited = () => {
    document.body.style.overflowX = bodyOverflowXRef.current;
    document.body.style.overflowY = bodyOverflowYRef.current;
  };

  const onEntering = (node: HTMLElement) => {
    bodyOverflowXRef.current = document.body.style.overflowX || document.body.style.overflow || 'unset';
    bodyOverflowYRef.current = document.body.style.overflowY || document.body.style.overflow || 'unset';
    if (document.body.scrollWidth <= document.body.clientWidth) {
      document.body.style.overflowX = 'hidden';
    }
    if (document.body.scrollHeight <= document.body.clientHeight) {
      document.body.style.overflowY = 'hidden';
    }

    node.style.opacity = '0';
    node.style.transition = `height ${animate}ms, transform ${animate / 2}ms`;
    const currentHeight = node.getBoundingClientRect().height;
    if (position === 'bottom-right' || position === 'bottom-left') {
      node.style.height = '0';
    } else {
      node.style.transform = `translateX(${translateX})`;
    }

    setTimeout(() => {
      if (position === 'bottom-right' || position === 'bottom-left') {
        node.style.transform = 'translateY(0px)';
        node.style.height = `${currentHeight}px`;
      } else {
        node.style.transform = 'translateX(0px)';
      }
      node.style.opacity = '1';
    }, 0);
  };

  const onEntered = () => {
    document.body.style.overflowX = bodyOverflowXRef.current;
    document.body.style.overflowY = bodyOverflowYRef.current;
  };

  const element = (
    <div className={classNames}>
      <TransitionGroup component={null}>
        {notifications.map((notification, index) => (
          <CSSTransition
            timeout={{
              appear: animate * 2,
              enter: animate * 2,
              exit: animate * 2,
            }}
            classNames="o-notification-animation"
            mountOnEnter={true}
            appear={true}
            unmountOnExit={true}
            key={`o-notification-${notification.id}`}
            onEntering={onEntering}
            onExiting={onExiting}
            onEntered={onEntered}
            onExited={onExited}
          >
            <div className="o-notification-container">
              <NotificationComponent notification={notification} index={index} showTimer={showTimer} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
  return <>{ReactDOM.createPortal(element, document.body)}</>;
};

export default NotificationsComponent;

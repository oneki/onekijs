import { ReactNode } from 'react';
import { delay } from 'redux-saga/effects';
import DefaultGlobalService from '../app/GlobalService';
import { reducer, saga, service } from '../core/annotations';
import { AppSettings } from '../types/app';
import { SagaEffect } from '../types/saga';
import { append, get, isNull, set } from '../utils/object';
import { Notification, NotificationContent, NotificationLevel } from './typings';
import { isNotificationContent } from './utils';

let nextId = 1;

@service
export default class NotificationService extends DefaultGlobalService {
  init(): void {
    this.context.router.listen(this.onRouteChange);
  }

  @reducer
  add(notification: Notification): void {
    const max: number = get(
      this.context.settings,
      `notification.${notification.topic}.max`,
      get(this.context.settings, `notification.default.max`, 0),
    );

    append(this.state, `notifications.${notification.topic}`, notification);
    if (max > 0 && this.state.notifications[notification.topic].length > max) {
      this.state.notifications[notification.topic].shift();
    }
  }

  @reducer
  clearTopic(topic: string): void {
    set(this.state, `notifications.${topic}`, []);
  }

  @reducer
  clearAll(): void {
    this.state.notifications = {};
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *debug(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Debug, payload));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *error(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Error, payload));
  }

  formatNotification(
    notificationContent: NotificationContent | ReactNode,
    settings: AppSettings,
    notificationService: NotificationService,
  ): Notification {
    if (!isNotificationContent(notificationContent)) {
      notificationContent = {
        payload: notificationContent,
      };
    }

    const persist: boolean = get(
      settings,
      `notification.${notificationContent.topic}.persist`,
      get(settings, `notification.default.persist`, true),
    );

    if (notificationContent.ttl === undefined) {
      notificationContent.ttl = get(
        settings,
        `notification.${notificationContent.topic}.ttl`,
        get(settings, `notification.default.ttl`),
      );
    }

    const timestamp =
      notificationContent.timestamp === undefined ? new Date().getTime() : notificationContent.timestamp;
    const id = notificationContent.id === undefined ? `oneki-id-${++nextId}` : notificationContent.id;
    const topic = notificationContent.topic === undefined ? 'default' : notificationContent.topic;
    const expires = notificationContent.ttl ? timestamp + notificationContent.ttl : null;

    const notification: Notification = {
      id,
      topic,
      timestamp,
      persist: notificationContent.persist === undefined ? persist : notificationContent.persist,
      ttl: notificationContent.ttl,
      remove: () => {
        notificationService.remove(id);
      },
      expires,
      payload: notificationContent.payload,
    };

    return notification;
  }

  formatLevelNotification(level: NotificationLevel, payload: any): NotificationContent {
    return {
      topic: level,
      payload,
    };
  }

  getNotification(notificationId: string | number | symbol): Notification | void {
    let notification: Notification | undefined = undefined;
    Object.keys(this.state.notifications || {}).forEach((topic) => {
      for (let i = 0; i < this.state.notifications[topic].length; i++) {
        if (this.state.notifications[topic][i].id === notificationId) {
          notification = this.state.notifications[topic][i];
          break;
        }
      }
    });
    return notification;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *info(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Info, payload));
  }

  @reducer
  onRouteChange(): void {
    Object.keys(this.state.notifications || {}).forEach((topic) => {
      for (let i = this.state.notifications[topic].length - 1; i >= 0; i--) {
        if (!this.state.notifications[topic][i].persist) {
          this.state.notifications[topic].splice(i, 1);
        }
      }
    });
  }

  @reducer
  remove(notificationId: string | number | symbol): void {
    Object.keys(this.state.notifications || {}).forEach((topic) => {
      for (let i = 0; i < this.state.notifications[topic].length; i++) {
        if (this.state.notifications[topic][i].id === notificationId) {
          this.state.notifications[topic].splice(i, 1);
          break;
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *send(notificationContent: NotificationContent | ReactNode) {
    const { store, settings } = this.context;
    if (isNotificationContent(notificationContent) && !isNull(notificationContent.id)) {
      // check if this notification is already present
      const topic = notificationContent.topic || 'default';
      const notifications: Notification[] = get(store.getState(), `notifications.${topic}`, []);
      if (notifications.find((n) => n.id === (notificationContent as NotificationContent).id)) {
        return;
      }
    }

    const notification = this.formatNotification(notificationContent, settings, this);
    yield this.add(notification);
    yield this._delayRemove(notification);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *success(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Success, payload));
  }

  /**
   * This method is called whenever the auto-removal of the notification should be suspended
   * @param notificationId
   */
  @reducer
  touch(notificationId: string | number | symbol, permanent = false): void {
    const notification = this.getNotification(notificationId);
    if (notification && notification.ttl && notification.expires) {
      notification.ttl = permanent ? undefined : notification.expires - new Date().getTime();
      notification.expires = null;
    }
  }

  /**
   * This method is called whenever the auto-removal of the notification should be reactivated
   * @param notificationId
   */
  @saga(SagaEffect.Every)
  *untouch(notificationId: string | number | symbol) {
    const notification = this.getNotification(notificationId);
    if (notification && notification.ttl) {
      this._setExpires(notification.id, new Date().getTime() + notification.ttl);
      yield this._delayRemove(notification);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *warning(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Warning, payload));
  }

  @reducer
  _setExpires(notificationId: string | number | symbol, expires: number | null): void {
    const notification = this.getNotification(notificationId);
    if (notification) {
      notification.expires = expires;
    }
  }

  @saga(SagaEffect.Every)
  *_delayRemove(notification: Notification) {
    if (notification.ttl) {
      yield delay(notification.ttl);
      const refreshedNotification = this.getNotification(notification.id);
      if (refreshedNotification && refreshedNotification.expires) {
        // if ttl > 0 and notifcation.expires is null, it means that the removal is suspended
        yield this.remove(refreshedNotification.id);
      }
    }
  }
}

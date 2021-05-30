import { delay } from 'redux-saga/effects';
import { AppSettings } from '../app/typings';
import { reducer, saga, service } from '../core/annotations';
import DefaultGlobalService from '../app/GlobalService';
import { SagaEffect } from '../core/typings';
import { append, get, isNull, set } from '../utils/object';
import { Notification, NotificationContent, NotificationLevel } from './typings';

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
    notificationContent: NotificationContent | string,
    settings: AppSettings,
    notificationService: NotificationService,
  ): Notification {
    if (typeof notificationContent === 'string') {
      notificationContent = {
        payload: notificationContent,
      };
    }

    const persist: boolean = get(
      settings,
      `notification.${notificationContent.topic}.persist`,
      get(settings, `notification.default.persist`, true),
    );

    const timestamp =
      notificationContent.timestamp === undefined ? new Date().getTime() : notificationContent.timestamp;
    const id = notificationContent.id === undefined ? `oneki-id-${++nextId}` : notificationContent.id;
    const topic = notificationContent.topic === undefined ? 'default' : notificationContent.topic;
    const expires = notificationContent.ttl === undefined ? null : timestamp + notificationContent.ttl;

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

  formatLevelNotification(level: NotificationLevel, notification: NotificationContent | string): NotificationContent {
    if (typeof notification === 'string') {
      notification = {
        topic: level,
        payload: {
          message: notification,
        },
      };
    } else {
      notification = {
        topic: level,
        payload: notification,
      };
    }
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
  *send(notificationContent: NotificationContent | string) {
    const { store, settings } = this.context;
    if (!(typeof notificationContent === 'string') && !isNull((notificationContent as NotificationContent).id)) {
      // check if this notification is already present
      const topic = notificationContent.topic || 'default';
      const notifications: Notification[] = get(store.getState(), `notifications.${topic}`, []);
      if (notifications.find((n) => n.id === (notificationContent as NotificationContent).id)) {
        return;
      }
    }

    const notification = this.formatNotification(notificationContent, settings, this);
    if (notification.ttl === undefined) {
      notification.ttl = get(
        settings,
        `notification.${notification.topic}.ttl`,
        get(settings, `notification.default.ttl`),
      );
    }
    yield this.add(notification);

    if (notification.ttl) {
      yield delay(notification.ttl);
      yield this.remove(notification.id);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *success(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Success, payload));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *warning(payload: any) {
    yield this.send(this.formatLevelNotification(NotificationLevel.Warning, payload));
  }
}

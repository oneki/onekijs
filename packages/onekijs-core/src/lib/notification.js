import { call, delay } from 'redux-saga/effects';
import { useReduxService } from './service';
import { useReduxSelector } from './store';
import { append, get, isNull, set } from './utils/object';
import { reducer } from './reducer';
import { every } from './saga';

let nextId = 1;

const formatNotification = (notification, settings, notificationService) => {
  if (typeof notification === 'string') {
    notification = {
      payload: notification,
    };
  }

  if (notification.constructor === Object) {
    notification = Object.assign({}, notification);
  }

  if (isNull(notification.id)) {
    notification.id = `oneki-id-${++nextId}`;
  }

  if (isNull(notification.topic)) {
    notification.topic = 'default';
  }

  if (isNull(notification.timestamp)) {
    const date = new Date();
    notification.timestamp = date.getTime();
  }

  if (isNull(notification.persist)) {
    const persist = get(
      settings,
      `notification.${notification.topic}.persist`,
      get(settings, `notification.default.persist`, true)
    );
    notification.persist = persist;
  }

  notification.remove = () => {
    notificationService.remove(notification.id);
  };

  return notification;
};

const formatLevelNotification = (level, notification) => {
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
};

export const notificationService = {
  name: 'notification',
  init: function ({ router }) {
    router.listen(this.onRouteChange);
  },
  add: reducer(function (notification, state, { settings }) {
    const max = get(
      settings,
      `notification.${notification.topic}.max`,
      get(settings, `notification.default.max`, 0)
    );
    append(state, `notifications.${notification.topic}`, notification);
    if (max > 0 && state.notifications[notification.topic].length > max) {
      state.notifications[notification.topic].unshift();
    }
  }),
  clearTopic: reducer(function (topic, state) {
    set(state, `notifications.${topic}`, []);
  }),
  remove: reducer(function (notificationId, state) {
    Object.keys(state.notifications || {}).forEach(topic => {
      for (let i = 0; i < state.notifications[topic].length; i++) {
        if (state.notifications[topic][i].id === notificationId) {
          state.notifications[topic].splice(i, 1);
          break;
        }
      }
    });
  }),
  onRouteChange: reducer(function (payload, state) {
    Object.keys(state.notifications || {}).forEach(topic => {
      for (let i = state.notifications[topic].length - 1; i >= 0; i--) {
        if (!state.notifications[topic][i].persist) {
          state.notifications[topic].splice(i, 1);
        }
      }
    });
  }),

  send: every(function* (notification, { store, settings }) {
    if (!isNull(notification.id)) {
      // check if this notification is already present
      const topic = notification.topic || 'default';
      const notifications = get(store.getState(), `notifications.${topic}`, []);
      if (notifications.find(n => n.id === notification.id)) {
        return;
      }
    }
    notification = formatNotification(notification, settings, this);
    if (notification.ttl === undefined) {
      notification.ttl = get(
        settings,
        `notification.${notification.topic}.ttl`,
        get(settings, `notification.default.ttl`)
      );
    }
    yield this.add(notification);

    if (notification.ttl) {
      yield delay(notification.ttl);
      yield this.remove(notification.id);
    }
  }),

  error: every(function* (error) {
    console.error(error);
    yield this.send(formatLevelNotification('error', error));
  }),

  success: every(function* (success) {
    yield this.send(formatLevelNotification('success', success));
  }),

  info: every(function* (info) {
    yield this.send(formatLevelNotification('info', info));
  }),

  warning: every(function* (warning) {
    yield this.send(formatLevelNotification('warning', warning));
  }),
};

export const useNotificationService = () => {
  return useReduxService(notificationService);
};

export const useNotifications = topic => {
  let defaultValue;
  if (topic) {
    topic = `notifications.${topic}`;
    defaultValue = [];
  } else {
    topic = 'notifications';
    defaultValue = {};
  }
  return useReduxSelector(topic, defaultValue);
};

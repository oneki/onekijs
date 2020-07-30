import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { defaultSettings } from '../../app/settings';
import { AppSettings } from '../../app/typings';
import { NotificationContent } from '../typings';
import { fireEvent, render } from '../../__tests__/customRenderer';
import NotificationSender from './helper/NotificationSender';

// const sleep = (milliseconds: number) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

type TestNotification = {
  title: string;
  notifications: NotificationContent[];
  settings: AppSettings;
};

const tests: TestNotification[] = [
  {
    title: 'tests notification settings with maximum one notification at a time',
    notifications: [1, 2, 3, 4].map((num) => {
      return {
        id: `test-notification${num}`,
        topic: 'success',
        payload: {
          message: `This is the success message${num}`,
        },
      };
    }),
    settings: {
      notification: {
        success: {
          ttl: 0,
          max: 2,
        },
      },
    },
  },
  {
    title: 'tests notification settings with no maximum notifications at a time',
    notifications: [1, 2, 3, 4].map((num) => {
      return {
        id: `test-notification${num}`,
        topic: 'success',
        payload: {
          message: `This is the success message${num}`,
        },
      };
    }),
    settings: {
      notification: {
        success: {
          ttl: 0,
          max: 9999999,
        },
      },
    },
  },
  {
    title: 'tests notification with default settings',
    notifications: [1, 2, 3, 4, 5, 6, 7].map((num) => {
      return {
        id: `test-notification${num}`,
        topic: 'success',
        payload: {
          message: `This is the success message${num}`,
        },
      };
    }),
    settings: {
      notification: {
        success: {
          ttl: 0,
        },
      },
    },
  },
];

tests.forEach((test) => {
  it(`it ${test.title}`, async () => {
    const maxNotifications =
      test.settings.notification && test.settings.notification.success.max
        ? test.settings.notification.success.max
        : defaultSettings.notification.default.max;
    const { getByText, findByTestId, getByTestId, queryByTestId } = render(
      <NotificationSender notifications={test.notifications} />,
      { settings: test.settings },
    );

    for (let i = 0; i < test.notifications.length; i++) {
      const notification = test.notifications[i];
      fireEvent.click(getByText(`Send a ${notification.payload.message} notification`));
      await findByTestId(notification.id as string);
      const notificationElement = getByTestId(notification.id as string);
      // verify that the notification just fired is correctly displayed
      expect(notificationElement).toHaveTextContent(notification.payload.message);
      if (i >= maxNotifications) {
        for (let j = 0; j <= i - maxNotifications; j++) {
          // Verify that the oldest notifications disappeared
          expect(queryByTestId(test.notifications[j].id as string)).toBeNull();
        }
        for (let j = i - maxNotifications + 1; j <= i; j++) {
          // Verify that only the latest notification are displayed
          expect(queryByTestId(test.notifications[j].id as string)).not.toBeNull();
        }
      } else {
        for (let j = 0; j <= i; j++) {
          // Verify that all notifications are displayed as there are less than
          // max notifications that were fired
          expect(queryByTestId(test.notifications[j].id as string)).not.toBeNull();
        }
      }
    }
  });
});

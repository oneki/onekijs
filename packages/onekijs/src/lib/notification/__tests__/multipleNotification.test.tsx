import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { NotificationContent } from '../typings';
import { fireEvent, render } from './helper/customRenderer';
import NotificationSender from './helper/NotificationSender';

// const sleep = (milliseconds: number) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

type TestNotification = {
  title: string;
  notifications: NotificationContent[];
};
describe('it', () => {
  const tests: TestNotification[] = [
    {
      title: 'renders error and success notifications',
      notifications: [
        {
          id: 'error-notification',
          topic: 'error',
          payload: {
            message: 'This is the error message',
          },
          ttl: 0,
        },
        {
          id: 'success-notification',
          topic: 'success',
          payload: {
            message: 'This is the success message',
          },
          ttl: 100,
        },
      ],
    },
  ];

  tests.forEach((test) => {
    it(test.title, async () => {
      const { getByText, findByTestId, getByTestId } = render(
        <NotificationSender notifications={test.notifications} />,
      );
      for (const notification of test.notifications) {
        fireEvent.click(getByText(`Send a ${notification.payload.message} notification`));
        await findByTestId(notification.id as string);
        const notificationElement = getByTestId(notification.id as string);
        expect(notificationElement).toHaveTextContent(notification.payload.message);
        expect(notificationElement).toHaveStyle({ backgroundColor: notification.topic === 'error' ? 'red' : 'green' });
      }
    });
  });
});

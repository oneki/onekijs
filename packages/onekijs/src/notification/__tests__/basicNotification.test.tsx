import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { NotificationContent } from '../typings';
import { fireEvent, render } from '../../__tests__/customRenderer';
import NotificationSender from './helper/NotificationSender';

const notifications: NotificationContent[] = [
  {
    id: 'error-notification',
    topic: 'error',
    payload: {
      message: 'This is the error message',
    },
  },
  {
    id: 'success-notification',
    topic: 'success',
    payload: {
      message: 'This is the success message',
    },
  },
];

notifications.forEach((notification) => {
  it(`it renders an ${notification.topic} notification`, async () => {
    const { getByText, findByTestId, getByTestId } = render(<NotificationSender notifications={[notification]} />);
    fireEvent.click(getByText(`Send a ${notification.payload.message} notification`));
    await findByTestId(notification.id as string);
    const notificationElement = getByTestId(notification.id as string);
    expect(notificationElement).toHaveTextContent(notification.payload.message);
    expect(notificationElement).toHaveStyle({ backgroundColor: notification.topic === 'error' ? 'red' : 'green' });
  });
});

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { asyncTimeout } from '../../__tests__/utils/timeout';
import { ItemMeta, UseCollectionOptions } from '../typings';
import UseRestCollectionWidget from './components/UseRestCollectionWidget';
import { TestHandler, TestUser } from './typings';
import { basicUsers } from './data/userList';

let url = 'http://localhost/collection-url';

type UrlTestProps = {
  url: string;
  options?: UseCollectionOptions<TestUser, ItemMeta>;
  handler?: TestHandler;
  result: string;
  title: string;
};

const urlTests: UrlTestProps[] = [
  {
    url,
    result: url,
    title: 'test basic url',
  },
  {
    url,
    result: `${url}?filter=firstname eq "john"`,
    title: 'test one filter',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: 'john',
          },
        ],
      },
    },
  },
  {
    url,
    result: `${url}?filter=and(firstname eq "john";lastname like "doe")`,
    title: 'test two filters (no operator)',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: 'john',
          },
          {
            field: 'lastname',
            value: 'doe',
            operator: 'like',
          },
        ],
      },
    },
  },
  {
    url,
    result: `${url}?filter=or(firstname eq "john";lastname like "doe")`,
    title: 'test two filters (or operator)',
    options: {
      initialFilter: {
        operator: 'or',
        criterias: [
          {
            field: 'firstname',
            value: 'john',
          },
          {
            field: 'lastname',
            value: 'doe',
            operator: 'like',
          },
        ],
      },
    },
  },
  {
    url,
    result: `${url}?filter=and(firstname eq "john";or(lastname like "doe";lastname starts_with "michael"))`,
    title: 'test sub filter',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: 'john',
          },
          {
            operator: 'or',
            criterias: [
              {
                field: 'lastname',
                value: 'doe',
                operator: 'like',
              },
              {
                field: 'lastname',
                value: 'michael',
                operator: 'starts_with',
              },
            ],
          },
        ],
      },
    },
  },
];

const handler = {
  name: 'load',
  actions: [
    {
      method: 'load',
      args: [],
    },
  ],
};

describe('it tests URLs', () => {
  urlTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId } = render(
        <UseRestCollectionWidget url={test.url} options={test.options} handler={handler} type="url" />,
      );
      await act(async () => {
        fireEvent.click(getByTestId(handler.name));
        await asyncTimeout(50);
        const element = getByTestId('result');
        // user is logged
        expect(element).toHaveTextContent(JSON.stringify(test.result));
      });
    });
  });
});

type QueryTestProps = {
  url: string;
  options?: UseCollectionOptions<TestUser, ItemMeta>;
  handler?: TestHandler;
  result: TestUser[];
  title: string;
};

url = 'http://localhost/collection';
const queryTests: QueryTestProps[] = [
  {
    url,
    handler,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a criteria',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname,
          },
        ],
      },
    },
  },
  {
    url,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a criteria',
    options: {
      autoload: true,
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname,
          },
        ],
      },
    },
  },
];

describe('it tests queries', () => {
  queryTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId } = render(
        <UseRestCollectionWidget url={test.url} options={test.options} handler={test.handler} type="query" />,
      );
      await act(async () => {
        if (test.handler) {
          fireEvent.click(getByTestId(handler.name));
        }
        await asyncTimeout(50);
        const element = getByTestId('result');
        expect(element).toHaveTextContent(JSON.stringify(test.result));
      });
    });
  });
});

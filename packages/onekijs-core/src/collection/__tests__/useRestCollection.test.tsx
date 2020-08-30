import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { TestHandler, TestUser } from './typings';
import { render, fireEvent } from '@testing-library/react';
import UseRestCollectionWidget from './components/UseRestCollectionWidget';
import { asyncTimeout } from '../../__tests__/utils/timeout';
import { act } from 'react-dom/test-utils';
import { UseCollectionOptions, ItemMeta } from '../typings';

const url = 'http://localhost/echo';

type TestProps = {
  url: string;
  options?: UseCollectionOptions<TestUser, ItemMeta>;
  handler?: TestHandler;
  result: string;
  title: string;
};

const tests: TestProps[] = [
  {
    url,
    result: url,
    title: 'test basic url',
  },
  {
    url,
    result: `${url}?filter=firstname eq 'john'`,
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
    result: `${url}?filter=and(firstname eq 'john';lastname like 'doe')`,
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
    result: `${url}?filter=or(firstname eq 'john';lastname like 'doe')`,
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
    result: `${url}?filter=and(firstname eq 'john';or(lastname like 'doe';lastname starts_with 'michael'))`,
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
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId } = render(
        <UseRestCollectionWidget url={test.url} options={test.options} handler={handler} />,
      );
      await act(async () => {
        fireEvent.click(getByTestId(handler.name));
        await asyncTimeout(50);
        const element = getByTestId('result');
        // user is logged
        expect(element).toHaveTextContent(JSON.stringify({ result: test.result }));
      });
    });
  });
});

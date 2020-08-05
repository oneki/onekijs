import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { UseCollectionOptions, QuerySortBy } from '../typings';
import UseCollectionWidget from './components/UseCollectionWidget';
import { basicUsers } from './data/userList';
import { TestHandler, TestUser } from './typings';
import { get } from 'onekijs';

type TestProps = {
  data: TestUser[];
  options?: UseCollectionOptions;
  handler?: TestHandler;
  result: TestUser[];
  title: string;
};

/// beforeEach((): void => {});
// afterEach((): void => {});
const sortBy = (sorts: QuerySortBy[]) => (a: any, b: any): number => {
  const sort = sorts[0];
  if (sort) {
    const fieldA = get(a, sort.field);
    const fieldB = get(b, sort.field);
    if (fieldA === fieldB) {
      sorts.shift();
      return sortBy(sorts)(a, b);
    }
    if (sort.dir === 'desc') {
      return fieldA > fieldB ? -1 : 1;
    } else {
      return fieldA < fieldB ? -1 : 1;
    }
  }
  return 0;
};

const tests: TestProps[] = [
  {
    data: basicUsers,
    result: basicUsers,
    title: 'create service',
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a criteria',
    options: {
      initialFilter: {
        field: 'firstname',
        value: basicUsers[0].firstname,
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a filter with one criteria',
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
    data: basicUsers,
    result: basicUsers.filter((u) =>
      u.firstname.toUpperCase().includes(basicUsers[0].firstname.substr(2, 2).toUpperCase()),
    ),
    title: 'filter firstname using a like filter',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname.substr(2, 2),
            operator: 'like',
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname.startsWith(basicUsers[0].firstname.substr(0, 2))),
    title: 'filter firstname using a starts_with filter',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname.substr(0, 2),
            operator: 'starts_with',
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname.endsWith(basicUsers[0].firstname.substr(-2))),
    title: 'filter firstname using a ends_with filter',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname.substr(-2),
            operator: 'ends_with',
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (default operator)',
    options: {
      initialFilter: {
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname,
          },
          {
            field: 'lastname',
            value: basicUsers[0].lastname,
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (and operator)',
    options: {
      initialFilter: {
        operator: 'and',
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname,
          },
          {
            field: 'lastname',
            value: basicUsers[0].lastname,
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname === basicUsers[0].firstname || u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (or operator)',
    options: {
      initialFilter: {
        operator: 'or',
        criterias: [
          {
            field: 'firstname',
            value: basicUsers[0].firstname,
          },
          {
            field: 'lastname',
            value: basicUsers[0].lastname,
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter(
      (u) =>
        u.address.street === basicUsers[1].address.street ||
        (u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname),
    ),
    title: 'filter users by firstname and lastname using a sub filter',
    options: {
      initialFilter: {
        operator: 'or',
        criterias: [
          {
            field: 'address.street',
            value: basicUsers[1].address.street,
          },
          {
            id: 'identity',
            criterias: [
              {
                field: 'firstname',
                value: basicUsers[0].firstname,
              },
              {
                field: 'lastname',
                value: basicUsers[0].lastname,
              },
            ],
          },
        ],
      },
    },
  },
  {
    data: basicUsers,
    result: Object.assign([] as TestUser[], basicUsers).sort(sortBy([{ field: 'firstname' }])),
    title: 'filter firstname using a string',
    options: {
      initialSortBy: 'firstname',
    },
  },
  {
    data: basicUsers,
    result: Object.assign([] as TestUser[], basicUsers).sort(sortBy([{ field: 'firstname', dir: 'desc' }])),
    title: 'filter firstname using a sort QuerySort',
    options: {
      initialSortBy: {
        field: 'firstname',
        dir: 'desc',
      },
    },
  },
  {
    data: basicUsers,
    result: Object.assign([] as TestUser[], basicUsers).sort(
      sortBy([
        { field: 'firstname', dir: 'desc' },
        { field: 'lastname', dir: 'asc' },
      ]),
    ),
    title: 'filter firstname using a sort QuerySort[]',
    options: {
      initialSortBy: [
        {
          field: 'firstname',
          dir: 'desc',
        },
        {
          field: 'lastname',
          dir: 'asc',
        },
      ],
    },
  },
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname.startsWith('K')).sort(sortBy([{ field: 'firstname', dir: 'desc' }])),
    title: 'apply a filter and a sort',
    options: {
      initialFilter: {
        field: 'firstname',
        value: 'K',
        operator: 'starts_with',
      },
      initialSortBy: {
        field: 'firstname',
        dir: 'desc',
      },
    },
  },
];

describe('it lists users', () => {
  tests.forEach((test) => {
    it(`${test.title}`, () => {
      const { getByTestId } = render(<UseCollectionWidget data={test.data} options={test.options} />);
      // user is logged
      expect(getByTestId('result')).toHaveTextContent(JSON.stringify(test.result));
    });
  });
});

const afterActionTests: TestProps[] = [
  {
    data: basicUsers,
    result: basicUsers.filter((u) => u.firstname.startsWith('K')),
    title: 'filter firstname using a criteria',
    handler: {
      name: 'addFilter',
      actions: [
        {
          method: 'addFilter',
          args: [
            {
              field: 'firstname',
              operator: 'starts_with',
              value: 'K',
            },
          ],
        },
      ],
    },
  },
  {
    data: basicUsers,
    result: Object.assign([] as TestUser[], basicUsers).sort(sortBy([{ field: 'firstname', dir: 'asc' }])),
    title: 'sort by firstname using a string',
    handler: {
      name: 'sortBy',
      actions: [
        {
          method: 'sortBy',
          args: ['firstname'],
        },
      ],
    },
  },
];

describe('it lists users after user action', () => {
  afterActionTests.forEach((test) => {
    it(`${test.title}`, () => {
      const { getByTestId } = render(
        <UseCollectionWidget data={test.data} options={test.options} handler={test.handler} />,
      );
      if (test.handler) {
        fireEvent.click(getByTestId(test.handler.name));
      }
      // user is logged
      expect(getByTestId('result')).toHaveTextContent(JSON.stringify(test.result));
    });
  });
});

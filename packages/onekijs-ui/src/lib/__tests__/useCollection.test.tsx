import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { UseCollectionOptions } from '../typings';
import UseCollectionWidget from './components/UseCollectionWidget';
import { basicUsers } from './data/userList';
import { TestUser } from './typings';

type TestProps = {
  data: TestUser[];
  options?: UseCollectionOptions;
  result: TestUser[];
  title: string;
};

beforeEach((): void => {});
afterEach((): void => {});

const tests: TestProps[] = [
  {
    data: basicUsers,
    result: basicUsers,
    title: 'create service',
  },
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a criteria',
    options: {
      initialFilter: {
        field: 'firstname',
        value: basicUsers[0].firstname,
      }
    }
  }, 
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname === basicUsers[0].firstname),
    title: 'filter firstname using a filter with one criteria',
    options: {
      initialFilter: {
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname,
        }]
      }
    }
  }, 
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname.toUpperCase().includes(basicUsers[0].firstname.substr(2,2).toUpperCase())),
    title: 'filter firstname using a like filter',
    options: {
      initialFilter: {
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname.substr(2,2),
          operator: 'like',
        }]
      }
    }
  },  
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname.startsWith(basicUsers[0].firstname.substr(0,2))),
    title: 'filter firstname using a starts_with filter',
    options: {
      initialFilter: {
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname.substr(0,2),
          operator: 'starts_with',
        }]
      }
    }
  },    
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname.endsWith(basicUsers[0].firstname.substr(-2))),
    title: 'filter firstname using a ends_with filter',
    options: {
      initialFilter: {
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname.substr(-2),
          operator: 'ends_with',
        }]
      }
    }
  },   
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (default operator)',
    options: {
      initialFilter: {
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname,
        }, {
          field: 'lastname',
          value: basicUsers[0].lastname,
        }]
      }
    }
  },   
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (and operator)',
    options: {
      initialFilter: {
        operator: 'and',
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname,
        }, {
          field: 'lastname',
          value: basicUsers[0].lastname,
        }]
      }
    }
  },  
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.firstname === basicUsers[0].firstname || u.lastname === basicUsers[0].lastname),
    title: 'filter users by firstname and lastname using a filter with two criteria (or operator)',
    options: {
      initialFilter: {
        operator: 'or',
        criterias: [{
          field: 'firstname',
          value: basicUsers[0].firstname,
        }, {
          field: 'lastname',
          value: basicUsers[0].lastname,
        }]
      }
    }
  },
  {
    data: basicUsers,
    result: basicUsers.filter(u => u.address.street === basicUsers[1].address.street || (u.firstname === basicUsers[0].firstname && u.lastname === basicUsers[0].lastname)),
    title: 'filter users by firstname and lastname using a sub filter',
    options: {
      initialFilter: {
        operator: 'or',
        criterias: [{
          field: 'address.street',
          value: basicUsers[1].address.street,
        },
        {
          id: "identity",
          criterias: [
            {
              field: 'firstname',
              value: basicUsers[0].firstname,
            }, {
              field: 'lastname',
              value: basicUsers[0].lastname,
            }
          ]
        }]
      }
    }
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

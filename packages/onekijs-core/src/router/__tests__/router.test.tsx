/* eslint-disable react/display-name */
import '@testing-library/jest-dom/extend-expect';
import 'intl';
import { AppSettings } from '../../app/typings';
import { Location } from '../typings';
import { toLocation } from '../utils';

type LocationTestProps = {
  title: string;
  url: string;
  expected: Location;
  settings: AppSettings;
};

const routerLocationTests: LocationTestProps[] = [
  {
    title: 'no contextPath and no i18n',
    url: '/users/1/edit',
    expected: {
      pathname: '/users/1/edit',
      pathcontext: undefined,
      pathlocale: undefined,
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/',
    },
  },
  {
    title: 'contextPath and no i18n',
    url: '/my-context/users/1/edit',
    expected: {
      pathname: '/my-context/users/1/edit',
      pathcontext: '/my-context',
      pathlocale: undefined,
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/my-context',
    },
  },
  {
    title: 'contextPath and i18n',
    url: '/my-context/en/users/1/edit',
    expected: {
      pathname: '/my-context/en/users/1/edit',
      pathcontext: '/my-context',
      pathlocale: '/en',
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/my-context',
      i18n: {
        locales: [
          {
            locale: 'en',
            path: '/en',
          },
        ],
      },
    },
  },
  {
    title: 'no contextPath and i18n',
    url: '/en/users/1/edit',
    expected: {
      pathname: '/en/users/1/edit',
      pathcontext: undefined,
      pathlocale: '/en',
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/',
      i18n: {
        locales: [
          {
            locale: 'en',
            path: '/en',
          },
        ],
      },
    },
  },
  {
    title: 'contextPath and i18n with no path',
    url: '/my-context/users/1/edit',
    expected: {
      pathname: '/my-context/users/1/edit',
      pathcontext: '/my-context',
      pathlocale: undefined,
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/my-context',
      i18n: {
        locales: [
          {
            locale: 'en',
          },
        ],
      },
    },
  },
  {
    title: 'no contextPath and i18n with no path',
    url: '/users/1/edit',
    expected: {
      pathname: '/users/1/edit',
      pathcontext: undefined,
      pathlocale: undefined,
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/',
      i18n: {
        locales: [
          {
            locale: 'en',
          },
        ],
      },
    },
  },
  {
    title: 'contextPath with end slash and i18n with end slash',
    url: '/my-context/en/users/1/edit',
    expected: {
      pathname: '/my-context/en/users/1/edit',
      pathcontext: '/my-context',
      pathlocale: '/en',
      pathroute: '/users/1/edit',
    },
    settings: {
      contextPath: '/my-context/',
      i18n: {
        locales: [
          {
            locale: 'en',
            path: '/en/',
          },
        ],
      },
    },
  },
];

// const TestComponent: React.FC<Props> = ({ name }) => <>Welcome {{ name }}</>;
describe('it builds the location', () => {
  routerLocationTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const location = toLocation(test.url, test.settings);
      expect(location).toBeDefined();
      expect(location.pathname).toEqual(test.expected.pathname);
      expect(location.pathcontext).toEqual(test.expected.pathcontext);
      expect(location.pathlocale).toEqual(test.expected.pathlocale);
      expect(location.pathroute).toEqual(test.expected.pathroute);
    });
  });
});

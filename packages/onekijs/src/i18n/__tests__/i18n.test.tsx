/* eslint-disable react/display-name */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { fireEvent, render, TestAppProps } from '../../__tests__/customRenderer';
import I18nWidget, { I18nWidgetProps } from './components/I18nWidget';
import 'intl';

const appProps: TestAppProps = {
  settings: {
    i18n: {
      locales: ['en', 'fr'], // supported locales
      defaultLocale: 'en',
      url: 'http://localhost/locales', // the URL to retrieves the JSON files with the translations
    },
  },
};

type TestProps = {
  title: string;
  testId: string;
  expected: {
    en: string;
    fr: string;
  };
  ns?: string[];
};

const i18nWidgetProps: I18nWidgetProps = {
  lastname: 'Doe',
  firstname: 'John',
  date: new Date(2018, 8, 22),
};

const i18nTests: TestProps[] = [
  {
    title: 'T content with no variable',
    testId: 'test1',
    expected: {
      en: 'Welcome',
      fr: 'Bienvenue',
    },
  },
  {
    title: 'T alias with no variable',
    testId: 'test2',
    expected: {
      en: 'Welcome',
      fr: 'Bienvenue',
    },
  },
  {
    title: 'T content with one variable',
    testId: 'test3',
    expected: {
      en: 'Welcome Doe on my website',
      fr: 'Bienvenue Doe sur mon site web',
    },
  },
  {
    title: 'T content with two variables and date',
    testId: 'test4',
    expected: {
      en: 'Welcome Doe on my website. Current date = 9/22/2018, 12:00:00 AM',
      fr: 'Bienvenue Doe sur mon site web. Date actuelle = 22/09/2018 à 00:00:00',
    },
  },
  {
    title: 'T content JSX',
    testId: 'test5',
    expected: {
      en: 'Welcome <b>Doe</b> John',
      fr: 'Bienvenue John <b>Doe</b>',
    },
  },
  {
    title: 'T alias complex JSX',
    testId: 'test6',
    expected: {
      en: 'Hello <span><b>mister</b> John Doe <i>male</i></span> <b>address</b>',
      fr: 'Bonjour <span><b>monsieur</b> John Doe <i>masculin</i></span> <b>adresse</b>',
    },
  },
  {
    title: 'T alias complex JSX (plural)',
    testId: 'test7',
    expected: {
      en: 'Hello <span><b>gentlemen</b> John Doe <i>male</i></span> <b>addresses</b>',
      fr: 'Bonjour <span><b>messieurs</b> John Doe <i>masculin</i></span> <b>adresses</b>',
    },
  },
  {
    title: 'T content complex JSX',
    testId: 'test8',
    expected: {
      en: 'Hello <span><b>mister</b> John Doe <i>male</i></span> <b>address</b>',
      fr: 'Bonjour <span><b>monsieur</b> Doe John <i>masculin</i></span> <b>adresse</b>',
    },
  },
  {
    title: 'T content complex JSX (plural)',
    testId: 'test9',
    expected: {
      en: 'Hello <span><b>gentlemen</b> John Doe <i>male</i></span> <b>addresses</b>',
      fr: 'Bonjour <span><b>messieurs</b> Doe John <i>masculin</i></span> <b>adresses</b>',
    },
  },
  {
    title: 'T content JSX with attribute',
    testId: 'test10',
    expected: {
      en: 'Hello <span class="container"><b>mister</b> John Doe <i>male</i></span> <b>address</b>',
      fr: 'Bonjour <span class="container"><b>monsieur</b> Doe John <i>masculin</i></span> <b>adresse</b>',
    },
  },
  {
    title: 't content with no variable',
    testId: 'test11',
    expected: {
      en: 'Welcome',
      fr: 'Bienvenue',
    },
  },
  {
    title: 't alias with no variable',
    testId: 'test12',
    expected: {
      en: 'Welcome',
      fr: 'Bienvenue',
    },
  },
  {
    title: 't content with JSX and one variable',
    testId: 'test13',
    expected: {
      en: 'Welcome Doe on my website',
      fr: 'Bienvenue Doe sur mon site web',
    },
  },
  {
    title: 't content with two variables and date',
    testId: 'test14',
    expected: {
      en: 'Welcome Doe on my website. Current date = 9/22/2018, 12:00:00 AM',
      fr: 'Bienvenue Doe sur mon site web. Date actuelle = 22/09/2018 à 00:00:00',
    },
  },
  {
    title: 't alias complex JSX',
    testId: 'test15',
    expected: {
      en: 'Hello <span><b>mister</b> John Doe <i>male</i></span> <b>address</b>',
      fr: 'Bonjour <span><b>monsieur</b> John Doe <i>masculin</i></span> <b>adresse</b>',
    },
  },
  {
    title: 't alias complex JSX (plural)',
    testId: 'test16',
    expected: {
      en: 'Hello <span><b>gentlemen</b> John Doe <i>male</i></span> <b>addresses</b>',
      fr: 'Bonjour <span><b>messieurs</b> John Doe <i>masculin</i></span> <b>adresses</b>',
    },
  },
  {
    title: 'T content with JSX containing attribute translated',
    testId: 'test17',
    expected: {
      en: 'Hello <span><b>mister</b> John Doe <i>male</i></span> <b>address</b> <span title="Welcome">Welcome</span>',
      fr:
        'Bonjour <span><b>monsieur</b> Doe John <i>masculin</i></span> <b>adresse</b> <span title="Bienvenue">Bienvenue</span>',
    },
  },
  {
    title: 'namespace users',
    testId: 'test18',
    expected: {
      en: 'user',
      fr: 'utilisateur',
    },
    ns: ['users'],
  },
  {
    title: 'namespace common has higher priority than namespace users',
    testId: 'test18',
    expected: {
      en: 'commonUser',
      fr: 'utilisateurCommun',
    },
    ns: ['common', 'users'],
  },
  {
    title: 'namespace users (plural)',
    testId: 'test19',
    expected: {
      en: 'users',
      fr: 'utilisateurs',
    },
    ns: ['users'],
  },
  {
    title: 'namespace common is present by default',
    testId: 'test20',
    expected: {
      en: 'commonUser',
      fr: 'utilisateurCommun',
    },
    ns: ['users'],
  },
  {
    title: 'namespace common (plural)',
    testId: 'test21',
    expected: {
      en: 'commonUsers',
      fr: 'utilisateursCommuns',
    },
    ns: ['users'],
  },
  {
    title: "T content containing ':'",
    testId: 'test22',
    expected: {
      en: 'user common:user',
      fr: 'utilisateur common:user',
    },
    ns: ['users'],
  },
  {
    title: "T content containing ':' and alias containing a namespace",
    testId: 'test23',
    expected: {
      en: 'commonUser',
      fr: 'utilisateurCommun',
    },
    ns: ['users'],
  },
];

// const TestComponent: React.FC<Props> = ({ name }) => <>Welcome {{ name }}</>;
describe('it retrieves locales remotely', () => {
  i18nTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { findByTestId, getByTestId } = render(<I18nWidget {...i18nWidgetProps} ns={test.ns} />, appProps);
      let T = await findByTestId(test.testId);
      expect(T).toContainHTML(test.expected.en);
      fireEvent.click(getByTestId('change-locale-fr'));
      T = await findByTestId(test.testId);
      expect(T).toContainHTML(test.expected.fr);
    });
  });
});

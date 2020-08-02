import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import useTranslation from '../useTranslation';
import I18nWidget from './components/I18nWidget';

const appProps: TestAppProps = {
  settings: {
    i18n: {
      locales: ['en', 'fr'], // supported locales
      defaultLocale: 'en',
      url: 'http://localhost/locales', // the URL to retrieves the JSON files with the translations
    },
  },
};

describe('it supports "en" and "fr" languages', () => {
  it(`simple string`, async () => {
    const Component: React.FC = () => {
      const [T, , , loading] = useTranslation();
      if (loading) return null;
      return (
        <div data-testid="T">
          <T>Welcome</T>
        </div>
      );
    };
    const { findByTestId } = render(
      <I18nWidget>
        <Component />
      </I18nWidget>,
      appProps,
    );
    const T = await findByTestId('T');
    expect(T).toHaveTextContent('Welcome');
  });
});

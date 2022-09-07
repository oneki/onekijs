import { App, useI18nService, useSetting, useTranslation } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import settings from './settings';

const IndexPage = () => {
  const [T, t, locale] = useTranslation();
  const i18nService = useI18nService();
  const locales = useSetting<string[]>('i18n.locales');

  const lastname = 'Franki';
  const firstname = 'Bruno';
  const date = new Date();

  return (
    <div>
      <div
        style={{
          backgroundColor: '#EEE',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <h1>I18n App</h1>
        <h4>
          Change locale via buttons: <button onClick={() => i18nService.changeLocale('en')}>en</button> |{' '}
          <button onClick={() => i18nService.changeLocale('fr')}>fr</button>
        </h4>
        <h4>
          Change locale via dropdown:
          <select value={locale} onChange={(e) => i18nService.changeLocale(e.target.value)}>
            {locales &&
              locales.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
          </select>
        </h4>
      </div>
      <div>
        <T>hello <>{{lastname}}</> test</T>
        <div>
          <T alias="hello">
            Hello{' '}
            <b>
              <i>mister</i>{' '}
              <>
                {{ firstname }} {{ lastname }}
              </>{' '}
              <i>male</i>
            </b>{' '}
            <u>address</u>
          </T>
        </div>
        <div>
          <T count={2}>
            Hello{' '}
            <b>
              <i>mister</i>{' '}
              <>
                {{ firstname }} {{ lastname }}
              </>{' '}
              <i>male</i>
            </b>{' '}
            <u>address</u>
          </T>
        </div>
        <div>
          <T>Welcome <>{{ lastname }}</> on Flora</T>
        </div>
        <div>
          <T>
            Welcome{' '}
            <>
              {{ lastname }} on Flora. Current date = {{ date }}
            </>
          </T>
        </div>
        <div title={t('Welcome')}>
          <T>Welcome</T>
        </div>

        <div>
          <T>
            Hello{' '}
            <b>
              <i>mister</i>{' '}
              <>
                {{ firstname }} {{ lastname }}
              </>{' '}
              <i>male</i>
            </b>{' '}
            <u>address</u> <span title={t('Welcome')}>Welcome</span>
          </T>
        </div>
        <div>
          <T alias="common:user">user</T>
        </div>
        <div>
          <T count={2}>user</T>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <App settings={settings}>
    <IndexPage />
  </App>,
  document.getElementById('root'),
);

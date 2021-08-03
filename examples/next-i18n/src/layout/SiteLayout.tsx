import { I18nLocalePath, layout, Link, useI18nService, useLocale, useSetting } from 'onekijs-next';
import PropTypes from 'prop-types';
import React, { FC } from 'react';

const SiteLayout: FC = ({ children }) => {
  const style = { padding: '0 5px' };
  const i18nService = useI18nService();
  const locales = useSetting<I18nLocalePath[]>('i18n.locales');
  const locale = useLocale();
  return (
    <>
      <div
        style={{
          backgroundColor: '#EEE',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <h1>Hello world App</h1>
        <h3>
          <Link href="/" style={style}>
            Index
          </Link>
          |
          <Link href="/about" style={style}>
            About
          </Link>
        </h3>
        <h4>
          Change locale via buttons: <button onClick={() => i18nService.changeLocale('en')}>en</button> |{' '}
          <button onClick={() => i18nService.changeLocale('fr')}>fr</button>
        </h4>
        <h4>
          Change locale via dropdown:
          <select value={locale} onChange={(e) => i18nService.changeLocale(e.target.value)}>
            {locales &&
              locales.map((l) => (
                <option key={l.locale} value={l.locale}>
                  {l.locale}
                </option>
              ))}
          </select>
        </h4>
      </div>
      <div>{children}</div>
    </>
  );
};

SiteLayout.propTypes = {
  children: PropTypes.element,
};

export default layout(SiteLayout);

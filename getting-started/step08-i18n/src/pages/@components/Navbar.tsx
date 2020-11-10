import { useI18nService, useSecurityContext, useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [T, , locale] = useTranslation();
  const [loggedUser] = useSecurityContext('username');
  return (
    <div className="app-top-bar">
      <Link to="/">
        <h1>
          <T>My Store</T>
        </h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUser && (
          <div className="user">
            {loggedUser}{' '}
            <Link className="logout" to="/logout">
              [<T>Log out</T>]
            </Link>
          </div>
        )}
        <Link to="/cart" className="button fancy-button">
          <i className="material-icons">shopping_cart</i>
          <T>Checkout</T>
        </Link>
        <div className="lg">
          <LocaleLink locale="en" selected={locale === 'en'} />|<LocaleLink locale="fr" selected={locale === 'fr'} />
        </div>
      </div>
    </div>
  );
};

interface LocaleLinkProps {
  locale: string;
  selected: boolean;
}

const LocaleLink: FC<LocaleLinkProps> = ({ locale, selected }) => {
  const i18nService = useI18nService();
  return (
    <button className={`link ${selected ? 'selected' : ''}`} onClick={() => i18nService.changeLocale(locale)}>
      {locale}
    </button>
  );
};

export default Navbar;

/* <h4>
          Change locale via buttons:
          <button onClick={() => i18nService.changeLocale("en")}>
            en
          </button> | <button onClick={() => i18nService.changeLocale("fr")}>fr</button>
        </h4>
        <h4>
          Change locale via dropdown:
          <select
            value={currentLocale}
            onChange={(e) => i18nService.changeLocale(e.target.value)}
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </h4>*/

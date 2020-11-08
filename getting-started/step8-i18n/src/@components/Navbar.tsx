import { useI18nService, useSecurityContext, useTranslation } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [T] = useTranslation();
  const [loggedUser] = useSecurityContext('username');
  const i18nService = useI18nService();
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
            <Link className="logout" to="/auth/logout">
              [<T>Log out</T>]
            </Link>
          </div>
        )}
        <Link to="/cart" className="button fancy-button">
          <i className="material-icons">shopping_cart</i>
          <T>Checkout</T>
        </Link>
        <div className="lg">
          <button className="link" onClick={() => i18nService.changeLocale('en')}>
            en
          </button>
          |
          <button className="link" onClick={() => i18nService.changeLocale('fr')}>
            fr
          </button>
        </div>
      </div>
    </div>
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

import { useI18nService, useSecurityContext, useTranslation } from 'onekijs-next';
import React from 'react';
import { Link } from 'onekijs-next';

const Navbar: React.FC = () => {
  const [T, , locale] = useTranslation();
  const [loggedUser] = useSecurityContext('username');
  return (
    <div className="app-top-bar">
      <Link href="/">
        <h1>
          <T>My Store</T>
        </h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUser && (
          <div className="user">
            {loggedUser}{' '}
            <Link className="logout" href="/logout">
              [<T>Log out</T>]
            </Link>
          </div>
        )}
        <Link href="/cart" className="button fancy-button">
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

const LocaleLink: React.FC<LocaleLinkProps> = ({ locale, selected }) => {
  const i18nService = useI18nService();
  return (
    <button className={`link ${selected ? 'selected' : ''}`} onClick={() => i18nService.changeLocale(locale)}>
      {locale}
    </button>
  );
};

export default Navbar;

'use client';

import Link from 'next/link';
import { useI18nService, useSecurityContext, useTranslation } from 'onekijs-next';
import React from 'react';

const Navbar: React.FC = () => {
  const [T, , locale] = useTranslation();
  const [loggedUser] = useSecurityContext('username');
  const localePath = `/${locale}`;
  return (
    <div className="app-top-bar">
      <Link href={localePath}>
        <h1>
          <T>My Store</T>
        </h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUser && (
          <div className="user">
            {loggedUser}{' '}
            <Link className="logout" href={`${localePath}/logout`}>
              [<T>Log out</T>]
            </Link>
          </div>
        )}
        <Link href={`${localePath}/cart`} className="button fancy-button">
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

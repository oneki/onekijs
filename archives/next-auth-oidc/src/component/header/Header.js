import { I18nLink } from 'onekijs-next';
import React from 'react';
import LoggedUser from './LoggedUser';

const Header = () => {
  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto px-8">
          <nav>
            <div className="py-4 flex-shrink-0 content-between flex items-center">
              <I18nLink href="/">
                <img className="h-8 w-8 cursor-pointer" src="/logo.svg" alt="" />
              </I18nLink>
              <I18nLink href="/">
                <a className="ml-8 font-medium text-gray-900">Home</a>
              </I18nLink>
              <I18nLink href="/admin">
                <a className="ml-8 font-medium text-gray-900">Admin</a>
              </I18nLink>
              <LoggedUser />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;

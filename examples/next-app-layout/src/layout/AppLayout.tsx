import { layout, Link } from 'onekijs-next';
import PropTypes from 'prop-types';
import React, { FC } from 'react';

const AppLayout: FC = ({ children }) => {
  return (
    <div className="bg-white antialiased">
      <div>
        <div>
          <div className="max-w-3xl mx-auto px-8">
            <nav>
              <div className="py-4 flex-shrink-0 flex items-center">
                <Link href="/">
                  <img className="h-8 w-8 cursor-pointer" src="/logo.svg" alt="logo" />
                </Link>
                <Link href="/" className="ml-8 font-medium text-gray-900">
                  Home
                </Link>
                <Link href="/users" className="ml-8 font-medium text-gray-900">
                  Users
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-0">
        <div className="mt-8 max-w-3xl mx-auto px-8">{children}</div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element,
};

export default layout(AppLayout);

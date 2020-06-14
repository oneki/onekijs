import Link from 'next/link';
import { layout } from 'onekijs-next';
import React from 'react';
import PropTypes from 'prop-types';

const SiteLayout = ({ children }) => {
  return (
    <div className="bg-white antialiased">
      <div>
        <div>
          <div className="max-w-3xl mx-auto px-8">
            <nav>
              <div className="py-4 flex-shrink-0 flex items-center">
                <Link href="/">
                  <img className="h-8 w-8 cursor-pointer" src="/logo.svg" />
                </Link>
                <Link href="/">
                  <a className="ml-8 font-medium text-gray-900">Home</a>
                </Link>
                <Link href="/users">
                  <a className="ml-8 font-medium text-gray-900">Users</a>
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

SiteLayout.propTypes = {
  children: PropTypes.element,
};

export default layout(SiteLayout);

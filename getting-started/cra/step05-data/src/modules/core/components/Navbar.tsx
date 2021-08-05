import { useSecurityContext, Link } from 'onekijs';
import React from 'react';

const Navbar: React.FC = () => {
  const [loggedUser] = useSecurityContext('username');
  return (
    <div className="app-top-bar">
      <Link href="/">
        <h1>My Store</h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUser && (
          <div className="user">
            {loggedUser}{' '}
            <Link className="logout" href="/logout">
              [Log out]
            </Link>
          </div>
        )}
        <Link href="/cart" className="button fancy-button">
          <i className="material-icons">shopping_cart</i>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

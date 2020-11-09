import { useSecurityContext } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [loggedUser] = useSecurityContext('username');
  return (
    <div className="app-top-bar">
      <Link to="/">
        <h1>My Store</h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUser && (
          <div className="user">
            {loggedUser}{' '}
            <Link className="logout" to="/auth/logout">
              [Log out]
            </Link>
          </div>
        )}
        <Link to="/cart" className="button fancy-button">
          <i className="material-icons">shopping_cart</i>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import { useSecurityContext } from 'onekijs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [loggedUserEmail] = useSecurityContext('email');
  return (
    <div className="app-top-bar">
      <Link to="/">
        <h1>My Store</h1>
      </Link>
      <div className="app-top-bar-right">
        {loggedUserEmail && <div className="user">bruno.franki@gmail.com</div>}
        <Link to="/cart" className="button fancy-button">
          <i className="material-icons">shopping_cart</i>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

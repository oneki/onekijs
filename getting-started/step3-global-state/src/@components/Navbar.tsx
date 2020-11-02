import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <div className="app-top-bar">
      <Link to="/">
        <h1>My Store</h1>
      </Link>
      <Link to="/cart" className="button fancy-button">
        <i className="material-icons">shopping_cart</i>
        Checkout
      </Link>
    </div>
  );
};

export default Navbar;

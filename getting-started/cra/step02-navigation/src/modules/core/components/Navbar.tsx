import React from 'react';
import { Link } from 'onekijs';

const Navbar: React.FC = () => {
  return (
    <div className="app-top-bar">
      <Link href="/">
        <h1>My Store</h1>
      </Link>
      <Link href="/" className="button fancy-button">
        <i className="material-icons">shopping_cart</i>
        Checkout
      </Link>
    </div>
  );
};

export default Navbar;

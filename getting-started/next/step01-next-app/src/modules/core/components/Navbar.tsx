import React, { FC } from 'react';

const Navbar: FC = () => {
  return (
    <div className="app-top-bar">
      <a href="/">
        <h1>My Store</h1>
      </a>
      <a href="/" className="button fancy-button">
        <i className="material-icons">shopping_cart</i>
        Checkout
      </a>
    </div>
  );
};

export default Navbar;

import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './@components/Navbar';
import ProductsPage from './products';
import './style.css';

ReactDOM.render(
  <div>
    <Navbar />
    <div className="container">
      <ProductsPage />
    </div>
  </div>,
  document.getElementById('root'),
);

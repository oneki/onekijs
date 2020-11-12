import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './modules/core/components/Navbar';
import ProductsPage from './pages/products';
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

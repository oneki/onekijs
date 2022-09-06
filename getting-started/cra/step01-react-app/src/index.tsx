import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './modules/core/components/Navbar';
import ProductsPage from './pages/products';
import './style.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <div>
    <Navbar />
    <div className="container">
      <ProductsPage />
    </div>
  </div>,
);

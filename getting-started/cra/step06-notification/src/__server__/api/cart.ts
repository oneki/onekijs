import { HttpHandler, HttpResponse, http } from 'msw';
import { SESSION_STORAGE_CART_KEY } from '../constants';
import { CartType, CartResponse } from './dto/cart';
import { AddProductRequest, AddProductResponse } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser

const getCartHandler = http.get('/cart', () => {
  return HttpResponse.json(loadCart() satisfies CartResponse);
});

const deleteCartHandler = http.delete('/cart', () => {
  sessionStorage.removeItem(SESSION_STORAGE_CART_KEY);
  return new HttpResponse(null);
});

const addProductHandler = http.post('/cart/products', async ({ request }) => {
  const cart = loadCart();
  cart.products.push((await request.json()) as AddProductRequest);
  sessionStorage.setItem(SESSION_STORAGE_CART_KEY, JSON.stringify(cart));
  return HttpResponse.json(cart satisfies AddProductResponse);
});

const loadCart = (): CartType => {
  const products = sessionStorage.getItem(SESSION_STORAGE_CART_KEY); // Specific code to work on CodeSandbox
  let cart: CartType = {
    products: [],
  };
  if (products) {
    cart = JSON.parse(products);
  }
  return cart;
};

const cartHandlers = (): HttpHandler[] => {
  return [getCartHandler, deleteCartHandler, addProductHandler];
};

export default cartHandlers;

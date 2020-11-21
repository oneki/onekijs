import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_CART_KEY } from '../constants';
import { CartType, CartResponse } from './dto/cart';
import { AddProductRequest, AddProductResponse } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser

const getCartHandler = rest.get<CartResponse>('/cart', (req, res, ctx) => {
  return res(ctx.json(loadCart()));
});

const deleteCartHandler = rest.delete<void>('/cart', (req, res, ctx) => {
  sessionStorage.removeItem(SESSION_STORAGE_CART_KEY);
  return res();
});

const addProductHandler = rest.post<AddProductRequest, AddProductResponse>('/cart/products', (req, res, ctx) => {
  const cart = loadCart();
  cart.products.push(req.body);
  sessionStorage.setItem(SESSION_STORAGE_CART_KEY, JSON.stringify(cart));
  return res(ctx.json(cart));
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

const cartHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [getCartHandler, deleteCartHandler, addProductHandler];
};

export default cartHandlers;

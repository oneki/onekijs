import { HttpHandler, HttpResponse, http } from 'msw';
import { CartResponse, CartType } from './dto/cart';
import { ProductType } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser

const getProductsHandler = http.get('/products', () => {
  return HttpResponse.json(loadProducts() satisfies CartResponse);
});

const products: ProductType[] = [
  {
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
  },
  {
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
  },
  {
    name: 'Phone Standard',
    price: 299,
  },
];

const loadProducts = (): CartType => {
  return {
    products,
  };
};

const getProductHandler = http.get('/products/:productId', ({ params }) => {
  return HttpResponse.json(products[Number(params.productId)] satisfies ProductType);
});

const productHandlers = (): HttpHandler[] => {
  return [getProductsHandler, getProductHandler];
};

export default productHandlers;

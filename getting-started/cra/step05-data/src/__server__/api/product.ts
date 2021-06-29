import { RequestHandler, rest } from 'msw';
import { CartResponse, CartType } from './dto/cart';
import { ProductType } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser

const getProductsHandler = rest.get<CartResponse>('/products', (_, res, ctx) => {
  return res(ctx.json(loadProducts()));
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

const getProductHandler = rest.get<ProductType>('/products/:productId', (req, res, ctx) => {
  const { productId } = req.params;
  return res(ctx.json(products[+productId]));
});

const productHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [getProductsHandler, getProductHandler];
};

export default productHandlers;

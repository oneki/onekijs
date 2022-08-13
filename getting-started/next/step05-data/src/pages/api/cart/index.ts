import type { NextApiRequest, NextApiResponse } from 'next';
import { CartType } from '../../../../data/dto/cart';

export const cart: CartType = {
  products: [],
};

const cartApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.cookies;
  if (!username) {
    res.status(401).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(cart);
  } else if (req.method === 'DELETE') {
    cart.products = [];
    res.status(200).end();
  }
};
export default cartApi;

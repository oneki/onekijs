import type { NextApiRequest, NextApiResponse } from 'next';
import { cart } from '.';

const productApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.cookies;
  if (!username) {
    res.status(401).end();
    return;
  }
  cart.products.push(req.body);
  res.status(200).json(cart);
};

export default productApi;

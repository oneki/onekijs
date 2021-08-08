import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { productId } = req.query;

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  if (productId === '2') {
    return res.status(500).json({
      message: 'SQL exception while retrieving the availability of the product',
    });
  }

  const available = productId === '1' ? false : true;

  return res.status(200).json({
    available,
  });
};

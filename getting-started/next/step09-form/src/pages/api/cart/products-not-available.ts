import type { NextApiRequest, NextApiResponse } from 'next';

const productNoAvailableApi = (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(400).json({
    message: `The product ${req.body.name} is not available at this moment`,
  });
};

export default productNoAvailableApi;

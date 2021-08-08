import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(400).json({
    message: `The product ${req.body.name} is not available at this moment`,
  });
};

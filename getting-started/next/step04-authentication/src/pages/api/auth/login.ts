import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const loginApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.body;
  res.setHeader(
    'Set-Cookie',
    serialize('username', String(username), {
      path: '/',
    }),
  );
  res.status(200).json({ username });
};

export default loginApi;

import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const logoutApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.body;
  res.setHeader(
    'Set-Cookie',
    serialize('username', String(username), {
      expires: new Date(0),
    }),
  );
  res.status(200).end();
};

export default logoutApi;

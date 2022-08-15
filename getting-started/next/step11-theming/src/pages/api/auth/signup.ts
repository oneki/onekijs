import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../users';

const signupApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.body;
  const user = users.find((user) => user.username === username);
  if (user) {
    return res.status(400).json({
      message: `The username ${username} already exists`,
    } as any);
  }

  users.push(req.body);

  res.setHeader(
    'Set-Cookie',
    serialize('username', String(username), {
      path: '/',
    }),
  );
  res.status(200).json({ username, name: 'John Doe' });
};

export default signupApi;

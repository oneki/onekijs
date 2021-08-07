import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '.';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.query;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).end();
  }
  res.status(200).json({
    username: user,
  });
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '.';
const userByNameApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.query;
  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(404).end();
  } else {
    res.status(200).json({
      username: user,
    });
  }
};

export default userByNameApi;

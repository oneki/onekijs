import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.cookies;
  if (!username) {
    console.log('return userinfo 401 !!', username);
    res.status(401).end();
  } else {
    console.log('return userinfo OK !!', username);
    res.status(200).json({ username });
  }
};

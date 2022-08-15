import type { NextApiRequest, NextApiResponse } from 'next';

const userinfoApi = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username } = req.cookies;
  if (!username) {
    res.status(401).end();
  } else {
    res.status(200).json({ username });
  }
};

export default userinfoApi;

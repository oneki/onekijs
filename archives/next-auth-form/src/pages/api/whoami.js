export default async (req, res) => {
  try {
    if (!req.cookies.access_token) {
      res.statusCode = 401;
      res.end();
      return;
    }

    if (req.cookies.access_token === 'TOKEN_ADMIN') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          sub: 'admin',
          email: 'admin@oneki.net',
          roles: ['USER', 'ADMIN'],
        }),
      );
    } else if (req.cookies.access_token === 'TOKEN_USER') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          sub: 'user',
          email: 'user@oneki.net',
          roles: ['USER'],
        }),
      );
    } else {
      res.statusCode = 401;
      res.end();
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify(error));
  }
};

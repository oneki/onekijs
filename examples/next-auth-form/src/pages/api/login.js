export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
      res.setHeader('Set-Cookie', [
        `access_token=TOKEN_ADMIN; path=/; HttpOnly; SameSite=Stric`
      ]);      
      res.end();
    } else if (req.body.username === 'user' && req.body.password === 'user') {
      res.setHeader('Set-Cookie', [
        `access_token=TOKEN_USER; path=/; HttpOnly; SameSite=Stric`
      ]);      
      res.end();
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({
        "message": "Username or password incorrect"
      }));
    }
  } catch (error) {
    console.log("error", error);
    res.statusCode = 500;
      res.end(JSON.stringify({
        "message": "Unexpected error"
      }));
  }
}
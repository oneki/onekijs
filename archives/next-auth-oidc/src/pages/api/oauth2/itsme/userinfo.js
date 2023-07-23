import jwt from './jwt';

export default async (req, res) => {
  // We implement to following (very basic) scenario
  //  - If there is no cookie, return a 401, so the front end knows that the user is not authenticated
  //  - If there is a cookie, extract the encrypted userinfo from the cookie, decrypt it and returns it in the response
  //  - There is no check on the access_token (shouldn't be the case in production)
  if (!req.cookies.access_token || !req.cookies.userinfo) {
    // User not yet authenticated
    res.statusCode = 401;
    res.end();
  } else {
    try {
      //id_token in the cookie is encrypted with our public key and signed with Itsme private key
      const encryptedUserinfo = req.cookies.userinfo;
      const decryptedUserinfo = jwt.decrypt(encryptedUserinfo);
      const userinfo = jwt.verify(decryptedUserinfo);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(userinfo));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    }
  }
};

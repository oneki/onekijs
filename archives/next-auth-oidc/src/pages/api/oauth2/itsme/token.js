import axios from 'axios';
import qs from 'query-string';
import jwt from './jwt';

export default async (req, res) => {
  try {
    // Itsme expects we send a client_assertion containing the following JSON (signed and encrypted)
    const assertion = {
      iss: process.env.NEXT_ITSME_CLIENT_ID,
      sub: process.env.NEXT_ITSME_CLIENT_ID,
      aud: process.env.NEXT_BACKEND_ITSME_TOKEN_ENDPOINT,
      jti: 'ethias-' + jwt.jti(),
      exp: jwt.exp(3600),
    };

    const signedAssertion = jwt.sign(assertion);
    const signedAndEncryptedAssertion = jwt.encrypt(signedAssertion);

    // OIDC /token body
    // See https://belgianmobileid.github.io/slate/sharedata.html#3-7-exchanging-the-authorization-code
    const data = qs.stringify({
      grant_type: req.body.grant_type,
      code: req.body.code,
      redirect_uri: req.body.redirect_uri,
      client_assertion: signedAndEncryptedAssertion,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });

    const response = await axios({
      method: 'post',
      url: process.env.NEXT_BACKEND_ITSME_TOKEN_ENDPOINT,
      data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    // We received an access_token.
    // We implement the following (very basic) scenario:
    //  - Call the /userinfo of Itsme to retrieve the details of the user and store it in a cookie
    const responseUserInfo = await axios({
      method: 'get',
      url: process.env.NEXT_BACKEND_ITSME_USERINFO_ENDPOINT,
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Set-Cookie', [
      `access_token=${response.data.access_token}; path=/; HttpOnly; SameSite=Stric; Secure`,
      `userinfo=${responseUserInfo.data}; path=/; HttpOnly; SameSite=Stric; Secure`, // userinfo is encrypted and signed
    ]);

    res.end();
  } catch (error) {
    console.error(error.response.data.error, error.response.data.detail);
    res.statusCode = error.response.status;
    res.end(JSON.stringify(error.response ? error.response.data : { error: 'Unexpected error' }));
  }
};

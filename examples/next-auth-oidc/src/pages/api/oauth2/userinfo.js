/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
const axios = require('axios');

export default async (idp, req, res) => {
  if (!idp.access_token) {
    res.statusCode = 401
    res.end();
  } else {
    try {
      const response = await axios({
        method: 'get',
        url: idp.userinfoEndpoint, //example: https://auth.oneki.net/oauth2/userInfo
        headers: {
          'Authorization': `Bearer ${idp.access_token}`
        }
      });
      res.statusCode = response.status;
      res.setHeader('Content-Type', response.headers['content-type']);
      res.end(JSON.stringify(response.data))
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  
}
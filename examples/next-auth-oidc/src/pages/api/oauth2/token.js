/* eslint-disable no-undef */

const axios = require('axios');
const qs = require('query-string');

export default async (idp, req, res) => {
  try {
    const response = await axios({
      method: 'post',
      url: idp.tokenEndpoint, //https://auth.oneki.net/oauth2/token
      data: qs.stringify({
        grant_type: req.body.grant_type,
        code: req.body.code,
        redirect_uri: idp.redirect_uri,
        code_verifier: req.body.code_verifier
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      auth: {
        username: idp.clientId,
        password: idp.clientSecret
      }
    });
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Set-Cookie', [
      `access_token=${response.data.access_token}; path=/; HttpOnly; SameSite=Stric; Secure`,
      `refresh_token=${response.data.refresh_token}; path=/; HttpOnly; SameSite=Stric; Secure`
    ]);
    res.end(JSON.stringify(response.data))
  } catch (error) {
    console.error(error);
    throw error;
  }
  
  
}
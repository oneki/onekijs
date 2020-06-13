
import token from '../token';

export default async (req, res) => {
  const idp = {
    tokenEndpoint: process.env.NEXT_BACKEND_FACEBOOK_TOKEN_ENDPOINT,
    clientId: process.env.NEXT_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.NEXT_FACEBOOK_CLIENT_SECRET,
    redirect_uri: 'https://localhost:3000/login/facebook/callback'
  }
  return await token(idp, req, res);
}
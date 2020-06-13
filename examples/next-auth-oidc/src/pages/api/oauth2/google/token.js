
import token from '../token';

export default async (req, res) => {
  const idp = {
    tokenEndpoint: process.env.NEXT_BACKEND_GOOGLE_TOKEN_ENDPOINT,
    clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    redirect_uri: 'https://localhost:3000/login/google/callback'
  }
  return await token(idp, req, res);
}
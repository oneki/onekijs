import userinfo from '../userinfo';

export default async (req, res) => {
  const idp = {
    userinfoEndpoint: process.env.NEXT_BACKEND_FACEBOOK_USERINFO_ENDPOINT,
    access_token: req.cookies.access_token,
  };
  return await userinfo(idp, req, res);
};

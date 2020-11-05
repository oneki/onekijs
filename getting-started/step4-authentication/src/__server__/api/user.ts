import { RequestHandler, rest } from 'msw';
interface UserInfoResponse {
  username: string;
}

const userInfoHandler = rest.get<UserInfoResponse>('/userinfo', (req, res, ctx) => {
  const { username } = req.cookies;
  console.log('USERNAME', username);
  if (!username) {
    return res(ctx.status(401));
  }
  return res(
    ctx.json({
      username,
    }),
  );
});

const userHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [userInfoHandler];
};

export default userHandlers;

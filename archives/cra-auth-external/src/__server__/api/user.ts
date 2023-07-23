import { RequestHandler, rest } from 'msw';
interface UserInfoResponse {
  username: string;
}

const userInfoHandler = rest.get<UserInfoResponse>('/userinfo', (req, res, ctx) => {
  const authorizationHeader = req.headers.get('Authorization');
  console.log(authorizationHeader);
  const user = authorizationHeader;

  return res(
    ctx.json({
      username: user,
      roles: user === 'admin' ? ['admin', 'user'] : ['user'],
    }),
  );
});

const userHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [userInfoHandler];
};

export default userHandlers;

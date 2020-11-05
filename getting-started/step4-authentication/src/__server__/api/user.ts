import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY } from '../constants';
interface UserInfoResponse {
  username: string;
}

const userInfoHandler = rest.get<UserInfoResponse>('/userinfo', (req, res, ctx) => {
  const { username } = req.cookies;
  const user = username || sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY); // Specific code to work on CodeSandbox
  if (!user) {
    return res(ctx.status(401));
  }
  return res(
    ctx.json({
      user,
    }),
  );
});

const userHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [userInfoHandler];
};

export default userHandlers;

import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY, SESSION_STORAGE_USERS } from '../constants';
import { GetUserResponse, User } from './dto/user';
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
      username: user,
    }),
  );
});

const getUserHandler = rest.get<GetUserResponse>('/users/:username', (req, res, ctx) => {
  const { username } = req.params;
  const users: User[] = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USERS) ?? '[]');
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res(ctx.status(404));
  }
  return res(
    ctx.json({
      username: user,
    }),
  );
});

const userHandlers = (): RequestHandler[] => {
  return [userInfoHandler, getUserHandler];
};

export default userHandlers;

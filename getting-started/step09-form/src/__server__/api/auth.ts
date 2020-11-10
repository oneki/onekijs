import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY, SESSION_STORAGE_USERS } from '../constants';
import { LoginRequest, LoginResponse } from './dto/login';
import { SignupRequest, SignupResponse } from './dto/signup';
import { User } from './dto/user';

const loginHandler = rest.post<LoginRequest, LoginResponse>('/auth/login', (req, res, ctx) => {
  const { username } = req.body;

  sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username); // Specific code to work on CodeSandbox
  return res(
    ctx.cookie('username', username),
    ctx.json({
      username,
    }),
  );
});

const logoutHandler = rest.get<void>('/auth/logout', (req, res, ctx) => {
  sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY); // Specific code to work on CodeSandbox
  return res(
    ctx.cookie('username', 'deleted', {
      expires: new Date(0),
    }),
  );
});

const signupHandler = rest.post<SignupRequest, SignupResponse>('/auth/signup', (req, res, ctx) => {
  const { username } = req.body;
  const users: User[] = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USERS) ?? '[]');

  const user = users.find((user) => user.username === username);
  if (user) {
    return res(
      ctx.status(400),
      ctx.json({
        message: `The username ${username} already exists`,
      } as any),
    );
  }

  users.push(req.body);

  sessionStorage.setItem(SESSION_STORAGE_USERS, JSON.stringify(users)); // Specific code to work on CodeSandbox
  sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username);
  return res(
    ctx.cookie('username', username),
    ctx.json({
      username,
    }),
  );
});

const authHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [loginHandler, logoutHandler, signupHandler];
};

export default authHandlers;

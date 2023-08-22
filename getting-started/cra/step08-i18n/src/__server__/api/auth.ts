import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY } from '../constants';
import { LoginRequest, LoginResponse } from './dto/login';

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

const logoutHandler = rest.get('/auth/logout', (req, res, ctx) => {
  sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY); // Specific code to work on CodeSandbox
  return res(
    ctx.cookie('username', 'deleted', {
      expires: new Date(0),
    }),
  );
});

const authHandlers = (): RequestHandler[] => {
  return [loginHandler, logoutHandler];
};

export default authHandlers;

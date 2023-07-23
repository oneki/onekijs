import { RequestHandler, rest } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY } from '../constants';
interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  username: string;
}

const loginHandler = rest.post<LoginRequest, LoginResponse>('/auth/login', (req, res, ctx) => {
  const { username, password } = req.body;
  let authenticated = false;
  if (username === 'user' && password === 'user') authenticated = true;
  if (username === 'admin' && password === 'admin') authenticated = true;

  if (!authenticated) {
    return res(
      // This response transformer sets a custom status text on the response.
      ctx.status(401),
    );
  }

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

const authHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [loginHandler, logoutHandler];
};

export default authHandlers;

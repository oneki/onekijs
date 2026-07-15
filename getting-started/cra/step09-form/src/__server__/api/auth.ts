import { HttpHandler, HttpResponse, http } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY, SESSION_STORAGE_USERS } from '../constants';
import { LoginRequest, LoginResponse } from './dto/login';
import { SignupRequest, SignupResponse } from './dto/signup';
import { User } from './dto/user';

const loginHandler = http.post('/auth/login', async ({ request }) => {
  const { username } = (await request.json()) as LoginRequest;

  sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username); // Specific code to work on CodeSandbox
  return HttpResponse.json(
    {
      username,
    } satisfies LoginResponse,
    { headers: { 'Set-Cookie': `username=${encodeURIComponent(username)}; Path=/; SameSite=Lax` } },
  );
});

const logoutHandler = http.get('/auth/logout', () => {
  sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY); // Specific code to work on CodeSandbox
  return new HttpResponse(null, {
    headers: { 'Set-Cookie': 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax' },
  });
});

const signupHandler = http.post('/auth/signup', async ({ request }) => {
  const signup = (await request.json()) as SignupRequest;
  const { username } = signup;
  const users: User[] = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USERS) ?? '[]');

  const user = users.find((user) => user.username === username);
  if (user) {
    return HttpResponse.json(
      {
        message: `The username ${username} already exists`,
      },
      { status: 400 },
    );
  }

  users.push(signup);

  sessionStorage.setItem(SESSION_STORAGE_USERS, JSON.stringify(users)); // Specific code to work on CodeSandbox
  sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username);
  return HttpResponse.json(
    {
      username,
    } satisfies SignupResponse,
    { headers: { 'Set-Cookie': `username=${encodeURIComponent(username)}; Path=/; SameSite=Lax` } },
  );
});

const authHandlers = (): HttpHandler[] => {
  return [loginHandler, logoutHandler, signupHandler];
};

export default authHandlers;

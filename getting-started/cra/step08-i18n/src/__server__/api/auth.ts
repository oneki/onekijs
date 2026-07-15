import { HttpHandler, HttpResponse, http } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY } from '../constants';
import { LoginRequest, LoginResponse } from './dto/login';

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

const authHandlers = (): HttpHandler[] => {
  return [loginHandler, logoutHandler];
};

export default authHandlers;

import { HttpHandler, HttpResponse, http } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY } from '../constants';

interface UserInfoResponse {
  username: string;
}

const userInfoHandler = http.get('/userinfo', () => {
  const user = sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY); // Specific code to work on CodeSandbox
  if (!user) {
    return new HttpResponse(null, { status: 401 });
  }
  return HttpResponse.json({
    username: user,
  } satisfies UserInfoResponse);
});

const userHandlers = (): HttpHandler[] => {
  return [userInfoHandler];
};

export default userHandlers;

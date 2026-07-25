import { HttpHandler, HttpResponse, http } from 'msw';
import { SESSION_STORAGE_USERNAME_KEY, SESSION_STORAGE_USERS } from '../constants';
import { GetUserResponse, User } from './dto/user';
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

const getUserHandler = http.get('/users/:username', ({ params }) => {
  const username = params.username;
  const users: User[] = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USERS) ?? '[]');
  const user = users.find((user) => user.username === username);
  if (!user) {
    return new HttpResponse(null, { status: 404 });
  }
  return HttpResponse.json({ username: user.username } satisfies GetUserResponse);
});

const userHandlers = (): HttpHandler[] => {
  return [userInfoHandler, getUserHandler];
};

export default userHandlers;

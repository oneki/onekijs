import { serialize } from 'cookie';
import { SignupRequest } from '../../../../../data/dto/signup';
import { users } from '../../users/store';

export async function POST(request: Request) {
  const user = (await request.json()) as SignupRequest;
  const existingUser = users.find(({ username }) => username === user.username);

  if (existingUser) {
    return Response.json({ message: `The username ${user.username} already exists` }, { status: 400 });
  }

  users.push(user);
  return Response.json(
    { username: user.username, name: 'John Doe' },
    { headers: { 'Set-Cookie': serialize('username', user.username, { path: '/' }) } },
  );
}

import { serialize } from 'cookie';

export async function POST(request: Request) {
  const { username } = await request.json();
  const value = String(username ?? '');

  return Response.json(
    { username: value },
    {
      headers: {
        'Set-Cookie': serialize('username', value, { path: '/' }),
      },
    },
  );
}

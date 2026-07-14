import { serialize } from 'cookie';

export async function POST() {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': serialize('username', '', { expires: new Date(0), path: '/' }),
    },
  });
}

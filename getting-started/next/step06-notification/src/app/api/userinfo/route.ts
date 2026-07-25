import { cookies } from 'next/headers';

export async function GET() {
  const username = (await cookies()).get('username')?.value;

  if (!username) {
    return new Response(null, { status: 401 });
  }

  return Response.json({ username });
}

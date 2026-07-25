import { cookies } from 'next/headers';

export async function GET() {
  const username = (await cookies()).get('username')?.value;
  return username ? Response.json({ username }) : new Response(null, { status: 401 });
}

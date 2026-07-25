import { users } from '../store';

export async function GET(_: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = users.find((entry) => entry.username === username);
  return user ? Response.json({ username: user.username }) : new Response(null, { status: 404 });
}

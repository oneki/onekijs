import { users } from './store';

export async function GET() {
  return Response.json(users);
}

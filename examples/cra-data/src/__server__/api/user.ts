import { RequestHandler, rest } from 'msw';
import { getUser, listUsers } from '../db/userDb';
import { UserType } from '../dto/user';

const getUserHandler = rest.get<UserType>('/users/:userId', (req, res, ctx) => {
  const { userId } = req.params;
  return res(ctx.json(getUser(userId)));
});

const listUsersHandler = rest.get<UserType>('/users', (req, res, ctx) => {
  return res(
    ctx.json({
      users: listUsers(),
    }),
  );
});

const userHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [getUserHandler, listUsersHandler];
};

export default userHandlers;

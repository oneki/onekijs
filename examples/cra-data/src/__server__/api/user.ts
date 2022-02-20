import { RequestHandler, rest } from 'msw';
import { addUser, deleteUser, editUser, getUser, listUsers } from '../db/userDb';
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

const createUserHandler = rest.post<UserType, UserType>('/users', (req, res, ctx) => {
  return res(ctx.json(addUser(req.body)));
});

const deleteUserHandler = rest.delete<void>('/users/:userId', (req, res, ctx) => {
  const { userId } = req.params;
  deleteUser(userId);
  return res();
});

const editUserHandler = rest.put<UserType, UserType>('/users/:userId', (req, res, ctx) => {
  return res(ctx.json(editUser(req.body)));
});

const userHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [getUserHandler, listUsersHandler, createUserHandler, deleteUserHandler, editUserHandler];
};

export default userHandlers;

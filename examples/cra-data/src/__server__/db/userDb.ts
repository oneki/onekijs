import { UserType } from '../dto/user';

let idx = 0;
export type UserDbType = {
  [x: string]: UserType;
};
export const userDb: UserDbType = {};

if (Object.keys(userDb).length === 0) {
  userDb[`${++idx}`] = { id: idx, name: 'Doe', firstname: 'John' };
  userDb[`${++idx}`] = { id: idx, name: 'Good', firstname: 'Teresa' };
  userDb[`${++idx}`] = { id: idx, name: 'Brock', firstname: 'Rosalind' };
}

export const addUser = (user: UserType): void => {
  user.id = ++idx;
  userDb[`${idx}`] = user;
};

export const deleteUser = (id: string): void => {
  delete userDb[id];
};

export const editUser = (user: UserType): void => {
  if (!user.id) return;
  userDb[`${user.id}`] = user;
};

export const getUser = (id: string): UserType | undefined => {
  return userDb[id];
};

export const listUsers = (): UserType[] => {
  return Object.keys(userDb).map((key) => userDb[key]);
};

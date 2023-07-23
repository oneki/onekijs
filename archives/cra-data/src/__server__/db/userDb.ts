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

export const addUser = (user: UserType): UserType => {
  user.id = ++idx;
  userDb[`${idx}`] = user;
  return user;
};

export const deleteUser = (id: string): void => {
  delete userDb[id];
};

export const editUser = (user: UserType): UserType => {
  if (!user.id) throw new Error("user doesn't exist");
  userDb[`${user.id}`] = user;
  return user;
};

export const getUser = (id: string): UserType | undefined => {
  return userDb[id];
};

export const listUsers = (): UserType[] => {
  return Object.keys(userDb).map((key) => userDb[key]);
};

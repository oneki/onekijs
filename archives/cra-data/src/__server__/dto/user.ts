export interface UserType {
  id?: number;
  name: string;
  firstname: string;
}

export interface UsersResponse {
  users: UserType[];
}

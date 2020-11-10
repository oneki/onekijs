import { User } from './user';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface SignupRequest extends User {}

export interface SignupResponse {
  username: string;
}

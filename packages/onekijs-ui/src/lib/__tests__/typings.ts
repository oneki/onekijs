import { Address } from 'cluster';

export interface TestAddress {
  street: string;
  postalCode: number;
  city: string;
}

export interface TestUser {
  id: number;
  lastname: string;
  firstname: string;
  address: TestAddress;
  phones: string[];
}

export type TestAction = {
  method: string,
  args: any[],
}

export type TestHandler = {
  name: string,
  actions: TestAction[],
}
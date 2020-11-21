import { setupWorker } from 'msw';
import authHandlers from './api/auth';
import cartHandlers from './api/cart';
import userHandlers from './api/user';

export const worker = setupWorker(...authHandlers(), ...userHandlers(), ...cartHandlers());

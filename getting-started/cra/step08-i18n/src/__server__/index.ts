import { setupWorker } from 'msw/browser';
import authHandlers from './api/auth';
import cartHandlers from './api/cart';
import userHandlers from './api/user';

export const worker = setupWorker(...authHandlers(), ...userHandlers(), ...cartHandlers());

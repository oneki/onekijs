import { setupWorker } from 'msw';
import authHandlers from './api/auth';
import userHandlers from './api/user';

export const worker = setupWorker(...authHandlers(), ...userHandlers());

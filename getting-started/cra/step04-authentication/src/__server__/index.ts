import { setupWorker } from 'msw/browser';
import authHandlers from './api/auth';
import userHandlers from './api/user';

export const worker = setupWorker(...authHandlers(), ...userHandlers());

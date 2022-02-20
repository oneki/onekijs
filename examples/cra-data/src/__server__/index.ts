import { setupWorker } from 'msw';
import userHandlers from './api/user';

export const worker = setupWorker(...userHandlers());

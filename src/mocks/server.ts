import { setupServer } from 'msw/node';
import { handlers as kankaHandlers } from './handlers/kanka';
import { handlers as statsHandlers } from './handlers/stats';

export const server = setupServer(...kankaHandlers, ...statsHandlers);

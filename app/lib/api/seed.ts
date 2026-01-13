import { api } from '../api';

export const seedApi = {
  seed: () => api.post('/seed'),
  clear: () => api.delete('/seed'),
};

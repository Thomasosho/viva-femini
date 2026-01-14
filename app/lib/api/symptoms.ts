import { api } from '../api';

export const symptomsApi = {
  getAll: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return api.get<string[] | Record<string, number>>(`/symptoms${query ? `?${query}` : ''}`);
  },
};

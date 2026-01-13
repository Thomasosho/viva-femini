import { api } from '../api';

export interface Cycle {
  _id?: string;
  startDate: string;
  endDate: string;
  cycleLength: number;
  periodLength: number;
  symptoms: string[];
  averageFlow: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCycleDto {
  startDate: string;
  endDate: string;
  cycleLength?: number;
  periodLength?: number;
  symptoms?: string[];
  averageFlow?: string;
}

export interface UpdateCycleDto extends Partial<CreateCycleDto> {}

export const cyclesApi = {
  getAll: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return api.get<Cycle[]>(`/cycles${query ? `?${query}` : ''}`);
  },

  getCurrent: () => api.get<Cycle | null>('/cycles/current'),

  getById: (id: string) => api.get<Cycle>(`/cycles/${id}`),

  create: (data: CreateCycleDto) => api.post<Cycle>('/cycles', data),

  update: (id: string, data: UpdateCycleDto) =>
    api.patch<Cycle>(`/cycles/${id}`, data),

  delete: (id: string) => api.delete<void>(`/cycles/${id}`),
};

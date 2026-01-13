import { api } from '../api';

export interface DailyLog {
  _id?: string;
  date: string;
  symptoms: string[];
  flowIntensity: number;
  notes: string;
  healthActivities: string[];
  isPeriodDay: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDailyLogDto {
  date: string;
  symptoms?: string[];
  flowIntensity?: number;
  notes?: string;
  healthActivities?: string[];
  isPeriodDay?: boolean;
}

export interface UpdateDailyLogDto extends Partial<CreateDailyLogDto> {}

export const dailyLogsApi = {
  getAll: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return api.get<DailyLog[]>(`/daily-logs${query ? `?${query}` : ''}`);
  },

  getByDate: (date: string) => api.get<DailyLog>(`/daily-logs/${date}`),

  create: (data: CreateDailyLogDto) => api.post<DailyLog>('/daily-logs', data),

  update: (date: string, data: UpdateDailyLogDto) =>
    api.patch<DailyLog>(`/daily-logs/${date}`, data),

  delete: (date: string) => api.delete<void>(`/daily-logs/${date}`),
};

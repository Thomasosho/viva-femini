import { api } from '../api';

export interface HealthReport {
  _id?: string;
  month: number;
  year: number;
  totalCycles: number;
  averageCycleLength: number;
  averagePeriodLength: number;
  symptomFrequency: Record<string, number>;
  periodLengthHistory: Array<{ cycle: number; length: number }>;
  flowSummary: {
    light: number;
    medium: number;
    heavy: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const healthReportsApi = {
  getAll: () => api.get<HealthReport[]>('/health-reports'),

  getByMonthYear: (month: number, year: number) =>
    api.get<HealthReport>(`/health-reports/${month}/${year}`),

  generate: (month: number, year: number) =>
    api.post<HealthReport>(`/health-reports/generate?month=${month}&year=${year}`),
};

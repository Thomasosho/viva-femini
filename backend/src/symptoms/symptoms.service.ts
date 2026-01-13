import { Injectable } from '@nestjs/common';
import { DailyLogsService } from '../daily-logs/daily-logs.service';

@Injectable()
export class SymptomsService {
  constructor(private readonly dailyLogsService: DailyLogsService) {}

  async getAllSymptoms(): Promise<string[]> {
    const logs = await this.dailyLogsService.findAll();
    const symptomSet = new Set<string>();
    
    logs.forEach(log => {
      log.symptoms?.forEach(symptom => symptomSet.add(symptom));
    });

    return Array.from(symptomSet).sort();
  }

  async getSymptomsByDateRange(startDate: Date, endDate: Date): Promise<Record<string, number>> {
    const logs = await this.dailyLogsService.findByDateRange(startDate, endDate);
    const symptomFrequency: Record<string, number> = {};

    logs.forEach(log => {
      log.symptoms?.forEach(symptom => {
        symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
      });
    });

    return symptomFrequency;
  }
}

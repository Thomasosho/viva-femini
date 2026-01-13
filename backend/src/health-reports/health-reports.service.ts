import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthReport, HealthReportDocument } from '../schemas/health-report.schema';
import { CyclesService } from '../cycles/cycles.service';
import { DailyLogsService } from '../daily-logs/daily-logs.service';

@Injectable()
export class HealthReportsService {
  constructor(
    @InjectModel(HealthReport.name) private healthReportModel: Model<HealthReportDocument>,
    private readonly cyclesService: CyclesService,
    private readonly dailyLogsService: DailyLogsService,
  ) {}

  async generateReport(month: number, year: number): Promise<HealthReportDocument> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Get cycles for the month
    const cycles = await this.cyclesService.findByDateRange(startDate, endDate);
    
    // Get daily logs for the month
    const dailyLogs = await this.dailyLogsService.findByDateRange(startDate, endDate);

    // Calculate statistics
    const totalCycles = cycles.length;
    const averageCycleLength = cycles.length > 0
      ? cycles.reduce((sum, cycle) => sum + cycle.cycleLength, 0) / cycles.length
      : 0;
    const averagePeriodLength = cycles.length > 0
      ? cycles.reduce((sum, cycle) => sum + cycle.periodLength, 0) / cycles.length
      : 0;

    // Symptom frequency
    const symptomFrequency: Record<string, number> = {};
    dailyLogs.forEach(log => {
      log.symptoms?.forEach(symptom => {
        symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
      });
    });

    // Flow summary
    const flowSummary = { light: 0, medium: 0, heavy: 0 };
    dailyLogs.forEach(log => {
      if (log.flowIntensity >= 1 && log.flowIntensity <= 3) flowSummary.light++;
      else if (log.flowIntensity >= 4 && log.flowIntensity <= 7) flowSummary.medium++;
      else if (log.flowIntensity >= 8 && log.flowIntensity <= 10) flowSummary.heavy++;
    });

    // Period length history
    const periodLengthHistory = cycles.map((cycle, index) => ({
      cycle: index + 1,
      length: cycle.periodLength,
    }));

    // Create or update health report
    const reportData = {
      month,
      year,
      totalCycles,
      averageCycleLength: Math.round(averageCycleLength * 10) / 10,
      averagePeriodLength: Math.round(averagePeriodLength * 10) / 10,
      symptomFrequency,
      periodLengthHistory,
      flowSummary,
    };

    return this.healthReportModel.findOneAndUpdate(
      { month, year },
      reportData,
      { upsert: true, new: true },
    ).exec();
  }

  async getReport(month: number, year: number): Promise<HealthReportDocument | null> {
    return this.healthReportModel.findOne({ month, year }).exec();
  }

  async getAllReports(): Promise<HealthReportDocument[]> {
    return this.healthReportModel.find().sort({ year: -1, month: -1 }).exec();
  }
}

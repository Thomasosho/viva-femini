import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthReportsService } from './health-reports.service';
import { HealthReportsController } from './health-reports.controller';
import { HealthReport, HealthReportSchema } from '../schemas/health-report.schema';
import { CyclesModule } from '../cycles/cycles.module';
import { DailyLogsModule } from '../daily-logs/daily-logs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HealthReport.name, schema: HealthReportSchema }]),
    CyclesModule,
    DailyLogsModule,
  ],
  controllers: [HealthReportsController],
  providers: [HealthReportsService],
  exports: [HealthReportsService],
})
export class HealthReportsModule {}

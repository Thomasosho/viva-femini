import { Module } from '@nestjs/common';
import { SymptomsService } from './symptoms.service';
import { SymptomsController } from './symptoms.controller';
import { DailyLogsModule } from '../daily-logs/daily-logs.module';

@Module({
  imports: [DailyLogsModule],
  controllers: [SymptomsController],
  providers: [SymptomsService],
  exports: [SymptomsService],
})
export class SymptomsModule {}

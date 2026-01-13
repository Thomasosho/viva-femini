import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CyclesModule } from './cycles/cycles.module';
import { DailyLogsModule } from './daily-logs/daily-logs.module';
import { SymptomsModule } from './symptoms/symptoms.module';
import { ArticlesModule } from './articles/articles.module';
import { HealthReportsModule } from './health-reports/health-reports.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/vivafemini',
    ),
    CyclesModule,
    DailyLogsModule,
    SymptomsModule,
    ArticlesModule,
    HealthReportsModule,
    SeedModule,
  ],
})
export class AppModule {}

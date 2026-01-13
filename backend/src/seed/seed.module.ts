import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Cycle, CycleSchema } from '../schemas/cycle.schema';
import { DailyLog, DailyLogSchema } from '../schemas/daily-log.schema';
import { Article, ArticleSchema } from '../schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cycle.name, schema: CycleSchema },
      { name: DailyLog.name, schema: DailyLogSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

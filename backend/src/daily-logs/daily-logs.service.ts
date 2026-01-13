import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyLog, DailyLogDocument } from '../schemas/daily-log.schema';
import { CreateDailyLogDto } from './dto/create-daily-log.dto';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto';

@Injectable()
export class DailyLogsService {
  constructor(
    @InjectModel(DailyLog.name) private dailyLogModel: Model<DailyLogDocument>,
  ) {}

  async create(createDailyLogDto: CreateDailyLogDto): Promise<DailyLogDocument> {
    const logDate = new Date(createDailyLogDto.date);
    logDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const createdLog = new this.dailyLogModel({
      ...createDailyLogDto,
      date: logDate,
    });

    return createdLog.save();
  }

  async findAll(): Promise<DailyLogDocument[]> {
    return this.dailyLogModel.find().sort({ date: -1 }).exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<DailyLogDocument[]> {
    return this.dailyLogModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ date: -1 })
      .exec();
  }

  async findOne(date: string): Promise<DailyLogDocument> {
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const log = await this.dailyLogModel.findOne({ date: logDate }).exec();

    if (!log) {
      throw new NotFoundException(`Daily log for date ${date} not found`);
    }

    return log;
  }

  async update(date: string, updateDailyLogDto: UpdateDailyLogDto): Promise<DailyLogDocument> {
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const updatedLog = await this.dailyLogModel
      .findOneAndUpdate({ date: logDate }, updateDailyLogDto, { new: true })
      .exec();

    if (!updatedLog) {
      throw new NotFoundException(`Daily log for date ${date} not found`);
    }

    return updatedLog;
  }

  async remove(date: string): Promise<void> {
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const result = await this.dailyLogModel.deleteOne({ date: logDate }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Daily log for date ${date} not found`);
    }
  }
}

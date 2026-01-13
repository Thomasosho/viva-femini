import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cycle, CycleDocument } from '../schemas/cycle.schema';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Injectable()
export class CyclesService {
  constructor(
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
  ) {}

  async create(createCycleDto: CreateCycleDto): Promise<CycleDocument> {
    const createdCycle = new this.cycleModel(createCycleDto);
    return createdCycle.save();
  }

  async findAll(): Promise<CycleDocument[]> {
    return this.cycleModel.find().sort({ startDate: -1 }).exec();
  }

  async findOne(id: string): Promise<CycleDocument> {
    const cycle = await this.cycleModel.findById(id).exec();
    if (!cycle) {
      throw new NotFoundException(`Cycle with ID ${id} not found`);
    }
    return cycle;
  }

  async update(id: string, updateCycleDto: UpdateCycleDto): Promise<CycleDocument> {
    const updatedCycle = await this.cycleModel
      .findByIdAndUpdate(id, updateCycleDto, { new: true })
      .exec();

    if (!updatedCycle) {
      throw new NotFoundException(`Cycle with ID ${id} not found`);
    }

    return updatedCycle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.cycleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cycle with ID ${id} not found`);
    }
  }

  async findCurrentCycle(): Promise<CycleDocument | null> {
    const now = new Date();
    return this.cycleModel
      .findOne({
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<CycleDocument[]> {
    return this.cycleModel
      .find({
        $or: [
          { startDate: { $gte: startDate, $lte: endDate } },
          { endDate: { $gte: startDate, $lte: endDate } },
          { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
        ],
      })
      .sort({ startDate: -1 })
      .exec();
  }
}

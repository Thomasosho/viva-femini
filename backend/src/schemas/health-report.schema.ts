import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HealthReportDocument = HealthReport & Document;

@Schema({ timestamps: true })
export class HealthReport {
  @Prop({ type: Number, required: true })
  month: number; // 1-12

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: Number, default: 0 })
  totalCycles: number;

  @Prop({ type: Number, default: 0 })
  averageCycleLength: number;

  @Prop({ type: Number, default: 0 })
  averagePeriodLength: number;

  @Prop({ type: Object, default: {} })
  symptomFrequency: Record<string, number>;

  @Prop({ type: [Object], default: [] })
  periodLengthHistory: Array<{ cycle: number; length: number }>;

  @Prop({ type: Object, default: {} })
  flowSummary: {
    light: number;
    medium: number;
    heavy: number;
  };

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const HealthReportSchema = SchemaFactory.createForClass(HealthReport);
HealthReportSchema.index({ month: 1, year: 1 }); // Index for faster queries

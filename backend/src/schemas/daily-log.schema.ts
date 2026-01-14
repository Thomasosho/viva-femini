import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DailyLogDocument = DailyLog & Document;

@Schema({ timestamps: true })
export class DailyLog {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: [String], default: [] })
  symptoms: string[];

  @Prop({ type: Number, min: 0, max: 10, default: 0 })
  flowIntensity: number; // 1-10 scale

  @Prop({ type: String, default: '' })
  notes: string;

  @Prop({ type: [String], default: [] })
  healthActivities: string[]; // e.g., ['Pilates', 'Yoga']

  @Prop({ type: Boolean, default: false })
  isPeriodDay: boolean;

  @Prop({ type: String, enum: ['none', 'positive', 'negative', 'faint_line'], default: 'none' })
  pregnancyTestResult?: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const DailyLogSchema = SchemaFactory.createForClass(DailyLog);
DailyLogSchema.index({ date: 1 }, { unique: true }); // Unique index for date field

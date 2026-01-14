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
  flowIntensity: number; // How heavy the flow is, from 1 (light) to 10 (heavy)

  @Prop({ type: String, default: '' })
  notes: string;

  @Prop({ type: [String], default: [] })
  healthActivities: string[]; // Things like exercise, meditation, etc.

  @Prop({ type: Boolean, default: false })
  isPeriodDay: boolean;

  @Prop({ type: String, enum: ['none', 'positive', 'negative', 'faint_line'], default: 'none' })
  pregnancyTestResult?: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const DailyLogSchema = SchemaFactory.createForClass(DailyLog);
DailyLogSchema.index({ date: 1 }, { unique: true }); // Each date can only have one log entry

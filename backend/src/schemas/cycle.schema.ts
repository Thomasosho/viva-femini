import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CycleDocument = Cycle & Document;

@Schema({ timestamps: true })
export class Cycle {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Number, default: 28 })
  cycleLength: number;

  @Prop({ type: Number, default: 5 })
  periodLength: number;

  @Prop({ type: [String], default: [] })
  symptoms: string[];

  @Prop({ default: 'medium' })
  averageFlow: string; // light, medium, heavy

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);

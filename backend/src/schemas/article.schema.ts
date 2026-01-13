import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, default: '' })
  content: string;

  @Prop({ type: String, default: '' })
  author: string;

  @Prop({ type: String, default: '' })
  category: string;

  @Prop({ type: String, default: '' })
  url: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

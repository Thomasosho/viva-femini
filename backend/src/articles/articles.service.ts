import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ArticleDocument> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<ArticleDocument> {
    const updatedArticle = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec();

    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return updatedArticle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.articleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}

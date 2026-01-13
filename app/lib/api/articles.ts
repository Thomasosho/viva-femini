import { api } from '../api';

export interface Article {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  content?: string;
  author?: string;
  category?: string;
  url?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateArticleDto {
  title: string;
  description: string;
  imageUrl: string;
  content?: string;
  author?: string;
  category?: string;
  url?: string;
}

export const articlesApi = {
  getAll: () => api.get<Article[]>('/articles'),

  getById: (id: string) => api.get<Article>(`/articles/${id}`),
};

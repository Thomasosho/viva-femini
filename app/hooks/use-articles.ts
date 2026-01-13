'use client';

import { useState, useEffect } from 'react';
import { articlesApi, Article } from '../lib/api/articles';
import { ApiError } from '../lib/api';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articlesApi.getAll();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  return {
    articles,
    loading,
    error,
    reload: loadArticles,
  };
}

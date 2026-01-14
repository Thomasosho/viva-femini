'use client';

import { useState } from 'react';
import { useArticles } from '../hooks/use-articles';
import { articlesApi, Article } from '../lib/api/articles';
import ArticleDetailModal from './ArticleDetailModal';

export default function RecommendedArticles() {
  const { articles, loading, error } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleArticleClick = async (article: Article) => {
    if (!article._id) {
      // If no ID, just show the article we have
      setSelectedArticle(article);
      setShowDetailModal(true);
      return;
    }

    setLoadingDetail(true);
    try {
      const fullArticle = await articlesApi.getById(article._id);
      setSelectedArticle(fullArticle);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Failed to load article details:', err);
      // Fallback to showing the article we have
      setSelectedArticle(article);
      setShowDetailModal(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Display loading state or error gracefully
  if (loading) {
    return (
      <div 
        className="w-full lg:w-[749px]"
        style={{ 
          height: 'auto',
          minHeight: '281px',
          borderRadius: '16px',
          backgroundColor: '#F3F4F6',
          padding: '15px',
          fontFamily: 'Geist, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p style={{ color: '#6B7280' }}>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="w-full lg:w-[749px]"
        style={{ 
          height: 'auto',
          minHeight: '281px',
          borderRadius: '16px',
          backgroundColor: '#F3F4F6',
          padding: '15px',
          fontFamily: 'Geist, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p style={{ color: '#EF4444' }}>Failed to load articles</p>
      </div>
    );
  }

  // Use articles from API, or fallback to empty array
  const displayArticles = articles && Array.isArray(articles) ? articles.slice(0, 3) : [];

  return (
    <div 
      className="w-full lg:w-[749px]"
      style={{ 
        height: 'auto',
        minHeight: '281px',
        borderRadius: '16px',
        backgroundColor: '#F3F4F6',
        padding: '0',
        fontFamily: 'Geist, sans-serif',
        position: 'relative'
      }}
    >
      {/* Recommended for You heading */}
      <h3 
        style={{
          fontFamily: 'Geist, sans-serif',
          fontWeight: 700,
          fontStyle: 'normal',
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#FB3179',
          margin: 0,
          padding: '15px 15px 0 15px'
        }}
      >
        Recommended for You
      </h3>
      
      {/* Three article cards horizontally */}
      <div 
        className="overflow-x-auto pb-4"
        style={{
          display: 'flex',
          gap: '10px',
          padding: '0',
          paddingTop: '16px',
          paddingLeft: '15px',
          paddingRight: '15px'
        }}
      >
        {displayArticles.length > 0 ? (
          displayArticles.map((article, index) => (
            <div 
              key={article._id || index}
              className="flex-shrink-0"
              style={{
                width: '233px',
                height: '220px',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => handleArticleClick(article)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div 
                style={{
                  width: '213px',
                  height: index === 0 ? '124px' : '120px',
                  borderRadius: '10px',
                  backgroundColor: '#F3F4F6',
                  margin: index === 0 ? '10px 10px 0 10px' : '10px 10px 0 10px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={article.imageUrl || `/article-${(index % 3) + 1}.svg`}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />
              </div>
              
              {/* Content Section */}
              <div 
                style={{ 
                  padding: '10px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <h4 
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '16px',
                    letterSpacing: '0%',
                    color: '#000000',
                    margin: 0,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {article.title}
                </h4>
                
                {/* Arrow link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#B32070',
                    marginTop: 'auto'
                  }}
                >
                  <span>Read more</span>
                  <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11.3512H12.5054L9.05604 7.91735L9.97752 7L15 12L9.97752 17L9.05604 16.0827L12.5054 12.6488H3V11.3512Z" fill="#B32070"/>
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '20px', color: '#6B7280' }}>No articles available</div>
        )}
      </div>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />
    </div>
  );
}

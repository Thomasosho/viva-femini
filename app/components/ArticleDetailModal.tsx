'use client';

import { Article } from '../lib/api/articles';

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

export default function ArticleDetailModal({ isOpen, onClose, article }: ArticleDetailModalProps) {
  if (!isOpen || !article) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Article Image */}
        {article.imageUrl && (
          <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Article Title */}
        <h1
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '12px',
            lineHeight: '1.2',
          }}
        >
          {article.title}
        </h1>

        {/* Article Meta */}
        {(article.author || article.category) && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              fontFamily: 'Geist, sans-serif',
              fontSize: '14px',
              color: '#6B7280',
            }}
          >
            {article.author && <span>By {article.author}</span>}
            {article.category && <span>• {article.category}</span>}
          </div>
        )}

        {/* Article Description */}
        <p
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#374151',
            marginBottom: '20px',
            lineHeight: '1.6',
          }}
        >
          {article.description}
        </p>

        {/* Article Content */}
        {article.content && (
          <div
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#374151',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Article URL */}
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: '#FB3179',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Geist, sans-serif',
              textDecoration: 'none',
              marginTop: '20px',
            }}
          >
            Read Full Article →
          </a>
        )}

        {/* Close Button at Bottom */}
        <button
          onClick={onClose}
          style={{
            marginTop: '24px',
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            backgroundColor: '#FFFFFF',
            color: '#374151',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Geist, sans-serif',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

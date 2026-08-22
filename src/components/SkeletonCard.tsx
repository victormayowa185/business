import React from 'react';
import '../styles/skeleton.css';

interface SkeletonCardProps {
  height?: 'sm' | 'md' | 'lg';
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height = 'md' }) => {
  return (
    <div className={`skeleton-card skeleton-card--${height}`}>
      {/* Image skeleton */}
      <div className="skeleton-card__image">
        <div className="skeleton skeleton-image" />
      </div>

      {/* Text skeleton */}
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-text skeleton-text--lg" />
        <div className="skeleton skeleton-text skeleton-text--md" />
        <div className="skeleton skeleton-text skeleton-text--sm" />
      </div>
    </div>
  );
};

export default SkeletonCard;
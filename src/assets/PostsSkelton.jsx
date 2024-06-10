import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostsSkeleton = ({ count }) => {
  const skeletonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  const skeletonItemStyle = {
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    padding: '20px',
  };
  
  return (
    <SkeletonTheme baseColor="#e3e3e3" highlightColor="#f0f0f0">
      <div style={skeletonContainerStyle}>
        {Array(count)
          .fill()
          .map((_, index) => (
            <div key={index} style={skeletonItemStyle}>
              <Skeleton height={120} />
              <Skeleton height={20} style={{ marginTop: '10px' }} />
              <Skeleton height={20} style={{ marginTop: '5px' }} />
              <Skeleton height={20} style={{ marginTop: '5px' }} />
            </div>
          ))}
      </div>
    </SkeletonTheme>
  );
};

export default PostsSkeleton;

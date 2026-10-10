import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rect',
  className = '',
  style,
  ...props
}) => {
  const customStyle: React.CSSProperties = {
    width: width !== undefined ? width : '100%',
    height: height !== undefined ? height : variant === 'text' ? '1rem' : '100%',
    ...style,
  };

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={customStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

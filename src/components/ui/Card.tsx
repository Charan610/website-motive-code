import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  glow?: boolean;
  interactive?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  glow = false,
  interactive = false,
  bordered = true,
  className = '',
  ...props
}) => {
  const elevationClass = `surface-${elevation}`;
  const glowClass = glow ? 'card-glow' : '';
  const interactiveClass = interactive ? 'card-interactive' : '';
  const borderClass = bordered ? 'card-bordered' : '';

  return (
    <div
      className={`card ${elevationClass} ${glowClass} ${interactiveClass} ${borderClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

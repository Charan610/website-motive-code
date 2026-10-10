import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  showLabel?: boolean;
  label?: string;
  variant?: 'accent' | 'secondary' | 'success';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  label,
  variant = 'accent',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`progress-wrapper ${className}`}>
      {(showLabel || label) && (
        <div className="progress-labels">
          <span className="progress-title">{label}</span>
          {showLabel && <span className="progress-pct">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`progress-fill progress-fill-${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

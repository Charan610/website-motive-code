import React, { useState, useEffect } from 'react';
import { getStoredProgress, getStreak, resetAllProgress } from '../../lib/progressStorage';
import { reelsData } from '../../data/reelsData';
import type { UserProgressData } from '../../types/content';

export interface ProgressDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgressDashboardModal: React.FC<ProgressDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [progress, setProgress] = useState<UserProgressData>(getStoredProgress());
  const [streak, setStreak] = useState(getStreak());

  useEffect(() => {
    if (isOpen) {
      setProgress(getStoredProgress());
      setStreak(getStreak());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalReels = reelsData.length;
  const completedCount = progress.completedReels.length;
  const completionPct = Math.round((completedCount / (totalReels || 1)) * 100);

  // Calculate average recall score across all quizzes
  const quizScoresArray = Object.values(progress.quizScores);
  let averageRecallPct = 0;
  if (quizScoresArray.length > 0) {
    const totalScorePct = quizScoresArray.reduce((acc, score) => acc + score, 0);
    averageRecallPct = Math.round(totalScorePct / quizScoresArray.length);
  }

  const masteredCount = progress.masteredFlashcards.length;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your local progress?')) {
      resetAllProgress();
      setProgress(getStoredProgress());
      setStreak(0);
    }
  };

  return (
    <div className="progress-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="progress-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="progress-modal-header">
          <div>
            <span className="badge badge-sm badge-secondary">Private & Local</span>
            <h2 className="progress-modal-title">Your Builder Progress</h2>
          </div>
          <button type="button" className="progress-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="progress-modal-desc">
          Zero signups required. Your streak, quiz scores, and mastered engineering workflows are saved directly in your browser.
        </p>

        {/* METRICS GRID */}
        <div className="progress-stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon stat-icon-fire">🔥</div>
            <div className="stat-card-value">{streak} {streak === 1 ? 'Day' : 'Days'}</div>
            <div className="stat-card-label">Active Streak</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon stat-icon-reels">🎬</div>
            <div className="stat-card-value">{completedCount} / {totalReels}</div>
            <div className="stat-card-label">Reels Built ({completionPct}%)</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon stat-icon-quiz">⚡</div>
            <div className="stat-card-value">{averageRecallPct}%</div>
            <div className="stat-card-label">Average Recall Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon stat-icon-cards">🃏</div>
            <div className="stat-card-value">{masteredCount}</div>
            <div className="stat-card-label">Flashcards Mastered</div>
          </div>
        </div>

        {/* REELS COMPLETION LIST */}
        <div className="progress-reels-status">
          <h4 className="progress-section-title">Completed Workflows</h4>
          <div className="progress-reels-list">
            {reelsData.map((r) => {
              const isCompleted = progress.completedReels.includes(r.id);
              const quizScore = progress.quizScores[r.id];
              return (
                <div key={r.id} className="progress-reel-row">
                  <div className="progress-reel-left">
                    <span className={`status-icon-dot ${isCompleted ? 'dot-done' : 'dot-pending'}`} />
                    <span className="progress-reel-title">#{r.number}: {r.title}</span>
                  </div>
                  <div className="progress-reel-right">
                    {quizScore !== undefined && (
                      <span className="badge badge-sm badge-neutral">Quiz: {quizScore}%</span>
                    )}
                    <span className={`badge badge-sm ${isCompleted ? 'badge-accent' : 'badge-neutral'}`}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="progress-modal-footer">
          <button type="button" className="btn-base btn-ghost btn-sm text-dimmed" onClick={handleReset}>
            Reset Local Data
          </button>
          <button type="button" className="btn-base btn-primary btn-sm" onClick={onClose}>
            Keep Building
          </button>
        </div>
      </div>
    </div>
  );
};

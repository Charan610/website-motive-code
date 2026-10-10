import React, { useState } from 'react';
import type { QuizQuestionItem } from '../../types/content';
import { saveQuizScore, getStoredProgress } from '../../lib/progressStorage';

export interface QuizWidgetProps {
  questions: QuizQuestionItem[];
  reelId: string | number;
}

export const QuizWidget: React.FC<QuizWidgetProps> = ({ questions, reelId }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Check if previously attempted
  const pastAttempts = getStoredProgress().quizScores[String(reelId)];

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already answered this question

    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Completed!
      const finalScore = selectedOption === currentQ.correctIndex ? score : score;
      saveQuizScore(reelId, finalScore, questions.length);
      setIsFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-result-card">
        <div className="quiz-result-badge">
          {percentage >= 80 ? '🏆 Mastered' : percentage >= 60 ? '⚡ Good Recall' : '📖 Review Recommended'}
        </div>
        <h3 className="quiz-result-title">Active Recall Check Complete</h3>
        <div className="quiz-score-meter">
          <span className="quiz-score-number">{score} / {questions.length}</span>
          <span className="quiz-score-pct">{percentage}% accuracy</span>
        </div>
        <p className="quiz-result-desc">
          {percentage >= 80
            ? 'Impressive! You understood the real architectural principles behind this reel, not just surface prompts.'
            : 'Knowledge takes repetition to crystallize. Revisit the step-by-step workflow timeline above and try again!'}
        </p>
        <button type="button" className="btn-base btn-secondary btn-sm" onClick={handleRetake}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Retake Quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-widget-card">
      <div className="quiz-header">
        <div className="quiz-stepper">
          Question {currentIdx + 1} of {questions.length}
        </div>
        {pastAttempts !== undefined && (
          <span className="badge badge-sm badge-neutral">
            Previous Best: {pastAttempts}%
          </span>
        )}
      </div>

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h4 className="quiz-question-text">{currentQ.question}</h4>

      <div className="quiz-options-grid">
        {currentQ.options.map((option, idx) => {
          let stateClass = '';
          if (selectedOption !== null) {
            if (idx === currentQ.correctIndex) {
              stateClass = 'option-correct';
            } else if (idx === selectedOption) {
              stateClass = 'option-incorrect';
            } else {
              stateClass = 'option-dimmed';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              className={`quiz-option-btn ${stateClass}`}
              onClick={() => handleSelectOption(idx)}
              disabled={selectedOption !== null}
            >
              <span className="option-index">{String.fromCharCode(65 + idx)}</span>
              <span className="option-label">{option}</span>
              {selectedOption !== null && idx === currentQ.correctIndex && (
                <svg className="option-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="quiz-explanation-box">
          <div className="quiz-explanation-title">
            {selectedOption === currentQ.correctIndex ? '✓ Correct!' : '✕ Not quite.'}
          </div>
          <p className="quiz-explanation-body">{currentQ.explanation}</p>
          <div className="quiz-next-row">
            <button
              type="button"
              className="btn-base btn-primary btn-sm"
              onClick={handleNext}
            >
              <span>{currentIdx + 1 === questions.length ? 'See Results' : 'Next Question'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

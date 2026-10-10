import React, { useState } from 'react';
import type { FlashcardItem } from '../../types/content';
import { isFlashcardMastered, markFlashcardMastered } from '../../lib/progressStorage';

export interface FlashcardDeckProps {
  cards: FlashcardItem[];
  reelId: string | number;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards, reelId: _reelId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredMap, setMasteredMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    cards.forEach((c) => {
      initial[c.id] = isFlashcardMastered(c.id);
    });
    return initial;
  });

  if (!cards || cards.length === 0) {
    return null;
  }

  const currentCard = cards[currentIndex];
  const isMastered = masteredMap[currentCard.id] || false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const toggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMastered;
    markFlashcardMastered(currentCard.id, nextState);
    setMasteredMap((prev) => ({ ...prev, [currentCard.id]: nextState }));
  };

  return (
    <div className="flashcard-deck-container">
      <div className="flashcard-deck-header">
        <div className="flashcard-counter">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          {currentCard.category && (
            <span className="badge badge-sm badge-secondary">{currentCard.category}</span>
          )}
        </div>
        <button
          type="button"
          className={`flashcard-mastery-btn ${isMastered ? 'mastered' : ''}`}
          onClick={toggleMastered}
          title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isMastered ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
        </button>
      </div>

      <div
        className={`flashcard-3d-wrapper ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        aria-label="Click or press Enter to flip flashcard"
      >
        <div className="flashcard-inner">
          {/* FRONT */}
          <div className="flashcard-face flashcard-front">
            <span className="flashcard-badge">PROMPT / SCENARIO</span>
            <div className="flashcard-content">
              <p className="flashcard-text">{currentCard.front}</p>
            </div>
            <div className="flashcard-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Click to reveal key takeaway</span>
            </div>
          </div>

          {/* BACK */}
          <div className="flashcard-face flashcard-back">
            <span className="flashcard-badge-back">SOLUTION & PRINCIPLE</span>
            <div className="flashcard-content">
              <p className="flashcard-text-back">{currentCard.back}</p>
              {currentCard.codeSnippet && (
                <pre className="flashcard-snippet">
                  <code>{currentCard.codeSnippet}</code>
                </pre>
              )}
            </div>
            <div className="flashcard-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-controls">
        <button
          type="button"
          className="btn-base btn-secondary btn-sm"
          onClick={handlePrev}
          disabled={cards.length <= 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Previous</span>
        </button>

        <div className="flashcard-dots">
          {cards.map((c, i) => (
            <span
              key={c.id}
              className={`flashcard-dot ${i === currentIndex ? 'active' : ''} ${masteredMap[c.id] ? 'dot-mastered' : ''}`}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn-base btn-secondary btn-sm"
          onClick={handleNext}
          disabled={cards.length <= 1}
        >
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

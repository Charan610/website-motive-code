import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reelsData } from '../../data/reelsData';

export const QuickEntryBox: React.FC = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');
  const [selectedReelSlug, setSelectedReelSlug] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJump = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    // If dropdown selected
    if (selectedReelSlug) {
      navigate(`/reels/${selectedReelSlug}`);
      return;
    }

    const clean = inputVal.trim().toLowerCase();
    if (!clean) {
      setErrorMsg('Enter a reel number or title');
      return;
    }

    // Check if input is a reel number like "2" or "#2" or "02"
    const numMatch = clean.match(/\b\d+\b/);
    if (numMatch) {
      const num = parseInt(numMatch[0], 10);
      const found = reelsData.find((r) => parseInt(r.number, 10) === num);
      if (found) {
        navigate(`/reels/${found.slug}`);
        return;
      }
    }

    // Try finding by slug or title match
    const foundByText = reelsData.find(
      (r) =>
        r.slug.toLowerCase().includes(clean) ||
        r.title.toLowerCase().includes(clean) ||
        r.topic.toLowerCase().includes(clean)
    );

    if (foundByText) {
      navigate(`/reels/${foundByText.slug}`);
      return;
    }

    setErrorMsg('Reel not found. Pick one from the dropdown or browse the library.');
  };

  return (
    <div className="quick-entry-card" id="quick-entry">
      <div className="quick-entry-header">
        <div className="quick-entry-tag">
          <span className="live-dot" />
          <span>Came from an Instagram Reel?</span>
        </div>
        <p className="quick-entry-subtitle">
          Jump straight to the step-by-step workflow, copyable prompts, and active recall playbook:
        </p>
      </div>

      <form className="quick-entry-form" onSubmit={handleJump}>
        <div className="quick-entry-inputs">
          <div className="quick-entry-select-wrapper">
            <select
              className="quick-entry-select"
              value={selectedReelSlug}
              onChange={(e) => {
                setSelectedReelSlug(e.target.value);
                setInputVal('');
                setErrorMsg('');
              }}
              aria-label="Select a reel"
            >
              <option value="">Choose a reel number...</option>
              {reelsData.map((r) => (
                <option key={r.id} value={r.slug}>
                  #{r.number}: {r.title}
                </option>
              ))}
            </select>
          </div>

          <span className="quick-entry-divider">or</span>

          <input
            type="text"
            className="quick-entry-input"
            placeholder="Type reel # (e.g. 2 or DeepSeek)"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSelectedReelSlug('');
              setErrorMsg('');
            }}
            aria-label="Reel number or keywords"
          />

          <button type="submit" className="btn-base btn-primary btn-md quick-entry-btn">
            <span>Get Workflow</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {errorMsg && <p className="quick-entry-error">{errorMsg}</p>}
      </form>

      <div className="quick-entry-recent">
        <span className="quick-entry-recent-label">Trending Now:</span>
        {reelsData.slice(0, 3).map((r) => (
          <button
            key={r.id}
            type="button"
            className="quick-entry-chip"
            onClick={() => navigate(`/reels/${r.slug}`)}
          >
            #{r.number} {r.title.slice(0, 24)}...
          </button>
        ))}
      </div>
    </div>
  );
};

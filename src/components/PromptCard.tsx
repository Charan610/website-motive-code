import React, { useState } from 'react';
import { Copy, Check, Terminal, Sparkles, HelpCircle } from 'lucide-react';
import type { PromptItem } from '../types/content';
import { useToast } from './Toast';

interface PromptCardProps {
  prompt: PromptItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [editedText, setEditedText] = useState(prompt.promptText);
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
      showToast(`Copied "${prompt.title}" to clipboard!`, 'success');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      showToast('Could not copy automatically. Please select text manually.', 'error');
    }
  };

  return (
    <div className="prompt-card">
      <div className="prompt-header">
        <div className="prompt-title-group">
          <div className="prompt-icon-badge">
            <Terminal size={14} color="var(--accent)" />
          </div>
          <div>
            <h4 className="prompt-title">{prompt.title}</h4>
            <p className="prompt-purpose">{prompt.purpose}</p>
          </div>
        </div>

        <div className="prompt-meta-group">
          <span className="badge badge-neutral" title="Recommended AI Model">
            <Sparkles size={11} color="var(--text-tertiary)" />
            {prompt.targetModel}
          </span>
          <button
            onClick={handleCopy}
            className={`btn btn-sm ${copied ? 'btn-copied' : 'btn-primary'}`}
            aria-label={`Copy ${prompt.title} prompt`}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Variables Tag Strip */}
      {prompt.variables && prompt.variables.length > 0 && (
        <div className="prompt-variables-strip">
          <span className="mono-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>
            CUSTOMIZE:
          </span>
          {prompt.variables.map((variable) => (
            <span key={variable} className="variable-pill">
              {variable}
            </span>
          ))}
        </div>
      )}

      {/* Raw Prompt Text Preview */}
      <div className="prompt-code-container">
        <textarea className="editable-prompt" aria-label={`Edit ${prompt.title} prompt`} value={editedText} onChange={e => { setEditedText(e.target.value); setCopied(false); }} />
      </div>

      {/* Rationale & Explanation Footer */}
      <div className="prompt-footer">
        <button
          className="prompt-explanation-toggle"
          onClick={() => setShowExplanation(!showExplanation)}
          aria-expanded={showExplanation}
        >
          <HelpCircle size={14} />
          <span>{showExplanation ? 'Hide Rationale' : 'Why this prompt works'}</span>
        </button>

        {showExplanation && (
          <div className="prompt-explanation-body">
            <p>{prompt.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

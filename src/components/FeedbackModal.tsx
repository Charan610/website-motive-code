import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelTitle?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  reelTitle = 'General Platform',
}) => {
  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [rationale, setRationale] = useState('');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceName.trim()) {
      showToast('Please specify the tool or resource name.', 'error');
      return;
    }
    showToast('Proposal submitted! Our editorial team will test it.', 'success');
    setResourceName('');
    setResourceUrl('');
    setRationale('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center" style={{ gap: '8px' }}>
            <Sparkles size={16} color="var(--orange)" />
            <h4 style={{ fontSize: '1.15rem' }}>Suggest a Builder Tool / Resource</h4>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <p className="modal-subtitle">
          Propose a verified tool, script, or Socratic prompt to include on <strong>{reelTitle}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Resource / Tool Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ollama, Bruno, Anki Deck, Custom Prompt"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL or GitHub Repository (Optional)</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Why does this help builders learn or retain? *</label>
            <textarea
              required
              rows={3}
              placeholder="Explain what cognitive friction or workflow advantage this provides..."
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Send size={14} />
              <span>Submit Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

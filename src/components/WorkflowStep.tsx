import React, { useState } from 'react';
import { Check, Copy, Lightbulb } from 'lucide-react';
import type { WorkflowStepItem } from '../types/content';
import { useToast } from './Toast';

interface WorkflowStepProps {
  step: WorkflowStepItem;
  totalSteps: number;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({ step, totalSteps }) => {
  const [completed, setCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const { showToast } = useToast();

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      showToast('Command copied to clipboard!', 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast('Could not copy command automatically.', 'error');
    }
  };

  return (
    <div className={`workflow-step-card ${completed ? 'step-completed' : ''}`}>
      <div className="step-left-rail">
        <button
          className={`step-checkbox ${completed ? 'step-checkbox-active' : ''}`}
          onClick={() => setCompleted(!completed)}
          aria-label={completed ? `Mark step ${step.stepNumber} incomplete` : `Mark step ${step.stepNumber} complete`}
        >
          {completed ? <Check size={14} /> : <span>{step.stepNumber}</span>}
        </button>
        {step.stepNumber < totalSteps && <div className="step-connector-line" />}
      </div>

      <div className="step-content-area">
        <div className="step-header">
          <div className="flex-between">
            <h4 className="step-title">{step.title}</h4>
            <span className="mono-tag" style={{ color: completed ? 'var(--green)' : 'var(--text-tertiary)' }}>
              {completed ? 'COMPLETED' : `STEP 0${step.stepNumber}`}
            </span>
          </div>
          <p className="step-details">{step.details}</p>
        </div>

        {step.codeOrCommand && (
          <div className="step-code-box">
            <div className="code-box-header">
              <span className="mono-tag">TERMINAL / CODE</span>
              <button
                className="code-copy-btn"
                onClick={() => handleCopyCode(step.codeOrCommand!)}
                aria-label="Copy snippet"
              >
                {copiedCode ? <Check size={12} color="var(--green)" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre>
              <code>{step.codeOrCommand}</code>
            </pre>
          </div>
        )}

        {step.proTip && (
          <div className="step-protip">
            <Lightbulb size={16} className="protip-icon" />
            <div className="protip-text">
              <strong>Architect Note:</strong> {step.proTip}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

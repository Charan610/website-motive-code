import React, { useState } from 'react';
import { ShieldAlert, Award, Brain, RefreshCw, Zap } from 'lucide-react';

export const InteractiveAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'feynman'>('audit');

  // Audit state
  const [answers, setAnswers] = useState<{ [key: string]: number }>({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
  });

  // Feynman interactive test state
  const [concept, setConcept] = useState('Binary Search Tree Deletion');
  const [explanation, setExplanation] = useState('');
  const [feynmanResult, setFeynmanResult] = useState<{
    score: number;
    diagnostics: string[];
    grade: string;
    advice: string;
  } | null>(null);

  const auditQuestions = [
    {
      id: 'q1',
      question: 'When you encounter an unfamiliar runtime exception, your first reaction is:',
      options: [
        { label: 'Instantly paste the entire stack trace into ChatGPT/Claude without reading it.', score: 0 },
        { label: 'Read the file path & line number, then prompt AI for an explanation of the root cause.', score: 2 },
        { label: 'Set breakpoints, inspect memory state, and isolate reproducing steps before asking anything.', score: 4 }
      ]
    },
    {
      id: 'q2',
      question: 'If your internet disconnects for 3 hours, how does your development velocity look?',
      options: [
        { label: 'Complete paralysis; cannot remember syntax or construct components without autocompletion.', score: 0 },
        { label: 'Slowed down by 50%, but can still write logic and debug existing functions.', score: 2 },
        { label: 'Unbothered; flow state continues using local docs and terminal test suites.', score: 4 }
      ]
    },
    {
      id: 'q3',
      question: 'After an AI writes a 50-line utility for your project, you typically:',
      options: [
        { label: 'Skim it briefly, verify it passes tests, and commit it immediately.', score: 0 },
        { label: 'Read it through and ask why it made specific choices, but keep the code as is.', score: 2 },
        { label: 'Delete the AI code, re-type it from memory, and test failure edge cases.', score: 4 }
      ]
    },
    {
      id: 'q4',
      question: 'In a real technical interview with zero LLM access, explaining your project’s architecture feels:',
      options: [
        { label: 'Terrifying; the AI wrote the abstractions and I cannot defend why they were chosen.', score: 0 },
        { label: 'Manageable with minor hesitation on exact performance edge cases.', score: 2 },
        { label: 'Effortless; I know every trade-off, data structure, and potential bottleneck intimately.', score: 4 }
      ]
    }
  ];

  const calculateAuditScore = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const max = auditQuestions.length * 4;
    const percentage = Math.round((total / max) * 100);
    return { total, max, percentage };
  };

  const { percentage } = calculateAuditScore();

  const getAuditVerdict = (pct: number) => {
    if (pct < 35) {
      return {
        title: 'HIGH AI ILLUSION (Vulnerable)',
        color: 'var(--red)',
        description: 'You are experiencing the fluency illusion. High reliance on external LLMs is bypassing your active memory loops. You are collecting answers, not building skills.',
        prescription: 'Apply Reel 02 Protocol: Commit to 10 minutes of unprompted cold drafting on every new problem.'
      };
    }
    if (pct < 70) {
      return {
        title: 'TRANSITIONAL PRACTITIONER',
        color: 'var(--amber)',
        description: 'You use AI for acceleration, but still occasionally rely on it to escape hard cognitive friction. You understand the concepts, but your recall speed drops without prompts.',
        prescription: 'Switch your default prompt to "The Socratic Sparring Partner" to turn AI from an answer dispenser into an oral examiner.'
      };
    }
    return {
      title: 'INDEPENDENT BUILDER (Architect Grade)',
      color: 'var(--green)',
      description: 'Exceptional cognitive discipline. You treat AI models as junior pair-programmers rather than oracles. Your mental models survive offline.',
      prescription: 'Continue stress-testing with architecture tradeoff drills and deep RFC reading.'
    };
  };

  const handleRunFeynmanTest = () => {
    const text = explanation.trim();
    if (!text || text.length < 20) {
      setFeynmanResult({
        score: 15,
        diagnostics: ['Explanation is too brief to demonstrate genuine mechanical understanding.'],
        grade: 'INSUFFICIENT DEPTH',
        advice: 'Try explaining the actual physical or runtime data flow: what pointers move, what memory is allocated, and what happens at the boundary.'
      });
      return;
    }

    const words = text.toLowerCase();
    const jargonWords = ['basically', 'obviously', 'under the hood', 'magic', 'leverages', 'simply', 'just works', 'somehow'];
    const foundJargon = jargonWords.filter(j => words.includes(j));
    
    // Check mechanical indicators
    const hasMechanics = words.includes('memory') || words.includes('pointer') || words.includes('node') || words.includes('replace') || words.includes('order') || words.includes('state') || words.includes('edge case') || words.includes('left') || words.includes('right');

    let baseScore = 60;
    const diagnostics: string[] = [];

    if (foundJargon.length > 0) {
      baseScore -= (foundJargon.length * 15);
      diagnostics.push(`Detected fuzzy filler words: "${foundJargon.join('", "')}". Jargon is often used to hide gaps in fundamental intuition.`);
    } else {
      baseScore += 15;
      diagnostics.push('Clean language: Zero hand-waving filler phrases detected.');
    }

    if (hasMechanics) {
      baseScore += 20;
      diagnostics.push('Mechanical grounding: Explicitly mentions causal variables or data flow.');
    } else {
      baseScore -= 10;
      diagnostics.push('Abstract bias: Description stays at high-level definitions without detailing what actually changes.');
    }

    const finalScore = Math.min(Math.max(baseScore, 10), 98);
    const grade = finalScore >= 75 ? 'HIGH COGNITIVE RETENTION' : finalScore >= 50 ? 'PARTIAL INTUITION' : 'SURFACE MEMORIZATION';
    const advice = finalScore >= 75 
      ? 'Strong mental model! Now verify by writing a clean test case in your editor without AI copilot.'
      : 'Revisit Reel 02: Explain this aloud using a physical object analogy, then define what happens when input is empty or null.';

    setFeynmanResult({
      score: finalScore,
      diagnostics,
      grade,
      advice
    });
  };

  const verdict = getAuditVerdict(percentage);

  return (
    <div className="interactive-audit-tool" id="interactive-tool-anchor">
      <div className="audit-tool-header">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="mono-tag">// PURPOSE-BUILT UTILITY</span>
            <h3 className="audit-main-title">The Cognitive Retention & Reliance Simulator</h3>
            <p className="audit-subtitle">
              Verify whether you own the concept, or whether you are only borrowing answers from an AI.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="audit-tabs">
            <button
              className={`audit-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
              onClick={() => setActiveTab('audit')}
            >
              <ShieldAlert size={15} />
              <span>AI Reliance Audit</span>
            </button>
            <button
              className={`audit-tab-btn ${activeTab === 'feynman' ? 'active' : ''}`}
              onClick={() => setActiveTab('feynman')}
            >
              <Brain size={15} />
              <span>Live Feynman Test</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'audit' ? (
        <div className="audit-content">
          <div className="audit-questions-list">
            {auditQuestions.map((q) => (
              <div key={q.id} className="audit-question-item">
                <p className="question-text">{q.question}</p>
                <div className="options-grid">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`option-btn ${answers[q.id] === opt.score ? 'option-selected' : ''}`}
                      onClick={() => setAnswers({ ...answers, [q.id]: opt.score })}
                    >
                      <span className="option-radio-dot" />
                      <span className="option-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Audit Result Card */}
          <div className="audit-score-card">
            <div className="score-header">
              <div>
                <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>INDEPENDENCE RATING</span>
                <h4 style={{ color: verdict.color, fontSize: '1.4rem', marginTop: '4px' }}>
                  {verdict.title}
                </h4>
              </div>
              <div className="score-gauge">
                <span className="gauge-number" style={{ color: verdict.color }}>{percentage}%</span>
                <span className="gauge-sub">RETAINED</span>
              </div>
            </div>

            <div className="score-meter-track">
              <div
                className="score-meter-fill"
                style={{ width: `${percentage}%`, backgroundColor: verdict.color }}
              />
            </div>

            <p className="verdict-desc">{verdict.description}</p>

            <div className="prescription-box">
              <Zap size={15} color="var(--accent)" />
              <div>
                <strong>Recommended Action:</strong> {verdict.prescription}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Live Feynman Concept Explainer */
        <div className="feynman-content">
          <div className="feynman-input-grid">
            <div className="feynman-field">
              <label className="feynman-label">Technical Concept to Test:</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. Virtual DOM, B-Trees, Raft Consensus, Docker cgroups..."
                className="feynman-input"
              />
            </div>

            <div className="feynman-field">
              <label className="feynman-label">
                Explain it in your own words (Pretend teaching a junior student without reading notes):
              </label>
              <textarea
                rows={5}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Write your explanation here. Avoid buzzwords like 'basically' or 'under the hood'..."
                className="feynman-textarea"
              />
            </div>

            <button
              onClick={handleRunFeynmanTest}
              className="btn btn-primary btn-md feynman-submit-btn"
            >
              <Zap size={16} />
              <span>Evaluate Retention & Jargon</span>
            </button>
          </div>

          {feynmanResult && (
            <div className="feynman-results-card">
              <div className="flex-between" style={{ marginBottom: '14px' }}>
                <div className="flex-center" style={{ gap: '10px' }}>
                  <Award size={18} color="var(--accent)" />
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                    Diagnostic: {feynmanResult.grade}
                  </h4>
                </div>
                <span className="badge badge-neutral">{feynmanResult.score} / 100 FIDELITY</span>
              </div>

              <div className="feynman-diagnostics-list">
                {feynmanResult.diagnostics.map((diag, i) => (
                  <div key={i} className="diag-item">
                    <span className="diag-bullet">▸</span>
                    <span>{diag}</span>
                  </div>
                ))}
              </div>

              <div className="feynman-prescription">
                <strong>Next Step:</strong> {feynmanResult.advice}
              </div>

              <div className="feynman-reset">
                <button
                  onClick={() => {
                    setExplanation('');
                    setFeynmanResult(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <RefreshCw size={13} />
                  <span>Test Another Concept</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Copy,
  Check,
  Key,
  ShieldCheck,
  Terminal,
  Clock,
  Sparkles,
} from 'lucide-react';
import type {
  EngineeringBranch,
  CurriculumRegulation,
  AcademicYear,
  AcademicSemester,
  PrimaryGoal,
  WeeklyAvailability,
  PrimaryObstacle,
  StudentProfile,
  RoadmapPlanResult,
} from '../types/roadmap';
import {
  BRANCH_REGISTRY,
  DIAGNOSTIC_QUESTIONS,
} from '../data/roadmapData';
import {
  generateRoadmapPlan,
} from '../lib/roadmapEngine';
import {
  generateUUID,
  generateRecoveryKey,
  checkUsernameAvailable,
  saveStudentProfile,
  getSavedStudentProfile,
  restorePlanByKeyOrId,
  clearSavedPlan,
  exportPlanAsMarkdown,
} from '../lib/roadmapStorage';
import { useToast } from '../components/Toast';

export const RoadmapPage: React.FC = () => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [planResult, setPlanResult] = useState<RoadmapPlanResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'landing' | 'wizard' | 'plan' | 'recover'>('landing');

  // Wizard state
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>('CSE');
  const [selectedRegulation, setSelectedRegulation] = useState<CurriculumRegulation>('R23');
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(2);
  const [selectedSemester, setSelectedSemester] = useState<AcademicSemester>(3);
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal>('placements');
  const [selectedAvailability, setSelectedAvailability] = useState<WeeklyAvailability>('standard');
  const [selectedObstacle, setSelectedObstacle] = useState<PrimaryObstacle>('fundamentals');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');

  // Recovery modal state
  const [recoveryInput, setRecoveryInput] = useState<string>('');
  const [recoveryError, setRecoveryError] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Load existing plan on mount
  useEffect(() => {
    const saved = getSavedStudentProfile();
    if (saved) {
      setProfile(saved);
      const generated = generateRoadmapPlan(saved);
      setPlanResult(generated);
      setCurrentStep('plan');
    }
  }, []);

  const handleStartWizard = () => {
    setWizardStep(1);
    setCurrentStep('wizard');
  };

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');

    const availabilityCheck = checkUsernameAvailable(usernameInput, profile?.id);
    if (!availabilityCheck.available) {
      setUsernameError('Handle already in use or too short (minimum 3 characters). Choose another name.');
      return;
    }

    const newProfile: StudentProfile = {
      id: profile ? profile.id : generateUUID(),
      displayName: availabilityCheck.normalized,
      recoveryKey: profile ? profile.recoveryKey : generateRecoveryKey(),
      branch: selectedBranch,
      regulation: selectedRegulation,
      year: selectedYear,
      semester: selectedSemester,
      goal: selectedGoal,
      weeklyAvailability: selectedAvailability,
      primaryObstacle: selectedObstacle,
      diagnosticAnswers: answers,
      completedActionIds: profile ? profile.completedActionIds : [],
      createdAt: profile ? profile.createdAt : new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    saveStudentProfile(newProfile);
    setProfile(newProfile);

    const plan = generateRoadmapPlan(newProfile);
    setPlanResult(plan);
    setCurrentStep('plan');
    showToast('Your personalized SRKR roadmap has been generated!');
  };

  const handleRestorePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    const restored = restorePlanByKeyOrId(recoveryInput);
    if (restored) {
      setProfile(restored);
      setPlanResult(generateRoadmapPlan(restored));
      setCurrentStep('plan');
      showToast(`Welcome back, ${restored.displayName}! Plan restored.`);
    } else {
      setRecoveryError('Recovery token or Plan ID not found. Verify the token format (e.g. MC-XXXX-XXXX-XXXX).');
    }
  };

  const handleCopyRecoveryKey = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.recoveryKey);
      setCopiedKey(true);
      showToast('Recovery key copied to clipboard.');
      setTimeout(() => setCopiedKey(false), 2500);
    } catch {
      showToast('Could not copy automatically. Select text manually.', 'error');
    }
  };

  const handleExportMarkdown = () => {
    if (!profile || !planResult) return;
    const md = exportPlanAsMarkdown(profile, planResult.competencyChecklist);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MotivationCode_${profile.branch}_Roadmap_${profile.displayName}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Roadmap markdown checklist downloaded.');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear your local roadmap? Make sure you have your Recovery Key saved.')) {
      clearSavedPlan();
      setProfile(null);
      setPlanResult(null);
      setCurrentStep('landing');
      showToast('Local plan cleared.');
    }
  };

  const currentBranchQuestions = DIAGNOSTIC_QUESTIONS.filter(
    (q) => q.branch === (selectedBranch === 'AIDS' ? 'CSE' : selectedBranch)
  );

  return (
    <div className="workspace-home roadmap-page">
      {/* =========================================================================
          VIEW 1: LANDING & TRUST FRAMING (If no active plan)
          ========================================================================= */}
      {currentStep === 'landing' && (
        <div className="roadmap-landing">
          <header className="roadmap-hero">
            <div className="roadmap-hero-badge">
              <Compass size={14} color="var(--accent)" />
              <span className="mono-tag">// REEL 03 DELIVERABLE</span>
              <span className="header-divider">/</span>
              <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>
                SRKR AUTONOMOUS CURRICULUM
              </span>
            </div>

            <h1 className="roadmap-title">
              Find your next step<br />
              <span className="hero-highlight-word">in engineering.</span>
            </h1>

            <p className="roadmap-lead">
              Not another generic 4-year checklist. An explainable, evidence-informed roadmap designed for <strong>SRKR Engineering College students</strong>. Tell us your branch, where you are right now, and what you want to achieve.
            </p>

            <div className="roadmap-cta-row">
              <button
                type="button"
                className="btn-base btn-primary btn-lg"
                onClick={handleStartWizard}
              >
                <span>Start 3-Minute Diagnostic</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="btn-base btn-secondary btn-lg"
                onClick={() => setCurrentStep('recover')}
              >
                <Key size={16} />
                <span>Restore with Key</span>
              </button>
            </div>
          </header>

          {/* 4 Pillars of the Roadmap Engine */}
          <section className="roadmap-pillars-grid">
            <div className="roadmap-pillar-card">
              <div className="pillar-num">01</div>
              <h3>Curriculum Crosswalked</h3>
              <p>
                Mapped directly against SRKR R20 and R23 autonomous regulations for CSE, ECE, EEE, and Mechanical Engineering.
              </p>
            </div>

            <div className="roadmap-pillar-card">
              <div className="pillar-num">02</div>
              <h3>Prerequisite Gate Checks</h3>
              <p>
                We test your actual mental models, not self-reported confidence. If foundational concepts are missing, we inject targeted recovery bridges.
              </p>
            </div>

            <div className="roadmap-pillar-card">
              <div className="pillar-num">03</div>
              <h3>Verifiable Build Projects</h3>
              <p>
                No tutorial hell. Every milestone specifies an observable build project with explicit testing commands and acceptance criteria.
              </p>
            </div>

            <div className="roadmap-pillar-card">
              <div className="pillar-num">04</div>
              <h3>Zero Plaintext Passwords</h3>
              <p>
                Zero-knowledge persistence. Your plan is identified by an immutable UUID and protected by a private 16-character recovery token.
              </p>
            </div>
          </section>

          {/* Supported Branches Strip */}
          <section className="branches-overview-strip">
            <div className="workspace-section-heading">
              <h2>Supported Academic Pathways</h2>
              <span>S.R.K.R. Engineering College (Autonomous)</span>
            </div>

            <div className="branches-grid">
              {BRANCH_REGISTRY.map((b) => (
                <div key={b.code} className="branch-card">
                  <div className="branch-top">
                    <span className="branch-code-badge">{b.code}</span>
                    <span className={`badge badge-sm ${b.isSupported ? 'badge-secondary' : 'badge-neutral'}`}>
                      {b.isSupported ? 'Active Pathway' : 'Research in Progress'}
                    </span>
                  </div>
                  <h4>{b.name}</h4>
                  <p>{b.description}</p>
                  {b.departmentNotice && (
                    <div className="branch-notice">
                      <AlertTriangle size={13} color="#f59e0b" />
                      <span>{b.departmentNotice}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: MULTI-STEP PROGRESSIVE DIAGNOSTIC WIZARD
          ========================================================================= */}
      {currentStep === 'wizard' && (
        <div className="roadmap-wizard-container">
          <div className="wizard-header">
            <div className="wizard-progress-bar">
              <div
                className="wizard-progress-fill"
                style={{ width: `${(wizardStep / 4) * 100}%` }}
              />
            </div>
            <div className="wizard-step-indicator">
              <span>Stage {wizardStep} of 4</span>
              <span>
                {wizardStep === 1 && 'Academic Profile'}
                {wizardStep === 2 && 'Goal & Time Constraints'}
                {wizardStep === 3 && 'Branch Prerequisite Check'}
                {wizardStep === 4 && 'Handle & Final Synthesis'}
              </span>
            </div>
          </div>

          <div className="wizard-card">
            {/* STEP 1: Academic Profile */}
            {wizardStep === 1 && (
              <div className="wizard-step-content">
                <h2>Where are you studying?</h2>
                <p className="wizard-desc">
                  We configure course codes and semester milestones to match SRKR autonomous academic structures.
                </p>

                <div className="wizard-fields">
                  <label className="wizard-label">
                    <span>Engineering Branch</span>
                    <select
                      className="wizard-select"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value as EngineeringBranch)}
                    >
                      {BRANCH_REGISTRY.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name} ({b.code}) {!b.isSupported ? '— [Validation in Progress]' : ''}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="wizard-split-fields">
                    <label className="wizard-label">
                      <span>Curriculum Regulation</span>
                      <select
                        className="wizard-select"
                        value={selectedRegulation}
                        onChange={(e) => setSelectedRegulation(e.target.value as CurriculumRegulation)}
                      >
                        <option value="R23">R23 Regulation (Current 1st & 2nd Year)</option>
                        <option value="R20">R20 Regulation (Current 3rd & 4th Year)</option>
                      </select>
                    </label>

                    <label className="wizard-label">
                      <span>Current Academic Year</span>
                      <select
                        className="wizard-select"
                        value={selectedYear}
                        onChange={(e) => {
                          const y = Number(e.target.value) as AcademicYear;
                          setSelectedYear(y);
                          setSelectedSemester((y * 2 - 1) as AcademicSemester);
                        }}
                      >
                        <option value={1}>1st Year (B.Tech)</option>
                        <option value={2}>2nd Year (B.Tech)</option>
                        <option value={3}>3rd Year (B.Tech)</option>
                        <option value={4}>4th Year (B.Tech)</option>
                      </select>
                    </label>

                    <label className="wizard-label">
                      <span>Current Semester</span>
                      <select
                        className="wizard-select"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(Number(e.target.value) as AcademicSemester)}
                      >
                        <option value={selectedYear * 2 - 1}>Semester {selectedYear * 2 - 1} (Odd)</option>
                        <option value={selectedYear * 2}>Semester {selectedYear * 2} (Even)</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="wizard-nav-row">
                  <button
                    type="button"
                    className="btn-base btn-secondary btn-md"
                    onClick={() => setCurrentStep('landing')}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-base btn-primary btn-md"
                    onClick={() => setWizardStep(2)}
                  >
                    <span>Next: Goals & Availability</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Goal & Constraints */}
            {wizardStep === 2 && (
              <div className="wizard-step-content">
                <h2>What is your primary focus?</h2>
                <p className="wizard-desc">
                  We size your workload so you never receive an impossible 40-task checklist that leads to burnout.
                </p>

                <div className="wizard-fields">
                  <label className="wizard-label">
                    <span>Target Objective</span>
                    <div className="goal-options-grid">
                      {[
                        { id: 'placements', title: 'Software & Product Placements', desc: 'DSA patterns, system design, portfolio API projects' },
                        { id: 'core_engineering', title: 'Core Engineering / VLSI / Hardware', desc: 'Circuit simulation, RTL Verilog, machine design' },
                        { id: 'higher_studies', title: 'GATE & Higher Studies', desc: 'Mathematical rigor, foundational exam syllabus' },
                        { id: 'products', title: 'Shipping Independent Products', desc: 'Full-stack software engineering, deploying live apps' },
                      ].map((g) => (
                        <div
                          key={g.id}
                          className={`goal-card ${selectedGoal === g.id ? 'goal-card-selected' : ''}`}
                          onClick={() => setSelectedGoal(g.id as PrimaryGoal)}
                        >
                          <h4>{g.title}</h4>
                          <p>{g.desc}</p>
                        </div>
                      ))}
                    </div>
                  </label>

                  <div className="wizard-split-fields">
                    <label className="wizard-label">
                      <span>Weekly Available Time</span>
                      <select
                        className="wizard-select"
                        value={selectedAvailability}
                        onChange={(e) => setSelectedAvailability(e.target.value as WeeklyAvailability)}
                      >
                        <option value="light">&lt; 5 hours/week (Light / Exam heavy)</option>
                        <option value="standard">5 to 10 hours/week (Standard builder)</option>
                        <option value="intensive">15+ hours/week (Intensive preparation)</option>
                      </select>
                    </label>

                    <label className="wizard-label">
                      <span>Main Current Struggle</span>
                      <select
                        className="wizard-select"
                        value={selectedObstacle}
                        onChange={(e) => setSelectedObstacle(e.target.value as PrimaryObstacle)}
                      >
                        <option value="fundamentals">Weak fundamentals from earlier semesters</option>
                        <option value="projects">No tangible portfolio projects to demonstrate</option>
                        <option value="no_direction">Overwhelmed by conflicting YouTube / AI advice</option>
                        <option value="time">Difficulty balancing college schedule and coding</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="wizard-nav-row">
                  <button
                    type="button"
                    className="btn-base btn-secondary btn-md"
                    onClick={() => setWizardStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-base btn-primary btn-md"
                    onClick={() => setWizardStep(3)}
                  >
                    <span>Next: Prerequisite Check</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Prerequisite Diagnostic Check */}
            {wizardStep === 3 && (
              <div className="wizard-step-content">
                <h2>{selectedBranch} Foundational Prerequisite Check</h2>
                <p className="wizard-desc">
                  We check your actual mental models on foundational concepts. Answering incorrectly is good—it triggers targeted <strong>recovery bridges</strong> before you tackle complex topics.
                </p>

                <div className="diagnostic-questions-list">
                  {currentBranchQuestions.map((q, idx) => (
                    <div key={q.id} className="diag-question-item">
                      <div className="diag-topic-tag">
                        <span>Check {idx + 1}: {q.topic}</span>
                      </div>
                      <p className="diag-question-text">{q.question}</p>
                      <div className="diag-options-stack">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = answers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              className={`diag-option-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                            >
                              <span className="diag-option-letter">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="wizard-nav-row">
                  <button
                    type="button"
                    className="btn-base btn-secondary btn-md"
                    onClick={() => setWizardStep(2)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-base btn-primary btn-md"
                    onClick={() => setWizardStep(4)}
                  >
                    <span>Next: Generate Plan</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Handle & Final Synthesis */}
            {wizardStep === 4 && (
              <form onSubmit={handleGeneratePlan} className="wizard-step-content">
                <h2>Choose your student handle</h2>
                <p className="wizard-desc">
                  Your handle identifies your saved plan. No password required: we automatically generate a secure 16-character recovery key for cross-device access.
                </p>

                <div className="wizard-fields">
                  <label className="wizard-label">
                    <span>Display Username</span>
                    <input
                      type="text"
                      className="wizard-input"
                      placeholder="e.g. charan_srkr_cse"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      required
                    />
                    {usernameError && <p className="error-text">{usernameError}</p>}
                  </label>

                  <div className="security-guarantee-box">
                    <ShieldCheck size={20} color="var(--accent-secondary)" />
                    <div>
                      <strong>Zero-Knowledge Security Architecture</strong>
                      <p>
                        Anyone knowing your username CANNOT modify your plan. Plan ownership is cryptographically gated by your Recovery Key.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="wizard-nav-row">
                  <button
                    type="button"
                    className="btn-base btn-secondary btn-md"
                    onClick={() => setWizardStep(3)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-base btn-primary btn-md">
                    <Sparkles size={16} />
                    <span>Generate My Personalized Roadmap</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: THE PERSONALIZED ROADMAP RESULT (`plan`)
          ========================================================================= */}
      {currentStep === 'plan' && planResult && profile && (
        <div className="roadmap-plan-container">
          {/* Top Banner with Profile & Recovery Strip */}
          <div className="plan-banner">
            <div className="plan-meta-strip">
              <span className="badge badge-accent">SRKR {profile.branch}</span>
              <span className="badge badge-neutral">Year {profile.year} · Sem {profile.semester}</span>
              <span className="badge badge-secondary">{profile.regulation} Regulation</span>
              <span className="badge badge-neutral">{profile.weeklyAvailability} pace</span>
            </div>

            <div className="plan-header-row">
              <div>
                <h1 className="plan-headline">
                  Engineering Action Roadmap<span>.</span>
                </h1>
                <p className="plan-subtitle">
                  Plan generated for <strong>@{profile.displayName}</strong>. Grounded in SRKR autonomous curricula.
                </p>
              </div>

              <div className="plan-quick-actions">
                <button
                  type="button"
                  className="btn-base btn-secondary btn-sm"
                  onClick={handleExportMarkdown}
                >
                  <Download size={14} />
                  <span>Export Markdown</span>
                </button>

                <button
                  type="button"
                  className="btn-base btn-secondary btn-sm"
                  onClick={handleCopyRecoveryKey}
                >
                  {copiedKey ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedKey ? 'Key Copied' : 'Recovery Key'}</span>
                </button>

                <button
                  type="button"
                  className="btn-base btn-ghost btn-sm text-dimmed"
                  onClick={handleStartWizard}
                >
                  <RotateCcw size={14} />
                  <span>Retake Diagnostic</span>
                </button>
              </div>
            </div>

            {/* Recovery Key Banner */}
            <div className="recovery-pill-banner">
              <Key size={14} color="var(--accent)" />
              <span>Your Private Recovery Token:</span>
              <code className="recovery-token-code">{profile.recoveryKey}</code>
              <small>(Save this token to restore your plan on any mobile or desktop browser)</small>
            </div>
          </div>

          {/* Section 1: Academic & Industry Position Analysis */}
          <section className="plan-section">
            <div className="section-eyebrow">
              <span>01 // SITUATIONAL DIAGNOSIS</span>
            </div>
            <div className="diagnosis-card">
              <p className="stage-summary-text">{planResult.academicStageSummary}</p>
              <div className="diagnostic-stat-row">
                <div className="diag-stat">
                  <span className="diag-stat-num">
                    {planResult.diagnosticScore.correct} / {planResult.diagnosticScore.total}
                  </span>
                  <span className="diag-stat-lbl">Prerequisite Mental Model Score</span>
                </div>
                <div className="diag-stat">
                  <span className="diag-stat-num">
                    {planResult.recoveryBridge ? '1 Active Bridge' : 'Foundations Clear'}
                  </span>
                  <span className="diag-stat-lbl">Curriculum Readiness Status</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Active Recovery Bridge (If fundamental missed) */}
          {planResult.recoveryBridge && (
            <section className="plan-section">
              <div className="section-eyebrow eyebrow-warning">
                <AlertTriangle size={15} color="var(--accent)" />
                <span>02 // TARGETED RECOVERY BRIDGE (REQUIRED FOUNDATION)</span>
              </div>

              <div className="recovery-bridge-card">
                <div className="bridge-top">
                  <span className="badge badge-accent">PREREQUISITE GAP DETECTED</span>
                  <span className="badge badge-neutral">⏱ {planResult.recoveryBridge.estimatedWeeks} Weeks</span>
                </div>

                <h3 className="bridge-title">{planResult.recoveryBridge.title}</h3>
                <p className="bridge-rationale">{planResult.recoveryBridge.rationale}</p>

                <div className="bridge-grid">
                  <div className="bridge-col">
                    <h4>What to Master Cold:</h4>
                    <ul>
                      {planResult.recoveryBridge.whatToLearn.map((item, idx) => (
                        <li key={idx}>▸ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bridge-col">
                    <h4>Verifiable Build Task:</h4>
                    <p className="build-task-desc">{planResult.recoveryBridge.whatToBuild}</p>
                    <div className="test-command-box">
                      <Terminal size={14} color="var(--accent-secondary)" />
                      <code>{planResult.recoveryBridge.testCommandOrCriteria}</code>
                    </div>
                  </div>
                </div>

                <div className="bridge-footer">
                  <span className="evidence-label">
                    Evidence of Completion: <strong>{planResult.recoveryBridge.evidenceRequired}</strong>
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Section 3: Next 1–3 High-Yield Action Milestones */}
          <section className="plan-section">
            <div className="section-eyebrow">
              <span>03 // THE NEXT HIGH-YIELD MILESTONES</span>
            </div>

            <div className="milestones-stack">
              {planResult.nextActions.map((action, idx) => (
                <article key={action.id} className="milestone-card">
                  <div className="milestone-header">
                    <div className="milestone-badge-group">
                      <span className="milestone-idx">0{idx + 1}</span>
                      <span className="badge badge-secondary">{action.categoryTag}</span>
                      <span className="badge badge-neutral">
                        <Clock size={11} /> {action.estimatedWeeks} Weeks ({action.sustainableHoursPerWeek}h/wk)
                      </span>
                    </div>

                    <span className="badge badge-accent">
                      {action.priority.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="milestone-title">{action.title}</h3>
                  <p className="milestone-rationale">{action.rationale}</p>

                  <div className="milestone-body-split">
                    <div className="body-split-col">
                      <h4>Curricular Topics (Sequence):</h4>
                      <ul className="topics-list">
                        {action.whatToLearn.map((t, tIdx) => (
                          <li key={tIdx}>▸ {t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="body-split-col">
                      <h4>Verifiable Build Project:</h4>
                      <p className="project-desc">{action.whatToBuild}</p>
                      <div className="test-command-box">
                        <Terminal size={14} color="var(--accent-secondary)" />
                        <code>{action.testCommandOrCriteria}</code>
                      </div>
                    </div>
                  </div>

                  <div className="milestone-resources-strip">
                    <span className="resources-label">Verified Resources:</span>
                    {action.trustedResources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-chip-link"
                      >
                        <span>{res.title}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section 4: Competency & Verification Gate */}
          <section className="plan-section">
            <div className="section-eyebrow">
              <span>04 // COMPETENCY PROGRESSION GATES</span>
            </div>

            <div className="competency-gate-card">
              <h3>How to know you are ready to progress</h3>
              <p>
                Opening a course or reading answers does not constitute readiness. Demonstrate these four observable standards before advancing to the next semester milestone:
              </p>

              <div className="checklist-stack">
                {planResult.competencyChecklist.map((item, idx) => (
                  <div key={idx} className="checklist-row">
                    <CheckCircle2 size={18} color="var(--accent)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom Footer Actions */}
          <div className="plan-bottom-strip">
            <button
              type="button"
              className="btn-base btn-ghost btn-sm text-dimmed"
              onClick={handleReset}
            >
              Clear Local Plan
            </button>

            <Link to="/prompts" className="btn-base btn-secondary btn-sm">
              <span>Explore Prompt Vault</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: RESTORE PLAN VIA RECOVERY KEY
          ========================================================================= */}
      {currentStep === 'recover' && (
        <div className="roadmap-recover-container">
          <div className="recover-card">
            <h2>Restore your saved roadmap</h2>
            <p className="recover-desc">
              Enter the 16-character Recovery Key (e.g. <code>MC-XXXX-XXXX-XXXX</code>) or your internal Plan ID generated during diagnostic creation.
            </p>

            <form onSubmit={handleRestorePlan}>
              <label className="wizard-label">
                <span>Recovery Token / Plan ID</span>
                <input
                  type="text"
                  className="wizard-input"
                  placeholder="MC-XXXX-XXXX-XXXX"
                  value={recoveryInput}
                  onChange={(e) => setRecoveryInput(e.target.value)}
                  required
                />
                {recoveryError && <p className="error-text">{recoveryError}</p>}
              </label>

              <div className="recover-btn-row">
                <button
                  type="button"
                  className="btn-base btn-secondary btn-md"
                  onClick={() => setCurrentStep('landing')}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-base btn-primary btn-md">
                  <Key size={16} />
                  <span>Restore My Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

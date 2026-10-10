import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Clock, 
  Share2, 
  MessageSquarePlus, 
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Download,
  BookOpen
} from 'lucide-react';
import { REELS_DATA } from '../data/reelsData';
import { PromptCard } from '../components/PromptCard';
import { WorkflowStep } from '../components/WorkflowStep';
import { InteractiveAudit } from '../components/InteractiveAudit';
import { FeedbackModal } from '../components/FeedbackModal';
import { useToast } from '../components/Toast';
import { FlashcardDeck } from '../components/ui/FlashcardDeck';
import { QuizWidget } from '../components/ui/QuizWidget';
import { Accordion } from '../components/ui/Accordion';
import { isReelCompleted, markReelCompleted } from '../lib/progressStorage';

export const ReelDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { showToast } = useToast();

  const reel =
    REELS_DATA.find(
      (r) =>
        r.slug === slug ||
        r.id === slug ||
        (r.id === 'reel-03' && slug === 'reel-03-finishing-projects')
    ) || REELS_DATA[0];
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    setCompleted(isReelCompleted(reel.id));
  }, [reel.id]);

  const toggleCompleted = () => {
    const next = !completed;
    markReelCompleted(reel.id, next);
    setCompleted(next);
    showToast(
      next ? `Marked Reel #${reel.number} as completed! Streak recorded.` : `Marked Reel #${reel.number} as in-progress.`,
      next ? 'success' : 'info'
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Motivation Code — ${reel.title}`,
          text: reel.subtitle,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Page URL copied to clipboard!', 'success');
      }
    } catch {
      // User cancelled or clipboard fallback
    }
  };

  const { sections } = reel;

  return (
    <div className="reel-detail-page">
      {/* Top Breadcrumb Header */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="flex-between">
            <div className="breadcrumb-links">
              <Link to="/reels" className="back-link">
                <ArrowLeft size={14} />
                <span>All Reels</span>
              </Link>
              <ChevronRight size={13} className="breadcrumb-separator" />
              <span className="current-crumb">Reel #{reel.number}</span>
            </div>

            <div className="detail-quick-actions">
              <button
                type="button"
                onClick={toggleCompleted}
                className={`icon-action-btn ${completed ? 'action-btn-active' : ''}`}
                title={completed ? 'Completed' : 'Mark as completed'}
              >
                <CheckCircle2 size={15} color={completed ? 'var(--accent)' : 'currentColor'} />
                <span>{completed ? 'Completed' : 'Mark Complete'}</span>
              </button>

              <button type="button" onClick={handleShare} className="icon-action-btn" title="Share Reel Hub">
                <Share2 size={15} />
                <span>Share</span>
              </button>

              <button 
                type="button"
                onClick={() => setFeedbackOpen(true)} 
                className="icon-action-btn"
                title="Propose Resource or Tool"
              >
                <MessageSquarePlus size={15} />
                <span>Suggest Resource</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 — HERO & INTRO
          ========================================================================= */}
      <header className="reel-hero-banner">
        <div className="container">
          <div className="reel-hero-grid">
            <div className="hero-text-col">
              <div className="hero-badges-row">
                <span className="badge badge-orange">REEL #{reel.number}</span>
                <span className="badge badge-neutral">
                  <Clock size={11} />
                  {reel.duration}
                </span>
                {reel.difficulty && (
                  <span className="badge badge-secondary">{reel.difficulty}</span>
                )}
                {reel.timeToBuild && (
                  <span className="badge badge-neutral">⏱ {reel.timeToBuild}</span>
                )}
                <span className="badge badge-cyan">{reel.topic}</span>
              </div>

              <h1 className="reel-display-title">
                {reel.title}
              </h1>

              <p className="reel-lead-subtitle">
                {reel.subtitle}
              </p>

              {/* What You'll Build Callout */}
              {sections.whatYoullBuild && (
                <div className="what-youll-build-box">
                  <div className="wyb-badge">
                    <Sparkles size={14} color="var(--accent)" />
                    <span className="mono-tag" style={{ color: 'var(--accent)' }}>WHAT YOU WILL BUILD</span>
                  </div>
                  <p className="wyb-text">{sections.whatYoullBuild}</p>
                </div>
              )}

              <blockquote className="reel-manifesto-quote">
                &ldquo;{reel.editorialQuote}&rdquo;
              </blockquote>

              <div className="reel-tags-strip">
                {reel.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Context & Script Excerpt Box */}
            <div className="hero-script-col">
              <div className="script-reconstruction-card">
                <div className="card-top-strip">
                  <span className="mono-tag">
                    // VERBATIM SCRIPT HIGHLIGHTS
                  </span>
                </div>

                <div className="script-scroll-body">
                  {sections.intro.scriptExcerpts ? (
                    sections.intro.scriptExcerpts.map((line, idx) => (
                      <div key={idx} className="script-row">
                        <span className="script-row-idx">0{idx + 1}</span>
                        <p className="script-row-text">&ldquo;{line}&rdquo;</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>{sections.intro.synopsis}</p>
                  )}
                </div>

                <div className="script-context-footer">
                  <strong>Context:</strong> {sections.intro.context}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2 — THE CENTRAL PROBLEM & COMPARISON
          ========================================================================= */}
      {sections.problemAnalysis && (
        <section className="section-block problem-section">
          <div className="container">
            <div className="block-header">
              <span className="mono-tag">// THE ARCHITECTURAL DIAGNOSIS</span>
              <h2 className="block-title">{sections.problemAnalysis.title}</h2>
              <p className="block-narrative">{sections.problemAnalysis.narrative}</p>
            </div>

            <div className="comparisons-table">
              <div className="comparison-row comparison-header-row">
                <div className="col-mistake">THE PASSIVE AI TRAP (ESCAPE LEARNING)</div>
                <div className="col-reality">THE ACTIVE SYNTHESIS PROTOCOL (BUILD SKILLS)</div>
              </div>

              {sections.problemAnalysis.comparisons.map((c, i) => (
                <div key={i} className="comparison-row">
                  <div className="col-mistake">
                    <span className="indicator-cross">✕</span>
                    <p>{c.mistake}</p>
                  </div>
                  <div className="col-reality">
                    <span className="indicator-check">✓</span>
                    <p>{c.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2B — COMMON MISTAKES ACCORDION
          ========================================================================= */}
      {sections.commonMistakes && sections.commonMistakes.length > 0 && (
        <section className="section-block mistakes-section">
          <div className="container">
            <div className="block-header">
              <span className="mono-tag">// CRITICAL TRAPS</span>
              <h2 className="block-title">Common Mistakes to Avoid</h2>
              <p className="block-narrative">
                Patterns where junior engineers get stuck when attempting this workflow, and the immediate fix.
              </p>
            </div>

            <Accordion
              items={sections.commonMistakes.map((m, idx) => ({
                id: `mistake-${idx}`,
                title: m.mistake,
                subtitle: m.reality,
                badge: 'Pitfall',
                content: (
                  <div className="mistake-fix-box">
                    <div className="fix-header">
                      <AlertTriangle size={15} color="var(--accent)" />
                      <strong>Corrective Architecture / Protocol:</strong>
                    </div>
                    <p className="fix-text">{m.fix}</p>
                  </div>
                ),
              }))}
            />
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 3 — COPYABLE PROMPTS
          ========================================================================= */}
      {sections.prompts && sections.prompts.length > 0 && (
        <section className="section-block prompts-section" id="prompts-section">
          <div className="container">
            <div className="block-header">
              <span className="mono-tag">// BATTLE-TESTED PROMPTS</span>
              <h2 className="block-title">Socratic System Prompts</h2>
              <p className="block-narrative">
                Never accept unearned answers. Copy these strict Socratic prompts to convert your AI model into a ruthless oral examiner.
              </p>
            </div>

            <div className="prompts-list">
              {sections.prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4 — INTERACTIVE UTILITIES (RETENTION & AUDIT TOOL)
          ========================================================================= */}
      {sections.interactiveTool && (
        <section className="section-block interactive-tool-section" id="interactive-tool-anchor">
          <div className="container">
            <InteractiveAudit />
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 5 — STEP-BY-STEP WORKFLOW
          ========================================================================= */}
      {sections.workflow && (
        <section className="section-block workflow-section">
          <div className="container">
            <div className="block-header">
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span className="mono-tag">// EXECUTION METHOD</span>
                  <h2 className="block-title">{sections.workflow.title}</h2>
                </div>
                <div className="workflow-meta-pills">
                  <span className="badge badge-neutral">EST. {sections.workflow.estimatedTime}</span>
                  <span className="badge badge-neutral">{sections.workflow.difficulty}</span>
                </div>
              </div>
              <p className="block-narrative">
                Follow this sequential protocol to move from initial confusion to verifiable, unprompted code in your local terminal.
              </p>
            </div>

            <div className="workflow-steps-list">
              {sections.workflow.steps.map((step) => (
                <WorkflowStep
                  key={step.stepNumber}
                  step={step}
                  totalSteps={sections.workflow!.steps.length}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 5B — ACTIVE RECALL PLAYBOOK (FLASHCARDS + 5-QUESTION QUIZ)
          ========================================================================= */}
      {((sections.flashcards && sections.flashcards.length > 0) || (sections.quiz && sections.quiz.length > 0)) && (
        <section className="section-block playbook-section" id="active-recall-section">
          <div className="container">
            <div className="block-header">
              <span className="mono-tag">// RETENTION PROTOCOL</span>
              <h2 className="block-title">Active-Recall Playbook</h2>
              <p className="block-narrative">
                Reading is recognition; retrieval is recall. Flip these interactive cards and complete the 5-question test to cement these mental models.
              </p>
            </div>

            <div className="playbook-split-grid">
              {/* Flashcards column */}
              {sections.flashcards && sections.flashcards.length > 0 && (
                <div className="playbook-col">
                  <div className="playbook-card-title">
                    <BookOpen size={16} color="var(--accent)" />
                    <span>3D Concept Flashcards</span>
                  </div>
                  <FlashcardDeck cards={sections.flashcards} reelId={reel.id} />
                </div>
              )}

              {/* Quiz column */}
              {sections.quiz && sections.quiz.length > 0 && (
                <div className="playbook-col">
                  <div className="playbook-card-title">
                    <Sparkles size={16} color="var(--accent-secondary)" />
                    <span>5-Question Active Recall Quiz</span>
                  </div>
                  <QuizWidget questions={sections.quiz} reelId={reel.id} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 6 — CONFIGURABLE RESOURCES & DOWNLOADS
          ========================================================================= */}
      {sections.resources && sections.resources.length > 0 && (
        <section className="section-block resources-section">
          <div className="container">
            <div className="block-header flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="mono-tag">// VERIFIED TOOLKIT</span>
                <h2 className="block-title">Recommended Offline & Builder Tools</h2>
                <p className="block-narrative">
                  Handpicked utilities specifically relevant to mastering this Reel&apos;s core principles.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                <MessageSquarePlus size={14} />
                <span>Suggest a Resource</span>
              </button>
            </div>

            <div className="resources-cards-grid">
              {sections.resources.map((res) => (
                <div key={res.id} className="resource-card-item">
                  <div className="res-top-bar">
                    <span className="badge badge-neutral">{res.category}</span>
                    <span className="badge badge-orange">{res.pricing}</span>
                  </div>

                  <h4 className="res-name">{res.name}</h4>
                  <p className="res-description">{res.description}</p>

                  <div className="res-rationale">
                    <span className="mono-tag" style={{ color: 'var(--orange)', fontSize: '0.68rem' }}>
                      WHY THIS MATTERS:
                    </span>
                    <p>{res.whyItMatters}</p>
                  </div>

                  {res.limitations && (
                    <div className="res-limitations">
                      <span className="mono-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>
                        LIMITATIONS / REQUIREMENT:
                      </span>
                      <p>{res.limitations}</p>
                    </div>
                  )}

                  <div className="res-action-footer">
                    <a
                      href={res.url}
                      target={res.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="res-link"
                    >
                      <span>{res.url.startsWith('#') ? 'Jump to Section' : 'Inspect Resource'}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Downloadable Resources */}
            {sections.downloadables && sections.downloadables.length > 0 && (
              <div className="downloadables-strip" style={{ marginTop: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Downloadable Templates & Checklists
                </h4>
                <div className="downloadables-grid">
                  {sections.downloadables.map((d, idx) => (
                    <div key={idx} className="download-card">
                      <div className="download-info">
                        <span className="badge badge-sm badge-secondary">{d.format}</span>
                        <h5 className="download-title">{d.title}</h5>
                        <p className="download-desc">{d.description}</p>
                      </div>
                      <a href={d.url} download className="btn-base btn-secondary btn-sm">
                        <Download size={14} />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 7 — NEXT STEPS & RELATED CONTENT
          ========================================================================= */}
      {sections.nextSteps && sections.nextSteps.length > 0 && (
        <section className="section-block next-steps-section">
          <div className="container">
            <div className="next-steps-card">
              <span className="mono-tag" style={{ color: 'var(--orange)' }}>// NEXT ACTIONS</span>
              <h3 className="next-steps-heading">Where to Go From Here</h3>
              <div className="next-steps-grid">
                {sections.nextSteps.map((step, idx) => (
                  <div key={idx} className="next-step-box">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    <Link to={step.link} className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}>
                      <span>Continue</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Suggestion & Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        reelTitle={reel.title}
      />
    </div>
  );
};

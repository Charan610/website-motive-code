import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Terminal, 
  Zap, 
  BookOpen, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { REELS_DATA } from '../data/reelsData';
import { TOOLS_DATA } from '../data/toolsData';
import { ReelCard } from '../components/ReelCard';

export const HomePage: React.FC = () => {
  const [activeHeroTab, setActiveHeroTab] = useState<'passive' | 'active'>('active');
  const reel02 = REELS_DATA.find((r) => r.id === 'reel-02') || REELS_DATA[0];

  return (
    <div className="homepage-wrapper">
      {/* =========================================================================
          HERO SECTION — EDITORIAL TYPOGRAPHY & INTERACTIVE COMPARISON
          ========================================================================= */}
      <section className="hero-editorial-section">
        <div className="container">
          <div className="hero-top-badge-row">
            <div className="status-indicator">
              <span className="pulse-dot" />
              <span>THE CONTENT-TO-ACTION PLATFORM</span>
            </div>
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>
              // BUILT FOR STUDENTS & DEVELOPERS
            </span>
          </div>

          <div className="hero-headline-block">
            <h1 className="display-title hero-main-title">
              SHORT-FORM IS THE SPARK.<br />
              <span className="hero-highlight-word">THIS IS THE FIRE.</span>
            </h1>
            <p className="hero-lead-paragraph">
              Most social content ends with mindless scrolling. At <strong>Motivation Code</strong>, every Instagram Reel is an entry point into deep engineering playbooks, copyable Socratic prompts, verified offline tools, and permanent mental models.
            </p>
          </div>

          <div className="hero-cta-group">
            <Link to="/reels/reel-02-ai-usage" className="btn btn-primary btn-lg">
              <Flame size={18} />
              <span>Enter Reel 02 Lab: You're Using AI Wrong</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link to="/reels" className="btn btn-secondary btn-lg">
              <BookOpen size={18} />
              <span>Browse All Reels</span>
            </Link>
          </div>

          {/* Hero Interactive Live Demo: "Fluency Illusion vs The Socratic Method" */}
          <div className="hero-sandbox-panel">
            <div className="sandbox-panel-header">
              <div className="sandbox-tabs">
                <button
                  className={`sandbox-tab ${activeHeroTab === 'passive' ? 'active-passive' : ''}`}
                  onClick={() => setActiveHeroTab('passive')}
                >
                  <span className="tab-dot dot-red" />
                  <span>How 95% Use AI (Passive Copying)</span>
                </button>
                <button
                  className={`sandbox-tab ${activeHeroTab === 'active' ? 'active-hero' : ''}`}
                  onClick={() => setActiveHeroTab('active')}
                >
                  <span className="tab-dot dot-orange" />
                  <span>The Motivation Code Protocol (Active Recall)</span>
                </button>
              </div>

              <div className="sandbox-badge">
                <span className="mono-tag" style={{ color: activeHeroTab === 'active' ? 'var(--orange)' : 'var(--red)' }}>
                  {activeHeroTab === 'active' ? 'RETENTION: 94%' : 'RETENTION: 0%'}
                </span>
              </div>
            </div>

            <div className="sandbox-terminal-body">
              {activeHeroTab === 'passive' ? (
                <div className="sandbox-mock-run">
                  <div className="terminal-line user-line">
                    <span className="prompt-prefix">student@macbook:~$</span>
                    <span className="prompt-cmd">"Write me the full authentication controller for Express.js"</span>
                  </div>
                  <div className="terminal-output passive-output">
                    <span className="output-tag">// AI GENERATES 140 LINES IN 2.1 SECONDS</span>
                    <p className="output-snippet">
                      Student copies code → Pastes in editor → Tests once → Commits.<br />
                      <strong style={{ color: 'var(--red)' }}>THE TRAP:</strong> In tomorrow's technical interview, when asked how JWT refresh rotation mitigates token replay attacks, the student freezes.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="sandbox-mock-run">
                  <div className="terminal-line user-line">
                    <span className="prompt-prefix">builder@macbook:~$</span>
                    <span className="prompt-cmd">"I drafted this auth state. Ask me 2 questions where token revocation fails."</span>
                  </div>
                  <div className="terminal-output active-output">
                    <span className="output-tag active-tag">// SOCRATIC SPARRING ENGAGED</span>
                    <p className="output-snippet">
                      AI: "Question 1: If a user changes their password on Device A, what prevents an active stolen access token on Device B from remaining valid until its 15-minute expiry?"<br />
                      <strong style={{ color: 'var(--green)' }}>THE RESULT:</strong> The developer reasons through blacklists and token generation. The mental model is forged permanently.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED REEL 02 SPOTLIGHT — EDITORIAL HERO CARD
          ========================================================================= */}
      <section className="featured-reel-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag" style={{ color: 'var(--orange)' }}>// LATEST RELEASE</span>
              <h2 className="section-title">Reel 02 Dedicated Resource Lab</h2>
            </div>
            <Link to="/reels/reel-02-ai-usage" className="btn btn-outline btn-sm">
              <span>View Full Lab</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="reel-spotlight-card">
            <div className="spotlight-left">
              <div className="spotlight-tags">
                <span className="badge badge-orange">REEL #02</span>
                <span className="badge badge-cyan">0:58 DURATION</span>
                <span className="badge badge-neutral">AI & LLMS</span>
              </div>

              <h3 className="spotlight-title">{reel02.title}</h3>
              <p className="spotlight-subtitle">{reel02.subtitle}</p>

              <blockquote className="spotlight-quote">
                "{reel02.editorialQuote}"
              </blockquote>

              <div className="spotlight-features-list">
                <div className="feature-item">
                  <CheckCircle2 size={16} color="var(--orange)" />
                  <span>3 Copyable Socratic System Prompts</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} color="var(--orange)" />
                  <span>4-Stage Cognitive Retention Protocol</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} color="var(--orange)" />
                  <span>Interactive AI Reliance Self-Audit Tool</span>
                </div>
              </div>

              <div className="spotlight-actions">
                <Link to="/reels/reel-02-ai-usage" className="btn btn-primary">
                  <span>Open Reel 02 Resources</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/reels/reel-02-ai-usage#interactive-tool-anchor" className="btn btn-secondary">
                  <span>Take Reliance Audit</span>
                </Link>
              </div>
            </div>

            <div className="spotlight-right">
              <div className="spotlight-script-card">
                <div className="script-card-header">
                  <Terminal size={14} color="var(--orange)" />
                  <span className="mono-tag">ORIGINAL SCRIPT RECONSTRUCTION</span>
                </div>
                <div className="script-lines">
                  {reel02.sections.intro.scriptExcerpts?.map((line, idx) => (
                    <div key={idx} className="script-line-item">
                      <span className="script-line-num">0{idx + 1}</span>
                      <p className="script-line-text">"{line}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE CONTENT-TO-ACTION SYSTEM (PHASE 2 LIFECYCLE)
          ========================================================================= */}
      <section className="lifecycle-section">
        <div className="container">
          <div className="lifecycle-header">
            <span className="mono-tag" style={{ color: 'var(--cyan)' }}>// THE CONTENT LIFECYCLE</span>
            <h2 className="section-title">From 30-Second Hook to Verifiable Code</h2>
            <p className="section-desc">
              We reject the passive dopamine trap of short-form video. Here is how Motivation Code turns every Reel into an actionable engineering workflow.
            </p>
          </div>

          <div className="lifecycle-steps-grid">
            <div className="lifecycle-card">
              <div className="step-num-pill">01</div>
              <h4 className="lifecycle-card-title">The Instagram Reel</h4>
              <p className="lifecycle-card-copy">
                A sharp confrontation exposing bad habits, inefficient workflows, or the illusion of competence.
              </p>
            </div>

            <div className="lifecycle-card">
              <div className="step-num-pill">02</div>
              <h4 className="lifecycle-card-title">The Resource Lab</h4>
              <p className="lifecycle-card-copy">
                You land on a dedicated page with the core thesis, curated offline tools, and mental models.
              </p>
            </div>

            <div className="lifecycle-card">
              <div className="step-num-pill">03</div>
              <h4 className="lifecycle-card-title">Socratic Prompts</h4>
              <p className="lifecycle-card-copy">
                Copy battle-tested system prompts that turn your LLM into a ruthless, zero-answer oral examiner.
              </p>
            </div>

            <div className="lifecycle-card card-accent-glow">
              <div className="step-num-pill" style={{ background: 'var(--orange)', color: '#fff' }}>04</div>
              <h4 className="lifecycle-card-title">Real Implementation</h4>
              <p className="lifecycle-card-copy">
                Close the browser, open your IDE, and implement raw code that compiles without copilot aids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          REEL LIBRARY PREVIEW
          ========================================================================= */}
      <section className="reels-preview-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag" style={{ color: 'var(--orange)' }}>// EDITORIAL ARCHIVE</span>
              <h2 className="section-title">The Reels Library</h2>
            </div>
            <Link to="/reels" className="btn btn-secondary btn-sm">
              <span>View All 4 Reels</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="editorial-reels-grid">
            {REELS_DATA.map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TOOLS & WORKFLOWS SPOTLIGHT
          ========================================================================= */}
      <section className="tools-preview-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag" style={{ color: 'var(--green)' }}>// CURATED & VERIFIED</span>
              <h2 className="section-title">Builder-Grade Tools</h2>
              <p className="section-desc" style={{ marginTop: '6px' }}>
                Handpicked, offline-capable developer utilities tested for zero fluff and privacy.
              </p>
            </div>
            <Link to="/tools" className="btn btn-outline btn-sm">
              <span>Browse Full Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="tools-grid">
            {TOOLS_DATA.slice(0, 4).map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-card-top">
                  <span className="badge badge-neutral">{tool.category}</span>
                  <span className={`badge ${tool.pricing === 'Free / Open-Source' ? 'badge-green' : 'badge-orange'}`}>
                    {tool.pricing}
                  </span>
                </div>

                <h4 className="tool-name">{tool.name}</h4>
                <p className="tool-description">{tool.description}</p>

                <div className="tool-why-box">
                  <span className="mono-tag" style={{ color: 'var(--orange)', fontSize: '0.68rem' }}>WHY IT MATTERS:</span>
                  <p>{tool.whyItMatters}</p>
                </div>

                <div className="tool-card-footer">
                  <a
                    href={tool.url}
                    target={tool.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="tool-link"
                  >
                    <span>Inspect Tool</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING MANIFESTO CALLOUT
          ========================================================================= */}
      <section className="closing-callout-section">
        <div className="container">
          <div className="closing-box">
            <div className="closing-badge">
              <Cpu size={16} color="var(--orange)" />
              <span className="mono-tag">MOTIVATION CODE PHILOSOPHY</span>
            </div>

            <h2 className="closing-title">
              "In the real world, nobody cares how good your prompt was.<br />
              <span style={{ color: 'var(--orange)' }}>They care what you can actually build."</span>
            </h2>

            <p className="closing-lead">
              Turn your Instagram feed from a distraction into an unfair engineering advantage.
            </p>

            <div className="closing-buttons">
              <Link to="/reels/reel-02-ai-usage" className="btn btn-primary btn-lg">
                <Zap size={18} />
                <span>Start With Reel 02 Hub</span>
              </Link>
              <Link to="/playbooks" className="btn btn-secondary btn-lg">
                <span>Explore Action Playbooks</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

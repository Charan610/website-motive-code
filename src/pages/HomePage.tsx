import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Terminal, 
  BookOpen, 
  ArrowRight,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { QuickEntryBox } from '../components/ui/QuickEntryBox';
import { REELS_DATA } from '../data/reelsData';
import { TOOLS_DATA } from '../data/toolsData';
import { ReelCard } from '../components/ReelCard';

export const HomePage: React.FC = () => {
  const [activeHeroTab, setActiveHeroTab] = useState<'passive' | 'active'>('active');
  const reel02 = REELS_DATA.find((r) => r.id === 'reel-02') || REELS_DATA[0];

  return (
    <div className="homepage-wrapper">
      {/* =========================================================================
          HERO SECTION — CALM EDITORIAL TYPOGRAPHY & QUICK ENTRY JUMP
          ========================================================================= */}
      <section className="hero-editorial-section">
        <div className="container">
          <div className="hero-top-badge-row">
            <span className="mono-tag">// A CONTENT-TO-ACTION PLATFORM</span>
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>
              FOR ENGINEERING STUDENTS & BUILDERS
            </span>
          </div>

          <div className="hero-headline-block">
            <h1 className="display-title hero-main-title">
              Build Real Skills<br />
              <span className="hero-highlight-word">Beyond The Prompt.</span>
            </h1>
            <p className="hero-lead-paragraph">
              Motivation Code turns short-form Instagram Reels into concrete action. You watched a reel—now execute the verified workflow, copy tested system prompts, and lock in the knowledge through active recall playbooks.
            </p>
          </div>

          <div className="hero-cta-group">
            <Link to="/reels/reel-02-ai-usage" className="btn btn-primary btn-lg">
              <span>Explore Reel 02: You&apos;re Using AI Wrong</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/reels" className="btn btn-secondary btn-lg">
              <BookOpen size={16} />
              <span>Browse All Reels</span>
            </Link>
          </div>

          {/* Quick-Entry Box: "Came from a reel?" */}
          <QuickEntryBox />


          {/* Hero Interactive Comparison Panel */}
          <div className="hero-sandbox-panel">
            <div className="sandbox-panel-header">
              <div className="sandbox-tabs">
                <button
                  className={`sandbox-tab ${activeHeroTab === 'passive' ? 'active-passive' : ''}`}
                  onClick={() => setActiveHeroTab('passive')}
                >
                  <span className="tab-dot dot-red" />
                  <span>The Passive AI Trap (Fluency Illusion)</span>
                </button>
                <button
                  className={`sandbox-tab ${activeHeroTab === 'active' ? 'active-hero' : ''}`}
                  onClick={() => setActiveHeroTab('active')}
                >
                  <span className="tab-dot dot-orange" />
                  <span>The Active Socratic Protocol (True Recall)</span>
                </button>
              </div>

              <div className="sandbox-badge">
                <span className="mono-tag">
                  {activeHeroTab === 'active' ? 'RETENTION: 94% (RECALL)' : 'RETENTION: 0% (RECOGNITION)'}
                </span>
              </div>
            </div>

            <div className="sandbox-terminal-body">
              {activeHeroTab === 'passive' ? (
                <div className="sandbox-mock-run">
                  <div className="terminal-line user-line">
                    <span className="prompt-prefix">student@terminal:~$</span>
                    <span className="prompt-cmd">"Write the full JWT refresh rotation handler for my Express API."</span>
                  </div>
                  <div className="terminal-output passive-output">
                    <span className="output-tag">// AI DISPENSES 120 LINES OF SYNTAX IN 2 SECONDS</span>
                    <p className="output-snippet">
                      The student skims the code, pastes it, and moves on. The exam is passed, but the mental model was never forged. The moment the prompt box vanishes in a technical interview, the engineer is paralyzed.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="sandbox-mock-run">
                  <div className="terminal-line user-line">
                    <span className="prompt-prefix">builder@terminal:~$</span>
                    <span className="prompt-cmd">"I drafted this token rotation model. Quiz me on 2 edge cases where revocation fails."</span>
                  </div>
                  <div className="terminal-output active-output">
                    <span className="output-tag active-tag">// SOCRATIC SPARRING PROTOCOL ENGAGED</span>
                    <p className="output-snippet">
                      Model: "Question 1: If an attacker intercepts a compromised refresh token before the legitimate client sends it, how does your database detect concurrent use and invalidate the entire token family?"<br />
                      The builder reasons through race conditions and database locks. The understanding is permanent.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE MOTIVATION CODE PHILOSOPHY (CLEAR PURPOSE)
          ========================================================================= */}
      <section className="lifecycle-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag">// THE CORE THESIS</span>
              <h2 className="section-title">The Three Pillars of Practical Mastery</h2>
            </div>
            <Link to="/about" className="btn btn-outline btn-sm">
              <span>Read Manifesto</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="lifecycle-steps-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="lifecycle-card">
              <div className="step-num-pill">01</div>
              <h4 className="lifecycle-card-title">Cognitive Friction Over Cheap Speed</h4>
              <p className="lifecycle-card-copy">
                When an AI generates answers instantly, your brain confuses fluency with mastery. Lasting retention requires the mental strain of retrieval.
              </p>
            </div>

            <div className="lifecycle-card">
              <div className="step-num-pill">02</div>
              <h4 className="lifecycle-card-title">Systems & Mental Models Over Syntax</h4>
              <p className="lifecycle-card-copy">
                Frameworks and APIs change constantly. Distributed architectures, memory hierarchies, and concurrency primitives remain invariant.
              </p>
            </div>

            <div className="lifecycle-card">
              <div className="step-num-pill">03</div>
              <h4 className="lifecycle-card-title">Offline Verification</h4>
              <p className="lifecycle-card-copy">
                Your capability as an engineer should not evaporate when the internet cuts out. We champion local tools, offline docs, and raw terminal builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — FEATURED REEL 02 LAB SPOTLIGHT
          ========================================================================= */}
      <section className="featured-reel-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag">// FLAGSHIP RESOURCE HUB</span>
              <h2 className="section-title">Reel 02: "You're Using AI Wrong"</h2>
            </div>
            <Link to="/reels/reel-02-ai-usage" className="btn btn-outline btn-sm">
              <span>Open Dedicated Lab</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="reel-spotlight-card">
            <div className="spotlight-left">
              <div className="spotlight-tags">
                <span className="badge badge-orange">REEL #02</span>
                <span className="badge badge-neutral">0:58 DURATION</span>
                <span className="badge badge-neutral">ACTIVE RECALL</span>
              </div>

              <h3 className="spotlight-title">{reel02.title}</h3>
              <p className="spotlight-subtitle">{reel02.subtitle}</p>

              <blockquote className="spotlight-quote">
                "{reel02.editorialQuote}"
              </blockquote>

              <div className="spotlight-features-list">
                <div className="feature-item">
                  <CheckCircle2 size={15} color="var(--accent)" />
                  <span>3 Copyable Socratic System Prompts</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={15} color="var(--accent)" />
                  <span>4-Stage Cognitive Retention Protocol</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={15} color="var(--accent)" />
                  <span>Interactive AI Reliance Self-Audit & Feynman Tool</span>
                </div>
              </div>

              <div className="spotlight-actions">
                <Link to="/reels/reel-02-ai-usage" className="btn btn-primary">
                  <span>Open Full Resource Hub</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/reels/reel-02-ai-usage#interactive-tool-anchor" className="btn btn-secondary">
                  <span>Take Reliance Audit</span>
                </Link>
              </div>
            </div>

            <div className="spotlight-right">
              <div className="spotlight-script-card">
                <div className="script-card-header">
                  <Terminal size={14} color="var(--text-tertiary)" />
                  <span className="mono-tag">ORIGINAL SCRIPT BREAKDOWN</span>
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
          SECTION 4 — REELS ARCHIVE (ORGANISED DISCOVERY)
          ========================================================================= */}
      <section className="reels-preview-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag">// EDITORIAL REELS</span>
              <h2 className="section-title">The Reels Library</h2>
              <p className="section-desc" style={{ marginTop: '4px' }}>
                Every video is matched with verified tools, prompts, and playbooks.
              </p>
            </div>
            <Link to="/reels" className="btn btn-secondary btn-sm">
              <span>View All Reels</span>
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
          SECTION 5 — BUILDER-GRADE TOOLS SPOTLIGHT
          ========================================================================= */}
      <section className="tools-preview-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="mono-tag">// VERIFIED UTILITIES</span>
              <h2 className="section-title">Builder-Grade Tools</h2>
              <p className="section-desc" style={{ marginTop: '4px' }}>
                Tested for zero sponsored fluff, local execution, and durable learning yield.
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
                  <span className="badge badge-neutral">{tool.pricing}</span>
                </div>

                <h4 className="tool-name">{tool.name}</h4>
                <p className="tool-description">{tool.description}</p>

                <div className="tool-why-box">
                  <span className="mono-tag" style={{ fontSize: '0.65rem' }}>WHY IT MATTERS:</span>
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
          SECTION 6 — CLOSING EDITORIAL PULLQUOTE
          ========================================================================= */}
      <section className="closing-callout-section">
        <div className="container">
          <div className="closing-box">
            <div className="closing-badge">
              <Compass size={15} color="var(--accent)" />
              <span className="mono-tag">THE MOTIVATION CODE STANDARD</span>
            </div>

            <h2 className="closing-title">
              "In the real world, nobody cares how good your prompt was.<br />
              <span style={{ color: 'var(--accent)' }}>They care what you can actually build."</span>
            </h2>

            <p className="closing-lead">
              Turn short-form content into an unfair engineering advantage.
            </p>

            <div className="closing-buttons">
              <Link to="/reels/reel-02-ai-usage" className="btn btn-primary btn-lg">
                <span>Start With Reel 02 Lab</span>
                <ArrowRight size={15} />
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

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-wrapper">
      <div className="container container-narrow">
        {/* Editorial Header */}
        <div className="about-editorial-header">
          <span className="mono-tag">// MANIFESTO & ORIGIN</span>
          <h1 className="page-title display-title" style={{ marginTop: '8px' }}>
            WHY MOTIVATION CODE EXISTS
          </h1>
          <p className="about-hero-sub">
            The internet does not need another directory of 500 AI tools, another recycled motivational quote, or another tutorial showing you how to copy someone else's repository.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="about-body-narrative">
          <section className="narrative-section">
            <h2 className="narrative-heading">The Epidemic of Fluency Illusion</h2>
            <p>
              When frontier models like Claude, GPT-4, and DeepSeek arrived, they handed everyone a superpowers illusion. A student can paste an entire university syllabus into a context window, receive perfect answers, and pass an exam with 100% on paper.
            </p>
            <p>
              Then they sit in front of a real code review or a broken production deployment, and realization hits: <strong>they cannot explain why the system works without an AI prompt box.</strong>
            </p>
            <p>
              That is not learning. That is outsourcing cognition. When you bypass friction, you bypass neuroplasticity.
            </p>
          </section>

          <section className="narrative-section highlight-box">
            <div className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start', marginBottom: '8px' }}>
              <Flame size={18} color="var(--accent)" />
              <span className="mono-tag" style={{ color: 'var(--accent)' }}>THE CORE PRINCIPLE</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              "Don't ask AI to think for you. Use it to think with you."
            </h3>
            <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
              Learn the concept. Build the project. Debug the code. Understand every single mistake. In the real world, nobody pays you for how clever your prompt was. They pay you for what you can build when systems break.
            </p>
          </section>

          {/* The 4 Pillars */}
          <section className="narrative-section">
            <h2 className="narrative-heading">The Four Operational Pillars</h2>

            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-num">01</div>
                <h4 className="pillar-title">Cognitive Friction Over Cheap Speed</h4>
                <p className="pillar-desc">
                  We design prompts and workflows that deliberately interrogate your understanding. If a tool makes things too easy, it usually robs you of understanding.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-num">02</div>
                <h4 className="pillar-title">Mental Models Over Code Snippets</h4>
                <p className="pillar-desc">
                  Syntax changes every year; distributed systems, pointers, concurrency, and memory hierarchies do not. We teach primitives that remain true for decades.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-num">03</div>
                <h4 className="pillar-title">Verified Offline Builders</h4>
                <p className="pillar-desc">
                  We champion local-first software like Ollama, Anki, Bruno, and raw terminal commands. Your engineering capability should not evaporate when the Wi-Fi drops.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-num">04</div>
                <h4 className="pillar-title">Content as an Action Spark</h4>
                <p className="pillar-desc">
                  Every short-form video we publish on Instagram is an invitation to do real work. Every Reel gets a dedicated lab page with zero fluff.
                </p>
              </div>
            </div>
          </section>

          {/* Honest Promise */}
          <section className="narrative-section">
            <h2 className="narrative-heading">Our Promise to You</h2>
            <p>
              Motivation Code does not run paid sponsorships pretending bad software is groundbreaking. We do not generate fake testimonials or invent vanity metrics.
            </p>
            <p>
              Everything published here is crafted for engineering students, self-taught developers, and builders who genuinely want to build world-class engineering skills.
            </p>
          </section>

          {/* Next Step Callout */}
          <div className="about-cta-card">
            <h3 style={{ fontSize: '1.3rem' }}>Ready to build real skills?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '8px 0 20px' }}>
              Dive into our featured Reel 02 Lab and take the AI Reliance Audit.
            </p>
            <div className="flex-center" style={{ gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/reels/reel-02-ai-usage" className="btn btn-primary">
                <span>Open Reel 02 Lab</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/playbooks" className="btn btn-secondary">
                <span>Read Playbooks</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

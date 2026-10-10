import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Terminal, ExternalLink } from 'lucide-react';
import { useToast } from './Toast';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid developer email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! You will receive new Reel playbooks directly.', 'success');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Editorial Banner */}
        <div className="footer-manifesto">
          <div className="manifesto-left">
            <span className="mono-tag" style={{ color: 'var(--accent)' }}>// THE MOTIVATION CODE STANDARD</span>
            <h3 className="manifesto-heading">
              Stop collecting answers. <br />
              <span style={{ color: 'var(--accent)' }}>Start building skills.</span>
            </h3>
            <p className="manifesto-desc">
              Every Instagram Reel on Motivation Code links directly to verified tools, unprompted workflows, and interactive mental models designed to survive beyond the screen.
            </p>
          </div>

          <div className="manifesto-right">
            <div className="dispatch-card">
              <div className="dispatch-header">
                <Terminal size={15} color="var(--accent)" />
                <span className="mono-tag">BUILDER DISPATCH</span>
              </div>
              <p className="dispatch-copy">
                Get new Reel breakdown packs, Socratic prompts, and architecture playbooks before they drop on Instagram.
              </p>

              {subscribed ? (
                <div className="dispatch-success">
                  <Check size={18} color="var(--green)" />
                  <span>You're in the dispatch queue. No spam, ever.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="dispatch-form">
                  <input
                    type="email"
                    placeholder="developer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dispatch-input"
                    aria-label="Your email address"
                  />
                  <button type="submit" className="btn btn-primary btn-sm dispatch-btn">
                    <span>Join</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="footer-nav-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo" style={{ marginBottom: '16px' }}>
              <div className="logo-glyph">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20V4L10 12L12 8L14 12L20 4V20" stroke="#BD5A38" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">MOTIVATION<span className="brand-accent">CODE</span></span>
              </div>
            </div>
            <p className="footer-col-desc">
              A premium content-to-action platform for engineering students, developers, and aspiring builders who refuse to let AI think for them.
            </p>
            <div className="footer-social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Motivation Code Instagram"
              >
                <span>Instagram @motivationcode</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Platform Routes</h4>
            <ul className="footer-links-list">
              <li><Link to="/reels">All Instagram Reels</Link></li>
              <li><Link to="/reels/reel-02-ai-usage">Reel 02: Resource Hub</Link></li>
              <li><Link to="/tools">Curated Tools Library</Link></li>
              <li><Link to="/playbooks">Action Playbooks</Link></li>
              <li><Link to="/about">Our Philosophy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Core Disciplines</h4>
            <ul className="footer-links-list">
              <li><Link to="/reels?topic=AI+%26+LLMs">Active-Recall AI</Link></li>
              <li><Link to="/reels?topic=Engineering+%26+CS">Computer Science Primitives</Link></li>
              <li><Link to="/reels?topic=Coding+Workflows">Developer Focus & Workflows</Link></li>
              <li><Link to="/reels?topic=Builder+Mindset">Finishing & Shipping SaaS</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Technical Integrity</h4>
            <div className="integrity-box">
              <span className="mono-tag" style={{ color: 'var(--green)' }}>● VERIFIED INDEPENDENT</span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Zero sponsored bloat. Zero fake reviews. Every tool and workflow is battle-tested in actual code editors.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <span>© {new Date().getFullYear()} Motivation Code. Built for builders, not consumers.</span>
          </div>
          <div className="bottom-right">
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>
              STATUS: LOCAL STUDIO → PRODUCTION VERCEL DEPLOYMENT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

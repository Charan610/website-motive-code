import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles, Search, Flame } from 'lucide-react';
import { getStreak } from '../lib/progressStorage';

export interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenProgress?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenProgress,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [streak, setStreak] = useState(getStreak());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => setStreak(getStreak());
    window.addEventListener('progress_updated', update);
    return () => window.removeEventListener('progress_updated', update);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Reels Library', path: '/reels' },
    { name: 'Prompt Vault', path: '/prompts' },
    { name: 'Tools', path: '/tools' },
    { name: 'Playbooks', path: '/playbooks' },
    { name: 'Philosophy', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Motivation Code Homepage">
            <div className="logo-glyph">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V4L10 12L12 8L14 12L20 4V20" stroke="#FF5E1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="20" r="2" fill="#00E5FF"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">MOTIVATION<span className="brand-accent">CODE</span></span>
              <span className="brand-sub">CONTENT TO ACTION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Area: Command Palette, Streak Tracker & Latest Reel */}
          <div className="header-actions">
            {/* Command Palette Trigger */}
            <button
              type="button"
              className="nav-cmd-trigger"
              onClick={onOpenCommandPalette}
              title="Search reels, tools, and prompts (⌘K)"
              aria-label="Search"
            >
              <Search size={14} className="cmd-icon" />
              <span className="cmd-text">Search</span>
              <kbd className="cmd-shortcut">⌘K</kbd>
            </button>

            {/* Streak & Progress Button */}
            <button
              type="button"
              className="nav-streak-btn"
              onClick={onOpenProgress}
              title="View builder progress and active recall streak"
              aria-label="Progress dashboard"
            >
              <Flame size={14} className="streak-flame" />
              <span className="streak-count">{streak}</span>
            </button>

            {/* Latest Reel Indicator */}
            <Link to="/reels/reel-02-ai-usage" className="reel-live-pill" title="Jump to Reel 02 Resources">
              <span className="pulse-dot" />
              <span className="pill-prefix">REEL 02:</span>
              <span className="pill-title">YOU&apos;RE USING AI WRONG</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'mobile-drawer-open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>// NAVIGATION</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="drawer-close-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-actions-strip">
            <button
              type="button"
              className="mobile-cmd-btn"
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette?.();
              }}
            >
              <Search size={16} />
              <span>Search everything (⌘K)</span>
            </button>

            <button
              type="button"
              className="mobile-streak-chip"
              onClick={() => {
                setMobileOpen(false);
                onOpenProgress?.();
              }}
            >
              <Flame size={16} color="var(--accent)" />
              <span>Streak: {streak} days</span>
            </button>
          </div>

          <div className="mobile-links-list">
            <Link
              to="/"
              className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span>00</span> Home
            </Link>
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <span>0{idx + 1}</span> {link.name}
              </Link>
            ))}
          </div>

          <div className="mobile-featured-box">
            <div className="featured-box-header">
              <Sparkles size={14} color="var(--accent)" />
              <span className="mono-tag" style={{ color: 'var(--accent)' }}>FEATURED DISCOVERY</span>
            </div>
            <h4 style={{ fontSize: '1rem', margin: '8px 0 4px', color: 'var(--text-primary)' }}>
              Reel 02: You&apos;re Using AI Wrong
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Explore the dedicated resource hub, Socratic prompts, and cognitive retainment protocol.
            </p>
            <Link to="/reels/reel-02-ai-usage" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Open Reel 02 Hub <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mobile-drawer-footer">
            <p className="mono-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>
              MOTIVATION CODE // CRAFTED FOR BUILDERS
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

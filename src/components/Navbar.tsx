import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Clapperboard,
  SquareTerminal,
  Compass,
  BookOpen,
  ArrowUpRight,
  Search,
  PanelLeftClose,
  Menu,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";
export interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenProgress?: () => void;
}
const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/reels", label: "Reel library", icon: Clapperboard },
  { to: "/prompts", label: "Prompt library", icon: SquareTerminal },
  { to: "/tools", label: "Explore tools", icon: Compass },
  { to: "/playbooks", label: "Playbooks", icon: BookOpen },
];
export function Navbar({ onOpenCommandPalette, onOpenProgress }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const title =
    links.find((l) =>
      l.to === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(l.to),
    )?.label || "Learning workspace";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside
        id="workspace-navigation"
        className={`workspace-sidebar ${open ? "is-open" : ""}`}
      >
        <Link className="workspace-brand" to="/" onClick={() => setOpen(false)}>
          <span className="mc-mark">
            m<span>c</span>
            <i />
          </span>
          <span>
            motivation<span className="brand-code">code.</span>
          </span>
        </Link>
        <div className="workspace-switch">
          <span className="workspace-avatar">M</span>
          <div>
            Personal workspace<small>Your space to become better</small>
          </div>
          <span className="workspace-dot" />
        </div>
        <span className="sidebar-caption">WORKSPACE</span>
        <nav aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              end={to === "/"}
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `workspace-nav ${isActive ? "selected" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {to === "/reels" && <small>04</small>}
            </NavLink>
          ))}
          <button
            className="workspace-nav"
            onClick={() => {
              setOpen(false);
              onOpenProgress?.();
            }}
          >
            <ChartNoAxesCombined size={18} />
            My progress
          </button>
        </nav>
        <div className="sidebar-note">
          <Sparkles size={19} />
          <h4>A little better, every day.</h4>
          <p>
            Use AI to build your ability.
            <br />
            Keep the thinking yours.
          </p>
          <Link to="/about" onClick={() => setOpen(false)}>
            Our philosophy <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <span className="workspace-avatar">Y</span>
          <div>
            Your learning journey<small>Stored on this device</small>
          </div>
          <button
            aria-label="Close navigation"
            className="sidebar-close"
            onClick={() => setOpen(false)}
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
      </aside>
      {open && (
        <button
          className="sidebar-scrim"
          aria-label="Dismiss navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <header className="workspace-topbar">
        <div>
          <button
            className="workspace-menu"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="workspace-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
          <span className="topbar-muted">Workspace</span>
          <span className="topbar-slash">/</span>
          <span>{title}</span>
        </div>
        <button
          aria-label="Search workspace"
          className="workspace-search"
          onClick={onOpenCommandPalette}
        >
          <Search size={16} />
          <span>Search anything...</span>
          <kbd>⌘ K</kbd>
        </button>
        <Link className="topbar-latest" to="/reels/reel-02-ai-usage">
          <span className="workspace-dot" />
          Reel 02 is here
          <ArrowUpRight size={14} />
        </Link>
      </header>
    </>
  );
}

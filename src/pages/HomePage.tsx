import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Layers,
  Copy,
  Check,
  CornerDownRight,
  Terminal,
} from "lucide-react";
import { LearningCoach } from "../components/LearningCoach";
import { REELS_DATA } from "../data/reelsData";
import { LEARNING_PROMPTS } from "../data/learningData";
import { useToast } from "../components/Toast";

const intentions = [
  {
    title: "Learn something",
    copy: "Make the complicated click.",
    icon: BookOpen,
    goal: "study",
  },
  {
    title: "Get exam-ready",
    copy: "Practice with a purpose.",
    icon: GraduationCap,
    goal: "exam",
  },
  {
    title: "Find the bug",
    copy: "Understand what went wrong.",
    icon: Code2,
    goal: "debug",
  },
  {
    title: "Ship an idea",
    copy: "Build your first working version.",
    icon: Layers,
    goal: "project",
  },
];

function PromptStudio() {
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState(LEARNING_PROMPTS[0].promptText);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      showToast("Prompt copied. Take it to your AI tool.");
    } catch {
      showToast("Select the prompt and copy it manually.", "error");
    }
  }
  return (
    <section className="prompt-studio" aria-labelledby="studio-title">
      <div className="studio-caption">
        <span>
          <Terminal size={14} /> THE PROMPT DESK
        </span>
        <span className="studio-live">READY TO USE</span>
      </div>
      <h2 id="studio-title">
        Better questions.
        <br />
        <em>Better understanding.</em>
      </h2>
      <div className="studio-tabs" role="tablist" aria-label="Prompt goal">
        {[
          ["Learn", 0],
          ["Debug", 2],
          ["Build", 3],
        ].map(([label, index]) => (
          <button
            key={label}
            role="tab"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(e) => {
              const order = [0, 2, 3];
              const current = order.indexOf(active);
              let next: number | undefined;
              if (e.key === "ArrowRight") next = order[(current + 1) % 3];
              if (e.key === "ArrowLeft") next = order[(current + 2) % 3];
              if (e.key === "Home") next = 0;
              if (e.key === "End") next = 3;
              if (next !== undefined) {
                e.preventDefault();
                setActive(next);
                setDraft(LEARNING_PROMPTS[next].promptText);
                setCopied(false);
                document.getElementById(`studio-tab-${next}`)?.focus();
              }
            }}
            aria-controls="studio-editor"
            id={`studio-tab-${index}`}
            onClick={() => {
              setActive(Number(index));
              setDraft(LEARNING_PROMPTS[Number(index)].promptText);
              setCopied(false);
            }}
          >
            {label}
            <ArrowUpRight size={13} />
          </button>
        ))}
      </div>
      <div
        className="studio-editor"
        role="tabpanel"
        id="studio-editor"
        aria-labelledby={`studio-tab-${active}`}
      >
        <div className="editor-line">
          <span>01</span>
          <span>{LEARNING_PROMPTS[active].title.toUpperCase()}</span>
          <span>.prompt</span>
        </div>
        <textarea
          aria-label="Quick prompt editor"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setCopied(false);
          }}
          spellCheck={false}
        />
      </div>
      <div className="studio-bottom">
        <span>Yours to edit. Yours to use.</span>
        <button onClick={copy} className="studio-copy">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span aria-live="polite">{copied ? "Copied" : "Copy prompt"}</span>
        </button>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="workspace-home studio-home">
      <header className="studio-welcome">
        <div>
          <span className="eyebrow">
            <span className="tiny-cross">+</span> YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h1>
            Less passive.
            <br className="mobile-break" /> <em>More possible.</em>
          </h1>
          <p>
            A little inspiration. A practical next step. A more capable you.
          </p>
        </div>
        <Link to="/reels" className="studio-text-link">
          Explore the library <ArrowUpRight size={17} />
        </Link>
      </header>
      <div className="studio-hero-grid">
        <section className="editorial-feature">
          <div className="editorial-feature-top">
            <span className="issue-pill">
              <span /> THE LATEST DROP
            </span>
            <span>FIELD NOTES — 002</span>
          </div>
          <div className="editorial-feature-body">
            <span className="feature-kicker">
              A BETTER RELATIONSHIP WITH AI
            </span>
            <h2>
              You’re using
              <br />
              AI <em>wrong.</em>
            </h2>
            <p>
              Getting the answer is easy.
              <br />
              Making it your own is the real skill.
            </p>
            <Link to="/reels/reel-02-ai-usage" className="editorial-cta">
              Rethink how you learn <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="editorial-sculpture" aria-hidden="true">
            <div className="sculpture-ring ring-a" />
            <div className="sculpture-ring ring-b" />
            <div className="sculpture-ring ring-c" />
            <span className="sculpture-star">✳</span>
            <span className="sculpture-label">
              HUMAN
              <br />
              IN THE LOOP
            </span>
          </div>
          <div className="editorial-feature-bottom">
            <span>04 PROMPTS</span>
            <i />
            <span>05 PRACTICAL STEPS</span>
            <ArrowUpRight size={15} />
          </div>
        </section>
        <PromptStudio />
      </div>

      {/* Reel 03 Feature: The Engineering Roadmap Diagnostic */}
      <section className="roadmap-spotlight-card" aria-labelledby="roadmap-spotlight-title">
        <div className="spotlight-left">
          <div className="spotlight-badge">
            <span className="spotlight-dot" />
            <span>REEL 03 DELIVERABLE · SRKR AUTONOMOUS</span>
          </div>
          <h2 id="roadmap-spotlight-title">
            You’re in engineering.
            <br />
            <em>What should you learn next?</em>
          </h2>
          <p>
            Stop collecting random tutorials. Take our 3-minute diagnostic for your branch, year, and goals. Get an evidence-based roadmap with verifiable build milestones.
          </p>
          <div className="spotlight-actions">
            <Link to="/roadmap" className="btn-base btn-primary btn-md">
              <span>Start 3-Minute Diagnostic</span>
              <ArrowRight size={16} />
            </Link>
            <span className="spotlight-meta">
              CSE · ECE · EEE · ME · R20 & R23 Regulations
            </span>
          </div>
        </div>
        <div className="spotlight-right" aria-hidden="true">
          <div className="spotlight-stat-box">
            <span className="stat-code">01</span>
            <strong>Prerequisite Bridges</strong>
            <small>Cold-recall checks on foundational gates</small>
          </div>
          <div className="spotlight-stat-box">
            <span className="stat-code">02</span>
            <strong>Observable Builds</strong>
            <small>Explicit test commands & acceptance criteria</small>
          </div>
        </div>
      </section>

      <section className="intentions-section">
        <div className="studio-section-title">
          <h2>What’s on your mind?</h2>
          <span>Pick a direction. We’ll help with the first step.</span>
        </div>
        <div className="intentions-grid">
          {intentions.map(({ title, copy, icon: Icon, goal }, i) => (
            <Link
              key={goal}
              to={`/?goal=${goal}#learning-coach`}
              className="intention"
            >
              <span className="intention-number">0{i + 1}</span>
              <Icon size={21} />
              <h3>{title}</h3>
              <p>{copy}</p>
              <ArrowUpRight size={17} className="intention-arrow" />
            </Link>
          ))}
        </div>
      </section>
      <section className="studio-library">
        <div className="studio-section-title">
          <div>
            <span className="eyebrow">WATCH. THINK. DO.</span>
            <h2>
              Small watches. <em>Real shifts.</em>
            </h2>
          </div>
          <Link className="studio-text-link" to="/reels">
            All field notes <ArrowRight size={16} />
          </Link>
        </div>
        <div className="studio-reels">
          {REELS_DATA.slice(0, 3).map((reel, i) => (
            <Link
              to={`/reels/${reel.slug}`}
              key={reel.id}
              className={`studio-reel studio-reel-${i}`}
            >
              <div className="reel-poster">
                <div className="poster-meta">
                  <span>MC / FIELD NOTES</span>
                  <span>{reel.number}</span>
                </div>
                <div className="poster-art" aria-hidden="true">
                  {i === 0 ? (
                    <>
                      <span className="poster-symbol">✳</span>
                      <span>
                        THINK
                        <br />
                        <em>for yourself.</em>
                      </span>
                    </>
                  ) : i === 1 ? (
                    <>
                      <span className="poster-window window-back" />
                      <span className="poster-window window-front">
                        <span>Less noise.</span>
                        <strong>
                          More
                          <br />
                          focus.
                        </strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="poster-ship">
                        build.
                        <br />
                        ship.
                        <br />
                        <em>repeat.</em>
                      </span>
                      <ArrowUpRight size={100} />
                    </>
                  )}
                </div>
                <span className="poster-bottom">
                  {reel.topic}
                  <span>↗</span>
                </span>
              </div>
              <div className="reel-editorial-info">
                <span>
                  REEL {reel.number} <i /> {reel.timeToBuild}
                </span>
                <h3>{reel.title}</h3>
                <p>{reel.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <aside className="studio-principle">
        <span>
          <CornerDownRight size={21} /> OUR NORTH STAR
        </span>
        <p>
          AI should make you <em>more capable.</em>
          <br />
          The thinking stays yours.
        </p>
        <Link to="/about" aria-label="Read our philosophy">
          <ArrowUpRight size={25} />
        </Link>
      </aside>
      <LearningCoach />
    </div>
  );
}

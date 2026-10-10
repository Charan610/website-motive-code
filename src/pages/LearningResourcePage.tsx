import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, BookOpen } from "lucide-react";
import { useState } from "react";
import { LearningCoach } from "../components/LearningCoach";
import { PromptCard } from "../components/PromptCard";
import {
  LEARNING_PROMPTS,
  LEARNING_TOOLS,
  LEARNING_WORKFLOW,
} from "../data/learningData";
import { isReelCompleted, markReelCompleted } from "../lib/progressStorage";
export function LearningResourcePage() {
  const [done, setDone] = useState(() => isReelCompleted("reel-02"));
  return (
    <div className="workspace-home resource-page">
      <div className="resource-breadcrumb">
        <Link to="/reels">
          <ArrowLeft size={15} /> Reel library
        </Link>
        <span>/ Reel 02</span>
        <button
          className="quiet-button"
          onClick={() => {
            markReelCompleted("reel-02", !done);
            setDone(!done);
          }}
        >
          <Check size={15} />
          {done ? "Completed" : "Mark complete"}
        </button>
      </div>
      <header className="resource-intro">
        <span className="eyebrow">REEL 02 / LEARN WITH AI</span>
        <h1>
          You’re using AI wrong<span>.</span>
        </h1>
        <h2>Getting an answer is not the same as understanding it.</h2>
        <p>
          AI should help you become better at thinking, learning, and
          building—not make you dependent on generated answers. Explore
          practical AI resources, smarter prompts, and workflows that help you
          understand concepts, debug code, and build real projects.
        </p>
        <nav className="resource-jumps" aria-label="On this page">
          <a href="#resources">01 Tools</a>
          <a href="#prompts-section">02 Prompts</a>
          <a href="#workflow">03 Workflow</a>
          <a href="#learning-coach">04 Learning coach</a>
        </nav>
      </header>
      <section id="resources" className="resource-section">
        <div className="workspace-section-heading">
          <h2>A small, useful toolkit</h2>
          <span>Independent third-party tools</span>
        </div>
        <div className="resource-tools">
          {LEARNING_TOOLS.map((tool, i) => (
            <article className="resource-tool" key={tool.id}>
              <span className="tool-letter">{["✳", "✧", "⌘"][i]}</span>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <div>
                <h4>WHEN TO USE IT</h4>
                <p>{tool.whyItMatters}</p>
              </div>
              <details>
                <summary>Access & limitations</summary>
                <p>{tool.limitations}</p>
              </details>
              <div className="resource-tool-links">
                <a href={tool.url} target="_blank" rel="noreferrer">
                  Open tool <ArrowUpRight size={15} />
                </a>
                {tool.guide && (
                  <a href={tool.guide} target="_blank" rel="noreferrer">
                    Official guide ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="source-note">
          Official links checked 10 October 2026. Availability and terms can
          change.
        </p>
      </section>
      <section id="prompts-section" className="resource-section">
        <div className="workspace-section-heading">
          <h2>Start with a better question</h2>
          <span>Edit the placeholders. Make it yours.</span>
        </div>
        <div className="resource-prompts">
          {LEARNING_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>
      <section id="workflow" className="resource-section">
        <div className="workspace-section-heading">
          <h2>From a question to a capability</h2>
          <span>A repeatable five-step workflow</span>
        </div>
        <ol className="learning-workflow">
          {LEARNING_WORKFLOW.map(([title, description], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      <div id="interactive-tool-anchor">
        <LearningCoach />
      </div>
      <section className="resource-next">
        <BookOpen size={24} />
        <div>
          <h2>Put one idea into practice.</h2>
          <p>Pick a concept. Work through it. Explain it without the chat.</p>
        </div>
        <Link className="mint-button" to="/playbooks">
          Explore playbooks <ArrowUpRight size={16} />
        </Link>
      </section>
    </div>
  );
}

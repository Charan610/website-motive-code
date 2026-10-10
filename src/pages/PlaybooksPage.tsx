import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PLAYBOOKS_DATA } from '../data/playbooksData';
import { PromptCard } from '../components/PromptCard';
import { WorkflowStep } from '../components/WorkflowStep';

export const PlaybooksPage: React.FC = () => {
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>(PLAYBOOKS_DATA[0].id);

  const activePlaybook = PLAYBOOKS_DATA.find((p) => p.id === selectedPlaybookId) || PLAYBOOKS_DATA[0];

  return (
    <div className="playbooks-page-wrapper">
      <div className="container">
        {/* Editorial Header */}
        <div className="page-editorial-header">
          <div className="header-meta">
            <span className="mono-tag">// PRACTICAL ACTION MANUALS</span>
            <span className="badge badge-neutral">{PLAYBOOKS_DATA.length} STEP-BY-STEP PLAYBOOKS</span>
          </div>

          <h1 className="page-title display-title">
            ACTION PLAYBOOKS
          </h1>

          <p className="page-lead">
            In-depth engineering protocols that translate high-level conceptual ideas into reproducible, command-by-command reality in your code editor.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="playbooks-layout-grid">
          {/* Sidebar selector */}
          <aside className="playbooks-sidebar">
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)', marginBottom: '12px', display: 'block' }}>
              SELECT PLAYBOOK
            </span>

            <div className="playbooks-nav-list">
              {PLAYBOOKS_DATA.map((pb) => {
                const isSelected = pb.id === activePlaybook.id;
                return (
                  <button
                    key={pb.id}
                    className={`playbook-nav-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedPlaybookId(pb.id)}
                  >
                    <div className="flex-between">
                      <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                        {pb.level}
                      </span>
                      <span className="mono-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>
                        {pb.readTime}
                      </span>
                    </div>
                    <h4 className="nav-item-title">{pb.title}</h4>
                    <p className="nav-item-summary">{pb.subtitle}</p>
                  </button>
                );
              })}
            </div>

            <div className="sidebar-tip-box">
              <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                <CheckCircle2 size={16} color="var(--green)" />
                <span className="mono-tag" style={{ color: 'var(--green)' }}>BUILDER DISCIPLINE</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Never run an automated script without reading every line first. Software engineering is the art of precise intent.
              </p>
            </div>
          </aside>

          {/* Main Reading Canvas */}
          <main className="playbook-reading-canvas">
            <div className="reading-canvas-header">
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
                <div className="flex-center" style={{ gap: '8px' }}>
                  <span className="badge badge-orange">{activePlaybook.category}</span>
                  <span className="badge badge-neutral">
                    <Clock size={11} />
                    {activePlaybook.readTime}
                  </span>
                </div>

                {activePlaybook.relatedReelSlug && (
                  <Link
                    to={`/reels/${activePlaybook.relatedReelSlug}`}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Inspect Corresponding Reel Hub</span>
                    <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>

              <h2 className="reading-title">{activePlaybook.title}</h2>
              <p className="reading-subtitle">{activePlaybook.subtitle}</p>

              <div className="reading-summary-callout">
                <p><strong>Thesis:</strong> {activePlaybook.summary}</p>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="playbook-prereq-block">
              <span className="mono-tag" style={{ color: 'var(--cyan)' }}>// PREREQUISITES & ENVIRONMENT</span>
              <ul className="prereq-list">
                {activePlaybook.workflow.prerequisites.map((prereq, i) => (
                  <li key={i}>
                    <span className="prereq-dot">▸</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Workflow */}
            <div className="playbook-workflow-block">
              <span className="mono-tag" style={{ color: 'var(--green)', display: 'block', marginBottom: '16px' }}>
                // SEQUENTIAL WORKFLOW
              </span>

              <div className="workflow-steps-list">
                {activePlaybook.workflow.steps.map((step) => (
                  <WorkflowStep
                    key={step.stepNumber}
                    step={step}
                    totalSteps={activePlaybook.workflow.steps.length}
                  />
                ))}
              </div>
            </div>

            {/* Integrated Prompts */}
            {activePlaybook.prompts && activePlaybook.prompts.length > 0 && (
              <div className="playbook-prompts-block" style={{ marginTop: '48px' }}>
                <span className="mono-tag" style={{ color: 'var(--orange)', display: 'block', marginBottom: '16px' }}>
                  // PROTOCOL PROMPT SUITE
                </span>

                <div className="prompts-list">
                  {activePlaybook.prompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

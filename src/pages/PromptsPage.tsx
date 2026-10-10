import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Terminal, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { promptsData } from '../data/promptsData';
import type { PromptItem } from '../types/content';
import { useToast } from '../components/Toast';

export const PromptsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  const categories = useMemo(() => {
    const set = new Set<string>();
    promptsData.forEach((p: PromptItem) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  const models = useMemo(() => {
    const set = new Set<string>();
    promptsData.forEach((p: PromptItem) => {
      if (p.targetModel) set.add(p.targetModel);
    });
    return ['all', ...Array.from(set)];
  }, []);

  const filteredPrompts = useMemo(() => {
    return promptsData.filter((p: PromptItem) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q) ||
        (p.variables && p.variables.some((v) => v.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchesModel =
        selectedModel === 'all' || p.targetModel === selectedModel;

      return matchesSearch && matchesCategory && matchesModel;
    });
  }, [searchQuery, selectedCategory, selectedModel]);

  const handleCopy = async (id: string, text: string, title: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast(`Copied "${title}" prompt to clipboard!`, 'success');
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      showToast('Could not copy automatically. Please select text manually.', 'error');
    }
  };

  return (
    <div className="prompts-page">
      <div className="container" style={{ padding: '48px 24px 96px' }}>
        {/* Header */}
        <div className="editorial-header" style={{ marginBottom: '40px' }}>
          <div className="header-meta-strip">
            <span className="mono-tag" style={{ color: 'var(--accent)' }}>// REPRODUCIBLE REASONING</span>
            <span className="header-divider">/</span>
            <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>THE PROMPT VAULT</span>
          </div>

          <h1 className="editorial-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Engineering Prompt Vault
          </h1>
          <p className="editorial-lead" style={{ maxWidth: '640px', color: 'var(--text-secondary)' }}>
            Curated system instructions, Socratic tutors, and debugging frameworks derived directly from Motivation Code reels. Copy, tailor, and execute.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="vault-toolbar">
          <div className="vault-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="vault-search-input"
              placeholder="Search prompts, techniques, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="vault-chips-row">
            <span className="filter-label">
              <Filter size={14} /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`vault-filter-chip ${selectedCategory === cat ? 'chip-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Model Chips */}
          {models.length > 2 && (
            <div className="vault-chips-row" style={{ marginTop: '8px' }}>
              <span className="filter-label">
                <Sparkles size={14} /> Model:
              </span>
              {models.map((mod) => (
                <button
                  key={mod}
                  type="button"
                  className={`vault-filter-chip ${selectedModel === mod ? 'chip-active' : ''}`}
                  onClick={() => setSelectedModel(mod)}
                >
                  {mod === 'all' ? 'All Models' : mod}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="vault-count-strip">
          <span>Showing {filteredPrompts.length} of {promptsData.length} prompts</span>
        </div>

        {/* Prompts Grid */}
        <div className="vault-grid">
          {filteredPrompts.length === 0 ? (
            <div className="empty-state">
              <h3>No prompts found</h3>
              <p>Try clearing your search query or choosing another category.</p>
              <button
                type="button"
                className="btn-base btn-secondary btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedModel('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredPrompts.map((item: PromptItem) => {
              const isCopied = copiedId === item.id;
              return (
                <article key={item.id} className="prompt-vault-card">
                  <div className="vault-card-header">
                    <div className="vault-card-title-group">
                      <div className="vault-icon-badge">
                        <Terminal size={16} color="var(--accent)" />
                      </div>
                      <div>
                        <h3 className="vault-card-title">{item.title}</h3>
                        <p className="vault-card-purpose">{item.purpose}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`btn-base btn-sm ${isCopied ? 'btn-copied' : 'btn-primary'}`}
                      onClick={() => handleCopy(item.id, item.promptText, item.title)}
                      aria-label={`Copy ${item.title} prompt`}
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Badges strip */}
                  <div className="vault-card-meta">
                    {item.category && (
                      <span className="badge badge-sm badge-neutral">{item.category}</span>
                    )}
                    {item.targetModel && (
                      <span className="badge badge-sm badge-secondary">
                        <Sparkles size={11} /> {item.targetModel}
                      </span>
                    )}
                    {item.reelRef && (
                      <span className="badge badge-sm badge-neutral link-badge">
                        <span>{item.reelRef}</span>
                        <ExternalLink size={10} />
                      </span>
                    )}
                  </div>

                  {/* Prompt Text */}
                  <div className="vault-code-wrapper">
                    <pre className="vault-pre">
                      <code>{item.promptText}</code>
                    </pre>
                  </div>

                  {/* Variables & Rationale */}
                  <div className="vault-card-footer">
                    <div className="vault-variables">
                      {item.variables?.map((v: string) => (
                        <span key={v} className="variable-pill">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

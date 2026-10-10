import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Plus, CheckCircle2 } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import type { ResourceCategory } from '../types/content';
import { FeedbackModal } from '../components/FeedbackModal';

export const ToolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All');
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const categories: ResourceCategory[] = [
    'All',
    'Local AI & Dev',
    'Deep Reading & Research',
    'Code Architecture',
    'Active Recall & Testing',
  ];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.whyItMatters.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="tools-page-wrapper">
      <div className="container">
        {/* Editorial Header */}
        <div className="page-editorial-header">
          <div className="header-meta">
            <span className="mono-tag">// BUILDER ECOSYSTEM</span>
            <span className="badge badge-neutral">{TOOLS_DATA.length} RESOURCES</span>
          </div>

          <h1 className="page-title display-title">
            Tools for thoughtful work
          </h1>

          <p className="page-lead">
            Independent third-party tools for learning, researching, and building. Review official access requirements before you begin.
          </p>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setFeedbackOpen(true)} className="btn btn-secondary btn-sm">
              <Plus size={14} />
              <span>Propose a Tool for Verification</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="tools-filter-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tools by capability or requirement (e.g. Ollama, offline, spaced repetition)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                Clear
              </button>
            )}
          </div>

          <div className="topic-pills-row">
            <div className="filter-pill-label">
              <Filter size={13} />
              <span>CATEGORY:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`topic-pill ${selectedCategory === cat ? 'topic-pill-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="tools-page-grid">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="tool-card-editorial">
                <div className="tool-card-top flex-between">
                  <span className="badge badge-neutral">{tool.category}</span>
                  <div className="flex-center" style={{ gap: '6px' }}>
                    {tool.verified && (
                      <span className="badge badge-green" title="Official link checked">
                        <CheckCircle2 size={11} />
                        LINK CHECKED
                      </span>
                    )}
                    <span className="badge badge-orange">{tool.pricing}</span>
                  </div>
                </div>

                <div className="tool-card-body">
                  <h3 className="tool-title">{tool.name}</h3>
                  <p className="tool-desc">{tool.description}</p>

                  <div className="tool-meta-block">
                    <span className="mono-tag" style={{ color: 'var(--orange)', fontSize: '0.68rem' }}>
                      WHEN TO USE IT:
                    </span>
                    <p>{tool.whyItMatters}</p>
                  </div>

                  {tool.limitations && (
                    <div className="tool-meta-block limitations-block">
                      <span className="mono-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>
                        HARDWARE / LIMITATIONS:
                      </span>
                      <p>{tool.limitations}</p>
                    </div>
                  )}

                  {tool.reelRef && (
                    <div className="tool-reel-tag">
                      <span className="mono-tag" style={{ color: 'var(--cyan)' }}>
                        FEATURED IN: {tool.reelRef}
                      </span>
                    </div>
                  )}
                </div>

                <div className="tool-card-actions">
                  <a
                    href={tool.url}
                    target={tool.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <span>Launch / Inspect Resource</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <h3>No tools match your query</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Try searching for a different keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '16px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        reelTitle="Tools Directory"
      />
    </div>
  );
};

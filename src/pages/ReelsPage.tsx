import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import { REELS_DATA } from '../data/reelsData';
import type { ReelTopic } from '../types/content';
import { ReelCard } from '../components/ReelCard';

export const ReelsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopic = (searchParams.get('topic') as ReelTopic) || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<ReelTopic>(initialTopic);

  const topics: ReelTopic[] = [
    'All',
    'AI & LLMs',
    'Engineering & CS',
    'Coding Workflows',
    'Builder Mindset'
  ];

  const handleTopicChange = (topic: ReelTopic) => {
    setSelectedTopic(topic);
    if (topic === 'All') {
      searchParams.delete('topic');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ topic });
    }
  };

  const filteredReels = useMemo(() => {
    return REELS_DATA.filter((reel) => {
      const matchesTopic = selectedTopic === 'All' || reel.topic === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        reel.title.toLowerCase().includes(q) ||
        reel.subtitle.toLowerCase().includes(q) ||
        reel.tags.some((t) => t.toLowerCase().includes(q)) ||
        reel.coreThesis.toLowerCase().includes(q);
      return matchesTopic && matchesQuery;
    });
  }, [selectedTopic, searchQuery]);

  return (
    <div className="reels-page-wrapper">
      <div className="container">
        {/* Editorial Header */}
        <div className="page-editorial-header">
          <div className="header-meta">
            <span className="mono-tag" style={{ color: 'var(--orange)' }}>// CONTENT REPOSITORY</span>
            <span className="badge badge-neutral">{REELS_DATA.length} REELS CATALOGUED</span>
          </div>

          <h1 className="page-title display-title">
            THE REELS LIBRARY
          </h1>

          <p className="page-lead">
            Every Instagram Reel connects into an uncompromised resource lab: verified developer tools, Socratic prompts, and cognitive retainment protocols.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="reels-filter-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by topic, tag, or thesis (e.g. Active Recall, Socratic, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Topic Pills */}
          <div className="topic-pills-row">
            <div className="filter-pill-label">
              <Filter size={13} />
              <span>TOPIC:</span>
            </div>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`topic-pill ${selectedTopic === topic ? 'topic-pill-active' : ''}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Reels Grid */}
        {filteredReels.length > 0 ? (
          <div className="editorial-reels-grid">
            {filteredReels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                featured={index === 0 && selectedTopic === 'All' && !searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <BookOpen size={36} color="var(--orange)" />
            <h3 style={{ marginTop: '16px', fontSize: '1.25rem' }}>No Reels found matching your criteria</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '440px' }}>
              We could not find any Reels matching "{searchQuery}". Try searching for terms like "AI", "Active Recall", or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
              }}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '20px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

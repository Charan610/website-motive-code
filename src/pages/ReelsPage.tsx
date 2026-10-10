import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Gauge } from 'lucide-react';
import { REELS_DATA } from '../data/reelsData';
import type { ReelTopic, DifficultyLevel } from '../types/content';
import { ReelCard } from '../components/ReelCard';

export const ReelsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopic = (searchParams.get('topic') as ReelTopic) || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<ReelTopic>(initialTopic);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const topics: ReelTopic[] = [
    'All',
    'AI & LLMs',
    'Engineering & CS',
    'Coding Workflows',
    'Builder Mindset'
  ];

  const difficulties: (string | DifficultyLevel)[] = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced'
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
      const matchesDifficulty =
        selectedDifficulty === 'All' || reel.difficulty === selectedDifficulty;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        reel.title.toLowerCase().includes(q) ||
        reel.subtitle.toLowerCase().includes(q) ||
        reel.tags.some((t) => t.toLowerCase().includes(q)) ||
        reel.coreThesis.toLowerCase().includes(q);

      return matchesTopic && matchesDifficulty && matchesQuery;
    });
  }, [selectedTopic, selectedDifficulty, searchQuery]);

  return (
    <div className="reels-page-wrapper">
      <div className="container">
        {/* Editorial Header */}
        <div className="page-editorial-header">
          <div className="header-meta">
            <span className="mono-tag">// CONTENT REPOSITORY</span>
            <span className="badge badge-neutral">{REELS_DATA.length} REELS CATALOGUED</span>
          </div>

          <h1 className="page-title display-title">
            The Reel library
          </h1>

          <p className="page-lead">
            A short watch. A practical next step. Explore the prompts, tools, and workflows behind each Reel.
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

          {/* Difficulty Filter */}
          <div className="topic-pills-row" style={{ marginTop: '8px' }}>
            <div className="filter-pill-label">
              <Gauge size={13} />
              <span>DIFFICULTY:</span>
            </div>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`topic-pill ${selectedDifficulty === diff ? 'topic-pill-active' : ''}`}
              >
                {diff}
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
                featured={index === 0 && selectedTopic === 'All' && selectedDifficulty === 'All' && !searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <BookOpen size={36} color="var(--accent)" />
            <h3 style={{ marginTop: '16px', fontSize: '1.25rem' }}>No Reels found matching your criteria</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '440px' }}>
              We could not find any Reels matching &ldquo;{searchQuery}&rdquo;. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleTopicChange('All');
                setSelectedDifficulty('All');
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

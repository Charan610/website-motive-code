import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { reelsData } from '../../data/reelsData';
import { toolsData } from '../../data/toolsData';
import { promptsData } from '../../data/promptsData';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyPrompt?: (text: string) => void;
}

interface SearchItem {
  id: string;
  type: 'reel' | 'tool' | 'prompt' | 'nav';
  title: string;
  subtitle: string;
  badge?: string;
  url?: string;
  action?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onCopyPrompt,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable items
  const allItems: SearchItem[] = [
    // Fast Navigation links
    { id: 'nav-reels', type: 'nav', title: 'Browse All Reels', subtitle: 'Explore complete reel library', badge: 'Route', url: '/reels' },
    { id: 'nav-prompts', type: 'nav', title: 'Prompt Vault', subtitle: 'Curated copy-paste engineering prompts', badge: 'Route', url: '/prompts' },
    { id: 'nav-tools', type: 'nav', title: 'Verified Tools Directory', subtitle: 'Inspect all tools used across reels', badge: 'Route', url: '/tools' },
    { id: 'nav-playbooks', type: 'nav', title: 'Active Recall Playbooks', subtitle: 'Spaced repetition flashcards & quizzes', badge: 'Route', url: '/playbooks' },
    // Reels
    ...reelsData.map((r) => ({
      id: `reel-${r.id}`,
      type: 'reel' as const,
      title: r.title,
      subtitle: `${r.topic} · ${r.duration} · ${r.difficulty || 'Intermediate'}`,
      badge: `Reel #${r.number}`,
      url: `/reels/${r.slug}`,
    })),
    // Tools
    ...toolsData.map((t) => ({
      id: `tool-${t.id}`,
      type: 'tool' as const,
      title: t.name,
      subtitle: `${t.category} · ${t.pricing} · ${t.description.slice(0, 60)}...`,
      badge: 'Tool',
      url: '/tools',
    })),
    // Prompts
    ...promptsData.map((p) => ({
      id: `prompt-${p.id}`,
      type: 'prompt' as const,
      title: p.title,
      subtitle: `${p.category || 'Engineering'} · ${p.promptText.slice(0, 70)}...`,
      badge: 'Prompt',
      action: () => {
        if (onCopyPrompt) {
          onCopyPrompt(p.promptText);
        } else {
          navigator.clipboard.writeText(p.promptText);
        }
      },
    })),
  ];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10)
    : allItems.slice(0, 8);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          executeItem(selected);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const executeItem = (item: SearchItem) => {
    onClose();
    if (item.url) {
      navigate(item.url);
    } else if (item.action) {
      item.action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-bar">
          <svg className="cmd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, reel, tool, or prompt... (ESC to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="cmd-esc-badge">ESC</kbd>
        </div>

        <div className="cmd-list" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="cmd-empty">No results found for &ldquo;{query}&rdquo;</div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  className={`cmd-item ${isSelected ? 'cmd-item-selected' : ''}`}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <span className={`cmd-type-dot cmd-type-${item.type}`} />
                    <div className="cmd-item-text">
                      <div className="cmd-item-title">{item.title}</div>
                      <div className="cmd-item-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                  {item.badge && <span className="badge badge-sm badge-neutral">{item.badge}</span>}
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>esc</kbd> to close</span>
          </div>
          <div className="cmd-brand">Motivation Code ⌘K</div>
        </div>
      </div>
    </div>
  );
};

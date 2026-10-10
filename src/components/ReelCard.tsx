import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import type { ReelItem } from '../types/content';

interface ReelCardProps {
  reel: ReelItem;
  featured?: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, featured = false }) => {
  const isAvailable = reel.status === 'AVAILABLE';

  return (
    <article className={`reel-editorial-card ${featured ? 'card-featured' : ''}`}>
      <div className="card-top-bar">
        <div className="reel-number-badge">
          <span className="num-hash">#</span>
          <span className="num-val">{reel.number}</span>
        </div>

        <div className="card-top-meta">
          <span className="badge badge-neutral">
            <Clock size={11} />
            {reel.duration}
          </span>
          <span className={`badge ${isAvailable ? 'badge-orange' : 'badge-neutral'}`}>
            {isAvailable ? 'AVAILABLE NOW' : 'COMING NEXT'}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-category">
          <span className="mono-tag" style={{ color: 'var(--orange)' }}>{reel.topic}</span>
        </div>

        <h3 className="card-title">
          {isAvailable ? (
            <Link to={`/reels/${reel.slug}`}>
              {reel.title}
            </Link>
          ) : (
            reel.title
          )}
        </h3>

        <p className="card-subtitle">{reel.subtitle}</p>

        {featured && (
          <blockquote className="featured-quote">
            "{reel.editorialQuote}"
          </blockquote>
        )}

        <div className="card-tags-list">
          {reel.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-chip">
              #{tag}
            </span>
          ))}
          {reel.hasInteractiveTool && (
            <span className="tag-chip tool-chip">
              <Sparkles size={11} color="var(--cyan)" />
              Interactive Tool
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        {isAvailable ? (
          <Link to={`/reels/${reel.slug}`} className="card-action-link">
            <span>Explore Reel Hub & Resources</span>
            <ArrowUpRight size={16} />
          </Link>
        ) : (
          <div className="card-disabled-text">
            <span>In Production Studio // Available Soon</span>
          </div>
        )}
      </div>
    </article>
  );
};

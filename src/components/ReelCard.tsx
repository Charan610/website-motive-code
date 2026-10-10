import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ReelItem } from '../types/content';
import { isReelCompleted } from '../lib/progressStorage';

interface ReelCardProps {
  reel: ReelItem;
  featured?: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, featured = false }) => {
  const isAvailable = reel.status === 'AVAILABLE';
  const completed = isReelCompleted(reel.id);

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
          {reel.timeToBuild && (
            <span className="badge badge-secondary" title="Estimated build time">
              ⏱ {reel.timeToBuild}
            </span>
          )}
          {reel.difficulty && (
            <span className={`badge ${reel.difficulty === 'Advanced' ? 'badge-accent' : 'badge-neutral'}`}>
              {reel.difficulty}
            </span>
          )}
          {completed && (
            <span className="badge badge-success" title="Completed by you">
              <CheckCircle2 size={11} />
              Done
            </span>
          )}
          <span className={`badge ${isAvailable ? 'badge-orange' : 'badge-neutral'}`}>
            {isAvailable ? 'AVAILABLE NOW' : 'COMING NEXT'}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-category">
          <span className="mono-tag">{reel.topic}</span>
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

        {featured && reel.editorialQuote && (
          <blockquote className="featured-quote">
            &ldquo;{reel.editorialQuote}&rdquo;
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
              <Sparkles size={11} />
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

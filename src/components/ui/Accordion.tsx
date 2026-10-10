import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  subtitle?: string;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`accordion-container ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <div className="accordion-header-text">
                <span className="accordion-title">{item.title}</span>
                {item.subtitle && <span className="accordion-subtitle">{item.subtitle}</span>}
              </div>
              <div className="accordion-trailing">
                {item.badge && <span className="badge badge-sm badge-neutral">{item.badge}</span>}
                <svg
                  className={`accordion-chevron ${isOpen ? 'chevron-rotated' : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="accordion-content">
                <div className="accordion-body">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

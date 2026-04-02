import type { ReactNode } from 'react';

export function EntityHeader({
  eyebrow,
  title,
  description,
  meta,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="entity-header">
      <div className="entity-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-description">{description}</p>
        {meta ? <div className="entity-meta">{meta}</div> : null}
      </div>
      {actions ? <div className="entity-actions">{actions}</div> : null}
    </div>
  );
}

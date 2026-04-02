import type { ReactNode } from 'react';

export function Toolbar({
  title,
  caption,
  actions
}: {
  title: string;
  caption?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="toolbar">
      <div>
        <h2 className="toolbar-title">{title}</h2>
        {caption ? <p className="toolbar-caption">{caption}</p> : null}
      </div>
      {actions ? <div className="toolbar-actions">{actions}</div> : null}
    </div>
  );
}

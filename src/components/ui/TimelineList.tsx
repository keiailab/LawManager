import type { ReactNode } from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  meta?: ReactNode;
}

export function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="timeline-list">
      {items.map((item) => (
        <li key={item.id} className="timeline-list-item">
          <div className="timeline-marker" />
          <div className="timeline-item-copy">
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            {item.meta ? <div className="timeline-item-meta">{item.meta}</div> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

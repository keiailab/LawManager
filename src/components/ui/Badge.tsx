import type { ReactNode } from 'react';

type BadgeTone = 'default' | 'accent' | 'success' | 'warning' | 'danger';

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

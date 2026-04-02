import type { ReactNode } from 'react';

export function StatCard({
  label,
  value,
  detail,
  accent
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  accent?: string;
}) {
  return (
    <article className="stat-card">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      {detail ? <p className="stat-detail" style={accent ? { color: accent } : undefined}>{detail}</p> : null}
    </article>
  );
}

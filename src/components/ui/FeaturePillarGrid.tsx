export interface FeaturePillar {
  title: string;
  summary: string;
}

export function FeaturePillarGrid({ items }: { items: FeaturePillar[] }) {
  return (
    <div className="feature-pillar-grid">
      {items.map((item) => (
        <article key={item.title} className="feature-pillar">
          <p className="feature-pillar-kicker">{item.title}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  );
}

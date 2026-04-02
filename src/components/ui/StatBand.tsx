export interface StatBandItem {
  label: string;
  value: string;
  detail: string;
}

export function StatBand({ items }: { items: StatBandItem[] }) {
  return (
    <section className="stat-band">
      {items.map((item) => (
        <article key={item.label} className="stat-band-item">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
    </section>
  );
}

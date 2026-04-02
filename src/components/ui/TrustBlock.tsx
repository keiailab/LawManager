export function TrustBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="trust-block">
      <div className="trust-copy">
        <p className="eyebrow">Enterprise Trust</p>
        <h2>{title}</h2>
      </div>
      <ul className="trust-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

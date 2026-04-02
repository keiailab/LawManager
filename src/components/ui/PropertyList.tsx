export interface PropertyItem {
  label: string;
  value: string;
}

export function PropertyList({ items }: { items: PropertyItem[] }) {
  return (
    <dl className="property-list">
      {items.map((item) => (
        <div key={item.label} className="property-row">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

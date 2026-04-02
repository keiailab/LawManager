export interface WorkflowStripItem {
  title: string;
  detail: string;
}

export function WorkflowStrip({ items }: { items: WorkflowStripItem[] }) {
  return (
    <section className="workflow-strip">
      {items.map((item, index) => (
        <article key={item.title} className="workflow-strip-item">
          <span className="workflow-step-index">0{index + 1}</span>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </section>
  );
}

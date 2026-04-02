import type { ReactNode } from 'react';

export function SplitWorkspace({
  sidebar,
  main,
  inspector
}: {
  sidebar: ReactNode;
  main: ReactNode;
  inspector?: ReactNode;
}) {
  return (
    <section className="split-workspace">
      <aside className="workspace-pane workspace-pane-sidebar">{sidebar}</aside>
      <div className="workspace-pane workspace-pane-main">{main}</div>
      {inspector ? <aside className="workspace-pane workspace-pane-inspector">{inspector}</aside> : null}
    </section>
  );
}

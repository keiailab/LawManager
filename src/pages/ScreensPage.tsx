import { PageHero } from '../components/PageHero';
import { screenBlueprints } from '../data/site';

export function ScreensPage() {
  return (
    <div className="stack">
      <PageHero
        eyebrow="Screen Blueprint"
        title="핵심 화면 전략"
        description="고객 시연 관점에서 우선순위가 높은 화면을 중심으로, 각 화면이 전달해야 할 메시지와 시연 포인트를 정의합니다."
      />

      <section className="page cards-grid">
        {screenBlueprints.map((screen) => (
          <article key={screen.title} className="info-panel">
            <div className="panel-header">
              <h2>{screen.title}</h2>
              <span className="tag tag-muted">{screen.audience}</span>
            </div>
            <p className="panel-copy">{screen.message}</p>
            <div className="meta-block">
              <strong>시연 포인트</strong>
              <p>{screen.demoPoint}</p>
            </div>
            <div className="meta-block">
              <strong>더미 데이터 전략</strong>
              <p>{screen.dataPlan}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

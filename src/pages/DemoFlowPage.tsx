import { PageHero } from '../components/PageHero';
import { demoSteps } from '../data/site';

export function DemoFlowPage() {
  return (
    <div className="stack">
      <PageHero
        eyebrow="Demo Narrative"
        title="고객 시연 플로우"
        description="고객 앞에서 무엇을 어떤 순서로 보여줘야 가장 설득력이 높은지 단계별 메시지와 연결 화면 중심으로 정리합니다."
      />

      <section className="page timeline">
        {demoSteps.map((step) => (
          <article key={step.label} className="timeline-step">
            <p className="step-label">{step.label}</p>
            <div className="timeline-content">
              <h2>{step.title}</h2>
              <div className="meta-block">
                <strong>연결 화면</strong>
                <p>{step.screen}</p>
              </div>
              <div className="meta-block">
                <strong>전달 가치</strong>
                <p>{step.value}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

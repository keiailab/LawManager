import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { demoSteps } from '../data/site';

export function DemoModePage() {
  return (
    <div className="stack">
      <PageHero
        eyebrow="Demo Guide"
        title="시연 모드"
        description="고객 앞에서 어떤 순서로 어떤 화면을 열어야 하는지 그대로 따라갈 수 있는 시연 전용 가이드입니다."
      />

      <section className="page timeline">
        {demoSteps.map((step) => (
          <article key={step.label} className="timeline-step">
            <p className="step-label">{step.label}</p>
            <div className="timeline-content">
              <h2>{step.title}</h2>
              <p>{step.value}</p>
              <Link className="primary-link small-link" to={step.screen}>
                이 단계 열기
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

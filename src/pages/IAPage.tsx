import { PageHero } from '../components/PageHero';
import { iaSections } from '../data/site';

export function IAPage() {
  return (
    <div className="stack">
      <PageHero
        eyebrow="IA Structure"
        title="전체 시스템 IA"
        description="전체 시스템의 메뉴 구조를 사용자 영역과 관리자 영역으로 나누고, 이번 프로토타입 범위와 향후 확장 범위를 함께 표시합니다."
      />

      <section className="page ia-grid">
        {iaSections.map((section) => (
          <article key={section.title} className="info-panel">
            <div className="panel-header">
              <h2>{section.title}</h2>
              <span className={`tag ${section.type === '프로토타입 범위' ? 'tag-accent' : 'tag-muted'}`}>
                {section.type}
              </span>
            </div>
            <ul className="plain-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

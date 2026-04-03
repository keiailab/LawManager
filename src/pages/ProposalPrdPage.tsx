import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { proposalPrdComparePoints, proposalPrdVersions } from '../data/site';

export function ProposalPrdPage() {
  const [activeVersionId, setActiveVersionId] = useState<(typeof proposalPrdVersions)[number]['id']>('v1');
  const activeVersion = proposalPrdVersions.find((item) => item.id === activeVersionId) ?? proposalPrdVersions[0];

  return (
    <div className="stack">
      <PageHero
        eyebrow="Product Requirements Document"
        title="PRD 두 버전 보기"
        description="같은 프로젝트를 실행 관점과 설계 해석 관점으로 나눠 읽을 수 있게 두 개의 PRD 버전으로 정리했습니다."
      >
        <div className="prd-hero-grid">
          {proposalPrdVersions.map((version) => (
            <button
              key={version.id}
              type="button"
              className={`prd-version-card${version.id === activeVersionId ? ' is-active' : ''}`}
              aria-pressed={version.id === activeVersionId}
              onClick={() => setActiveVersionId(version.id)}
            >
              <span className="prd-version-label">{version.label}</span>
              <span className="prd-version-mode">{version.mode}</span>
              <strong>{version.title}</strong>
              <p>{version.summary}</p>
            </button>
          ))}
        </div>
      </PageHero>

      <div className="prd-layout">
        <aside className="prd-side-rail">
          <section className="page prd-rail-card">
            <div className="prd-rail-header">
              <p className="eyebrow">{activeVersion.mode}</p>
              <h3>{activeVersion.title}</h3>
              <p className="panel-description">{activeVersion.summary}</p>
            </div>

            <div className="prd-meta-grid">
              <article className="prd-meta-card">
                <span>추천 독자</span>
                <strong>{activeVersion.audience}</strong>
                <p>{activeVersion.intent}</p>
              </article>
              <article className="prd-meta-card">
                <span>권장 사용 시점</span>
                <strong>{activeVersion.timing}</strong>
                <p>{activeVersion.primaryDeliverable}</p>
              </article>
              <article className="prd-meta-card">
                <span>기준 문서</span>
                <strong>{activeVersion.sourceTitle}</strong>
                <p>{activeVersion.sourceDescription}</p>
              </article>
            </div>
          </section>

          <section className="page prd-rail-card">
            <div className="panel-copy-group">
              <p className="eyebrow">Reading Outline</p>
              <h2>문서 읽는 순서</h2>
            </div>

            <div className="prd-outline-list">
              {activeVersion.sections.map((section, index) => (
                <article key={section.heading} className="prd-outline-item">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{section.heading}</strong>
                    <p>{section.body[0]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>

        <section className="page prd-document-shell">
          <div className="prd-document-header">
            <div>
              <p className="eyebrow">{activeVersion.label}</p>
              <h2>{activeVersion.title}</h2>
              <p className="panel-description">{activeVersion.intent}</p>
            </div>
            <div className="prd-emphasis-block">
              <span>핵심 초점</span>
              <div className="prd-emphasis-list">
                {activeVersion.emphasis.map((item) => (
                  <span key={item} className="tag tag-accent">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prd-highlight-strip">
            {activeVersion.highlights.map((item) => (
              <article key={item} className="prd-highlight-card">
                <span className="material-symbols-outlined" aria-hidden="true">
                  subdirectory_arrow_right
                </span>
                <p>{item}</p>
              </article>
            ))}
          </div>

          <div className="prd-section-grid">
            {activeVersion.sections.map((section) => (
              <article key={section.heading} className="prd-section-card">
                <div className="prd-section-heading">
                  <span>{section.heading}</span>
                  <strong>{activeVersion.label}</strong>
                </div>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="page">
        <div className="panel-top">
          <div className="panel-copy-group">
            <p className="eyebrow">Version Compare</p>
            <h2>두 버전이 보는 관점 차이</h2>
            <p className="panel-description">
              하나는 구현 순서를, 다른 하나는 설득 논리와 UX 방향을 정리합니다. 둘을 함께 봐야 제안서와 실행이
              분리되지 않습니다.
            </p>
          </div>
        </div>

        <div className="prd-compare-grid">
          {proposalPrdComparePoints.map((point) => (
            <article key={point.label} className="prd-compare-card">
              <strong>{point.label}</strong>
              <div className="prd-compare-columns">
                <div>
                  <span className="prd-compare-version">Version 1</span>
                  <p>{point.v1}</p>
                </div>
                <div>
                  <span className="prd-compare-version">Version 2</span>
                  <p>{point.v2}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

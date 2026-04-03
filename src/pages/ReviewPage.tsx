import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { getContractDetail, rerunReview } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ReviewRiskLevel } from '../types';

function getRiskTone(level: ReviewRiskLevel) {
  if (level === '고위험') {
    return 'danger';
  }

  if (level === '확인 필요') {
    return 'warning';
  }

  return 'accent';
}

function getClauseStateClass(level: ReviewRiskLevel | 'neutral') {
  if (level === '고위험') {
    return 'is-danger';
  }

  if (level === '확인 필요') {
    return 'is-warning';
  }

  if (level === '권고') {
    return 'is-accent';
  }

  return 'is-neutral';
}

export function ReviewPage() {
  const { contractId = '' } = useParams();
  useDemoSnapshot();
  const detail = getContractDetail(contractId);

  if (!detail) {
    return null;
  }

  const criticalCount = detail.clauseReviews.filter((item) => item.riskLevel === '고위험').length;
  const warningCount = detail.clauseReviews.filter((item) => item.riskLevel === '확인 필요').length;
  const safeCount = Math.max(12 - criticalCount - warningCount, 1);

  const scoreCards = [
    { label: '치명', value: criticalCount, caption: '치명적 위험 항목', tone: 'danger' as const },
    { label: '주의', value: warningCount, caption: '주의 요망 항목', tone: 'warning' as const },
    { label: '안정', value: safeCount, caption: '표준 준수 항목', tone: 'success' as const }
  ];

  const reviewChecklist = [
    {
      label: '플레이북 기준 로드 완료',
      status: Boolean(detail.review),
      note: detail.review ? `생성 시각 ${detail.review.generatedAt}` : '기준 연결이 아직 없습니다.'
    },
    {
      label: '메타데이터 검수 완료',
      status: detail.extraction?.isConfirmed ?? false,
      note: detail.extraction ? `${detail.extraction.contractType} · ${detail.extraction.parties.join(' / ')}` : '추출값 검수가 남아 있습니다.'
    },
    {
      label: '결재 플로우 연결',
      status: Boolean(detail.approvalFlow),
      note: detail.approvalFlow
        ? `${detail.approvalFlow.name} · 현재 ${detail.approvalInstance?.currentStepOrder ?? 0}단계`
        : '아직 연결된 결재 플로우가 없습니다.'
    }
  ];

  const documentSections = [
    {
      title: '검토 개요',
      level: 'neutral' as const,
      body: `${detail.contract.summary} 현재 계약 상대방은 ${detail.contract.counterparty}이며 담당자는 ${detail.contract.ownerName}입니다.`,
      recommendation: detail.review?.summary ?? '플레이북 기준과 조항별 리스크를 기반으로 문구를 재정렬합니다.'
    },
    ...detail.clauseReviews.map((item) => ({
      title: item.clauseTitle,
      level: item.riskLevel,
      body: item.finding,
      recommendation: item.recommendedText
    })),
    {
      title: '운영 메모',
      level: 'neutral' as const,
      body: detail.document?.rawTextPreview ?? '원문 미리보기가 없습니다.',
      recommendation: detail.approvalFlow
        ? `${detail.approvalFlow.name}에 연결되면 검토 결과가 승인 단계까지 이어집니다.`
        : '계약 허브에서 승인 플로우와 활동 이력을 추가 확인할 수 있습니다.'
    }
  ];

  return (
    <div className="review-reference-layout">
      <section className="review-reference-shell">
        <div className="review-reference-doc-panel">
          <div className="review-paper">
            <header className="review-paper-header">
              <div className="review-paper-title-block">
                <p className="review-paper-eyebrow">AI 검토</p>
                <h1>{detail.contract.title}</h1>
                <p className="review-paper-subtitle">
                  {detail.contract.type} · {detail.contract.counterparty} · {detail.review?.generatedAt ?? detail.contract.uploadedAt}
                </p>
              </div>
            </header>

            <div className="review-paper-body">
              {documentSections.map((section) => (
                <section
                  key={section.title}
                  className={`review-paper-section ${getClauseStateClass(section.level)}`}
                >
                  <div className="review-paper-section-head">
                    <h2>{section.title}</h2>
                    {section.level !== 'neutral' ? (
                      <div className="review-paper-section-state">
                        <span aria-hidden="true" className="material-symbols-outlined">
                          {section.level === '고위험' ? 'warning' : section.level === '확인 필요' ? 'error' : 'verified'}
                        </span>
                        <Badge tone={getRiskTone(section.level)}>{section.level}</Badge>
                      </div>
                    ) : null}
                  </div>
                  <p>{section.body}</p>
                  <div className="review-paper-recommendation">
                    <span>권고 문안</span>
                    <p>{section.recommendation}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        <aside className="review-reference-analysis">
          <div className="review-reference-actions">
            <Link className="secondary-button review-reference-link" to={`/contracts/${detail.contract.id}`}>
              계약 상세 정보
            </Link>
            <button type="button" className="secondary-button review-reference-link" onClick={() => rerunReview(contractId)}>
              다시 생성
            </button>
          </div>

          <div className="review-score-grid">
            {scoreCards.map((card) => (
              <article key={card.label} className={`review-score-card review-score-card-${card.tone}`}>
                <p>{card.label}</p>
                <strong>{String(card.value).padStart(2, '0')}</strong>
                <span>{card.caption}</span>
              </article>
            ))}
          </div>

          <section className="review-analysis-card">
            <div className="review-analysis-head">
              <h2>상세 위험 분석</h2>
              <span>총 {detail.clauseReviews.length}건 감지</span>
            </div>
            <div className="review-issue-list">
              {detail.clauseReviews.map((item) => (
                <article key={item.id} className="review-issue-item">
                  <div className="review-issue-top">
                    <h3>{item.clauseTitle}</h3>
                    <Badge tone={getRiskTone(item.riskLevel)}>{item.riskLevel}</Badge>
                  </div>
                  <p>{item.finding}</p>
                  <p className="review-issue-recommendation">{item.recommendedText}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="review-analysis-card">
            <div className="review-analysis-head">
              <h2>내부 가이드라인 준수 현황</h2>
              <span>체크리스트 동기화</span>
            </div>
            <ul className="review-checklist">
              {reviewChecklist.map((item) => (
                <li key={item.label} className="review-checklist-item">
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.note}</p>
                  </div>
                  <span className={`review-check-indicator${item.status ? ' is-pass' : ' is-fail'}`}>
                    <span aria-hidden="true" className="material-symbols-outlined">
                      {item.status ? 'check_circle' : 'cancel'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="review-action-area">
            <button type="button" className="primary-button review-cta-button" onClick={() => rerunReview(contractId)}>
              <span aria-hidden="true" className="material-symbols-outlined">
                auto_awesome
              </span>
              AI 수정 제안 생성하기
            </button>
            <p>
              AI의 분석은 법률 자문을 대체하지 않습니다. 다만 시연에서는 플레이북 기준과 승인 구조가 연결된
              운영 감각을 가장 빠르게 전달할 수 있습니다.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

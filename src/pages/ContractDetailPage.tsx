import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { getContractDetail } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ReviewRiskLevel } from '../types';

const lifecycleSteps = [
  { key: 'draft', label: 'Drafting' },
  { key: 'review', label: 'Internal Review' },
  { key: 'legal', label: 'Legal Approval' },
  { key: 'execute', label: 'Execution' },
  { key: 'archive', label: 'Archived' }
];

function getRiskTone(level: ReviewRiskLevel) {
  if (level === '고위험') {
    return 'danger';
  }

  if (level === '확인 필요') {
    return 'warning';
  }

  return 'accent';
}

function getReviewBadgeTone(status: string) {
  if (status === '리스크 검토 필요') {
    return 'danger';
  }

  if (status === '결재 대기') {
    return 'warning';
  }

  return 'accent';
}

function getRiskScore(status: string) {
  switch (status) {
    case '리스크 검토 필요':
      return 84;
    case '검토중':
      return 58;
    case '결재 대기':
      return 41;
    case '승인 완료':
      return 16;
    default:
      return 12;
  }
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0))
    .join('')
    .toUpperCase();
}

export function ContractDetailPage() {
  const { contractId = '' } = useParams();
  useDemoSnapshot();
  const detail = getContractDetail(contractId);

  if (!detail) {
    return (
      <section className="page">
        <h1>계약을 찾을 수 없습니다.</h1>
      </section>
    );
  }

  const currentStep = Math.min(Math.max(detail.approvalInstance?.currentStepOrder ?? 2, 1), lifecycleSteps.length);
  const riskScore = getRiskScore(detail.contract.status);
  const participants = [detail.contract.ownerName, detail.contract.counterparty, ...(detail.extraction?.parties ?? [])]
    .filter((value, index, list) => list.indexOf(value) === index)
    .slice(0, 4);
  const versionItems = [
    { version: 'v3.2', label: 'Current review build', meta: detail.review?.generatedAt ?? detail.contract.uploadedAt },
    { version: 'v3.1', label: 'Metadata aligned', meta: detail.contract.uploadedAt },
    { version: 'v3.0', label: 'Original draft uploaded', meta: detail.contract.uploadedAt }
  ];

  return (
    <div className="contract-hub-page">
      <section className="contract-hub-header">
        <div className="contract-hub-copy">
          <div className="contract-hub-meta-row">
            <Badge tone={getReviewBadgeTone(detail.contract.status)}>Active Review</Badge>
            <span>최종 수정 {detail.review?.generatedAt ?? detail.contract.uploadedAt}</span>
          </div>
          <p className="contract-hub-eyebrow">Contract Hub Pro</p>
          <h1>{detail.contract.title}</h1>
          <p>
            계약 메타데이터, AI 리스크, 승인 흐름, 최근 활동을 하나의 허브에서 이어보는 Stitch 기준
            상세 화면입니다.
          </p>
        </div>

        <div className="contract-hub-actions">
          <button type="button" className="contract-hub-secondary-action">
            <span aria-hidden="true" className="material-symbols-outlined">
              picture_as_pdf
            </span>
            <span>Original PDF</span>
          </button>
          <button type="button" className="contract-hub-secondary-action">
            <span aria-hidden="true" className="material-symbols-outlined">
              edit_note
            </span>
            <span>Edit Metadata</span>
          </button>
          <Link className="contract-hub-primary-action" to={`/reviews/${detail.contract.id}`}>
            <span aria-hidden="true" className="material-symbols-outlined">
              bolt
            </span>
            <span>Run Risk Analysis</span>
          </Link>
        </div>
      </section>

      <div className="contract-hub-tab-strip" role="tablist" aria-label="계약 상세 탭">
        <button type="button" className="contract-hub-tab is-active">
          개요 (Overview)
        </button>
        <button type="button" className="contract-hub-tab">
          AI 분석 (AI Insights)
        </button>
        <button type="button" className="contract-hub-tab">
          워크플로우 (Workflow)
        </button>
        <button type="button" className="contract-hub-tab">
          활동 (Activity)
        </button>
        <button type="button" className="contract-hub-tab">
          버전 (Versions)
        </button>
      </div>

      <div className="contract-hub-grid">
        <aside className="contract-hub-sidebar">
          <section className="contract-hub-card">
            <p className="contract-hub-section-label">Contract Metadata</p>
            <div className="contract-hub-metadata-list">
              <div className="contract-hub-metadata-item">
                <span>Vendor</span>
                <strong>{detail.contract.counterparty}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>Total Contract Value</span>
                <strong>{detail.extraction?.amount ?? detail.contract.amount}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>Effective Dates</span>
                <strong>{detail.contract.period}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>Contract Type</span>
                <strong>{detail.contract.type}</strong>
              </div>
            </div>

            <div className="contract-hub-contact-list">
              <span>Key Contacts</span>
              <div className="contract-hub-contact-stack">
                {participants.map((item) => (
                  <div key={item} className="contract-hub-contact-chip" title={item}>
                    {getInitials(item)}
                  </div>
                ))}
              </div>
            </div>

            <div className="contract-hub-clause-block">
              <span>Key Clauses</span>
              <ul>
                {(detail.extraction?.keyClauses ?? []).map((clause) => (
                  <li key={clause}>{clause}</li>
                ))}
              </ul>
            </div>
          </section>
        </aside>

        <div className="contract-hub-main">
          <section className="contract-hub-card contract-hub-stepper-card">
            <div className="contract-hub-stepper">
              {lifecycleSteps.map((step, index) => {
                const order = index + 1;
                const isCompleted = order < currentStep;
                const isCurrent = order === currentStep;

                return (
                  <div key={step.key} className={`contract-hub-step${isCompleted ? ' is-complete' : ''}${isCurrent ? ' is-current' : ''}`}>
                    <div className="contract-hub-step-dot">
                      {isCompleted ? (
                        <span aria-hidden="true" className="material-symbols-outlined">
                          check
                        </span>
                      ) : (
                        order
                      )}
                    </div>
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="contract-hub-panel-grid">
            <section className="contract-hub-card contract-hub-risk-summary-card">
              <div className="contract-hub-card-head">
                <h2>AI Risk Summary</h2>
                <span>View All {detail.clauseReviews.length} Insights</span>
              </div>
              <div className="contract-hub-risk-score">
                <strong>{riskScore}%</strong>
                <p>{detail.review?.summary ?? '플레이북 기준 분석이 아직 연결되지 않았습니다.'}</p>
              </div>
              <div className="contract-hub-risk-list">
                {detail.clauseReviews.map((item) => (
                  <article key={item.id} className={`contract-hub-risk-item is-${item.riskLevel === '고위험' ? 'danger' : item.riskLevel === '확인 필요' ? 'warning' : 'accent'}`}>
                    <div className="contract-hub-risk-item-head">
                      <strong>{item.clauseTitle}</strong>
                      <Badge tone={getRiskTone(item.riskLevel)}>{item.riskLevel}</Badge>
                    </div>
                    <p>{item.finding}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="contract-hub-card">
              <div className="contract-hub-card-head">
                <h2>Recent Activity</h2>
                <span>실시간 작업 로그</span>
              </div>
              <div className="contract-hub-activity-list">
                {detail.activities.map((item) => (
                  <article key={item.id} className="contract-hub-activity-item">
                    <div className="contract-hub-activity-marker" aria-hidden="true" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                      <span>{item.createdAt}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="contract-hub-panel-grid contract-hub-panel-grid-secondary">
            <section className="contract-hub-card">
              <div className="contract-hub-card-head">
                <h2>Clause Variance & Review</h2>
                <span>Metadata + Review</span>
              </div>
              <div className="contract-hub-review-table">
                {detail.clauseReviews.map((item) => (
                  <div key={item.id} className="contract-hub-review-row">
                    <div>
                      <strong>{item.clauseTitle}</strong>
                      <p>{item.finding}</p>
                    </div>
                    <div className="contract-hub-review-row-side">
                      <Badge tone={getRiskTone(item.riskLevel)}>{item.riskLevel}</Badge>
                      <p>{item.recommendedText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="contract-hub-card">
              <div className="contract-hub-card-head">
                <h2>Versions & Workflow Notes</h2>
                <span>Approval + Versions</span>
              </div>
              <div className="contract-hub-version-list">
                {versionItems.map((item) => (
                  <article key={item.version} className="contract-hub-version-item">
                    <strong>{item.version}</strong>
                    <p>{item.label}</p>
                    <span>{item.meta}</span>
                  </article>
                ))}
              </div>
              <div className="contract-hub-flow-note">
                <span aria-hidden="true" className="material-symbols-outlined">
                  info
                </span>
                <p>
                  {detail.approvalFlow?.name ?? '기본 승인 플로우'}에 연결되어 있으며 현재{' '}
                  {detail.approvalInstance?.currentStepOrder ?? 1}단계에서 검토가 진행 중입니다.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

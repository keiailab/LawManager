import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { getContractDetail } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ReviewRiskLevel } from '../types';

const lifecycleSteps = [
  { key: 'draft', label: '초안 작성' },
  { key: 'review', label: '내부 검토' },
  { key: 'legal', label: '법무 승인' },
  { key: 'execute', label: '체결 진행' },
  { key: 'archive', label: '보관 완료' }
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
    { version: 'v3.2', label: '현재 검토본', meta: detail.review?.generatedAt ?? detail.contract.uploadedAt },
    { version: 'v3.1', label: '메타데이터 정합화', meta: detail.contract.uploadedAt },
    { version: 'v3.0', label: '원본 초안 업로드', meta: detail.contract.uploadedAt }
  ];

  return (
    <div className="contract-hub-page">
      <section className="contract-hub-header">
        <div className="contract-hub-copy">
          <div className="contract-hub-meta-row">
            <Badge tone={getReviewBadgeTone(detail.contract.status)}>검토 진행중</Badge>
            <span>최종 수정 {detail.review?.generatedAt ?? detail.contract.uploadedAt}</span>
          </div>
          <p className="contract-hub-eyebrow">계약 상세 허브</p>
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
            <span>원본 PDF</span>
          </button>
          <button type="button" className="contract-hub-secondary-action">
            <span aria-hidden="true" className="material-symbols-outlined">
              edit_note
            </span>
            <span>메타데이터 수정</span>
          </button>
          <Link className="contract-hub-primary-action" to={`/reviews/${detail.contract.id}`}>
            <span aria-hidden="true" className="material-symbols-outlined">
              bolt
            </span>
            <span>AI 리스크 분석</span>
          </Link>
        </div>
      </section>

      <div className="contract-hub-tab-strip" role="tablist" aria-label="계약 상세 탭">
        <button type="button" className="contract-hub-tab is-active">개요</button>
        <button type="button" className="contract-hub-tab">AI 분석</button>
        <button type="button" className="contract-hub-tab">워크플로우</button>
        <button type="button" className="contract-hub-tab">활동</button>
        <button type="button" className="contract-hub-tab">버전</button>
      </div>

      <div className="contract-hub-grid">
        <aside className="contract-hub-sidebar">
          <section className="contract-hub-card">
            <p className="contract-hub-section-label">계약 메타데이터</p>
            <div className="contract-hub-metadata-list">
              <div className="contract-hub-metadata-item">
                <span>거래 상대방</span>
                <strong>{detail.contract.counterparty}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>계약 금액</span>
                <strong>{detail.extraction?.amount ?? detail.contract.amount}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>계약 기간</span>
                <strong>{detail.contract.period}</strong>
              </div>
              <div className="contract-hub-metadata-item">
                <span>계약 유형</span>
                <strong>{detail.contract.type}</strong>
              </div>
            </div>

            <div className="contract-hub-contact-list">
              <span>주요 참여자</span>
              <div className="contract-hub-contact-stack">
                {participants.map((item) => (
                  <div key={item} className="contract-hub-contact-chip" title={item}>
                    {getInitials(item)}
                  </div>
                ))}
              </div>
            </div>

            <div className="contract-hub-clause-block">
              <span>핵심 조항</span>
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
                <h2>AI 리스크 요약</h2>
                <span>전체 {detail.clauseReviews.length}건 보기</span>
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
                <h2>최근 활동</h2>
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
                <h2>조항 편차 및 검토</h2>
                <span>메타데이터 + 검토</span>
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
                <h2>버전 및 워크플로우 노트</h2>
                <span>승인 + 버전</span>
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

import { Link } from 'react-router-dom';
import { getDashboardSnapshot, listActivities, listContracts, setSelectedCompany } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ActivityItem, ContractRecord } from '../types';

const contractPriority: Record<ContractRecord['status'], number> = {
  '리스크 검토 필요': 0,
  검토중: 1,
  '결재 대기': 2,
  초안: 3,
  '승인 완료': 4
};

const quickTemplates = [
  { icon: 'handshake', label: '비밀유지 계약서' },
  { icon: 'shopping_cart', label: '구매 표준 계약서' },
  { icon: 'work', label: '용역 표준 계약서' },
  { icon: 'folder_copy', label: '기타 양식' }
];

function getOwnerInitial(name: string) {
  return name.trim().charAt(0);
}

function getAiResult(contract: ContractRecord) {
  switch (contract.status) {
    case '리스크 검토 필요':
      return { label: '리스크 탐지', tone: 'danger' as const };
    case '검토중':
      return { label: '조항 주의', tone: 'warning' as const };
    case '결재 대기':
      return { label: '승인 대기', tone: 'accent' as const };
    case '승인 완료':
      return { label: '양호', tone: 'success' as const };
    default:
      return { label: '초안', tone: 'muted' as const };
  }
}

function getStatusSignal(contract: ContractRecord) {
  switch (contract.status) {
    case '리스크 검토 필요':
      return { label: '즉시 검토', tone: 'danger' as const };
    case '검토중':
      return { label: '진행중', tone: 'info' as const };
    case '결재 대기':
      return { label: '결재 대기', tone: 'warning' as const };
    case '승인 완료':
      return { label: '승인 완료', tone: 'success' as const };
    default:
      return { label: '초안', tone: 'muted' as const };
  }
}

function getActivityTone(activity: ActivityItem) {
  if (activity.title.includes('리스크') || activity.description.includes('고위험')) {
    return 'danger' as const;
  }

  if (activity.title.includes('결재') || activity.title.includes('승인')) {
    return 'muted' as const;
  }

  return 'accent' as const;
}

function getDeadline(period: string) {
  return period.split(' ~ ')[1] ?? period;
}

export function DashboardPage() {
  useDemoSnapshot();
  const snapshot = getDashboardSnapshot();
  const activities = listActivities().slice(0, 3);
  const priorityContracts = [...listContracts()]
    .sort((left, right) => contractPriority[left.status] - contractPriority[right.status])
    .slice(0, 3);

  const metricCards = [
    {
      label: '총 계약 수',
      value: snapshot.metrics.totalContracts,
      tone: 'slate',
      icon: 'folder_managed',
      detail: `${snapshot.selectedCompany.sector} 포트폴리오`,
      trend: '운영 전체 계약'
    },
    {
      label: '리스크 계약',
      value: snapshot.metrics.riskyContracts,
      tone: 'danger',
      icon: 'gpp_maybe',
      detail: '즉시 검토 필요',
      trend: snapshot.metrics.riskyContracts > 0 ? '고위험 조항 감지' : '리스크 안정'
    },
    {
      label: '결재 대기',
      value: snapshot.metrics.pendingApprovals,
      tone: 'accent',
      icon: 'pending_actions',
      detail: '승인 큐 누적 건수',
      trend: '병렬 승인 흐름 포함'
    },
    {
      label: '최근 활동',
      value: snapshot.metrics.recentActivities,
      tone: 'success',
      icon: 'timeline',
      detail: '최근 48시간 기준',
      trend: '운영 이벤트 스트림'
    }
  ];

  const topRiskContract = priorityContracts.find((contract) => contract.status === '리스크 검토 필요') ?? priorityContracts[0] ?? null;
  const recurringIssue =
    snapshot.selectedCompany.id === 'holding'
      ? '비밀정보 활용 범위와 역설계 제한 문구가 최근 검토안에서 반복적으로 충돌하고 있습니다.'
      : '단가 조정 기준과 납기 SLA 정합성이 공급계약 검토에서 가장 자주 보완되고 있습니다.';

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero-block">
        <div className="dashboard-hero-copy">
          <p className="dashboard-overline">법무 운영 인사이트</p>
          <h1>법무 운영 대시보드</h1>
          <p className="dashboard-hero-description">
            회사와 권한에 따라 운영 KPI, 우선 검토 계약, 결재 정체 구간, 최근 활동이 즉시 재구성되는 제품형
            화면입니다.
          </p>
        </div>

        <div className="dashboard-hero-actions">
          <button type="button" className="dashboard-ghost-button">
            보고서 추출
          </button>
          <button type="button" className="dashboard-primary-button">
            데이터 동기화
          </button>
        </div>
      </section>

      <section className="dashboard-command-surface">
        <label className="dashboard-company-field">
          <span>시연 회사 선택</span>
          <select
            aria-label="시연 회사 선택"
            value={snapshot.selectedCompany.id}
            onChange={(event) => {
              void setSelectedCompany(event.target.value);
            }}
          >
            <option value="holding">한결지주</option>
            <option value="retail">한결리테일</option>
          </select>
        </label>

        <div className="dashboard-context-card">
          <span>현재 워크스페이스</span>
          <strong>{snapshot.selectedCompany.name}</strong>
          <p>
            {snapshot.selectedCompany.sector} · {snapshot.selectedCompany.userRole}
          </p>
        </div>

        <div className="dashboard-context-card">
          <span>운영 기준 포커스</span>
          <strong>정책 기준, 승인 흐름, 리스크 계약 우선순위</strong>
          <p>단일 AI 기능보다 운영 통제 구조가 먼저 읽히도록 정보 밀도를 조정했습니다.</p>
        </div>
      </section>

      <section className="dashboard-metrics">
        {metricCards.map((card) => (
          <article key={card.label} className={`dashboard-metric-card is-${card.tone}`}>
            <div className="dashboard-metric-top">
              <div>
                <span className="dashboard-metric-label">{card.label}</span>
                <strong className="dashboard-metric-value">{card.value}</strong>
              </div>
              <span aria-hidden="true" className="material-symbols-outlined dashboard-metric-icon">
                {card.icon}
              </span>
            </div>
            <p className="dashboard-metric-detail">{card.detail}</p>
            <p className="dashboard-metric-trend">{card.trend}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main-column">
          <section className="dashboard-surface">
            <div className="dashboard-surface-head">
              <div>
                <p className="dashboard-surface-eyebrow">우선순위 큐</p>
                <h2>우선 검토 과제</h2>
                <p>현재 회사 기준으로 검토 또는 결재가 정체된 계약을 먼저 보여줍니다.</p>
              </div>
              <Link className="dashboard-surface-link" to="/contracts">
                전체 계약 보기
              </Link>
            </div>

            <div className="dashboard-table-wrap">
              <table className="dashboard-priority-table">
                <thead>
                  <tr>
                    <th>계약명</th>
                    <th>유형</th>
                    <th>담당자</th>
                    <th>AI 결과</th>
                    <th>상태</th>
                    <th>기한</th>
                  </tr>
                </thead>
                <tbody>
                  {priorityContracts.map((contract) => {
                    const aiResult = getAiResult(contract);
                    const status = getStatusSignal(contract);

                    return (
                      <tr key={contract.id}>
                        <td>
                          <Link className="dashboard-contract-link" to={`/contracts/${contract.id}`}>
                            {contract.title}
                          </Link>
                          <span className="dashboard-contract-id">
                            {contract.id.toUpperCase()} · {contract.counterparty}
                          </span>
                        </td>
                        <td className="dashboard-table-copy">{contract.type}</td>
                        <td>
                          <div className="dashboard-owner">
                            <span className="dashboard-owner-badge" aria-hidden="true">
                              {getOwnerInitial(contract.ownerName)}
                            </span>
                            <span className="dashboard-table-copy">{contract.ownerName}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`dashboard-pill is-${aiResult.tone}`}>{aiResult.label}</span>
                        </td>
                        <td>
                          <span className={`dashboard-status-signal is-${status.tone}`}>
                            <span className="dashboard-status-dot" aria-hidden="true" />
                            {status.label}
                          </span>
                        </td>
                        <td className="dashboard-deadline">{getDeadline(contract.period)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-surface">
            <div className="dashboard-surface-head">
              <div>
                <p className="dashboard-surface-eyebrow">활동 스트림</p>
                <h2>최근 활동 기록</h2>
                <p>업로드, AI 리뷰, 결재 진행 상황을 타임라인으로 이어서 보여줍니다.</p>
              </div>
              <Link className="dashboard-surface-link" to="/demo">
                시연 모드
              </Link>
            </div>

            <div className="dashboard-activity-list">
              {activities.map((activity) => (
                <article key={activity.id} className="dashboard-activity-item">
                  <span className={`dashboard-activity-marker is-${getActivityTone(activity)}`} aria-hidden="true" />
                  <div className="dashboard-activity-copy">
                    <p>
                      <strong>{activity.title}</strong> {activity.description}
                    </p>
                    <span>{activity.createdAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="dashboard-side-column">
          <section className="dashboard-ai-panel">
            <div className="dashboard-ai-header">
              <span aria-hidden="true" className="material-symbols-outlined">
                psychology
              </span>
              <h2>AI 리스크 인사이트</h2>
            </div>

            {topRiskContract ? (
              <article className="dashboard-ai-card">
                <p className="dashboard-ai-kicker">최우선 리스크</p>
                <h3>{topRiskContract.title}</h3>
                <p>{topRiskContract.summary}</p>
                <div className="dashboard-ai-meta">
                  <span className="dashboard-ai-tone">위험도: 상</span>
                  <Link className="dashboard-ai-link" to={`/contracts/${topRiskContract.id}`}>
                    계약 상세 보기
                  </Link>
                </div>
              </article>
            ) : null}

            <article className="dashboard-ai-card">
              <p className="dashboard-ai-kicker is-warning">반복 검토 이슈</p>
              <h3>반복되는 검토 패턴</h3>
              <p>{recurringIssue}</p>
            </article>

            <Link className="dashboard-ai-action" to="/admin/playbooks">
              <div>
                <span>AI 추천 액션</span>
                <strong>표준 계약 문구 업데이트</strong>
              </div>
              <span aria-hidden="true" className="material-symbols-outlined">
                arrow_forward
              </span>
            </Link>
          </section>

          <section className="dashboard-surface dashboard-template-panel">
            <div className="dashboard-surface-head">
              <div>
                <p className="dashboard-surface-eyebrow">빠른 실행</p>
                <h2>자주 사용하는 템플릿</h2>
              </div>
            </div>

            <div className="dashboard-template-grid">
              {quickTemplates.map((template) => (
                <button key={template.label} type="button" className="dashboard-template-button">
                  <span aria-hidden="true" className="material-symbols-outlined">
                    {template.icon}
                  </span>
                  <span>{template.label}</span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

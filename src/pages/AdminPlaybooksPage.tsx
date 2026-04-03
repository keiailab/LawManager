import { useMemo, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { getDashboardSnapshot, listApprovalFlows, listOrgData, listPlaybooks, updatePlaybook } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

function getRoleTitle(role: string) {
  switch (role) {
    case '법무 총괄 관리자':
      return 'System Administrator';
    case '계약 운영 책임자':
      return 'Legal Counsel Senior';
    default:
      return 'Approval Controller';
  }
}

function getAccessLevel(role: string) {
  switch (role) {
    case '법무 총괄 관리자':
      return 'FULL_ACCESS';
    case '계약 운영 책임자':
      return 'READ_WRITE';
    default:
      return 'RESTRICTED';
  }
}

function getAccessTone(role: string) {
  switch (role) {
    case '법무 총괄 관리자':
      return 'accent';
    case '계약 운영 책임자':
      return 'default';
    default:
      return 'warning';
  }
}

export function AdminPlaybooksPage() {
  useDemoSnapshot();
  const snapshot = getDashboardSnapshot();
  const playbooks = listPlaybooks();
  const flows = listApprovalFlows();
  const { orgUnits, memberships, users } = listOrgData();
  const initial = useMemo(() => playbooks[0], [playbooks]);
  const [selectedId, setSelectedId] = useState<string>('');
  const selected = playbooks.find((item) => item.id === (selectedId || initial?.id)) ?? initial;
  const [form, setForm] = useState({
    forbiddenPhrase: selected?.forbiddenPhrase ?? '',
    riskRule: selected?.riskRule ?? '',
    recommendation: selected?.recommendation ?? ''
  });

  if (!selected) {
    return null;
  }

  const highlightedFlow = flows[0];
  const policySummary = [
    { label: '2단계 인증 (2FA)', value: '활성화됨' },
    { label: 'IP 접근 제한', value: snapshot.selectedCompany.id === 'holding' ? '제한망 적용' : '지점 정책 적용' },
    { label: '데이터 보존 기간', value: '5년' },
    { label: '고위험 자동 격상', value: '80점 이상 추가 승인' }
  ];
  const governanceLogs = [
    {
      time: '2026-04-03 14:22',
      actor: 'Administrator',
      type: '권한변경',
      detail: `'${snapshot.selectedCompany.name}' 조직의 법무 총괄 관리자 권한이 최신 정책 세트와 동기화되었습니다.`
    },
    {
      time: '2026-04-03 11:05',
      actor: 'System',
      type: '보안경고',
      detail: `외부 네트워크에서 '${selected.contractType}' 플레이북 편집 시도가 감지되어 관리자 검토 대기 상태로 전환되었습니다.`
    },
    {
      time: '2026-04-02 17:45',
      actor: '김지우 팀장',
      type: '워크플로우',
      detail: `${highlightedFlow?.flow.name ?? '표준 승인 플로우'}에 AI 자동 검토 단계를 유지하고 최종 승인 조건을 재검토했습니다.`
    }
  ];

  return (
    <div className="governance-page">
      <section className="governance-header">
        <div className="governance-copy">
          <p className="governance-eyebrow">Governance & Settings</p>
          <h1>거버넌스 설정</h1>
          <p>
            조직 권한 체계, 정책 버전, 승인 워크플로우, 보안 규칙을 하나의 관리자 허브에서 조정하는
            Stitch 기준 화면입니다.
          </p>
        </div>

        <div className="governance-actions">
          <button type="button" className="governance-secondary-button">
            권한 검토
          </button>
          <button type="button" className="governance-primary-button">
            정책 게시
          </button>
        </div>
      </section>

      <div className="governance-overview-grid">
        <section className="governance-card">
          <div className="governance-card-head">
            <h2>조직 및 운영 컨텍스트</h2>
            <Badge tone="accent">{snapshot.selectedCompany.name}</Badge>
          </div>
          <div className="governance-org-list">
            {orgUnits.map((unit) => (
              <article key={unit.id} className={`governance-org-item${unit.parentId ? ' is-child' : ''}`}>
                <strong>{unit.name}</strong>
                <span>{unit.leadName}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="governance-card">
          <div className="governance-card-head">
            <h2>보안 정책 요약</h2>
            <span>Policy Snapshot</span>
          </div>
          <div className="governance-policy-list">
            {policySummary.map((item) => (
              <div key={item.label} className="governance-policy-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="governance-card">
        <div className="governance-card-head">
          <div className="governance-card-headline">
            <h2>사용자 권한 체계</h2>
            <div className="governance-pill-row">
              <span className="governance-count-pill">전체 {memberships.length}</span>
              <span className="governance-count-pill is-accent">
                Admin {memberships.filter((item) => item.role === '법무 총괄 관리자').length}
              </span>
            </div>
          </div>
          <span>Roles & Permissions</span>
        </div>

        <div className="governance-table-wrap">
          <table className="governance-role-table">
            <thead>
              <tr>
                <th>역할 이름</th>
                <th>부서</th>
                <th>액세스 수준</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership) => {
                const user = users.find((item) => item.id === membership.userId);
                const orgUnit = orgUnits.find((item) => item.id === membership.orgUnitId);

                return (
                  <tr key={membership.id}>
                    <td>
                      <strong>{getRoleTitle(membership.role)}</strong>
                      <p>{user?.name ?? '사용자'} · {membership.role}</p>
                    </td>
                    <td>{orgUnit?.name ?? '-'}</td>
                    <td>
                      <Badge tone={getAccessTone(membership.role)}>{getAccessLevel(membership.role)}</Badge>
                    </td>
                    <td>
                      <span className="governance-status-indicator" aria-hidden="true" />
                      활성
                    </td>
                    <td>
                      <button type="button" className="governance-inline-button">
                        권한 편집
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="governance-card governance-workflow-card">
        <div className="governance-card-head">
          <h2>계약서 승인 워크플로우</h2>
          <span>{highlightedFlow?.flow.name ?? '표준 결재 플로우'}</span>
        </div>
        <div className="governance-workflow-track">
          {(highlightedFlow?.steps ?? []).map((step) => (
            <div key={step.id} className="governance-workflow-step">
              <div className="governance-workflow-icon">
                <span aria-hidden="true" className="material-symbols-outlined">
                  {step.order === 1 ? 'edit_note' : step.order === 2 ? 'psychology' : step.parallel ? 'hub' : 'verified_user'}
                </span>
              </div>
              <strong>Step {step.order}</strong>
              <p>{step.name}</p>
              <span>{step.role}</span>
            </div>
          ))}
        </div>
        <div className="governance-workflow-note">
          <span aria-hidden="true" className="material-symbols-outlined">
            info
          </span>
          <p>
            10억원 이상 계약 또는 AI 리스크 80점 이상인 경우 법무 총괄 승인 단계가 자동으로 활성화됩니다.
          </p>
        </div>
      </section>

      <div className="governance-bottom-grid">
        <section className="governance-card governance-editor-card">
          <div className="governance-card-head">
            <h2>정책 버전 및 리뷰 규칙</h2>
            <Badge tone="accent">{selected.version}</Badge>
          </div>

          <label className="governance-form-field">
            <span>계약 유형</span>
            <select
              value={selected.id}
              onChange={(event) => {
                const next = playbooks.find((item) => item.id === event.target.value);
                if (!next) {
                  return;
                }

                setSelectedId(next.id);
                setForm({
                  forbiddenPhrase: next.forbiddenPhrase,
                  riskRule: next.riskRule,
                  recommendation: next.recommendation
                });
              }}
            >
              {playbooks.map((playbook) => (
                <option key={playbook.id} value={playbook.id}>
                  {playbook.contractType}
                </option>
              ))}
            </select>
          </label>

          <label className="governance-form-field">
            <span>금지 문구</span>
            <textarea value={form.forbiddenPhrase} onChange={(event) => setForm({ ...form, forbiddenPhrase: event.target.value })} />
          </label>

          <label className="governance-form-field">
            <span>리스크 판단 기준</span>
            <textarea value={form.riskRule} onChange={(event) => setForm({ ...form, riskRule: event.target.value })} />
          </label>

          <label className="governance-form-field">
            <span>수정 권고 문구</span>
            <textarea value={form.recommendation} onChange={(event) => setForm({ ...form, recommendation: event.target.value })} />
          </label>

          <button
            type="button"
            className="governance-primary-button"
            onClick={() => updatePlaybook(selected.id, form)}
          >
            리뷰 기준 저장
          </button>
        </section>

        <section className="governance-card">
          <div className="governance-card-head">
            <h2>최근 거버넌스 변경 이력</h2>
            <span>Global Activity Log</span>
          </div>
          <div className="governance-log-list">
            {governanceLogs.map((item) => (
              <article key={`${item.time}-${item.actor}`} className="governance-log-item">
                <div className="governance-log-meta">
                  <span>{item.time}</span>
                  <strong>{item.actor}</strong>
                  <Badge tone={item.type === '보안경고' ? 'danger' : item.type === '권한변경' ? 'accent' : 'warning'}>
                    {item.type}
                  </Badge>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

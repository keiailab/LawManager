import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Panel } from '../components/ui/Panel';
import { StatCard } from '../components/ui/StatCard';
import { FormField } from '../components/ui/FormField';
import { Badge } from '../components/ui/Badge';
import { DataTable, type DataTableColumn } from '../components/ui/DataTable';
import { Toolbar } from '../components/ui/Toolbar';
import { getDashboardSnapshot, listActivities, listContracts, setSelectedCompany } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ActivityItem, ContractRecord } from '../types';

export function DashboardPage() {
  useDemoSnapshot();
  const snapshot = getDashboardSnapshot();
  const activities = listActivities().slice(0, 4);
  const riskyContracts = listContracts().filter((contract) => contract.status !== '승인 완료').slice(0, 3);
  const contractColumns: DataTableColumn<ContractRecord>[] = [
    {
      key: 'title',
      header: '계약',
      cell: (contract) => (
        <div>
          <strong>{contract.title}</strong>
          <p className="cell-note">{contract.counterparty}</p>
        </div>
      )
    },
    {
      key: 'status',
      header: '상태',
      cell: (contract) => (
        <Badge tone={contract.status === '리스크 검토 필요' ? 'danger' : contract.status === '결재 대기' ? 'warning' : 'default'}>
          {contract.status}
        </Badge>
      )
    },
    { key: 'owner', header: '담당자', cell: (contract) => contract.ownerName }
  ];
  const activityColumns: DataTableColumn<ActivityItem>[] = [
    { key: 'title', header: '활동', cell: (activity) => activity.title },
    { key: 'description', header: '내용', cell: (activity) => activity.description },
    { key: 'createdAt', header: '시각', cell: (activity) => activity.createdAt }
  ];

  return (
    <div className="stack">
      <PageHero
        eyebrow="Enterprise Demo"
        title="법무 운영 대시보드"
        description="회사와 권한에 따라 운영 KPI, 리스크 계약, 결재 대기, 최근 활동이 달라지는 구조를 제품형 화면으로 시연합니다."
      >
        <div className="control-row">
          <FormField label="시연 회사 선택">
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
          </FormField>
          <div className="selection-meta">
            <strong>{snapshot.selectedCompany.name}</strong>
            <p>
              {snapshot.selectedCompany.sector} · {snapshot.selectedCompany.userRole}
            </p>
          </div>
        </div>

        <div className="kpi-grid">
          <StatCard label="총 계약 수" value={snapshot.metrics.totalContracts} detail="활성 포트폴리오 기준" />
          <StatCard label="리스크 계약" value={snapshot.metrics.riskyContracts} detail="즉시 검토 필요" accent="#f2b85d" />
          <StatCard label="결재 대기" value={snapshot.metrics.pendingApprovals} detail="승인 큐 누적 건수" />
          <StatCard label="최근 활동" value={snapshot.metrics.recentActivities} detail="최근 48시간 기준" />
        </div>
      </PageHero>

      <section className="page cards-grid">
        <Panel title="리스크 계약" description="현재 회사 기준 검토 또는 결재가 필요한 계약" action={<Link className="text-link" to="/contracts">전체 계약 보기</Link>}>
          <Toolbar title="우선 확인 계약" caption="리스크/결재 정체 상태를 한 번에 확인합니다." />
          <DataTable columns={contractColumns} rows={riskyContracts} getRowKey={(contract) => contract.id} emptyTitle="리스크 계약이 없습니다." />
        </Panel>
        <Panel title="최근 활동" description="승인/리뷰/업로드 흐름에서 최근 발생한 액션" action={<Link className="text-link" to="/demo">시연 모드</Link>}>
          <Toolbar title="최근 이벤트" caption="업로드, AI 리뷰, 결재 흐름을 시계열로 추적합니다." />
          <DataTable columns={activityColumns} rows={activities} getRowKey={(activity) => activity.id} emptyTitle="최근 활동이 없습니다." />
        </Panel>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Badge } from '../components/ui/Badge';
import { DataTable, type DataTableColumn } from '../components/ui/DataTable';
import { Panel } from '../components/ui/Panel';
import { PropertyList } from '../components/ui/PropertyList';
import { SplitWorkspace } from '../components/ui/SplitWorkspace';
import { Toolbar } from '../components/ui/Toolbar';
import { listContracts } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ContractRecord } from '../types';
import { useState } from 'react';

export function ContractsPage() {
  useDemoSnapshot();
  const contracts = listContracts();
  const [selectedId, setSelectedId] = useState<string>(contracts[0]?.id ?? '');
  const selectedContract = contracts.find((contract) => contract.id === selectedId) ?? contracts[0] ?? null;
  const columns: DataTableColumn<ContractRecord>[] = [
    {
      key: 'title',
      header: '계약명',
      cell: (contract) => (
        <button type="button" className="table-link-button" onClick={() => setSelectedId(contract.id)}>
          <strong>{contract.title}</strong>
          <p className="cell-note">{contract.counterparty}</p>
        </button>
      )
    },
    { key: 'type', header: '유형', cell: (contract) => contract.type },
    {
      key: 'status',
      header: '상태',
      cell: (contract) => (
        <Badge tone={contract.status === '리스크 검토 필요' ? 'danger' : contract.status === '결재 대기' ? 'warning' : 'default'}>
          {contract.status}
        </Badge>
      )
    },
    { key: 'owner', header: '담당자', cell: (contract) => contract.ownerName },
    {
      key: 'action',
      header: '작업',
      cell: (contract) => (
        <Link className="text-link" to={`/contracts/${contract.id}`}>
          상세 보기
        </Link>
      )
    }
  ];

  return (
    <div className="stack">
      <PageHero
        eyebrow="Contract Hub"
        title="계약 허브"
        description="업로드, 목록 조회, 상세 허브 이동까지 하나의 흐름으로 연결되는 계약 중심 화면입니다."
      >
        <div className="control-row">
          <Link className="primary-link" to="/contracts/new">
            계약서 업로드
          </Link>
        </div>
      </PageHero>

      <SplitWorkspace
        sidebar={
          <Panel title="계약 목록" description="저장된 뷰와 필터를 기준으로 계약을 탐색합니다.">
            <Toolbar title="계약 테이블" caption="계약 선택 시 우측에 상세 미리보기가 열립니다." />
            <DataTable
              columns={columns}
              rows={contracts}
              getRowKey={(contract) => contract.id}
              emptyTitle="현재 회사에 등록된 계약이 없습니다."
            />
          </Panel>
        }
        main={
          selectedContract ? (
            <Panel
              title={selectedContract.title}
              description={`${selectedContract.type} · ${selectedContract.status}`}
              action={
                <Link className="primary-link" to={`/contracts/${selectedContract.id}`}>
                  상세 보기
                </Link>
              }
            >
              <PropertyList
                items={[
                  { label: '상대방', value: selectedContract.counterparty },
                  { label: '담당자', value: selectedContract.ownerName },
                  { label: '기간', value: selectedContract.period },
                  { label: '금액', value: selectedContract.amount }
                ]}
              />
              <p className="panel-description">{selectedContract.summary}</p>
            </Panel>
          ) : null
        }
      />
    </div>
  );
}

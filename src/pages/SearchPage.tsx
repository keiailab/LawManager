import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Badge } from '../components/ui/Badge';
import { DataTable, type DataTableColumn } from '../components/ui/DataTable';
import { FormField } from '../components/ui/FormField';
import { Panel } from '../components/ui/Panel';
import { PropertyList } from '../components/ui/PropertyList';
import { SplitWorkspace } from '../components/ui/SplitWorkspace';
import { Toolbar } from '../components/ui/Toolbar';
import { searchContracts } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { SearchResult } from '../types';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('');
  useDemoSnapshot();
  const results = searchContracts(submittedQuery);
  const selected = results.find((result) => result.contract.id === selectedId) ?? results[0] ?? null;
  const columns: DataTableColumn<SearchResult>[] = [
    {
      key: 'title',
      header: '계약',
      cell: (result) => (
        <button type="button" className="table-link-button" onClick={() => setSelectedId(result.contract.id)}>
          <Link className="text-link" to={`/contracts/${result.contract.id}`}>
            {result.contract.title}
          </Link>
          <p className="cell-note">{result.contract.counterparty}</p>
        </button>
      )
    },
    {
      key: 'status',
      header: '상태',
      cell: (result) => <Badge tone={result.contract.status === '결재 대기' ? 'warning' : 'default'}>{result.contract.status}</Badge>
    },
    { key: 'reason', header: '매칭 이유', cell: (result) => result.reason }
  ];

  return (
    <div className="stack">
      <PageHero
        eyebrow="Natural Language Search"
        title="자연어 계약 검색"
        description="회사, 계약 유형, 상태, 담당자 맥락이 들어간 질의를 로컬 더미 데이터로 해석해 검색 결과를 제공합니다."
      />

      <section className="page form-panel">
        <FormField label="자연어 검색 질의" description="회사, 상태, 계약 유형, 상대방을 섞어 입력할 수 있습니다.">
          <input
            aria-label="자연어 검색 질의"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 한결리테일 결재 대기 공급계약"
          />
        </FormField>
        <button type="button" className="primary-button" onClick={() => setSubmittedQuery(query)}>
          검색 실행
        </button>
      </section>

      <SplitWorkspace
        sidebar={
          <Panel title="검색 결과" description="자연어 질의를 구조화 결과로 변환합니다.">
            <Toolbar title="검색 결과" actions={<Badge tone="default">{results.length}건</Badge>} />
            <DataTable columns={columns} rows={results} getRowKey={(result) => result.contract.id} emptyTitle="조건에 맞는 계약이 없습니다." />
          </Panel>
        }
        main={
          selected ? (
            <Panel title="선택 계약 요약" description="검색 결과 중 현재 선택된 계약의 요약 정보">
              <PropertyList
                items={[
                  { label: '계약명', value: selected.contract.title },
                  { label: '유형', value: selected.contract.type },
                  { label: '상태', value: selected.contract.status },
                  { label: '상대방', value: selected.contract.counterparty }
                ]}
              />
            </Panel>
          ) : (
            <Panel title="선택 계약 요약" description="검색 결과가 없으면 이 영역은 비어 있습니다.">
              <p className="panel-description">검색 질의를 입력하면 선택된 계약의 요약 정보가 여기에 표시됩니다.</p>
            </Panel>
          )
        }
        inspector={
          selected ? (
            <Panel title="결과 미리보기" description="선택한 계약의 핵심 속성">
              <PropertyList
                items={[
                  { label: '계약명', value: selected.contract.title },
                  { label: '상태', value: selected.contract.status },
                  { label: '유형', value: selected.contract.type },
                  { label: '담당자', value: selected.contract.ownerName }
                ]}
              />
              <p className="panel-description">{selected.reason}</p>
            </Panel>
          ) : null
        }
      />
    </div>
  );
}

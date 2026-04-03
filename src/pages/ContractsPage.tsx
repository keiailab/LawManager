import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listContracts } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';
import type { ContractRecord, ContractStatus, ContractType } from '../types';

type RiskTier = 'high' | 'medium' | 'low';

const statusOptions: Array<{ id: 'all' | ContractStatus; label: string }> = [
  { id: 'all', label: '전체' },
  { id: '검토중', label: '검토중' },
  { id: '결재 대기', label: '승인대기' },
  { id: '승인 완료', label: '완료' }
];

const riskLabels: Array<{ id: RiskTier; label: string }> = [
  { id: 'high', label: '고' },
  { id: 'medium', label: '중' },
  { id: 'low', label: '저' }
];

function getRiskMeta(contract: ContractRecord) {
  switch (contract.status) {
    case '리스크 검토 필요':
      return { tier: 'high' as const, label: 'CRITICAL', score: 84 };
    case '검토중':
      return { tier: 'medium' as const, label: 'WARNING', score: 58 };
    case '결재 대기':
      return { tier: 'low' as const, label: 'CAUTION', score: 42 };
    case '승인 완료':
      return { tier: 'low' as const, label: 'SAFE', score: 12 };
    default:
      return { tier: 'low' as const, label: 'DRAFT', score: 8 };
  }
}

function getStageCount(contract: ContractRecord) {
  switch (contract.status) {
    case '리스크 검토 필요':
    case '검토중':
      return 1;
    case '결재 대기':
      return 2;
    case '승인 완료':
      return 3;
    default:
      return 1;
  }
}

function getStatusTone(contract: ContractRecord) {
  switch (contract.status) {
    case '리스크 검토 필요':
    case '검토중':
      return 'warning';
    case '결재 대기':
      return 'info';
    case '승인 완료':
      return 'success';
    default:
      return 'muted';
  }
}

function getRiskTier(contract: ContractRecord): RiskTier {
  return getRiskMeta(contract).tier;
}

function getTypeLabel(type: ContractType) {
  if (type === 'NDA') {
    return 'NDA';
  }

  if (type === '공급계약') {
    return '구매';
  }

  return '용역';
}

export function ContractsPage() {
  useDemoSnapshot();
  const contracts = listContracts();
  const [typeFilter, setTypeFilter] = useState<'all' | ContractType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ContractStatus>('all');
  const [riskFilters, setRiskFilters] = useState<Record<RiskTier, boolean>>({
    high: false,
    medium: false,
    low: false
  });

  const visibleContracts = useMemo(() => {
    const enabledRiskFilters = Object.entries(riskFilters)
      .filter(([, enabled]) => enabled)
      .map(([risk]) => risk as RiskTier);

    return contracts.filter((contract) => {
      if (typeFilter !== 'all' && contract.type !== typeFilter) {
        return false;
      }

      if (statusFilter !== 'all' && contract.status !== statusFilter) {
        return false;
      }

      if (enabledRiskFilters.length > 0 && !enabledRiskFilters.includes(getRiskTier(contract))) {
        return false;
      }

      return true;
    });
  }, [contracts, riskFilters, statusFilter, typeFilter]);

  return (
    <div className="contracts-page">
      <section className="contracts-page-header">
        <div className="contracts-page-copy">
          <p className="contracts-page-eyebrow">Contract Repo Azure</p>
          <h1>계약 관리</h1>
          <p>총 {visibleContracts.length}건의 계약 정보가 현재 조건에 맞게 표시됩니다.</p>
        </div>

        <Link className="contracts-primary-action" to="/contracts/new">
          <span aria-hidden="true" className="material-symbols-outlined">
            add
          </span>
          <span>신규 계약 등록</span>
        </Link>
      </section>

      <section className="contracts-filter-bar">
        <label className="contracts-filter-group">
          <span>계약 유형</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as 'all' | ContractType)}>
            <option value="all">전체 유형</option>
            <option value="NDA">NDA</option>
            <option value="공급계약">구매</option>
            <option value="용역계약">용역</option>
          </select>
        </label>

        <div className="contracts-filter-group">
          <span>상태</span>
          <div className="contracts-status-filter">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`contracts-status-chip${statusFilter === option.id ? ' is-active' : ''}`}
                onClick={() => setStatusFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="contracts-filter-group">
          <span>AI 위험도</span>
          <div className="contracts-risk-filter">
            {riskLabels.map((risk) => (
              <label key={risk.id} className="contracts-risk-option">
                <input
                  type="checkbox"
                  checked={riskFilters[risk.id]}
                  onChange={() =>
                    setRiskFilters((current) => ({
                      ...current,
                      [risk.id]: !current[risk.id]
                    }))
                  }
                />
                <span>{risk.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="contracts-filter-reset"
          onClick={() => {
            setTypeFilter('all');
            setStatusFilter('all');
            setRiskFilters({ high: false, medium: false, low: false });
          }}
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            restart_alt
          </span>
          <span>필터 초기화</span>
        </button>
      </section>

      <section className="contracts-ledger-shell">
        <div className="contracts-ledger-wrap">
          <table className="contracts-ledger-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>계약명</th>
                <th>상대방</th>
                <th>유형</th>
                <th>업데이트 일시</th>
                <th>AI 리스크</th>
                <th>상태</th>
                <th>승인 단계</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {visibleContracts.map((contract) => {
                const risk = getRiskMeta(contract);
                const stageCount = getStageCount(contract);

                return (
                  <tr key={contract.id}>
                    <td className="contracts-ledger-id">#{contract.id.toUpperCase()}</td>
                    <td className="contracts-ledger-title">{contract.title}</td>
                    <td className="contracts-ledger-copy">{contract.counterparty}</td>
                    <td>
                      <span className="contracts-type-chip">{getTypeLabel(contract.type)}</span>
                    </td>
                    <td className="contracts-ledger-copy">{contract.uploadedAt}</td>
                    <td className="contracts-ledger-risk">
                      <span className={`contracts-risk-badge is-${risk.tier}`}>
                        {risk.label} ({risk.score}%)
                      </span>
                    </td>
                    <td>
                      <span className={`contracts-status-badge is-${getStatusTone(contract)}`}>
                        <span className="contracts-status-dot" aria-hidden="true" />
                        {contract.status}
                      </span>
                    </td>
                    <td>
                      <div className="contracts-stage-track" aria-label={`${stageCount} of 3`}>
                        {[1, 2, 3].map((step) => (
                          <span
                            key={step}
                            className={`contracts-stage-segment${step <= stageCount ? ' is-filled' : ''}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="contracts-row-actions">
                        <Link to={`/contracts/${contract.id}`}>보기</Link>
                        <Link to={`/reviews/${contract.id}`}>AI 분석</Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

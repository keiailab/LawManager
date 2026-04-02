import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Badge } from '../components/ui/Badge';
import { EntityHeader } from '../components/ui/EntityHeader';
import { Panel } from '../components/ui/Panel';
import { PropertyList } from '../components/ui/PropertyList';
import { SplitWorkspace } from '../components/ui/SplitWorkspace';
import { TimelineList } from '../components/ui/TimelineList';
import { getContractDetail } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

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

  return (
    <div className="stack">
      <section className="page">
        <EntityHeader
          eyebrow="Contract Detail"
          title={detail.contract.title}
          description="원문, 메타데이터, AI 리뷰, 결재 이력, 활동 이력을 한 화면에서 연결하는 허브 화면입니다."
          meta={<Badge tone={detail.contract.status === '리스크 검토 필요' ? 'danger' : detail.contract.status === '결재 대기' ? 'warning' : 'default'}>{detail.contract.status}</Badge>}
          actions={
            <Link className="primary-link" to={`/reviews/${detail.contract.id}`}>
              AI 리뷰 결과 보기
            </Link>
          }
        />
        <div className="control-row">
          <Badge tone="default">{detail.contract.type}</Badge>
          <Badge tone="accent">{detail.contract.ownerName}</Badge>
        </div>
      </section>

      <SplitWorkspace
        sidebar={
          <Panel title="조항별 리스크" description="플레이북 기준으로 평가된 조항별 이슈">
            <ul className="plain-list">
              {detail.clauseReviews.map((item) => (
                <li key={item.id}>
                  <strong>{item.clauseTitle}</strong>
                  <p>{item.riskLevel} · {item.finding}</p>
                </li>
              ))}
            </ul>
          </Panel>
        }
        main={
          <div className="stack">
            <Panel title="원문 문서" description="검토 대상 문서의 원문 미리보기">
              <pre className="doc-preview">{detail.document?.rawTextPreview}</pre>
            </Panel>
            <Panel title="메타데이터" description="추출 및 보정된 계약 기본 정보">
              <PropertyList
                items={[
                  { label: '계약 유형', value: detail.extraction?.contractType ?? '-' },
                  { label: '당사자', value: detail.extraction?.parties.join(' / ') ?? '-' },
                  { label: '기간', value: `${detail.extraction?.periodStart ?? '-'} ~ ${detail.extraction?.periodEnd ?? '-'}` },
                  { label: '금액', value: detail.extraction?.amount ?? '-' }
                ]}
              />
            </Panel>
          </div>
        }
        inspector={
          <div className="stack">
            <Panel title="AI 리뷰 요약" description="현재 플레이북 기준으로 생성된 리뷰 결과">
              <p>{detail.review?.summary ?? '리뷰 결과가 아직 없습니다.'}</p>
              <ul className="plain-list">
                {detail.clauseReviews.map((item) => (
                  <li key={item.id}>
                    <strong>{item.clauseTitle}</strong>
                    <p>{item.recommendedText}</p>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="결재 이력" description="현재 적용된 결재 플로우와 단계 상태">
              <p>
                {detail.approvalFlow?.name} · 현재 단계 {detail.approvalInstance?.currentStepOrder ?? '-'}
              </p>
              <TimelineList
                items={detail.activities.map((item) => ({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  meta: item.createdAt
                }))}
              />
            </Panel>
          </div>
        }
      />
    </div>
  );
}

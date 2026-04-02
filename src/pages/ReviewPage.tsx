import { useParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { getContractDetail, rerunReview } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function ReviewPage() {
  const { contractId = '' } = useParams();
  useDemoSnapshot();
  const detail = getContractDetail(contractId);

  if (!detail) {
    return null;
  }

  return (
    <div className="stack">
      <PageHero
        eyebrow="AI Review"
        title="AI 리뷰 결과"
        description="플레이북 기준과 조항별 리스크, 수정 권고 문안을 시연하는 결과 화면입니다."
      >
        <div className="control-row">
          <button type="button" className="primary-button" onClick={() => rerunReview(contractId)}>
            리뷰 다시 생성
          </button>
        </div>
      </PageHero>

      <section className="page cards-grid">
        <article className="info-panel">
          <h2>리뷰 요약</h2>
          <p>{detail.review?.summary}</p>
        </article>
        <article className="info-panel">
          <h2>조항별 리스크</h2>
          <ul className="plain-list">
            {detail.clauseReviews.map((item) => (
              <li key={item.id}>
                <strong>{item.clauseTitle}</strong>
                <p>{item.riskLevel} · {item.finding}</p>
                <p>{item.recommendedText}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

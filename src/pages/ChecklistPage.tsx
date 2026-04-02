import { PageHero } from '../components/PageHero';
import { getChecklistItemsFromDb, resetDemoDatabase, updateChecklistStatus } from '../db/demoDb';
import { useDemoSeed } from '../hooks/useDemoSeed';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function ChecklistPage() {
  useDemoSeed();
  useDemoSnapshot();
  const checklistItems = getChecklistItemsFromDb();

  return (
    <div className="stack">
      <PageHero
        eyebrow="Requirement Tracker"
        title="요청서 요구사항 체크리스트"
        description="제작요청서의 핵심 내용을 누락 없이 관리하기 위해 모든 요구사항을 카테고리, 상태, 반영 위치, 시연 방식 기준으로 추적합니다."
      >
        <div className="control-row">
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              void resetDemoDatabase();
            }}
          >
            데모 데이터 초기화
          </button>
        </div>
      </PageHero>

      <section className="page table-page">
        <table className="checklist-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>상태</th>
              <th>반영 위치</th>
              <th>시연 방식</th>
            </tr>
          </thead>
          <tbody>
            {checklistItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title}</strong>
                  <p className="cell-note">
                    {item.category} · {item.source}
                  </p>
                </td>
                <td>
                  <select
                    aria-label={`${item.title} 상태`}
                    value={item.status}
                    onChange={(event) => {
                      void updateChecklistStatus(item.id, event.target.value as typeof item.status);
                    }}
                  >
                    <option value="반영 완료">반영 완료</option>
                    <option value="반영 예정">반영 예정</option>
                    <option value="제외 범위">제외 범위</option>
                    <option value="제안 필요">제안 필요</option>
                  </select>
                </td>
                <td>{item.page}</td>
                <td>{item.demoMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

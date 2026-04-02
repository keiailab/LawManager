import { PageHero } from '../components/PageHero';
import { Panel } from '../components/ui/Panel';
import { listOrgData, updateMembershipRole } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function AdminOrgPage() {
  useDemoSnapshot();
  const { orgUnits, memberships, users } = listOrgData();

  return (
    <div className="stack">
      <PageHero
        eyebrow="Org & Access"
        title="조직도 및 권한 관리"
        description="회사별 조직 트리와 역할 매핑을 편집하면서, 동일 사용자가 회사별로 다른 권한을 갖는 구조를 시연합니다."
      />

      <section className="page cards-grid">
        <Panel title="조직 트리" description="회사 기준으로 표시되는 조직 구조">
          <ul className="plain-list">
            {orgUnits.map((unit) => (
              <li key={unit.id}>
                <strong>{unit.name}</strong>
                <p>{unit.leadName}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="회사별 역할 매핑" description="동일 사용자의 회사별 권한을 별도로 운영">
          <ul className="plain-list">
            {memberships.map((membership) => {
              const user = users.find((item) => item.id === membership.userId);
              return (
                <li key={membership.id}>
                  <strong>{user?.name}</strong>
                  <div className="inline-field">
                    <select
                      value={membership.role}
                      onChange={(event) => updateMembershipRole(membership.id, event.target.value as typeof membership.role)}
                    >
                      <option value="법무 총괄 관리자">법무 총괄 관리자</option>
                      <option value="계약 운영 책임자">계약 운영 책임자</option>
                      <option value="결재 승인자">결재 승인자</option>
                    </select>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </section>
    </div>
  );
}

import { beforeEach, describe, expect, it } from 'vitest';
import {
  closeDemoDb,
  ensureDemoSeeded,
  getChecklistItemsFromDb,
  getDashboardSnapshot,
  resetDemoDatabase,
  setSelectedCompany,
  updateChecklistStatus
} from './demoDb';

describe('demoDb', () => {
  beforeEach(async () => {
    await resetDemoDatabase();
  });

  it('초기 시드 후 회사별 대시보드 스냅샷을 제공한다', async () => {
    await ensureDemoSeeded();

    const snapshot = await getDashboardSnapshot();

    expect(snapshot.selectedCompany.name).toBe('한결지주');
    expect(snapshot.metrics.totalContracts).toBeGreaterThan(0);
    expect(snapshot.metrics.pendingApprovals).toBeGreaterThan(0);
  });

  it('회사 선택 변경이 저장되고 스냅샷에 반영된다', async () => {
    await setSelectedCompany('retail');

    const snapshot = await getDashboardSnapshot();

    expect(snapshot.selectedCompany.id).toBe('retail');
    expect(snapshot.selectedCompany.name).toBe('한결리테일');
  });

  it('체크리스트 상태 변경이 영속화된다', async () => {
    const [firstItem] = await getChecklistItemsFromDb();

    await updateChecklistStatus(firstItem.id, '제안 필요');

    const refreshed = await getChecklistItemsFromDb();
    const updated = refreshed.find((item) => item.id === firstItem.id);

    expect(updated?.status).toBe('제안 필요');
  });

  it('DB를 닫아도 다시 시드 가능하다', async () => {
    closeDemoDb();
    await resetDemoDatabase();

    const items = await getChecklistItemsFromDb();

    expect(items.length).toBeGreaterThan(20);
  });
});

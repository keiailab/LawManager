import { describe, expect, it } from 'vitest';
import { checklistItems } from './checklist';

describe('checklistItems', () => {
  it('제작요청서의 핵심 기능과 IA 요구사항을 모두 포함한다', () => {
    expect(checklistItems.length).toBeGreaterThanOrEqual(30);

    expect(checklistItems.some((item) => item.title.includes('조직도 및 권한 관리'))).toBe(true);
    expect(checklistItems.some((item) => item.title.includes('결재 프로세스 빌더'))).toBe(true);
    expect(checklistItems.some((item) => item.title.includes('체크리스트 / 플레이북 관리'))).toBe(true);
    expect(checklistItems.some((item) => item.title.includes('계약서 업로드 및 AI 메타데이터 추출'))).toBe(true);
    expect(checklistItems.some((item) => item.title.includes('자연어 계약 검색'))).toBe(true);
    expect(checklistItems.some((item) => item.title.includes('전체 시스템 IA'))).toBe(true);
  });

  it('각 항목은 시연 반영 위치와 상태를 가진다', () => {
    expect(checklistItems.every((item) => item.page.length > 0)).toBe(true);
    expect(checklistItems.every((item) => item.demoMethod.length > 0)).toBe(true);
    expect(checklistItems.every((item) => item.status.length > 0)).toBe(true);
  });
});

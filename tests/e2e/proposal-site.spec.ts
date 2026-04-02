import { expect, test } from '@playwright/test';

test('제품형 시연 프로토타입 주요 흐름을 탐색할 수 있다', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '법무 운영 대시보드' })).toBeVisible();
  await expect(page.getByRole('button', { name: '데모 초기화' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '계약', exact: true }).click();
  await expect(page.getByRole('heading', { name: '계약 허브' })).toBeVisible();

  await page.getByRole('link', { name: '계약서 업로드' }).click();
  await expect(page.getByRole('heading', { name: '계약서 업로드 및 AI 추출' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '검색', exact: true }).click();
  await expect(page.getByRole('heading', { name: '자연어 계약 검색' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '기준관리', exact: true }).click();
  await expect(page.getByRole('heading', { name: '체크리스트 / 플레이북 관리' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '결재 빌더', exact: true }).click();
  await expect(page.getByRole('heading', { name: '결재 프로세스 빌더' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '조직/권한', exact: true }).click();
  await expect(page.getByRole('heading', { name: '조직도 및 권한 관리' })).toBeVisible();

  await page.getByRole('navigation', { name: '주요 페이지' }).getByRole('link', { name: '시연 모드', exact: true }).click();
  await expect(page.getByRole('heading', { name: '시연 모드' })).toBeVisible();

  await page.goto('/proposal');
  await expect(page.getByRole('heading', { name: 'AI 법무관리시스템 프로토타입 제안' })).toBeVisible();
});

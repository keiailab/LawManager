import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ContractsPage } from './ContractsPage';

describe('ContractsPage', () => {
  it('계약 목록과 상세 이동 링크를 보여준다', async () => {
    render(
      <MemoryRouter>
        <ContractsPage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '계약 관리' })).toBeInTheDocument();
    expect(screen.getByText('신규 계약 등록')).toBeInTheDocument();
    expect(screen.getByText('필터 초기화')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'AI 분석' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: '보기' }).length).toBeGreaterThan(0);
  });
});

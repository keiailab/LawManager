import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('회사 선택과 운영 KPI를 보여준다', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '법무 운영 대시보드' })).toBeInTheDocument();
    expect((await screen.findAllByLabelText('시연 회사 선택')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText('총 계약 수')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText('리스크 계약')).length).toBeGreaterThan(0);
  });
});

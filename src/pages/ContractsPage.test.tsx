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

    expect(await screen.findByRole('heading', { name: '계약 허브' })).toBeInTheDocument();
    expect(screen.getByText('계약서 업로드')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '상세 보기' }).length).toBeGreaterThan(0);
  });
});

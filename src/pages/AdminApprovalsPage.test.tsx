import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminApprovalsPage } from './AdminApprovalsPage';

describe('AdminApprovalsPage', () => {
  it('결재 단계 추가와 병렬 단계 토글 UI를 보여준다', async () => {
    render(<AdminApprovalsPage />);

    expect(await screen.findByRole('heading', { name: '결재 프로세스 빌더' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '단계 추가' }));

    expect(screen.getAllByText('병렬 승인').length).toBeGreaterThan(0);
  });
});

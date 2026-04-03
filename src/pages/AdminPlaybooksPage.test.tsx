import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminPlaybooksPage } from './AdminPlaybooksPage';

describe('AdminPlaybooksPage', () => {
  it('거버넌스 설정과 권한 체계를 함께 보여준다', async () => {
    render(<AdminPlaybooksPage />);

    expect(await screen.findByRole('heading', { name: '거버넌스 설정' })).toBeInTheDocument();
    expect(screen.getByText('사용자 권한 체계')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '리뷰 기준 저장' })).toBeInTheDocument();
  });
});

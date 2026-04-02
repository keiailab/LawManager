import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminPlaybooksPage } from './AdminPlaybooksPage';

describe('AdminPlaybooksPage', () => {
  it('체크리스트와 플레이북 버전을 편집할 수 있는 화면을 보여준다', async () => {
    render(<AdminPlaybooksPage />);

    expect(await screen.findByRole('heading', { name: '체크리스트 / 플레이북 관리' })).toBeInTheDocument();
    expect(screen.getByText('버전 관리')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '리뷰 기준 저장' })).toBeInTheDocument();
  });
});

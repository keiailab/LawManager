import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminOrgPage } from './AdminOrgPage';

describe('AdminOrgPage', () => {
  it('조직도와 회사별 역할 매핑을 보여준다', async () => {
    render(<AdminOrgPage />);

    expect(await screen.findByRole('heading', { name: '조직도 및 권한 관리' })).toBeInTheDocument();
    expect(screen.getByText('회사별 역할 매핑')).toBeInTheDocument();
    expect(screen.getByText('조직 트리')).toBeInTheDocument();
  });
});

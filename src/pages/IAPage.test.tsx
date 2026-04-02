import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IAPage } from './IAPage';

describe('IAPage', () => {
  it('사용자 영역, 관리자 영역, 프로토타입 범위를 보여준다', () => {
    render(<IAPage />);

    expect(screen.getByRole('heading', { name: '전체 시스템 IA' })).toBeInTheDocument();
    expect(screen.getByText('사용자 영역')).toBeInTheDocument();
    expect(screen.getByText('관리자 영역')).toBeInTheDocument();
    expect(screen.getAllByText('프로토타입 범위').length).toBeGreaterThan(0);
    expect(screen.getAllByText('향후 확장 범위').length).toBeGreaterThan(0);
  });
});

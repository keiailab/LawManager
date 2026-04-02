import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScreensPage } from './ScreensPage';

describe('ScreensPage', () => {
  it('핵심 화면과 시연 포인트를 보여준다', () => {
    render(<ScreensPage />);

    expect(screen.getByRole('heading', { name: '핵심 화면 전략' })).toBeInTheDocument();
    expect(screen.getByText('조직도 / 권한 관리')).toBeInTheDocument();
    expect(screen.getByText('결재 프로세스 빌더')).toBeInTheDocument();
    expect(screen.getAllByText('시연 포인트').length).toBeGreaterThan(0);
  });
});

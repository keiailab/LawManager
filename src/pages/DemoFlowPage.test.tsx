import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DemoFlowPage } from './DemoFlowPage';

describe('DemoFlowPage', () => {
  it('고객 시연 흐름을 단계별로 보여준다', () => {
    render(<DemoFlowPage />);

    expect(screen.getByRole('heading', { name: '고객 시연 플로우' })).toBeInTheDocument();
    expect(screen.getByText('1단계')).toBeInTheDocument();
    expect(screen.getByText('회사 선택과 사용자 컨텍스트 소개')).toBeInTheDocument();
    expect(screen.getAllByText('연결 화면').length).toBeGreaterThan(0);
  });
});

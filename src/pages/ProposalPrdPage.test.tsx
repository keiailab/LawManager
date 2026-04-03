import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProposalPrdPage } from './ProposalPrdPage';

describe('ProposalPrdPage', () => {
  it('PRD 두 버전을 전환해서 볼 수 있다', () => {
    render(<ProposalPrdPage />);

    expect(screen.getByRole('heading', { name: 'PRD 두 버전 보기' })).toBeInTheDocument();
    expect(screen.getAllByText('구현 계획형 PRD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('설계 해석형 PRD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Execution Plan').length).toBeGreaterThan(0);
    expect(screen.getByText('권장 사용 시점')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Version 2/i }));

    expect(screen.getByRole('heading', { level: 2, name: '설계 해석형 PRD' })).toBeInTheDocument();
    expect(screen.getAllByText('Requirement Interpretation').length).toBeGreaterThan(0);
    expect(screen.getByText('두 버전이 보는 관점 차이')).toBeInTheDocument();
  });
});

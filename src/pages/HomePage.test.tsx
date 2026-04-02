import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('제안 핵심 섹션을 모두 보여준다', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'AI 법무관리시스템 프로토타입 제안' })).toBeInTheDocument();
    expect(screen.getByText('프로젝트 이해')).toBeInTheDocument();
    expect(screen.getByText('핵심 제안 포인트')).toBeInTheDocument();
    expect(screen.getByText('구현 범위와 제외 범위')).toBeInTheDocument();
    expect(screen.getByText('기술 스택 제안')).toBeInTheDocument();
    expect(screen.getByText('필수 산출물')).toBeInTheDocument();
    expect(screen.getByText('정책 기반 계약 검토 자동화 플랫폼 구조')).toBeInTheDocument();
    expect(screen.getByText('정책에서 리뷰와 레드라인까지 이어지는 시연 흐름')).toBeInTheDocument();
    expect(screen.getByText('기업 고객이 바로 납득할 수 있는 신뢰 요소')).toBeInTheDocument();
  });

  it('데모 회사 전환 컨트롤과 KPI 요약을 보여준다', async () => {
    render(<HomePage />);

    expect((await screen.findAllByLabelText('시연 회사 선택')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText('총 계약 수')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText('결재 대기')).length).toBeGreaterThan(0);
  });
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('루트에서 제품형 내비게이션과 대시보드를 보여준다', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '법무 운영 대시보드' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '대시보드' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '계약 관리' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '계약 상세 정보' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'AI 검토' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '거버넌스 설정' })).toBeInTheDocument();
  });

  it('보조 제안서 라우트가 유지된다', async () => {
    render(
      <MemoryRouter initialEntries={['/proposal']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: 'AI 법무관리시스템 프로토타입 제안' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'PRD' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: '제안 개요' }).length).toBeGreaterThan(0);
  });
});

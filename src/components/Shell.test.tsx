import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { Shell } from './Shell';

const navItems = [
  { to: '/', label: '대시보드', description: '운영 KPI와 최근 활동' },
  { to: '/contracts', label: '계약', description: '계약 목록과 상세 허브' }
];

describe('Shell', () => {
  beforeEach(() => {
    if (typeof window.localStorage?.clear === 'function') {
      window.localStorage.clear();
    }
    document.documentElement.removeAttribute('data-theme');
  });

  it('제품 셸에서 Justice Core Pro와 Azure Justice Ledger 테마를 전환할 수 있다', () => {
    render(
      <MemoryRouter>
        <Shell label="법무법인 프리미엄" navItems={navItems} variant="product">
          <div>content</div>
        </Shell>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Justice Core Pro' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('justice-core-pro');

    fireEvent.click(screen.getByRole('button', { name: 'Azure Justice Ledger' }));

    expect(screen.getByRole('button', { name: 'Azure Justice Ledger' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('azure-justice-ledger');
    if (typeof window.localStorage?.getItem === 'function') {
      expect(window.localStorage.getItem('lawmanager-ui-theme')).toBe('azure-justice-ledger');
    }
  });
});

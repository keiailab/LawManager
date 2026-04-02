import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { DemoModePage } from './DemoModePage';

describe('DemoModePage', () => {
  it('시연 단계와 이동 액션을 보여준다', async () => {
    render(
      <MemoryRouter>
        <DemoModePage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '시연 모드' })).toBeInTheDocument();
    expect(screen.getByText('1단계')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '이 단계 열기' }).length).toBeGreaterThan(0);
  });
});

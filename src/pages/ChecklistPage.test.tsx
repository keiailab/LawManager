import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChecklistPage } from './ChecklistPage';

describe('ChecklistPage', () => {
  it('요구사항 추적 테이블을 보여준다', () => {
    render(<ChecklistPage />);

    expect(screen.getByRole('heading', { name: '요청서 요구사항 체크리스트' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '상태' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '반영 위치' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '시연 방식' })).toBeInTheDocument();
  });

  it('체크리스트 상태를 변경할 수 있다', async () => {
    render(<ChecklistPage />);

    expect(await screen.findAllByRole('combobox')).not.toHaveLength(0);
  });
});

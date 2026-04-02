import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';

describe('SearchPage', () => {
  it('자연어 검색 질의와 결과를 보여준다', async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '자연어 계약 검색' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('자연어 검색 질의'), {
      target: { value: '한결리테일 결재 대기 공급계약' }
    });
    fireEvent.click(screen.getByRole('button', { name: '검색 실행' }));

    expect((await screen.findAllByText('검색 결과')).length).toBeGreaterThan(0);
  });
});

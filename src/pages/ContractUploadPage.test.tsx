import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ContractUploadPage } from './ContractUploadPage';

describe('ContractUploadPage', () => {
  it('파일 선택과 AI 추출 실행 UI를 보여준다', async () => {
    render(
      <MemoryRouter>
        <ContractUploadPage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: '계약서 업로드 및 AI 추출' })).toBeInTheDocument();

    const input = screen.getByLabelText('계약 파일 선택');
    const file = new File(['demo'], 'sample-nda.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByDisplayValue('sample-nda.pdf')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI 추출 시작' })).toBeInTheDocument();
  });
});

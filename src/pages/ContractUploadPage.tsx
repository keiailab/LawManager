import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { FormField } from '../components/ui/FormField';
import { createUploadedContract } from '../db/demoDb';
import type { ContractType } from '../types';

export function ContractUploadPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [contractType, setContractType] = useState<ContractType>('NDA');
  const [status, setStatus] = useState<'idle' | 'processing'>('idle');

  return (
    <div className="stack">
      <PageHero
        eyebrow="AI Extraction"
        title="계약서 업로드 및 AI 추출"
        description="실제 파일 선택 후 AI 추출이 진행되는 것처럼 보이는 로컬 시뮬레이션 흐름입니다."
      />

      <section className="page form-panel">
        <FormField label="계약 파일 선택" description="PDF, DOCX 등 문서 형식 시연용">
          <input
            aria-label="계약 파일 선택"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setFileName(file?.name ?? '');
            }}
          />
        </FormField>
        <FormField label="계약 유형">
          <select value={contractType} onChange={(event) => setContractType(event.target.value as ContractType)}>
            <option value="NDA">NDA</option>
            <option value="공급계약">공급계약</option>
            <option value="용역계약">용역계약</option>
          </select>
        </FormField>
        <FormField label="선택 파일명">
          <input value={fileName} readOnly />
        </FormField>
        <button
          type="button"
          className="primary-button"
          disabled={!fileName || status === 'processing'}
          onClick={() => {
            setStatus('processing');
            window.setTimeout(() => {
              const contractId = createUploadedContract({ fileName, contractType });
              navigate(`/contracts/${contractId}`);
            }, 300);
          }}
        >
          AI 추출 시작
        </button>
        {status === 'processing' ? <p className="status-chip">추출 중... 메타데이터와 리뷰 기준을 생성하고 있습니다.</p> : null}
      </section>
    </div>
  );
}

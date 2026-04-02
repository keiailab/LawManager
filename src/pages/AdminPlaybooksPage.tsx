import { useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Badge } from '../components/ui/Badge';
import { FormField } from '../components/ui/FormField';
import { listPlaybooks, updatePlaybook } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function AdminPlaybooksPage() {
  useDemoSnapshot();
  const playbooks = listPlaybooks();
  const initial = useMemo(() => playbooks[0], [playbooks]);
  const [selectedId, setSelectedId] = useState<string>('');
  const selected = playbooks.find((item) => item.id === (selectedId || initial?.id)) ?? initial;
  const [form, setForm] = useState({
    forbiddenPhrase: selected?.forbiddenPhrase ?? '',
    riskRule: selected?.riskRule ?? '',
    recommendation: selected?.recommendation ?? ''
  });

  if (!selected) {
    return null;
  }

  return (
    <div className="stack">
      <PageHero
        eyebrow="Playbook Manager"
        title="체크리스트 / 플레이북 관리"
        description="계약 유형별 검토 기준과 AI 리뷰 판단 기준을 수정하고 버전을 관리하는 관리자 화면입니다."
      />

      <section className="page form-panel">
        <div className="panel-header">
          <h2>버전 관리</h2>
          <Badge tone="accent">{selected.version}</Badge>
        </div>
        <FormField label="계약 유형">
          <select
            value={selected.id}
            onChange={(event) => {
              const next = playbooks.find((item) => item.id === event.target.value);
              if (!next) return;
              setSelectedId(next.id);
              setForm({
                forbiddenPhrase: next.forbiddenPhrase,
                riskRule: next.riskRule,
                recommendation: next.recommendation
              });
            }}
          >
            {playbooks.map((playbook) => (
              <option key={playbook.id} value={playbook.id}>
                {playbook.contractType}
              </option>
              ))}
          </select>
        </FormField>
        <FormField label="금지 문구">
          <textarea value={form.forbiddenPhrase} onChange={(event) => setForm({ ...form, forbiddenPhrase: event.target.value })} />
        </FormField>
        <FormField label="리스크 판단 기준">
          <textarea value={form.riskRule} onChange={(event) => setForm({ ...form, riskRule: event.target.value })} />
        </FormField>
        <FormField label="수정 권고 문구">
          <textarea value={form.recommendation} onChange={(event) => setForm({ ...form, recommendation: event.target.value })} />
        </FormField>
        <button
          type="button"
          className="primary-button"
          onClick={() => updatePlaybook(selected.id, form)}
        >
          리뷰 기준 저장
        </button>
      </section>
    </div>
  );
}

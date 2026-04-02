import { PageHero } from '../components/PageHero';
import { Badge } from '../components/ui/Badge';
import { Panel } from '../components/ui/Panel';
import { addApprovalStep, listApprovalFlows, toggleApprovalStepParallel } from '../db/demoDb';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function AdminApprovalsPage() {
  useDemoSnapshot();
  const flows = listApprovalFlows();

  return (
    <div className="stack">
      <PageHero
        eyebrow="Approval Builder"
        title="결재 프로세스 빌더"
        description="순차결재와 병렬결재를 조합해 대기업형 결재 구조를 설계하는 관리자 화면입니다."
      />

      <section className="page cards-grid">
        {flows.map(({ flow, steps }) => (
          <Panel
            key={flow.id}
            title={flow.name}
            description={`${flow.contractType} 전용 결재 템플릿`}
            action={
              <button type="button" className="secondary-button" onClick={() => addApprovalStep(flow.id)}>
                단계 추가
              </button>
            }
          >
            <ul className="plain-list">
              {steps.map((step) => (
                <li key={step.id}>
                  <strong>{step.order}단계 · {step.name}</strong>
                  <p>{step.role}</p>
                  <Badge tone={step.parallel ? 'accent' : 'default'}>{step.parallel ? '병렬' : '순차'}</Badge>
                  <button type="button" className="text-button" onClick={() => toggleApprovalStepParallel(step.id)}>
                    {step.parallel ? '병렬 해제' : '병렬 승인'}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </section>
    </div>
  );
}

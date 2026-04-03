import { Link } from 'react-router-dom';
import {
  deliverables,
  proposalHighlights,
  proposalPrdVersions,
  proposalPlatformPillars,
  proposalRoiStats,
  proposalTrustHighlights,
  proposalWorkflowSteps,
  techStack
} from '../data/site';
import { getCompanies, getDashboardSnapshot, getSelectedCompanyId, setSelectedCompany } from '../db/demoDb';
import { PageHero } from '../components/PageHero';
import { FeaturePillarGrid } from '../components/ui/FeaturePillarGrid';
import { StatBand } from '../components/ui/StatBand';
import { TrustBlock } from '../components/ui/TrustBlock';
import { WorkflowStrip } from '../components/ui/WorkflowStrip';
import { useDemoSeed } from '../hooks/useDemoSeed';
import { useDemoSnapshot } from '../hooks/useDemoState';

export function HomePage() {
  useDemoSeed();
  useDemoSnapshot();
  const companies = getCompanies();
  const snapshot = getDashboardSnapshot();
  const selectedCompanyId = getSelectedCompanyId();

  return (
    <div className="stack">
      <PageHero
        eyebrow="Proposal Overview"
        title="AI 법무관리시스템 프로토타입 제안"
        description="제작요청서의 모든 요구사항을 빠짐없이 반영하되, 실제 개발보다 시연 설득력과 엔터프라이즈 UX 완성도를 우선하는 제안 구조입니다."
      >
        <div className="highlight-grid">
          {proposalHighlights.map((item) => (
            <article key={item} className="info-panel">
              <p>{item}</p>
            </article>
          ))}
        </div>

        <div className="control-row">
          <label className="field">
            <span>시연 회사 선택</span>
            <select
              aria-label="시연 회사 선택"
              value={selectedCompanyId}
              onChange={(event) => {
                void setSelectedCompany(event.target.value);
              }}
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          {snapshot ? (
            <div className="selection-meta">
              <strong>{snapshot.selectedCompany.name}</strong>
              <p>
                {snapshot.selectedCompany.sector} · {snapshot.selectedCompany.userRole}
              </p>
            </div>
          ) : null}
        </div>

        <div className="kpi-grid">
          <article className="metric-card">
            <span>총 계약 수</span>
            <strong>{snapshot.metrics.totalContracts}</strong>
          </article>
          <article className="metric-card">
            <span>리스크 계약</span>
            <strong>{snapshot.metrics.riskyContracts}</strong>
          </article>
          <article className="metric-card">
            <span>결재 대기</span>
            <strong>{snapshot.metrics.pendingApprovals}</strong>
          </article>
          <article className="metric-card">
            <span>최근 활동</span>
            <strong>{snapshot.metrics.recentActivities}</strong>
          </article>
        </div>
      </PageHero>

      <StatBand items={proposalRoiStats} />

      <section className="page section-grid">
        <article className="section-block">
          <h2>프로젝트 이해</h2>
          <p>
            이번 프로젝트는 고객 제안 및 시연을 위한 프로토타입 제작이며, 실제 운영형 백엔드보다 화면
            완성도와 정보 구조 설득력이 핵심입니다.
          </p>
        </article>
        <article className="section-block">
          <h2>핵심 제안 포인트</h2>
          <p>
            AI 계약 분석 단일 기능이 아니라 조직, 권한, 결재, 기준관리까지 포함한 대기업형 법무관리
            시스템 구조를 중심으로 제안합니다.
          </p>
        </article>
      </section>

      <section className="page">
        <div className="panel-top">
          <div className="panel-copy-group">
            <p className="eyebrow">Product Requirements Document</p>
            <h2>PRD 두 버전 구조</h2>
            <p className="panel-description">
              같은 프로젝트를 실행 문서와 설계 해석 문서로 나눠 보면, 구현 순서와 고객 설득 논리를 동시에
              붙잡을 수 있습니다.
            </p>
          </div>
          <div className="panel-action">
            <Link className="primary-link small-link" to="/proposal/prd">
              PRD 열기
            </Link>
          </div>
        </div>

        <div className="cards-grid">
          {proposalPrdVersions.map((version) => (
            <article key={version.id} className="info-panel prd-preview-card">
              <div className="panel-header prd-preview-header">
                <div>
                  <span className="prd-version-label">{version.label}</span>
                  <h3>{version.title}</h3>
                </div>
                <span className="tag tag-accent">{version.mode}</span>
              </div>
              <p className="panel-copy">{version.summary}</p>
              <div className="prd-preview-meta-grid">
                <div className="meta-block">
                  <strong>문서 목적</strong>
                  <p>{version.intent}</p>
                </div>
                <div className="meta-block">
                  <strong>기준 문서</strong>
                  <p>{version.sourceTitle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="panel-top">
          <div className="panel-copy-group">
            <p className="eyebrow">Platform Overview</p>
            <h2>정책 기반 계약 검토 자동화 플랫폼 구조</h2>
            <p className="panel-description">
              LawGeex 계열 제품이 강조하는 가치 축을 우리 프로토타입 범위에 맞게 재구성한 플랫폼 프레임입니다.
            </p>
          </div>
        </div>
        <FeaturePillarGrid items={proposalPlatformPillars} />
      </section>

      <section className="page">
        <div className="panel-top">
          <div className="panel-copy-group">
            <p className="eyebrow">Workflow Narrative</p>
            <h2>정책에서 리뷰와 레드라인까지 이어지는 시연 흐름</h2>
          </div>
        </div>
        <WorkflowStrip items={proposalWorkflowSteps} />
      </section>

      <section className="page section-grid">
        <article className="section-block">
          <h2>구현 범위와 제외 범위</h2>
          <p>
            실제 OCR, LLM, 권한 엔진, 결재 엔진 연동은 제외하되, 더미 데이터와 시나리오 기반 인터랙션으로
            실제처럼 보이는 흐름을 만듭니다.
          </p>
        </article>
        <article className="section-block">
          <h2>기술 스택 제안</h2>
          <ul className="plain-list">
            {techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="page section-grid">
        <article className="section-block">
          <h2>필수 산출물</h2>
          <ul className="plain-list">
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="section-block">
          <h2>일정 전략</h2>
          <p>
            착수 희망 시점은 4월 13일, 납품 희망 시점은 5월 15일입니다. 따라서 IA와 핵심 화면 설계를 먼저
            잠그고, 우선순위 높은 화면부터 시연 흐름을 조립하는 방식이 적합합니다.
          </p>
        </article>
      </section>

      <TrustBlock title="기업 고객이 바로 납득할 수 있는 신뢰 요소" items={proposalTrustHighlights} />
    </div>
  );
}

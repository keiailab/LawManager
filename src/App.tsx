import { Route, Routes, useLocation } from 'react-router-dom';
import { proposalNavItems } from './data/site';
import { getCurrentUserProfile, getDashboardSnapshot, getVisibleProductNav, resetDemoDatabase } from './db/demoDb';
import { useDemoSeed } from './hooks/useDemoSeed';
import { useDemoSnapshot } from './hooks/useDemoState';
import { HomePage } from './pages/HomePage';
import { IAPage } from './pages/IAPage';
import { ScreensPage } from './pages/ScreensPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { DemoFlowPage } from './pages/DemoFlowPage';
import { ProposalPrdPage } from './pages/ProposalPrdPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContractsPage } from './pages/ContractsPage';
import { ContractUploadPage } from './pages/ContractUploadPage';
import { SearchPage } from './pages/SearchPage';
import { AdminApprovalsPage } from './pages/AdminApprovalsPage';
import { AdminPlaybooksPage } from './pages/AdminPlaybooksPage';
import { AdminOrgPage } from './pages/AdminOrgPage';
import { DemoModePage } from './pages/DemoModePage';
import { Shell } from './components/Shell';
import { ContractDetailPage } from './pages/ContractDetailPage';
import { ReviewPage } from './pages/ReviewPage';

function getActiveContractId(pathname: string) {
  const contractMatch = pathname.match(/^\/contracts\/([^/]+)$/);
  if (contractMatch && contractMatch[1] !== 'new') {
    return contractMatch[1];
  }

  const reviewMatch = pathname.match(/^\/reviews\/([^/]+)$/);
  return reviewMatch?.[1];
}

function ProductLayout({ children }: { children: React.ReactNode }) {
  useDemoSeed();
  useDemoSnapshot();
  const location = useLocation();
  const navItems = getVisibleProductNav(getActiveContractId(location.pathname));
  const snapshot = getDashboardSnapshot();
  const user = getCurrentUserProfile();

  return (
    <Shell
      label="법무법인 프리미엄"
      navItems={navItems}
      variant="product"
      topbarTitle="디지털 법무 워크스페이스"
      topbarSubtitle="계약서 심층 분석 시스템"
      headerMode="inline"
      showNavDescriptions
      topbarMeta={
        user ? (
          <div className="shell-profile-copy">
            <strong>xxx변호사</strong>
            <span>{snapshot.selectedCompany.name} · {user.role}</span>
          </div>
        ) : null
      }
      footer={
        <button
          type="button"
          className="secondary-button full-width"
          onClick={() => {
            void resetDemoDatabase();
          }}
        >
          데모 초기화
        </button>
      }
    >
      {children}
    </Shell>
  );
}

function ProposalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      label="AI 제안 보드"
      navItems={proposalNavItems}
      variant="proposal"
      topbarTitle="제안 워크스페이스"
      topbarSubtitle="프로젝트 이해, IA, 핵심 화면 전략, 체크리스트, 데모 플로우를 하나의 설득 구조로 묶은 제안 보드"
      showThemeSwitch={false}
    >
      {children}
    </Shell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/proposal"
        element={
          <ProposalLayout>
            <HomePage />
          </ProposalLayout>
        }
      />
      <Route
        path="/proposal/prd"
        element={
          <ProposalLayout>
            <ProposalPrdPage />
          </ProposalLayout>
        }
      />
      <Route
        path="/proposal/ia"
        element={
          <ProposalLayout>
            <IAPage />
          </ProposalLayout>
        }
      />
      <Route
        path="/proposal/screens"
        element={
          <ProposalLayout>
            <ScreensPage />
          </ProposalLayout>
        }
      />
      <Route
        path="/proposal/checklist"
        element={
          <ProposalLayout>
            <ChecklistPage />
          </ProposalLayout>
        }
      />
      <Route
        path="/proposal/demo-flow"
        element={
          <ProposalLayout>
            <DemoFlowPage />
          </ProposalLayout>
        }
      />

      <Route
        path="/"
        element={
          <ProductLayout>
            <DashboardPage />
          </ProductLayout>
        }
      />
      <Route
        path="/contracts"
        element={
          <ProductLayout>
            <ContractsPage />
          </ProductLayout>
        }
      />
      <Route
        path="/contracts/new"
        element={
          <ProductLayout>
            <ContractUploadPage />
          </ProductLayout>
        }
      />
      <Route
        path="/contracts/:contractId"
        element={
          <ProductLayout>
            <ContractDetailPage />
          </ProductLayout>
        }
      />
      <Route
        path="/search"
        element={
          <ProductLayout>
            <SearchPage />
          </ProductLayout>
        }
      />
      <Route
        path="/admin/playbooks"
        element={
          <ProductLayout>
            <AdminPlaybooksPage />
          </ProductLayout>
        }
      />
      <Route
        path="/admin/approvals"
        element={
          <ProductLayout>
            <AdminApprovalsPage />
          </ProductLayout>
        }
      />
      <Route
        path="/admin/org"
        element={
          <ProductLayout>
            <AdminOrgPage />
          </ProductLayout>
        }
      />
      <Route
        path="/demo"
        element={
          <ProductLayout>
            <DemoModePage />
          </ProductLayout>
        }
      />
      <Route
        path="/reviews/:contractId"
        element={
          <ProductLayout>
            <ReviewPage />
          </ProductLayout>
        }
      />
    </Routes>
  );
}

import { Route, Routes } from 'react-router-dom';
import { proposalNavItems } from './data/site';
import { getVisibleProductNav, resetDemoDatabase } from './db/demoDb';
import { useDemoSeed } from './hooks/useDemoSeed';
import { useDemoSnapshot } from './hooks/useDemoState';
import { HomePage } from './pages/HomePage';
import { IAPage } from './pages/IAPage';
import { ScreensPage } from './pages/ScreensPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { DemoFlowPage } from './pages/DemoFlowPage';
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

function ProductLayout({ children }: { children: React.ReactNode }) {
  useDemoSeed();
  useDemoSnapshot();
  const navItems = getVisibleProductNav();

  return (
    <Shell
      label="LawManager Prototype"
      navItems={navItems}
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
    <Shell label="Proposal Navigation" navItems={proposalNavItems}>
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

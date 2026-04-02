export type ChecklistStatus = '반영 완료' | '반영 예정' | '제외 범위' | '제안 필요';

export type ChecklistCategory =
  | '프로젝트 목표'
  | '구현 방향'
  | '핵심 기능'
  | '우선순위'
  | '화면 구성'
  | '디자인 방향'
  | '제외 범위'
  | '산출물'
  | 'IA 요구사항'
  | '일정 및 제안 항목';

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  source: string;
  priority: '상' | '중' | '하';
  status: ChecklistStatus;
  page: string;
  demoMethod: string;
  notes: string;
}

export interface NavItem {
  to: string;
  label: string;
  description: string;
}

export interface DemoCompany {
  id: string;
  name: string;
  sector: string;
  userRole: string;
}

export interface DemoMetric {
  companyId: string;
  totalContracts: number;
  riskyContracts: number;
  pendingApprovals: number;
  recentActivities: number;
}

export interface DashboardSnapshot {
  selectedCompany: DemoCompany;
  metrics: DemoMetric;
}

export type DemoRole = '법무 총괄 관리자' | '계약 운영 책임자' | '결재 승인자';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  naturalPersonKey: string;
}

export interface CompanyMembership {
  id: string;
  userId: string;
  companyId: string;
  role: DemoRole;
  orgUnitId: string;
}

export interface OrgUnit {
  id: string;
  companyId: string;
  name: string;
  parentId?: string;
  leadName: string;
}

export type ContractStatus = '초안' | '검토중' | '결재 대기' | '승인 완료' | '리스크 검토 필요';
export type ContractType = 'NDA' | '공급계약' | '용역계약';

export interface ContractRecord {
  id: string;
  companyId: string;
  title: string;
  type: ContractType;
  counterparty: string;
  ownerName: string;
  amount: string;
  period: string;
  status: ContractStatus;
  summary: string;
  uploadedAt: string;
}

export interface ContractDocument {
  id: string;
  contractId: string;
  fileName: string;
  mimeType: string;
  rawTextPreview: string;
}

export interface MetadataExtraction {
  id: string;
  contractId: string;
  contractName: string;
  contractType: ContractType;
  parties: string[];
  periodStart: string;
  periodEnd: string;
  amount: string;
  keyClauses: string[];
  isConfirmed: boolean;
}

export interface PlaybookTemplate {
  id: string;
  companyId: string;
  contractType: ContractType;
  version: string;
  checklistSummary: string;
  allowedPhrase: string;
  forbiddenPhrase: string;
  riskRule: string;
  recommendation: string;
}

export type ReviewRiskLevel = '고위험' | '확인 필요' | '권고';

export interface ClauseReview {
  id: string;
  reviewId: string;
  clauseTitle: string;
  riskLevel: ReviewRiskLevel;
  finding: string;
  recommendedText: string;
}

export interface ReviewResult {
  id: string;
  contractId: string;
  playbookId: string;
  generatedAt: string;
  summary: string;
}

export interface ApprovalStep {
  id: string;
  flowId: string;
  order: number;
  name: string;
  role: string;
  parallel: boolean;
}

export interface ApprovalFlowTemplate {
  id: string;
  companyId: string;
  name: string;
  contractType: ContractType;
}

export interface ApprovalInstance {
  id: string;
  contractId: string;
  flowId: string;
  currentStepOrder: number;
  status: '진행중' | '승인 완료';
}

export interface ActivityItem {
  id: string;
  companyId: string;
  contractId: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface SearchResult {
  contract: ContractRecord;
  reason: string;
}

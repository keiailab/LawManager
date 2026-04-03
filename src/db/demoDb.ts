import { checklistItems } from '../data/checklist';
import type {
  ActivityItem,
  ApprovalFlowTemplate,
  ApprovalInstance,
  ApprovalStep,
  ChecklistItem,
  ClauseReview,
  CompanyMembership,
  ContractDocument,
  ContractRecord,
  ContractType,
  DashboardSnapshot,
  DemoCompany,
  DemoMetric,
  DemoUser,
  MetadataExtraction,
  OrgUnit,
  PlaybookTemplate,
  ReviewResult,
  SearchResult
} from '../types';

const STORAGE_KEY = 'lawmanager-demo-state-v1';

interface DemoSettings {
  selectedCompanyId: string;
  selectedUserId: string;
}

interface DemoState {
  settings: DemoSettings;
  checklist: ChecklistItem[];
  companies: DemoCompany[];
  users: DemoUser[];
  memberships: CompanyMembership[];
  orgUnits: OrgUnit[];
  metrics: DemoMetric[];
  contracts: ContractRecord[];
  documents: ContractDocument[];
  extractions: MetadataExtraction[];
  playbooks: PlaybookTemplate[];
  reviews: ReviewResult[];
  clauseReviews: ClauseReview[];
  approvalFlows: ApprovalFlowTemplate[];
  approvalSteps: ApprovalStep[];
  approvalInstances: ApprovalInstance[];
  activities: ActivityItem[];
}

const listeners = new Set<() => void>();
let currentState: DemoState | null = null;

function createInitialState(): DemoState {
  const companies: DemoCompany[] = [
    { id: 'holding', name: '한결지주', sector: '지주사', userRole: '법무 총괄 관리자' },
    { id: 'retail', name: '한결리테일', sector: '유통', userRole: '계약 운영 책임자' }
  ];

  const users: DemoUser[] = [
    { id: 'u-phil', name: '박준호', email: 'juno.park@hankyul.com', naturalPersonKey: 'np-001' },
    { id: 'u-mina', name: '최미나', email: 'mina.choi@hankyul.com', naturalPersonKey: 'np-002' },
    { id: 'u-seungho', name: '김승호', email: 'seungho.kim@hankyul.com', naturalPersonKey: 'np-003' }
  ];

  const memberships: CompanyMembership[] = [
    { id: 'm-1', userId: 'u-phil', companyId: 'holding', role: '법무 총괄 관리자', orgUnitId: 'ou-h-legal' },
    { id: 'm-2', userId: 'u-phil', companyId: 'retail', role: '계약 운영 책임자', orgUnitId: 'ou-r-legal' },
    { id: 'm-3', userId: 'u-mina', companyId: 'retail', role: '결재 승인자', orgUnitId: 'ou-r-finance' }
  ];

  const orgUnits: OrgUnit[] = [
    { id: 'ou-h-root', companyId: 'holding', name: '한결지주', leadName: '박준호' },
    { id: 'ou-h-legal', companyId: 'holding', name: '법무총괄실', parentId: 'ou-h-root', leadName: '박준호' },
    { id: 'ou-h-strategy', companyId: 'holding', name: '전략기획실', parentId: 'ou-h-root', leadName: '이아린' },
    { id: 'ou-r-root', companyId: 'retail', name: '한결리테일', leadName: '최미나' },
    { id: 'ou-r-legal', companyId: 'retail', name: '계약운영팀', parentId: 'ou-r-root', leadName: '박준호' },
    { id: 'ou-r-finance', companyId: 'retail', name: '재무심사팀', parentId: 'ou-r-root', leadName: '최미나' }
  ];

  const metrics: DemoMetric[] = [
    { companyId: 'holding', totalContracts: 184, riskyContracts: 12, pendingApprovals: 7, recentActivities: 23 },
    { companyId: 'retail', totalContracts: 97, riskyContracts: 8, pendingApprovals: 4, recentActivities: 15 }
  ];

  const contracts: ContractRecord[] = [
    {
      id: 'ct-001',
      companyId: 'holding',
      title: '전략 파트너 NDA',
      type: 'NDA',
      counterparty: 'Atlas Systems',
      ownerName: '박준호',
      amount: '비금전',
      period: '2026-04-01 ~ 2027-03-31',
      status: '리스크 검토 필요',
      summary: '핵심 정보 비밀유지 및 데이터 재이용 제한 조항 포함',
      uploadedAt: '2026-04-01 09:20'
    },
    {
      id: 'ct-002',
      companyId: 'holding',
      title: 'ERP 통합 용역계약',
      type: '용역계약',
      counterparty: 'NexBridge Consulting',
      ownerName: '이아린',
      amount: '₩420,000,000',
      period: '2026-04-05 ~ 2026-12-31',
      status: '결재 대기',
      summary: '단계별 납품, 검수, 손해배상 한도 조항 포함',
      uploadedAt: '2026-04-02 11:10'
    },
    {
      id: 'ct-003',
      companyId: 'retail',
      title: '신선식품 공급계약',
      type: '공급계약',
      counterparty: 'GreenFarm Foods',
      ownerName: '박준호',
      amount: '₩180,000,000',
      period: '2026-04-03 ~ 2026-10-31',
      status: '결재 대기',
      summary: '납기 SLA, 반품 기준, 가격 조정 조항 포함',
      uploadedAt: '2026-04-02 14:40'
    },
    {
      id: 'ct-004',
      companyId: 'retail',
      title: '매장 장비 유지보수 용역계약',
      type: '용역계약',
      counterparty: 'FieldOps Korea',
      ownerName: '최미나',
      amount: '₩96,000,000',
      period: '2026-04-07 ~ 2027-04-06',
      status: '검토중',
      summary: '장애 대응 SLA, 비상 출동 비용, 장비 손상 책임 범위 포함',
      uploadedAt: '2026-04-03 10:15'
    }
  ];

  const documents: ContractDocument[] = contracts.map((contract) => ({
    id: `doc-${contract.id}`,
    contractId: contract.id,
    fileName: `${contract.title}.pdf`,
    mimeType: 'application/pdf',
    rawTextPreview: `${contract.title} 원문 미리보기\n- 상대방: ${contract.counterparty}\n- 주요 조항: 손해배상, 해지, 비밀유지`
  }));

  const extractions: MetadataExtraction[] = contracts.map((contract) => ({
    id: `ext-${contract.id}`,
    contractId: contract.id,
    contractName: contract.title,
    contractType: contract.type,
    parties: ['한결그룹', contract.counterparty],
    periodStart: contract.period.split(' ~ ')[0],
    periodEnd: contract.period.split(' ~ ')[1],
    amount: contract.amount,
    keyClauses: ['손해배상 한도', '해지권', '데이터 처리'],
    isConfirmed: contract.id !== 'ct-001'
  }));

  const playbooks: PlaybookTemplate[] = [
    {
      id: 'pb-nda-holding',
      companyId: 'holding',
      contractType: 'NDA',
      version: 'v1.4',
      checklistSummary: '비밀정보 범위, 잔존 의무, 역설계 금지 확인',
      allowedPhrase: '합리적 범위 내 정보 사용',
      forbiddenPhrase: '상대방 재량으로 일방적 공개 허용',
      riskRule: '데이터 재이용 문구가 상대방 단독 재량이면 고위험',
      recommendation: '정보 사용 목적을 공동 프로젝트 수행 범위로 제한'
    },
    {
      id: 'pb-supply-retail',
      companyId: 'retail',
      contractType: '공급계약',
      version: 'v2.1',
      checklistSummary: '납기, 가격 조정, 반품 기준, 지체상금 확인',
      allowedPhrase: '사전 서면 합의 시 단가 조정 가능',
      forbiddenPhrase: '공급사 단독 가격 변경',
      riskRule: '단가 조정 기준이 없으면 확인 필요',
      recommendation: '단가 조정 조건과 상한을 명시'
    },
    {
      id: 'pb-service-holding',
      companyId: 'holding',
      contractType: '용역계약',
      version: 'v1.8',
      checklistSummary: '성과물 귀속, 검수 기준, SLA, 손해배상 한도 확인',
      allowedPhrase: '검수 완료 후 대금 지급',
      forbiddenPhrase: '성과물 권리 상대방 단독 귀속',
      riskRule: '성과물 귀속이 상대방 단독이면 고위험',
      recommendation: '성과물과 파생 산출물 권리를 발주사로 귀속'
    }
  ];

  const reviews: ReviewResult[] = [
    {
      id: 'rv-001',
      contractId: 'ct-001',
      playbookId: 'pb-nda-holding',
      generatedAt: '2026-04-02 09:30',
      summary: '비밀정보 활용 범위와 역설계 제한 문구에 고위험 요소가 있습니다.'
    },
    {
      id: 'rv-002',
      contractId: 'ct-003',
      playbookId: 'pb-supply-retail',
      generatedAt: '2026-04-02 15:10',
      summary: '단가 조정 기준과 반품 책임 범위에 확인 필요 항목이 있습니다.'
    }
  ];

  const clauseReviews: ClauseReview[] = [
    {
      id: 'cr-001',
      reviewId: 'rv-001',
      clauseTitle: '제7조 정보 활용',
      riskLevel: '고위험',
      finding: '상대방이 수집 데이터를 추가 목적에 사용할 수 있게 열려 있습니다.',
      recommendedText: '정보 활용 목적을 공동 프로젝트 수행으로 한정합니다.'
    },
    {
      id: 'cr-002',
      reviewId: 'rv-001',
      clauseTitle: '제10조 역설계',
      riskLevel: '권고',
      finding: '역설계 금지 범위가 모호합니다.',
      recommendedText: '소스, 구조, 모델 파라미터에 대한 역설계를 명시적으로 금지합니다.'
    },
    {
      id: 'cr-003',
      reviewId: 'rv-002',
      clauseTitle: '제5조 가격 조정',
      riskLevel: '확인 필요',
      finding: '가격 조정 트리거와 상한이 없습니다.',
      recommendedText: '원재료 지수 5% 이상 변동 시에만 분기 단위 조정으로 제한합니다.'
    }
  ];

  const approvalFlows: ApprovalFlowTemplate[] = [
    { id: 'af-001', companyId: 'holding', name: '지주사 표준 결재', contractType: '용역계약' },
    { id: 'af-002', companyId: 'retail', name: '리테일 공급계약 결재', contractType: '공급계약' }
  ];

  const approvalSteps: ApprovalStep[] = [
    { id: 'as-001', flowId: 'af-001', order: 1, name: '법무 검토', role: '법무 총괄 관리자', parallel: false },
    { id: 'as-002', flowId: 'af-001', order: 2, name: '전략 검토', role: '전략기획실장', parallel: true },
    { id: 'as-003', flowId: 'af-001', order: 2, name: '재무 검토', role: '재무책임자', parallel: true },
    { id: 'as-004', flowId: 'af-001', order: 3, name: '임원 승인', role: '대표이사', parallel: false },
    { id: 'as-005', flowId: 'af-002', order: 1, name: '계약 운영 검토', role: '계약 운영 책임자', parallel: false },
    { id: 'as-006', flowId: 'af-002', order: 2, name: '재무 승인', role: '결재 승인자', parallel: false }
  ];

  const approvalInstances: ApprovalInstance[] = [
    { id: 'ai-001', contractId: 'ct-002', flowId: 'af-001', currentStepOrder: 2, status: '진행중' },
    { id: 'ai-002', contractId: 'ct-003', flowId: 'af-002', currentStepOrder: 2, status: '진행중' }
  ];

  const activities: ActivityItem[] = [
    {
      id: 'ac-001',
      companyId: 'holding',
      contractId: 'ct-001',
      title: 'AI 리뷰 재확인 필요',
      description: '비밀정보 활용 조항이 고위험으로 분류되었습니다.',
      createdAt: '2026-04-02 09:40'
    },
    {
      id: 'ac-002',
      companyId: 'holding',
      contractId: 'ct-002',
      title: '결재 병렬 검토 진행중',
      description: '전략/재무 동시 검토 단계에 진입했습니다.',
      createdAt: '2026-04-02 12:05'
    },
    {
      id: 'ac-003',
      companyId: 'retail',
      contractId: 'ct-003',
      title: '공급계약 결재 대기',
      description: '재무 승인만 남은 상태입니다.',
      createdAt: '2026-04-02 15:20'
    }
  ];

  return {
    settings: { selectedCompanyId: 'holding', selectedUserId: 'u-phil' },
    checklist: checklistItems,
    companies,
    users,
    memberships,
    orgUnits,
    metrics,
    contracts,
    documents,
    extractions,
    playbooks,
    reviews,
    clauseReviews,
    approvalFlows,
    approvalSteps,
    approvalInstances,
    activities
  };
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }

  if (
    typeof window.localStorage.getItem !== 'function' ||
    typeof window.localStorage.setItem !== 'function' ||
    typeof window.localStorage.removeItem !== 'function'
  ) {
    return null;
  }

  return window.localStorage;
}

function loadState(): DemoState {
  if (currentState) {
    return currentState;
  }

  const storage = getStorage();

  if (!storage) {
    currentState = createInitialState();
    return currentState;
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = createInitialState();
    storage.setItem(STORAGE_KEY, JSON.stringify(initial));
    currentState = initial;
    return currentState;
  }

  currentState = JSON.parse(raw) as DemoState;
  return currentState;
}

function saveState(state: DemoState) {
  const storage = getStorage();
  currentState = state;
  if (!storage) {
    listeners.forEach((listener) => listener());
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((listener) => listener());
}

function updateState(mutator: (state: DemoState) => DemoState) {
  saveState(mutator(loadState()));
}

function buildMetricsForCompany(state: DemoState, companyId: string): DemoMetric {
  const companyContracts = state.contracts.filter((contract) => contract.companyId === companyId);
  const companyActivities = state.activities.filter((item) => item.companyId === companyId);
  const riskyContracts = companyContracts.filter(
    (contract) => contract.status === '리스크 검토 필요' || contract.status === '검토중'
  ).length;
  const pendingApprovals = companyContracts.filter((contract) => contract.status === '결재 대기').length;

  return {
    companyId,
    totalContracts: companyContracts.length,
    riskyContracts,
    pendingApprovals,
    recentActivities: companyActivities.length
  };
}

function getCurrentMembership(state: DemoState) {
  return state.memberships.find(
    (membership) =>
      membership.userId === state.settings.selectedUserId && membership.companyId === state.settings.selectedCompanyId
  );
}

function upsertMetric(state: DemoState, companyId: string) {
  const metric = buildMetricsForCompany(state, companyId);
  const index = state.metrics.findIndex((item) => item.companyId === companyId);

  if (index >= 0) {
    state.metrics[index] = metric;
  } else {
    state.metrics.push(metric);
  }
}

export function ensureDemoSeeded() {
  loadState();
}

export function closeDemoDb() {
  listeners.clear();
}

export function subscribeDemoState(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDemoStateSnapshot() {
  return loadState();
}

export function resetDemoDatabase() {
  saveState(createInitialState());
}

export function getChecklistItemsFromDb() {
  return loadState().checklist;
}

export function updateChecklistStatus(id: string, status: ChecklistItem['status']) {
  updateState((state) => ({
    ...state,
    checklist: state.checklist.map((item) => (item.id === id ? { ...item, status } : item))
  }));
}

export function getSelectedCompanyId() {
  return loadState().settings.selectedCompanyId;
}

export function setSelectedCompany(companyId: string) {
  updateState((state) => ({
    ...state,
    settings: { ...state.settings, selectedCompanyId: companyId }
  }));
}

export function getCompanies() {
  return loadState().companies;
}

export function getDashboardSnapshot(): DashboardSnapshot {
  const state = loadState();
  const selectedCompany = state.companies.find((company) => company.id === state.settings.selectedCompanyId);
  const metric = buildMetricsForCompany(state, state.settings.selectedCompanyId);

  if (!selectedCompany) {
    throw new Error('선택된 회사를 찾을 수 없습니다.');
  }

  const membership = getCurrentMembership(state);

  return {
    selectedCompany: {
      ...selectedCompany,
      userRole: membership?.role ?? selectedCompany.userRole
    },
    metrics: metric
  };
}

export function getCurrentUserProfile() {
  const state = loadState();
  const user = state.users.find((item) => item.id === state.settings.selectedUserId);
  const membership = getCurrentMembership(state);

  return {
    name: user?.name ?? '박준호',
    email: user?.email ?? 'juno.park@hankyul.com',
    role: membership?.role ?? '법무 총괄 관리자'
  };
}

export function listContracts() {
  const state = loadState();
  return state.contracts.filter((contract) => contract.companyId === state.settings.selectedCompanyId);
}

export function getContractDetail(contractId: string) {
  const state = loadState();
  const contract = state.contracts.find((item) => item.id === contractId);
  if (!contract) {
    return null;
  }

  return {
    contract,
    document: state.documents.find((item) => item.contractId === contractId) ?? null,
    extraction: state.extractions.find((item) => item.contractId === contractId) ?? null,
    review: state.reviews.find((item) => item.contractId === contractId) ?? null,
    clauseReviews: state.clauseReviews.filter((item) => {
      const review = state.reviews.find((reviewItem) => reviewItem.id === item.reviewId);
      return review?.contractId === contractId;
    }),
    approvalInstance: state.approvalInstances.find((item) => item.contractId === contractId) ?? null,
    approvalFlow: (() => {
      const instance = state.approvalInstances.find((item) => item.contractId === contractId);
      return instance ? state.approvalFlows.find((item) => item.id === instance.flowId) ?? null : null;
    })(),
    approvalSteps: (() => {
      const instance = state.approvalInstances.find((item) => item.contractId === contractId);
      return instance ? state.approvalSteps.filter((item) => item.flowId === instance.flowId) : [];
    })(),
    activities: state.activities.filter((item) => item.contractId === contractId)
  };
}

export function createUploadedContract(input: { fileName: string; contractType: ContractType; counterparty?: string }) {
  const state = loadState();
  const idNumber = state.contracts.length + 1;
  const contractId = `ct-upload-${idNumber}`;
  const selectedCompanyId = state.settings.selectedCompanyId;
  const membership = getCurrentMembership(state);
  const title = `${input.contractType} 신규 검토안 ${idNumber}`;

  const contract: ContractRecord = {
    id: contractId,
    companyId: selectedCompanyId,
    title,
    type: input.contractType,
    counterparty: input.counterparty || '신규 거래처',
    ownerName: state.users.find((user) => user.id === state.settings.selectedUserId)?.name ?? '박준호',
    amount: input.contractType === 'NDA' ? '비금전' : '₩150,000,000',
    period: '2026-04-10 ~ 2027-04-09',
    status: '검토중',
    summary: '업로드된 문서에서 자동 추출된 계약 개요',
    uploadedAt: '2026-04-02 13:50'
  };

  const extraction: MetadataExtraction = {
    id: `ext-${contractId}`,
    contractId,
    contractName: title,
    contractType: input.contractType,
    parties: ['한결그룹', input.counterparty || '신규 거래처'],
    periodStart: '2026-04-10',
    periodEnd: '2027-04-09',
    amount: contract.amount,
    keyClauses: ['손해배상', '기밀유지', '자동갱신'],
    isConfirmed: false
  };

  const matchingPlaybook =
    state.playbooks.find((playbook) => playbook.companyId === selectedCompanyId && playbook.contractType === input.contractType) ??
    state.playbooks[0];

  const review: ReviewResult = {
    id: `rv-${contractId}`,
    contractId,
    playbookId: matchingPlaybook.id,
    generatedAt: '2026-04-02 13:51',
    summary: `${matchingPlaybook.contractType} 기준으로 생성된 리뷰 결과입니다.`
  };

  const reviewClauses: ClauseReview[] = [
    {
      id: `cr-${contractId}-1`,
      reviewId: review.id,
      clauseTitle: '손해배상 조항',
      riskLevel: '확인 필요',
      finding: matchingPlaybook.riskRule,
      recommendedText: matchingPlaybook.recommendation
    },
    {
      id: `cr-${contractId}-2`,
      reviewId: review.id,
      clauseTitle: '특약 조항',
      riskLevel: '권고',
      finding: '특약 조항의 적용 범위를 명확히 할 필요가 있습니다.',
      recommendedText: matchingPlaybook.allowedPhrase
    }
  ];

  const flow =
    state.approvalFlows.find((item) => item.companyId === selectedCompanyId && item.contractType === input.contractType) ??
    state.approvalFlows[0];
  const approvalInstance: ApprovalInstance = {
    id: `ai-${contractId}`,
    contractId,
    flowId: flow.id,
    currentStepOrder: 1,
    status: '진행중'
  };

  const activity: ActivityItem = {
    id: `ac-${contractId}`,
    companyId: selectedCompanyId,
    contractId,
    title: '신규 업로드 계약 생성',
    description: `${membership?.role ?? '사용자'} 컨텍스트에서 업로드된 신규 계약입니다.`,
    createdAt: '2026-04-02 13:52'
  };

  const document: ContractDocument = {
    id: `doc-${contractId}`,
    contractId,
    fileName: input.fileName,
    mimeType: 'application/pdf',
    rawTextPreview: `${input.fileName}\n- 계약 유형: ${input.contractType}\n- 자동 추출 대기 후 구조화 완료`
  };

  updateState((current) => {
    const nextState: DemoState = {
      ...current,
      contracts: [contract, ...current.contracts],
      documents: [document, ...current.documents],
      extractions: [extraction, ...current.extractions],
      reviews: [review, ...current.reviews],
      clauseReviews: [...reviewClauses, ...current.clauseReviews],
      approvalInstances: [approvalInstance, ...current.approvalInstances],
      activities: [activity, ...current.activities],
      metrics: [...current.metrics]
    };

    upsertMetric(nextState, selectedCompanyId);
    return nextState;
  });

  return contractId;
}

export function searchContracts(query: string, filters?: { type?: ContractType; status?: string }) {
  const state = loadState();
  const lower = query.trim().toLowerCase();

  return state.contracts
    .filter((contract) => contract.companyId === state.settings.selectedCompanyId)
    .filter((contract) => (!filters?.type ? true : contract.type === filters.type))
    .filter((contract) => (!filters?.status ? true : contract.status === filters.status))
    .filter((contract) => {
      if (!lower) {
        return true;
      }

      const terms = [
        contract.title,
        contract.type,
        contract.counterparty,
        contract.ownerName,
        contract.status,
        contract.summary
      ]
        .join(' ')
        .toLowerCase();

      return lower.split(/\s+/).every((word) => terms.includes(word));
    })
    .map(
      (contract): SearchResult => ({
        contract,
        reason: `${contract.status} · ${contract.type} · ${contract.counterparty}`
      })
    );
}

export function listPlaybooks() {
  const state = loadState();
  return state.playbooks.filter((playbook) => playbook.companyId === state.settings.selectedCompanyId);
}

export function updatePlaybook(id: string, patch: Partial<PlaybookTemplate>) {
  updateState((state) => ({
    ...state,
    playbooks: state.playbooks.map((item) =>
      item.id === id
        ? {
            ...item,
            ...patch,
            version: patch.version ?? bumpVersion(item.version)
          }
        : item
    )
  }));
}

function bumpVersion(version: string) {
  const [major, minor] = version.replace('v', '').split('.').map((value) => Number(value));
  return `v${major}.${minor + 1}`;
}

export function rerunReview(contractId: string) {
  updateState((state) => {
    const contract = state.contracts.find((item) => item.id === contractId);
    if (!contract) {
      return state;
    }

    const playbook =
      state.playbooks.find(
        (item) => item.companyId === contract.companyId && item.contractType === contract.type
      ) ?? state.playbooks[0];

    const currentReview = state.reviews.find((item) => item.contractId === contractId);
    if (!currentReview) {
      return state;
    }

    return {
      ...state,
      reviews: state.reviews.map((item) =>
        item.id === currentReview.id
          ? {
              ...item,
              playbookId: playbook.id,
              generatedAt: '2026-04-02 14:10',
              summary: `${playbook.version} 기준으로 리뷰를 다시 생성했습니다.`
            }
          : item
      ),
      clauseReviews: state.clauseReviews.map((item) =>
        item.reviewId === currentReview.id
          ? {
              ...item,
              finding: playbook.riskRule,
              recommendedText: playbook.recommendation
            }
          : item
      )
    };
  });
}

export function listApprovalFlows() {
  const state = loadState();
  return state.approvalFlows
    .filter((flow) => flow.companyId === state.settings.selectedCompanyId)
    .map((flow) => ({
      flow,
      steps: state.approvalSteps
        .filter((step) => step.flowId === flow.id)
        .sort((left, right) => left.order - right.order)
    }));
}

export function addApprovalStep(flowId: string) {
  updateState((state) => {
    const flowSteps = state.approvalSteps.filter((step) => step.flowId === flowId);
    const nextOrder = Math.max(...flowSteps.map((step) => step.order), 0) + 1;

    return {
      ...state,
      approvalSteps: [
        ...state.approvalSteps,
        {
          id: `as-${flowId}-${Date.now()}`,
          flowId,
          order: nextOrder,
          name: `추가 단계 ${nextOrder}`,
          role: '추가 검토자',
          parallel: false
        }
      ]
    };
  });
}

export function toggleApprovalStepParallel(stepId: string) {
  updateState((state) => ({
    ...state,
    approvalSteps: state.approvalSteps.map((step) =>
      step.id === stepId ? { ...step, parallel: !step.parallel } : step
    )
  }));
}

export function listOrgData() {
  const state = loadState();
  return {
    orgUnits: state.orgUnits.filter((unit) => unit.companyId === state.settings.selectedCompanyId),
    memberships: state.memberships.filter((membership) => membership.companyId === state.settings.selectedCompanyId),
    users: state.users
  };
}

export function updateMembershipRole(membershipId: string, role: CompanyMembership['role']) {
  updateState((state) => ({
    ...state,
    memberships: state.memberships.map((item) => (item.id === membershipId ? { ...item, role } : item))
  }));
}

export function listActivities() {
  const state = loadState();
  return state.activities
    .filter((item) => item.companyId === state.settings.selectedCompanyId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getVisibleProductNav(activeContractId?: string) {
  const state = loadState();
  const selectedCompanyContracts = state.contracts.filter((contract) => contract.companyId === state.settings.selectedCompanyId);
  const resolvedContractId = activeContractId ?? selectedCompanyContracts[0]?.id ?? state.contracts[0]?.id ?? 'ct-001';

  return [
    { to: '/', label: '대시보드', description: '운영 KPI와 최근 활동' },
    { to: '/contracts', label: '계약 관리', description: '계약 목록과 필터 허브' },
    {
      to: `/contracts/${resolvedContractId}`,
      label: '계약 상세 정보',
      description: '메타데이터와 리스크 허브',
      matchPrefixes: ['/contracts/ct-', '/contracts/ct-upload-']
    },
    {
      to: `/reviews/${resolvedContractId}`,
      label: 'AI 검토',
      description: '조항별 AI 분석과 권고',
      matchPrefixes: ['/reviews/']
    },
    {
      to: '/admin/playbooks',
      label: '거버넌스 설정',
      description: '권한과 정책 운영 관리',
      matchPrefixes: ['/admin/playbooks', '/admin/approvals', '/admin/org']
    }
  ];
}

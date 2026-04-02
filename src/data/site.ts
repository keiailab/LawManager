import type { NavItem } from '../types';

export const proposalNavItems: NavItem[] = [
  { to: '/proposal', label: '제안 개요', description: '프로젝트 이해와 제안 방향' },
  { to: '/proposal/ia', label: 'IA', description: '전체 시스템 IA와 범위 표시' },
  { to: '/proposal/screens', label: '화면 전략', description: '핵심 화면별 시연 설계' },
  { to: '/proposal/checklist', label: '체크리스트', description: '요청서 요구사항 추적' },
  { to: '/proposal/demo-flow', label: '데모 플로우', description: '고객 시연 순서와 메시지' }
];

export const proposalHighlights = [
  '운영 시스템 개발이 아닌 고객 시연용 프로토타입이라는 점을 전제로 범위를 설계합니다.',
  '대기업 고객이 중요하게 보는 조직, 권한, 결재, 기준관리 구조를 가장 먼저 보여줍니다.',
  '전체 IA와 현재 프로토타입 범위를 함께 보여줘 데모의 위치를 직관적으로 설명합니다.'
];

export const techStack = [
  'React + TypeScript 기반 프론트 중심 프로토타입',
  'localStorage 기반 더미 상태 저장으로 데모 중 상태 유지',
  'Playwright 기반 E2E 검증으로 시연 경로 자동 검증'
];

export const deliverables = [
  '시연 가능한 제품형 프로토타입',
  '전체 시스템 IA와 프로토타입 범위 표시',
  '핵심 화면 전략과 시연 시나리오',
  '요청서 기반 요구사항 체크리스트'
];

export const proposalRoiStats = [
  { label: '검토 시간 절감', value: '6,500+', detail: '연간 검토 시간 절감 가정치' },
  { label: 'ROI 메시지', value: '209%', detail: '엔터프라이즈 설득용 기준 지표 구조' },
  { label: '정책 일관성', value: '100%', detail: '플레이북 기준 일치형 리뷰 시연' }
];

export const proposalPlatformPillars = [
  {
    title: 'Automation',
    summary: '표준·반복 계약 검토를 자동화해 인하우스 법무팀의 선별 업무를 줄입니다.'
  },
  {
    title: 'Digital Playbook',
    summary: '허용/금지 문구, 리스크 규칙, 수정 권고안을 정책 자산으로 관리합니다.'
  },
  {
    title: 'AI Review',
    summary: '계약 문맥을 읽고 조항별 리스크와 레드라인 제안을 구조화해 제공합니다.'
  },
  {
    title: 'Analytics',
    summary: '리스크 분포, 처리 속도, 결재 정체 구간을 시각화해 운영 인사이트를 제공합니다.'
  }
];

export const proposalWorkflowSteps = [
  {
    title: '정책 선택',
    detail: '회사와 계약 유형에 맞는 플레이북과 승인 경로를 먼저 선택합니다.'
  },
  {
    title: '문서 업로드 및 추출',
    detail: '문서 업로드 후 핵심 메타데이터와 주요 조항이 구조화됩니다.'
  },
  {
    title: 'AI 리뷰 및 레드라인',
    detail: '정책 기준에 맞는 리스크 표시, 권고 문안, 결재 흐름까지 연결합니다.'
  }
];

export const proposalTrustHighlights = [
  '기업 고객이 요구하는 권한, 결재, 활동 이력, 정책 버전 관리 구조 포함',
  '시연 중 언제든 데모 초기화 가능해 동일한 영업/제안 흐름 반복 가능',
  'localStorage 기반 상태 저장으로 브라우저 단독 시연 환경에서 안정적 반복 재현'
];

export const iaSections = [
  {
    title: '사용자 영역',
    type: '프로토타입 범위',
    items: ['대시보드', '계약 등록', '계약 목록', '계약 상세', '계약 검색', 'AI 리뷰 결과', '결재함']
  },
  {
    title: '관리자 영역',
    type: '프로토타입 범위',
    items: ['체크리스트 관리', '플레이북 관리', '결재 프로세스 관리', '조직도 관리', '사용자 관리', '권한 관리']
  },
  {
    title: '향후 확장 범위',
    type: '향후 확장 범위',
    items: ['전자서명', '실제 외부 연계', '스케줄 / 알림 고도화', '감사 로그 고도화', '리포트 고도화']
  }
];

export const screenBlueprints = [
  {
    title: '조직도 / 권한 관리',
    audience: '관리자',
    message: '한 명의 자연인이 여러 회사에서 서로 다른 역할을 가질 수 있다는 점을 설득력 있게 보여주는 화면',
    demoPoint: '회사 전환 시 메뉴와 데이터 접근 범위가 바뀌는 장면을 시연',
    dataPlan: '회사 A/B와 동일 사용자 역할 차이를 더미 데이터로 구성'
  },
  {
    title: '결재 프로세스 빌더',
    audience: '관리자',
    message: '순차결재, 병렬결재, 단계 추가, 역할 지정이 가능한 엔터프라이즈형 결재 설계 UX',
    demoPoint: '3단계 재무/구매 병렬 검토를 포함한 샘플 플로우를 시연',
    dataPlan: '고정된 샘플 프로세스 템플릿과 단계 카드 사용'
  },
  {
    title: '체크리스트 / 플레이북 관리',
    audience: '관리자',
    message: 'AI가 회사 기준에 따라 리뷰된다는 메시지를 주는 기준관리 화면',
    demoPoint: '허용/금지 문구, 리스크 판단 기준, 버전 정보를 함께 시연',
    dataPlan: '계약 유형별 버전 데이터와 규칙 예시를 테이블로 구성'
  },
  {
    title: '계약 업로드 및 AI 추출',
    audience: '실무 사용자',
    message: '계약 업로드 후 계약명, 유형, 당사자, 기간, 금액, 주요 조항이 구조화되는 장면',
    demoPoint: '업로드 후 AI 추출 결과를 검토하고 보정하는 흐름을 시연',
    dataPlan: '샘플 NDA 계약서와 추출 결과 패널 구성'
  },
  {
    title: '계약 상세 허브',
    audience: '실무 사용자',
    message: '원문, 메타데이터, AI 리뷰, 결재, 활동 이력을 하나의 허브에서 연결',
    demoPoint: '계약 하나 중심으로 정보가 수렴되는 구조를 시연',
    dataPlan: '탭 또는 다중 패널 조합으로 허브 레이아웃 구성'
  }
];

export const demoSteps = [
  {
    label: '1단계',
    title: '회사 선택과 사용자 컨텍스트 소개',
    screen: '/',
    value: '동일 사용자가 회사별로 다른 역할을 가진다는 구조를 첫 화면에서 각인'
  },
  {
    label: '2단계',
    title: '조직도 및 권한 관리 시연',
    screen: '/admin/org',
    value: '대기업이 중요하게 보는 운영 통제 구조를 먼저 보여줌'
  },
  {
    label: '3단계',
    title: '결재 프로세스 빌더 시연',
    screen: '/admin/approvals',
    value: '복잡한 승인 구조도 화면으로 설계 가능하다는 메시지 전달'
  },
  {
    label: '4단계',
    title: '체크리스트 / 플레이북 기준 소개',
    screen: '/admin/playbooks',
    value: 'AI 리뷰가 회사 기준에 연결된다는 신뢰를 형성'
  },
  {
    label: '5단계',
    title: '계약 업로드와 AI 추출 흐름',
    screen: '/contracts/new',
    value: '문서 기반 UX가 자연스럽게 이어지는 핵심 장면'
  },
  {
    label: '6단계',
    title: 'AI 리뷰 결과와 계약 상세 허브',
    screen: '/contracts/ct-001',
    value: '검토, 승인, 문서 정보가 하나의 흐름으로 연결됨을 시연'
  },
  {
    label: '7단계',
    title: '자연어 검색과 대시보드 마무리',
    screen: '/search',
    value: '운영 중 활용 장면과 확장 가능성을 요약'
  }
];

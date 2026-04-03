import type { NavItem } from '../types';

export const proposalNavItems: NavItem[] = [
  { to: '/proposal', label: '제안 개요', description: '프로젝트 이해와 제안 방향' },
  { to: '/proposal/prd', label: 'PRD', description: 'Product Requirements Document 두 버전 비교' },
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

export const proposalPrdVersions = [
  {
    id: 'v1',
    label: 'Version 1',
    mode: 'Execution Lens',
    title: '구현 계획형 PRD',
    summary: '빈 저장소에서 React 단일 앱으로 제안서 사이트를 조립하는 실행 중심 문서입니다.',
    intent: '무엇을 어떤 순서로 구현할지, 어떤 테스트로 검증할지 빠르게 합의하는 데 초점을 둡니다.',
    audience: 'PM, 프론트엔드 구현자, QA',
    timing: '개발 착수 직전, 태스크 분해와 검증 설계 단계',
    primaryDeliverable: '구현 순서, 태스크 범위, 테스트 기준',
    sourceTitle: '2026-04-02-proposal-website.md',
    sourceDescription: '프로젝트 스캐폴딩부터 페이지 구현, 테스트 전략까지 단계형으로 정리한 실행 문서',
    emphasis: ['스캐폴딩', '데이터 모델', '라우팅', '페이지별 구현', '테스트 순서'],
    highlights: [
      '실제 구현 순서에 맞춰 페이지와 테스트를 함께 정의합니다.',
      '체크리스트 데이터를 단일 진실 원천으로 두는 구조를 명확히 못 박습니다.',
      '납품 기준을 문서가 아니라 동작하는 사이트와 자동화 테스트로 둡니다.'
    ],
    sections: [
      {
        heading: 'Goal',
        body: [
          '제작요청서의 요구사항을 빠짐없이 반영한 하이브리드형 제안서 웹사이트를 구현하고 자동화 테스트로 검증합니다.',
          '단일 앱 구조 안에서 메인 제안서와 상세 페이지를 모두 완성하는 것이 핵심입니다.'
        ]
      },
      {
        heading: 'Architecture',
        body: [
          '정적 데이터 소스를 중심으로 메인 제안서와 상세 페이지를 구성합니다.',
          '체크리스트 데이터를 단일 진실 원천으로 두고 IA, 화면전략, 시연흐름 페이지가 같은 데이터를 재사용합니다.'
        ]
      },
      {
        heading: 'Execution Plan',
        body: [
          '프로젝트 스캐폴딩부터 체크리스트 데이터, 라우팅, 홈, IA, 화면 전략, 체크리스트, 데모 플로우까지 순차적으로 구현합니다.',
          '각 단계는 먼저 실패하는 테스트를 만들고, 최소 구현으로 통과시키는 흐름으로 설계됩니다.'
        ]
      },
      {
        heading: 'Validation',
        body: [
          'Vitest, Testing Library, Playwright를 사용해 데이터, UI, 주요 탐색 경로를 검증합니다.',
          '문서가 아니라 실제 동작하는 제안서 사이트를 납품 기준으로 삼습니다.'
        ]
      }
    ]
  },
  {
    id: 'v2',
    label: 'Version 2',
    mode: 'Strategy Lens',
    title: '설계 해석형 PRD',
    summary: '고객 설득 논리와 제품 감각을 어떻게 페이지 구조로 번역할지 정리한 해석 중심 문서입니다.',
    intent: '왜 이 범위가 중요하고, 어떤 UX 장면으로 고객을 설득할지를 먼저 선명하게 만드는 데 초점을 둡니다.',
    audience: '제안 담당자, PM, 디자인 리드',
    timing: '범위 합의, 제안 메시지 정리, 화면 방향 확정 단계',
    primaryDeliverable: '요구사항 해석, 설득 포인트, UX 구조',
    sourceTitle: '2026-04-02-proposal-website-design.md',
    sourceDescription: '제작요청서를 어떻게 읽고 어떤 정보 구조와 디자인 톤으로 번역할지 설명한 설계 문서',
    emphasis: ['요구사항 해석', '우선순위', '사이트 정보 구조', '디자인 방향', '시연 장면'],
    highlights: [
      'AI 기능보다 조직, 권한, 결재, 기준관리 같은 통제 구조를 우선 설득 포인트로 둡니다.',
      '메인 요약과 상세 근거 페이지가 한 세트로 움직여야 한다는 원칙을 정리합니다.',
      '제안서인데 이미 제품 운영 구조가 보이는 톤을 목표로 디자인 방향을 고정합니다.'
    ],
    sections: [
      {
        heading: 'Product Framing',
        body: [
          '이 사이트는 단순 소개 자료가 아니라 대기업 고객 시연용 제안서이자 내부 실행용 요구사항 추적 보드 역할을 동시에 수행해야 합니다.',
          '핵심 성공 기준은 요구사항 누락 없이, 어느 페이지와 시연 장면으로 반영되는지 바로 읽히는 구조입니다.'
        ]
      },
      {
        heading: 'Requirement Interpretation',
        body: [
          '고객이 원하는 것은 단일 AI 계약 분석기가 아니라 조직, 권한, 결재, 기준관리까지 포함한 엔터프라이즈 운영 구조입니다.',
          '따라서 설득 포인트도 AI 성능보다 통제 구조와 운영 맥락이 먼저 보여야 합니다.'
        ]
      },
      {
        heading: 'Information Architecture',
        body: [
          '메인 페이지는 제안 개요를 요약하고, IA, 화면 전략, 체크리스트, 데모 플로우 같은 상세 페이지가 근거를 분리해서 설명합니다.',
          '메인 요약과 상세 근거가 한 세트로 움직여야 제안서와 프로토타입 사이의 간극이 줄어듭니다.'
        ]
      },
      {
        heading: 'Design Direction',
        body: [
          '톤은 엔터프라이즈 B2B, ServiceNow나 Salesforce 계열처럼 안정적이고 정보 밀도가 높은 방향을 지향합니다.',
          '짙은 네이비와 슬레이트 기반 팔레트에 청록, 앰버, 레드 액센트를 사용해 운영 화면 같은 인상을 강화합니다.'
        ]
      },
      {
        heading: 'Demo Translation',
        body: [
          '각 기능은 설명이 아니라 실제 시연 장면으로 번역되어야 합니다.',
          '예를 들어 조직도와 권한 관리는 회사 전환 시 메뉴와 데이터가 바뀌는 장면, 체크리스트와 플레이북은 버전 관리 테이블과 리스크 기준으로 보여주는 식입니다.'
        ]
      }
    ]
  }
] as const;

export const proposalPrdComparePoints = [
  {
    label: '주된 질문',
    v1: '무엇을 어떤 순서로 구현할 것인가',
    v2: '왜 이 구조가 고객 설득에 유리한가'
  },
  {
    label: '문서 성격',
    v1: '실행 체크리스트와 작업 순서',
    v2: '요구사항 해석과 UX 방향성'
  },
  {
    label: '사용 시점',
    v1: '개발 착수와 테스트 설계 직전',
    v2: '범위 합의와 제안 메시지 정리 단계'
  },
  {
    label: '가장 중요한 산출',
    v1: '구현 태스크 분해와 검증 계획',
    v2: 'IA, 화면 전략, 시연 장면, 디자인 톤'
  }
] as const;

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

# AI 법무관리시스템 제안서 웹페이지 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 제작요청서의 요구사항을 빠짐없이 반영한 하이브리드형 제안서 웹사이트를 구현하고 자동화 테스트로 검증한다.

**Architecture:** 빈 저장소에 React 기반 단일 앱을 만들고, 정적 데이터 소스를 중심으로 메인 제안서와 상세 페이지를 구성한다. 체크리스트 데이터를 단일 진실 원천으로 두고, IA/화면전략/시연흐름 페이지가 이 데이터를 재사용하도록 설계한다.

**Tech Stack:** Vite, React, TypeScript, React Router, Vitest, Testing Library, Playwright

---

### Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `playwright.config.ts`
- Create: `vitest.setup.ts`

**Step 1: 스캐폴딩 명령 실행**

Run: `npm create vite@latest . -- --template react-ts`
Expected: Vite React TypeScript 템플릿 생성

**Step 2: 테스트 도구 추가**

Run: `npm install`
Expected: 기본 의존성 설치 완료

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test`
Expected: 테스트 의존성 설치 완료

**Step 3: 최소 설정 파일 정리**

- Vitest와 Playwright가 동작하도록 설정 작성
- 기본 앱 엔트리 유지

**Step 4: 기본 테스트 실행**

Run: `npm test -- --run`
Expected: 아직 테스트가 없거나 기본 상태로 실행됨

### Task 2: 요구사항 데이터 모델 작성

**Files:**
- Create: `src/data/checklist.ts`
- Create: `src/data/site.ts`
- Create: `src/types.ts`
- Test: `src/data/checklist.test.ts`

**Step 1: 실패하는 테스트 작성**

- 체크리스트 항목이 요청서 핵심 카테고리를 모두 포함하는지 검증
- 주요 기능 8개와 화면 구성 9개, IA 요구사항이 포함되는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/data/checklist.test.ts`
Expected: 모듈 또는 데이터 부재로 FAIL

**Step 3: 최소 구현**

- 타입 정의
- 체크리스트 데이터
- 사이트 섹션 메타데이터 정의

**Step 4: 통과 확인**

Run: `npm test -- --run src/data/checklist.test.ts`
Expected: PASS

### Task 3: 라우팅과 레이아웃 골격 구현

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/Layout.tsx`
- Create: `src/components/SidebarNav.tsx`
- Create: `src/components/PageHero.tsx`
- Test: `src/App.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 메인 네비게이션이 5개 페이지 링크를 보여주는지 검증
- 홈 진입 시 핵심 타이틀이 보이는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/App.test.tsx`
Expected: 라우터/레이아웃 부재로 FAIL

**Step 3: 최소 구현**

- React Router 기반 라우팅
- 공통 레이아웃
- 상단 또는 사이드 네비게이션

**Step 4: 통과 확인**

Run: `npm test -- --run src/App.test.tsx`
Expected: PASS

### Task 4: 메인 제안서 페이지 구현

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/components/SectionCard.tsx`
- Create: `src/components/ChecklistSummary.tsx`
- Test: `src/pages/HomePage.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 메인 페이지에 프로젝트 이해, 핵심 제안, 범위, 기술 스택, 산출물 섹션이 보이는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/pages/HomePage.test.tsx`
Expected: HomePage 부재로 FAIL

**Step 3: 최소 구현**

- 롱스크롤 메인 페이지
- 핵심 문단과 프리뷰 카드
- 체크리스트 요약

**Step 4: 통과 확인**

Run: `npm test -- --run src/pages/HomePage.test.tsx`
Expected: PASS

### Task 5: IA 상세 페이지 구현

**Files:**
- Create: `src/pages/IAPage.tsx`
- Create: `src/components/IATree.tsx`
- Test: `src/pages/IAPage.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 사용자 영역, 관리자 영역, 프로토타입 범위, 향후 확장 범위가 표시되는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/pages/IAPage.test.tsx`
Expected: IAPage 부재로 FAIL

**Step 3: 최소 구현**

- IA 트리 구조
- 강조 배지/범례

**Step 4: 통과 확인**

Run: `npm test -- --run src/pages/IAPage.test.tsx`
Expected: PASS

### Task 6: 화면 전략 페이지 구현

**Files:**
- Create: `src/pages/ScreensPage.tsx`
- Create: `src/components/ScreenBlueprintCard.tsx`
- Test: `src/pages/ScreensPage.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 9개 주요 화면 중 핵심 몇 개가 제목과 시연 포인트를 포함하는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/pages/ScreensPage.test.tsx`
Expected: ScreensPage 부재로 FAIL

**Step 3: 최소 구현**

- 화면 카드 목록
- 목적, 사용자, 시연 포인트, 더미 데이터 방식 표시

**Step 4: 통과 확인**

Run: `npm test -- --run src/pages/ScreensPage.test.tsx`
Expected: PASS

### Task 7: 체크리스트 페이지 구현

**Files:**
- Create: `src/pages/ChecklistPage.tsx`
- Create: `src/components/ChecklistTable.tsx`
- Test: `src/pages/ChecklistPage.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 체크리스트 페이지가 상태, 반영 위치, 시연 방식 컬럼을 렌더링하는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/pages/ChecklistPage.test.tsx`
Expected: ChecklistPage 부재로 FAIL

**Step 3: 최소 구현**

- 표 또는 카드 기반 체크리스트 뷰
- 카테고리별 그룹핑

**Step 4: 통과 확인**

Run: `npm test -- --run src/pages/ChecklistPage.test.tsx`
Expected: PASS

### Task 8: 데모 플로우 페이지 구현

**Files:**
- Create: `src/pages/DemoFlowPage.tsx`
- Create: `src/components/DemoStep.tsx`
- Test: `src/pages/DemoFlowPage.test.tsx`

**Step 1: 실패하는 테스트 작성**

- 데모 플로우 페이지에 순서화된 단계와 연결 화면 정보가 보이는지 검증

**Step 2: 실패 확인**

Run: `npm test -- --run src/pages/DemoFlowPage.test.tsx`
Expected: DemoFlowPage 부재로 FAIL

**Step 3: 최소 구현**

- 단계형 타임라인 UI
- 메시지/연결화면/전달가치 표시

**Step 4: 통과 확인**

Run: `npm test -- --run src/pages/DemoFlowPage.test.tsx`
Expected: PASS

### Task 9: 비주얼 완성도 정리

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/*.tsx`

**Step 1: 스타일 부족점 확인**

- 엔터프라이즈 톤, 정보 밀도, 레이아웃 일관성, 강조 색상 점검

**Step 2: 최소 스타일 구현**

- 디자인 토큰
- 패널, 테이블, 타임라인, 배지, 히어로 섹션 스타일
- 반응형 레이아웃

**Step 3: 검증**

Run: `npm test -- --run`
Expected: 모든 단위/UI 테스트 PASS

### Task 10: Playwright E2E 작성

**Files:**
- Create: `tests/e2e/proposal-site.spec.ts`

**Step 1: 실패하는 E2E 작성**

- 홈에서 IA/화면전략/체크리스트/데모플로우 이동
- 핵심 문구 확인

**Step 2: 실패 확인**

Run: `npx playwright test`
Expected: 초기 렌더링 또는 페이지 구현 미완으로 FAIL

**Step 3: 구현 보완**

- 선택자 안정화
- 링크 및 접근성 이름 정리

**Step 4: 통과 확인**

Run: `npx playwright test`
Expected: PASS

### Task 11: 최종 검증

**Files:**
- Modify: 필요 시 전체

**Step 1: 빌드 검증**

Run: `npm run build`
Expected: 빌드 성공

**Step 2: 전체 테스트 검증**

Run: `npm test -- --run`
Expected: PASS

Run: `npx playwright test`
Expected: PASS

**Step 3: 완료 상태 정리**

- 요청서 누락 여부 재검토
- 체크리스트 상태 최종 점검

# LawManager — AI 법무관리시스템 (제안서 + PoC)

> 계약 관리·AI 조항 검토·결재 흐름을 한 화면에 묶은 *제안서 + 동작하는 프론트엔드 PoC*. 백엔드 없이 브라우저 안에서만 동작한다.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![React 19](https://img.shields.io/badge/React-19-149ECA.svg)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg)

## 소개

React 19 + Vite + TypeScript 기반의 zero-backend 데모다. `/proposal` 경로는 프로젝트 이해·IA·핵심 화면·체크리스트·데모 플로우를 묶은 제안 보드이고, 나머지 경로(`/`, `/contracts`, `/reviews/...`, `/admin/...`)는 실제로 클릭하며 흐름을 확인할 수 있는 법무 워크스페이스 PoC다. 모든 상태는 브라우저 `localStorage` 에 시드되어 서버 없이 재현된다.

## 기능 (PoC 구현 범위)

- **대시보드** — 회사별 계약/리스크/결재 KPI와 최근 활동 (`src/pages/DashboardPage.tsx`)
- **계약 관리** — 목록·필터·검색, 신규 계약 업로드 시 메타데이터/리뷰 자동 시드 (`ContractsPage`, `ContractUploadPage`)
- **계약 상세** — 추출 메타데이터·원문 미리보기·결재 단계 한눈에 보기 (`ContractDetailPage`)
- **AI 조항 검토** — 플레이북 기준 조항별 위험도(고위험/확인 필요/권고)와 권고 문구, 재실행 (`ReviewPage`)
- **거버넌스 설정** — 플레이북·결재 흐름(병렬 단계 포함)·조직/권한 관리 (`AdminPlaybooksPage`, `AdminApprovalsPage`, `AdminOrgPage`)
- **멀티 회사 컨텍스트** — 회사 전환 시 계약·결재·조직 데이터가 함께 전환

## 빠른 시작

```bash
pnpm install
pnpm dev          # 개발 서버 (Vite)
pnpm build        # tsc + vite build
pnpm test:run     # vitest 단위 테스트
pnpm test:e2e     # playwright E2E
```

## 배포

GitHub Pages / Vercel 정적 배포 호환 (`pnpm build` 산출물을 `dist/` 에서 서빙).

## 기여

기여 절차는 [CONTRIBUTING.md](CONTRIBUTING.md) 참조 — 정본은 GitLab, GitHub 는 읽기 전용 미러다.

## 라이선스

[MIT License](LICENSE).

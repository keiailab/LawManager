# LawManager — AI 법무관리시스템 제안서

React 19 + Vite + TypeScript 기반의 법무 관리 시스템 제안서/PoC. 로컬 브라우저 IndexedDB (`dexie`) 만으로 동작하는 zero-backend 형태.

## 스택

- React 19.2 + react-router-dom 7
- Vite 8 + TypeScript 6
- dexie 4 (IndexedDB) + dexie-react-hooks
- Vitest + Playwright (단위/E2E)

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

## 라이선스

ISC License — `LICENSE` 파일 참조. `package.json` `license` 필드 정합.

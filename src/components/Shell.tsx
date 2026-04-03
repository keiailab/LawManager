import { NavLink, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import type { NavItem } from '../types';

type ThemeId = 'justice-core-pro' | 'azure-justice-ledger';

const THEME_STORAGE_KEY = 'lawmanager-ui-theme';

const themeOptions: Array<{ id: ThemeId; label: string }> = [
  { id: 'justice-core-pro', label: 'Justice Core Pro' },
  { id: 'azure-justice-ledger', label: 'Azure Justice Ledger' }
];

function getThemeStorage() {
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

const navIconMap: Record<string, string> = {
  대시보드: 'dashboard',
  계약: 'description',
  '계약 관리': 'description',
  '계약 상세 정보': 'overview',
  검색: 'search',
  '시연 모드': 'slideshow',
  PRD: 'article',
  기준관리: 'rule_settings',
  '결재 빌더': 'fact_check',
  'AI 분석': 'psychology',
  'AI 검토': 'psychology',
  '승인 관리': 'fact_check',
  '거버넌스 설정': 'settings',
  '시스템 설정': 'settings',
  '조직/권한': 'account_tree',
  '제안 개요': 'overview',
  IA: 'schema',
  '화면 전략': 'dashboard_customize',
  체크리스트: 'checklist',
  '데모 플로우': 'play_circle'
};

function getNavMatchScore(item: NavItem, pathname: string) {
  let bestScore = -1;

  if (item.to === '/') {
    if (pathname === '/') {
      bestScore = 2_000;
    }
  } else if (pathname === item.to) {
    bestScore = 2_000 + item.to.length;
  } else if (pathname.startsWith(`${item.to}/`)) {
    bestScore = item.to.length;
  }

  item.matchPrefixes?.forEach((prefix) => {
    if (pathname.startsWith(prefix)) {
      bestScore = Math.max(bestScore, 1_000 + prefix.length);
    }
  });

  return bestScore;
}

export function Shell({
  label,
  navItems,
  children,
  footer,
  variant = 'product',
  topbarTitle,
  topbarSubtitle,
  topbarMeta,
  topbarAvatarUrl,
  showNavDescriptions = true,
  showThemeSwitch = true,
  headerMode = 'stacked'
}: {
  label: string;
  navItems: NavItem[];
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'product' | 'proposal';
  topbarTitle?: string;
  topbarSubtitle?: string;
  topbarMeta?: ReactNode;
  topbarAvatarUrl?: string;
  showNavDescriptions?: boolean;
  showThemeSwitch?: boolean;
  headerMode?: 'stacked' | 'inline';
}) {
  const [theme, setTheme] = useState<ThemeId>(() => {
    const storage = getThemeStorage();
    if (!storage) {
      return 'justice-core-pro';
    }

    const savedTheme = storage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'azure-justice-ledger' ? savedTheme : 'justice-core-pro';
  });
  const location = useLocation();
  const isProductShell = variant === 'product';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const storage = getThemeStorage();
    if (storage) {
      storage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const activeItem = navItems.reduce<NavItem | null>((bestItem, item) => {
    const currentScore = getNavMatchScore(item, location.pathname);
    const bestScore = bestItem ? getNavMatchScore(bestItem, location.pathname) : -1;
    return currentScore > bestScore ? item : bestItem;
  }, null);

  const resolvedTitle = topbarTitle ?? (variant === 'product' ? 'The Digital Jurist' : 'Proposal Workspace');
  const resolvedSubtitle =
    topbarSubtitle ??
    (variant === 'product' ? '계약 검토, 승인, 정책 운영을 하나의 워크스페이스로 연결합니다.' : '요구사항 추적과 시연 전략을 동시에 보여주는 제안 보드');
  const resolvedKicker = variant === 'product' ? 'Enterprise Legal Ops' : 'Proposal Control';
  const resolvedSidebarCopy = variant === 'product' ? 'Senior Legal Counsel Workspace' : 'IA, Demo Flow, Scope Tracking';

  return (
    <div className={`app-shell shell-${variant} shell-header-${headerMode}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          {variant === 'proposal' ? <p className="sidebar-kicker">{resolvedKicker}</p> : null}
          <div className="sidebar-brand-lockup">
            {isProductShell ? <span className="sidebar-brand-mark">L</span> : null}
            <div className="sidebar-brand-copy">
              <p className="sidebar-title">{label}</p>
              <p className="sidebar-subtitle">{resolvedSidebarCopy}</p>
            </div>
          </div>
        </div>

        <nav aria-label="주요 페이지" className="sidebar-nav">
          {navItems.map((item) => {
            const isCurrent = activeItem?.to === item.to && activeItem.label === item.label;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/' || item.to === '/proposal'}
                aria-label={item.label}
                aria-current={isCurrent ? 'page' : undefined}
                className={() => `nav-link${isCurrent ? ' active' : ''}`}
              >
                <span aria-hidden="true" className="material-symbols-outlined nav-link-icon">
                  {navIconMap[item.label] ?? 'radio_button_checked'}
                </span>
                <span className="nav-link-copy">
                  <strong>{item.label}</strong>
                  {showNavDescriptions ? <small>{item.description}</small> : null}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          {variant === 'product' ? (
            <div className="sidebar-product-actions">
              <NavLink aria-label="새 계약서 작성" className="sidebar-primary-cta" to="/contracts/new">
                <span aria-hidden="true" className="material-symbols-outlined">
                  add
                </span>
                <span>새 계약서 작성</span>
              </NavLink>
              <button type="button" className="sidebar-help-link">
                <span aria-hidden="true" className="material-symbols-outlined">
                  help
                </span>
                <span>도움말</span>
              </button>
            </div>
          ) : null}
          {showThemeSwitch ? (
            <div className="sidebar-section">
              <p className="sidebar-label">테마 버전 전환</p>
              <div className="theme-switch" role="group" aria-label="테마 버전 전환">
                {themeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`theme-switch-button${theme === option.id ? ' active' : ''}`}
                    aria-pressed={theme === option.id}
                    onClick={() => setTheme(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {footer ? <div className="sidebar-footer">{footer}</div> : null}
        </div>
      </aside>

      <div className="shell-main">
        <header className="shell-topbar">
          <div className="shell-topbar-primary">
            <div className="shell-topbar-copy">
              <div className="shell-topbar-title-row">
                <strong>{resolvedTitle}</strong>
                {headerMode === 'stacked' && activeItem ? <span className="topbar-route-chip">{activeItem.label}</span> : null}
                {headerMode === 'inline' ? <span className="topbar-divider" /> : null}
                {headerMode === 'inline' ? <span className="topbar-inline-subtitle">{resolvedSubtitle}</span> : null}
              </div>
              {headerMode === 'stacked' ? <p>{resolvedSubtitle}</p> : null}
            </div>

            {isProductShell ? (
              <label className="topbar-search-field">
                <span aria-hidden="true" className="material-symbols-outlined">
                  search
                </span>
                <input aria-label="상단 검색" type="search" placeholder="사건 번호 또는 계약명 검색" />
              </label>
            ) : null}
          </div>

          <div className="shell-topbar-actions">
            {isProductShell ? (
              <button type="button" className="topbar-button topbar-context-button" aria-label="회사 컨텍스트">
                <span aria-hidden="true" className="material-symbols-outlined">
                  corporate_fare
                </span>
                <span>회사 선택</span>
              </button>
            ) : (
              <button type="button" aria-label="검색" className="topbar-icon-button">
                <span aria-hidden="true" className="material-symbols-outlined">
                  search
                </span>
              </button>
            )}
            <button type="button" aria-label="알림" className="topbar-icon-button topbar-icon-button-alert">
              <span aria-hidden="true" className="material-symbols-outlined">
                notifications
              </span>
            </button>
            {topbarMeta ? (
              <div className="shell-profile">
                {topbarAvatarUrl ? (
                  <img className="shell-profile-avatar-image" src={topbarAvatarUrl} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <span aria-hidden="true" className="shell-profile-avatar">👤</span>
                )}
                {topbarMeta}
              </div>
            ) : null}
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { NavItem } from '../types';

export function Shell({
  label,
  navItems,
  children,
  footer
}: {
  label: string;
  navItems: NavItem[];
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <p className="sidebar-label">{label}</p>
        <nav aria-label="주요 페이지">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        {footer ? <div className="sidebar-footer">{footer}</div> : null}
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

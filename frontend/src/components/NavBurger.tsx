'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type NavItem = { label?: string; href?: string };

export default function NavBurger({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <button
        className={`nav-burger${open ? ' is-open' : ''}`}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="nav-drawer"
        className={`nav-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="nav-drawer-inner">
          {items.map((item, i) => (
            <a
              key={`${item.href}-${i}`}
              className={`nav-drawer-link${isActive(item.href) ? ' is-active' : ''}`}
              href={item.href ?? '#'}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="nav-drawer-scrim"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

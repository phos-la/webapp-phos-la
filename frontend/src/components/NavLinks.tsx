'use client';

import { usePathname } from 'next/navigation';

type NavItem = { label?: string; href?: string };

/**
 * Renders the nav link list and marks one item active based on the current
 * pathname. Root ('/') matches exactly; any other href matches if the
 * pathname equals it OR starts with `${href}/` (so `/blog/foo` lights up
 * "Field Notes"). Kept as a small client island so the surrounding Nav can
 * stay a server component.
 */
export default function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? '/';

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="nav-links" role="menubar">
      {items.map((item, i) => (
        <a
          key={`${item.href}-${i}`}
          className={`nav-link${isActive(item.href) ? ' is-active' : ''}`}
          href={item.href ?? '#'}
          role="menuitem"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import SocialIcons from '../ui/SocialIcons';
import BookNowButton from '../ui/BookNowButton';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '../../lib/nav';
import { useScrolled } from '../../lib/useScrolled';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Transparent over the home hero until the visitor scrolls 80px.
  const transparent = isHome && !scrolled && !menuOpen;

  const shell = transparent
    ? 'bg-transparent border-transparent'
    : 'bg-white/95 backdrop-blur-sm border-hairline';
  const linkColor = transparent ? 'text-white' : 'text-espresso';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${shell}`}
      >
        {/* Light top fade keeps white text legible over bright hero images */}
        {transparent && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
          />
        )}

        <div className="container-content flex h-20 items-center justify-between gap-6 lg:h-24">
          <Logo tone={transparent ? 'white' : 'gold'} className="shrink-0" />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={`group relative label text-[0.6875rem] ${linkColor} transition-colors duration-500`}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        <span
                          className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop right: socials + Book Us Now */}
          <div className="hidden items-center gap-6 lg:flex">
            <SocialIcons
              only={['instagram', 'facebook', 'pinterest']}
              tone={transparent ? 'white' : 'gold'}
              size="text-sm"
            />
            <BookNowButton size="sm" placement="header" />
          </div>

          {/* Mobile right: WhatsApp icon + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <BookNowButton variant="icon" placement="header-mobile" />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    transparent ? 'bg-white' : 'bg-gold'
                  } ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    transparent ? 'bg-white' : 'bg-gold'
                  } ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

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

  // Home: full-width and transparent over the hero until the visitor scrolls 80px.
  // Otherwise (scrolled, sub-pages, menu open): a floating white pill bar.
  const floating = !(isHome && !scrolled) || menuOpen;

  const bar = floating
    ? 'mt-3 h-16 max-w-[1180px] rounded-full border-hairline bg-white/95 px-5 shadow-[0_10px_30px_rgba(43,37,32,0.10)] backdrop-blur-md md:mt-4 md:px-8'
    : 'mt-0 h-20 max-w-content border-transparent bg-transparent px-6 md:px-10 lg:h-24';
  const linkColor = 'text-espresso';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-6">
        <div
          className={`mx-auto flex w-full items-center justify-between gap-6 border transition-all duration-500 ease-out ${bar}`}
        >
          <Logo
            className={`shrink-0 origin-left transition-transform duration-500 ${floating ? 'scale-[0.85]' : 'scale-100'}`}
          />

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
              only={['instagram', 'facebook', 'whatsappChannel']}
              tone="gold"
              size="text-sm"
            />
            <BookNowButton
              size="sm"
              placement="header"
              className={`transition-[border-radius] duration-500 ${floating ? 'rounded-full' : 'rounded-none'}`}
            />
          </div>

          {/* Mobile right: WhatsApp icon + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <BookNowButton
              variant="icon"
              placement="header-mobile"
              className={floating ? 'rounded-full' : 'rounded-none'}
            />
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
                  className={`absolute left-0 h-px w-full bg-gold transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-gold transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
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

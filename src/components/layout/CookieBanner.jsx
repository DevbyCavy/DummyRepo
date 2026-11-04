import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { useConsent } from '../../lib/consent';

/** Cookie prompt — bottom-left card on desktop, full-width sheet on mobile. */
export default function CookieBanner() {
  const { bannerOpen, acceptAll, essentialOnly, consent } = useConsent();
  const acceptRef = useRef(null);

  // When reopened from "Cookie settings", move focus into the banner.
  useEffect(() => {
    if (bannerOpen && consent != null) acceptRef.current?.focus();
  }, [bannerOpen, consent]);

  if (!bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-3 bottom-3 z-[55] animate-[cookie-in_0.5s_ease-out] md:inset-x-auto md:bottom-8 md:left-8 md:w-[26rem]"
    >
      <div className="relative border border-gold bg-white p-6 shadow-[0_20px_50px_-12px_rgba(43,37,32,0.25)] md:p-7">
        {/* Gold corner marks */}
        <span aria-hidden className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-gold" />
        <span aria-hidden className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-gold" />
        <span aria-hidden className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-gold" />
        <span aria-hidden className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-gold" />

        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/60">
            <Cookie aria-hidden size={18} strokeWidth={1.25} className="text-gold" />
          </span>
          <div>
            <h2 id="cookie-title" className="font-display text-lg uppercase tracking-luxe text-espresso">
              Your privacy
            </h2>
            <p id="cookie-desc" className="mt-2 text-[0.8125rem] leading-relaxed text-espresso/85">
              Our site doesn’t track you. Some pages show Google Maps and Facebook videos, which may set their own
              cookies. Accept to load them automatically, or choose essential only and load them when you need them.{' '}
              <Link to="/privacy" className="text-gold-deep underline underline-offset-4 hover:text-gold">
                Privacy Notice
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            ref={acceptRef}
            type="button"
            onClick={acceptAll}
            className="sheen flex-1 bg-gold-gradient px-5 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-gradient-deep"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={essentialOnly}
            className="flex-1 border border-gold px-5 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-gold-deep transition-colors duration-300 hover:bg-champagne"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}

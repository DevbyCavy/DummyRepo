import { Link } from 'react-router-dom';

/**
 * Official Platinum Interior Design logo.
 * Assets are generated from the supplied gold-on-black logo by `node scripts/make-logo.mjs`.
 *
 * - variant="inline"  (header): PD monogram beside the PLATINUM / INTERIOR DESIGN wordmark.
 * - variant="stacked" (footer): the full logo lockup, monogram above the wordmark.
 */
export default function Logo({ variant = 'inline', className = '' }) {
  if (variant === 'stacked') {
    return (
      <Link to="/" aria-label="Platinum Interior Design — home" className={`inline-block ${className}`}>
        <picture>
          <source srcSet="/logo/logo-gold.webp" type="image/webp" />
          <img
            src="/logo/logo-gold.png"
            alt="Platinum Interior Design"
            width="362"
            height="320"
            className="h-36 w-auto sm:h-44"
          />
        </picture>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      aria-label="Platinum Interior Design — home"
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <picture>
        <source srcSet="/logo/mark-gold.webp" type="image/webp" />
        <img src="/logo/mark-gold.png" alt="" width="259" height="256" className="h-10 w-auto sm:h-12" />
      </picture>
      <span className="flex flex-col items-start leading-none">
        <span className="bg-gradient-to-br from-gold-deep via-gold to-gold-deep bg-clip-text font-sans text-[1.05rem] font-medium uppercase tracking-[0.2em] text-transparent sm:text-[1.3rem] sm:tracking-[0.24em]">
          Platinum
        </span>
        <span className="mt-1 font-sans text-[0.45rem] font-medium uppercase tracking-[0.3em] text-gold-deep sm:text-[0.52rem] sm:tracking-[0.38em]">
          Interior Design
        </span>
      </span>
    </Link>
  );
}

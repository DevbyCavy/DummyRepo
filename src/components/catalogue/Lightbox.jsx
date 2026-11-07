import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ResponsiveImage from '../ui/ResponsiveImage';
import BookNowButton from '../ui/BookNowButton';

/**
 * Full-screen image viewer for the catalogue.
 * Keyboard: ←/→ to browse, Esc to close. Focus is trapped while open and returned on close.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  // Captured on first render (before focus moves into the dialog) so StrictMode's
  // effect re-run can't record the close button as the opener.
  const openerRef = useRef(typeof document !== 'undefined' ? document.activeElement : null);
  const item = items[index];
  const count = items.length;
  const go = (step) => onIndex((index + step + count) % count);

  // Lock page scroll and restore focus to the opener on close.
  useEffect(() => {
    const opener = openerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('button, a[href]');
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!item) return null;

  const navBtn =
    'flex h-11 w-11 shrink-0 items-center justify-center border border-gold/60 bg-espresso/40 text-white transition-colors hover:bg-gold hover:text-espresso';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, image ${index + 1} of ${count}`}
      className="fixed inset-0 z-[60] flex flex-col bg-espresso/95 text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="caption text-white/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={navBtn}>
          <X aria-hidden size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <ResponsiveImage
          key={item.image}
          name={item.image}
          alt={item.alt}
          sizes="100vw"
          priority
          className="flex h-full w-full items-center justify-center"
          imgClassName="max-h-full max-w-full object-contain"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className={`${navBtn} absolute left-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className={`${navBtn} absolute right-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="flex flex-col items-center gap-4 px-4 pb-6 pt-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-3 sm:block">
          {count > 1 && (
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${navBtn} sm:hidden`}>
              <ChevronLeft aria-hidden size={22} strokeWidth={1.5} />
            </button>
          )}
          <div>
            <p className="font-display text-xl uppercase tracking-luxe sm:text-2xl">{item.title}</p>
            <p className="caption mt-1 text-gold-light">{item.category}</p>
          </div>
          {count > 1 && (
            <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${navBtn} sm:hidden`}>
              <ChevronRight aria-hidden size={22} strokeWidth={1.5} />
            </button>
          )}
        </div>
        <BookNowButton
          size="sm"
          label="Enquire About This"
          placement="catalogue-lightbox"
          context={{ label: 'Catalogue', value: `${item.title} (${item.category})` }}
        />
      </div>
    </div>,
    document.body,
  );
}

import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink, hasWhatsapp } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';
import { buttonClass } from './Button';

/**
 * Primary booking action — opens WhatsApp with the prefilled message (+ optional context).
 * variant: solid | ghost | white | icon | fab (round, label extends on hover)
 * context: { label: 'Project' | 'Service' | 'Category', value, url? }
 */
export default function BookNowButton({
  context,
  variant = 'solid',
  size = 'md',
  placement = 'unknown',
  label = 'Book Us Now',
  className = '',
  ...rest
}) {
  const isIcon = variant === 'icon';
  const isFab = variant === 'fab';
  // Hover: lift + soft gold glow; icon "rings"; sheen sweeps across (see .sheen in index.css).
  const hover =
    'group hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(160,120,64,0.45)] active:translate-y-0 active:shadow-none';
  const cls = isIcon
    ? `sheen inline-flex h-10 w-10 items-center justify-center bg-gold-gradient text-espresso transition-all duration-300 hover:bg-gold-gradient-deep ${hover} ${className}`
    : isFab
      ? // Round WhatsApp button; the label slides out to the left on hover / keyboard focus.
        `sheen inline-flex h-14 flex-row-reverse items-center overflow-hidden rounded-full bg-gold-gradient text-espresso shadow-soft transition-all duration-500 ease-out hover:bg-gold-gradient-deep ${hover} ${className}`
      : buttonClass({ variant, size, className: `${hover} ${className}` });

  const content = isFab ? (
    <>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <FaWhatsapp aria-hidden className="origin-center text-[1.6rem] group-hover:animate-ring" />
      </span>
      <span
        aria-hidden
        className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em] opacity-0 transition-all duration-500 ease-out group-hover:max-w-[12rem] group-hover:pl-6 group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:pl-6 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </>
  ) : (
    <>
      <FaWhatsapp
        aria-hidden
        className={`${isIcon ? 'text-xl' : 'text-[1.15em]'} origin-center group-hover:animate-ring`}
      />
      {!isIcon && <span>{label}</span>}
    </>
  );

  // Fallback: no valid number configured → send visitors to the contact page.
  if (!hasWhatsapp) {
    return (
      <Link to="/contact" className={cls} aria-label={isIcon || isFab ? 'Book us now' : undefined} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book us now on WhatsApp (opens in new tab)"
      onClick={() =>
        track('book_whatsapp_click', {
          placement,
          context: context?.label ? `${context.label}: ${context.value}` : 'general',
        })
      }
      className={cls}
      {...rest}
    >
      {content}
    </a>
  );
}

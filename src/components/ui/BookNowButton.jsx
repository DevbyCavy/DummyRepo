import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink, hasWhatsapp } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';
import { buttonClass } from './Button';

/**
 * Primary booking action — opens WhatsApp with the prefilled message (+ optional context).
 * variant: solid | ghost | white | icon
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
  const cls = isIcon
    ? `sheen inline-flex h-10 w-10 items-center justify-center bg-gold-gradient text-espresso transition hover:bg-gold-gradient-deep ${className}`
    : buttonClass({ variant, size, className });

  const content = (
    <>
      <FaWhatsapp aria-hidden className={isIcon ? 'text-xl' : 'text-[1.15em]'} />
      {!isIcon && <span>{label}</span>}
    </>
  );

  // Fallback: no valid number configured → send visitors to the contact page.
  if (!hasWhatsapp) {
    return (
      <Link to="/contact" className={cls} aria-label={isIcon ? 'Book us now' : undefined} {...rest}>
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

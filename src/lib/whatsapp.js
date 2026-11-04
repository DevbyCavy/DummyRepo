import site from '../content/site.json';

export const BASE_MSG =
  site.whatsappMessage || 'Hi Platinum Interior Design, can I get more info on this?';

// TODO(open): replace the placeholder number in site.json with the company's WhatsApp number
// (digits only, international format, no "+" or leading zero — e.g. 263771234567).
const number = String(site.whatsapp || '').trim();
export const hasWhatsapp = /^\d{8,15}$/.test(number);

if (!hasWhatsapp && import.meta.env.DEV) {
  console.warn(
    '[whatsapp] site.json "whatsapp" is empty or not a valid number — Book Us Now buttons fall back to /contact.'
  );
}

/**
 * Build a wa.me click-to-chat link with the standard prefilled message.
 * @param {{label?: string, value?: string, url?: string}} [context]
 *   e.g. { label: 'Project', value: 'Borrowdale Family Residence', url: location.href }
 */
export function whatsappLink(context) {
  const lines = [BASE_MSG];
  if (context?.label && context?.value) lines.push('', `${context.label}: ${context.value}`);
  if (context?.url) lines.push(context.url);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

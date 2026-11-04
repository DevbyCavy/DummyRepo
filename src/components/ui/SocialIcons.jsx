import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaTiktok,
  FaLinkedinIn,
  FaHouzz,
} from 'react-icons/fa';
import site from '../../content/site.json';

export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { key: 'whatsappChannel', label: 'WhatsApp Channel', Icon: FaWhatsapp },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'houzz', label: 'Houzz', Icon: FaHouzz },
];

/** Active socials only — entries with an empty URL in site.json are hidden. */
export function activeSocials(only) {
  return SOCIALS.filter((s) => site.socials?.[s.key] && (!only || only.includes(s.key))).map(
    (s) => ({ ...s, url: site.socials[s.key] })
  );
}

/** Row of small icon links. tone: gold | white */
export default function SocialIcons({ only, tone = 'gold', className = '', size = 'text-[0.95rem]' }) {
  const color =
    tone === 'white' ? 'text-white hover:text-gold-light' : 'text-gold hover:text-gold-deep';
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {activeSocials(only).map(({ key, label, Icon, url }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in new tab)`}
            className={`${color} ${size} transition-colors duration-300`}
          >
            <Icon aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

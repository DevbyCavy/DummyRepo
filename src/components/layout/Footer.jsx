import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import LogoDivider from '../ui/LogoDivider';
import BookNowButton from '../ui/BookNowButton';
import { activeSocials } from '../ui/SocialIcons';
import NewsletterForm from '../forms/NewsletterForm';
import { NAV_LINKS } from '../../lib/nav';
import site from '../../content/site.json';

function ColumnTitle({ children }) {
  return <h2 className="label mb-6 font-sans text-gold-deep">{children}</h2>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = activeSocials();

  return (
    <footer className="border-t-2 border-gold bg-sand">
      {/* Brand block */}
      <div className="container-content flex flex-col items-center gap-6 pb-14 pt-20 text-center">
        <Logo />
        <LogoDivider label={site.tagline} />
        {/* id is used by FloatingBookNow to hide itself when this button is visible */}
        <div id="footer-book" className="mt-4">
          <BookNowButton size="lg" placement="footer" />
        </div>
      </div>

      {/* Columns */}
      <div className="container-content grid gap-12 border-t border-gold/30 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <ColumnTitle>Studio</ColumnTitle>
          {/* TODO(open): confirm address, phone, email and opening hours. */}
          <address className="space-y-2 text-sm not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-gold-deep">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="break-all hover:text-gold-deep">
                {site.email}
              </a>
            </p>
            <p className="text-taupe">{site.hours}</p>
          </address>
        </div>

        <div>
          <ColumnTitle>Explore</ColumnTitle>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.filter((l) => l.to !== '/').map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold-deep">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Follow us</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {socials.map(({ key, label, Icon, url }) => (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-gold-deep"
                >
                  <Icon aria-hidden className="text-gold transition-colors group-hover:text-gold-deep" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Newsletter</ColumnTitle>
          <p className="mb-5 text-sm">Design inspiration, occasionally.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-5 text-xs text-taupe sm:flex-row">
          <p>© {year} Platinum Interior Design</p>
          <Link to="/privacy" className="hover:text-gold-deep">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

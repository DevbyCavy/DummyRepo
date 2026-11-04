import { Link } from 'react-router-dom';
import BookNowButton from '../ui/BookNowButton';
import site from '../../content/site.json';

/** The one bold gold moment on a page — booking call-to-action band (architecture §6.10). */
export default function CtaBand() {
  return (
    <section className="sheen relative overflow-hidden bg-gold-gradient">
      {/* Faint monogram watermark — TODO(open): swap for the logo mark SVG */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[22rem] leading-none text-white/10 md:right-16"
      >
        P
      </span>
      <div className="container-content relative flex flex-col items-center py-24 text-center md:py-28">
        <h2 className="h2 text-espresso">Let’s Create Your Space</h2>
        {/* TODO(open): confirm the response time promised in site.json → whatsappReplyNote */}
        <p className="mt-6 max-w-prose text-espresso">
          Tap below to chat with us on WhatsApp. {site.whatsappReplyNote}
        </p>
        <BookNowButton variant="white" size="lg" placement="cta-band" className="mt-10" />
        <Link
          to="/contact#enquiry"
          className="label mt-6 text-espresso underline decoration-espresso/30 underline-offset-8 hover:decoration-espresso"
        >
          Prefer email? Send an enquiry →
        </Link>
      </div>
    </section>
  );
}

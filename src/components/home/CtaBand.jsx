import { Link } from 'react-router-dom';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import site from '../../content/site.json';
import work from '../../content/work.json';

const photo = work.find((w) => w.image === 'panelling-gallery-hallway');

/** The one bold gold moment on a page — booking call-to-action band (architecture §6.10). */
export default function CtaBand() {
  return (
    <section className="sheen relative overflow-hidden bg-gold-gradient">
      {/*
        Photo on the left that dissolves into the gold towards the centre.
        The mask fades it fully out before the centred content begins (desktop only).
      */}
      {photo && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[30%] lg:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 35%, rgba(0,0,0,0.55) 65%, transparent 100%)',
            maskImage: 'linear-gradient(to right, #000 0%, #000 35%, rgba(0,0,0,0.55) 65%, transparent 100%)',
          }}
        >
          <ResponsiveImage
            name={photo.image}
            alt=""
            sizes="30vw"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
            style={{ objectPosition: '0% 40%' }}
          />
          {/* Warm gold wash so the photo melts into the band */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-light/25 via-gold/40 to-gold/70 mix-blend-multiply" />
        </div>
      )}

      {/* Faint monogram watermark — TODO(open): swap for the logo mark SVG */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[22rem] leading-none text-white/10 md:right-16"
      >
        P
      </span>

      <div className="container-content relative flex flex-col items-center py-24 text-center md:py-28">
        {/* Narrower on large screens so the content stays clear of the photo */}
        <div className="flex flex-col items-center lg:max-w-xl">
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
      </div>
    </section>
  );
}

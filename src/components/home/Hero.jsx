import BookNowButton from '../ui/BookNowButton';
import Button from '../ui/Button';
import site from '../../content/site.json';

/**
 * Home hero — full viewport.
 * TODO(open): replace the warm gradient placeholder with 3–4 bright room photos (crossfading
 * slideshow, first image preloaded with fetchpriority="high") once photography is supplied.
 */
export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* Placeholder background */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#9C8064_0%,#7A624B_45%,#5E4B3A_100%)]" />
      {/* Soft warm bottom gradient for legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-espresso/20" />

      <div className="container-content relative flex flex-col items-center text-center text-white">
        <p className="label text-gold-light">{site.name}</p>
        <h1 className="h1 mt-6">{site.tagline}</h1>
        <span aria-hidden className="mt-8 h-px w-20 bg-gold-light" />
        <p className="mt-8 max-w-prose text-base text-white/90 md:text-lg">
          Bespoke interiors for homes and businesses, designed around the way you live.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <BookNowButton size="lg" placement="hero" />
          <Button to="/portfolio" variant="ghost-white" size="lg">
            View Our Work
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/80">
        <span className="caption text-white/80">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold-light" />
        </span>
      </div>
    </section>
  );
}

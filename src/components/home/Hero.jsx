import BookNowButton from '../ui/BookNowButton';
import TextLink from '../ui/TextLink';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

const hero = work.find((w) => w.hero) || work[0];

/**
 * Home hero — editorial split.
 * Text on bright white (left), one large unobstructed photo on a champagne panel (right)
 * with the offset gold frame and an overlapping "Featured Project" card.
 * Mobile: photo first, text below.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Champagne panel behind the photo (desktop) */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] bg-champagne lg:block" />

      <div className="container-content relative grid min-h-[100svh] items-center gap-12 pb-16 pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-32">
        {/* Text */}
        <div className="order-2 lg:order-1 lg:col-span-5 lg:pr-6">
          <h1 className="text-espresso text-[clamp(2.25rem,5vw,4.75rem)]">
            <span className="block">Spaces</span>
            <span className="block">That</span>
            <span className="block bg-gold-gradient bg-clip-text text-transparent">Inspire</span>
          </h1>
          <span aria-hidden className="mt-8 block h-px w-20 bg-gold" />
          <p className="mt-7 max-w-[22rem] text-[0.8125rem] leading-relaxed text-espresso/85">
            Bespoke interiors for homes and businesses, designed around the way you live.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <BookNowButton size="body" placement="hero" />
            <TextLink to="/portfolio" className="text-[0.8125rem]">
              View Our Work
            </TextLink>
          </div>

          {/* Scroll cue */}
          <div aria-hidden className="mt-16 hidden items-center gap-4 lg:flex">
            <span className="relative h-px w-14 overflow-hidden bg-hairline">
              <span className="absolute inset-y-0 left-0 w-1/2 animate-[scrollcue-x_2.4s_ease-in-out_infinite] bg-gold" />
            </span>
            <span className="caption">Scroll to explore</span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative order-1 lg:order-2 lg:col-span-7">
          <div className="relative">
            {/* Offset gold frame */}
            <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold md:translate-x-5 md:translate-y-5" />
            <div className="relative overflow-hidden bg-champagne">
              <ResponsiveImage
                name={hero.image}
                alt={hero.alt}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="block"
                imgClassName="aspect-[4/3] w-full animate-[settle_1.8s_ease-out] object-cover sm:aspect-[16/11]"
                style={{ objectPosition: hero.focus }}
              />
            </div>
          </div>

          {/* Featured project card */}
          <div className="relative -mt-10 ml-4 w-[min(20rem,85%)] border border-hairline bg-white p-6 shadow-soft sm:ml-8 lg:absolute lg:-bottom-8 lg:-left-10 lg:mt-0 lg:ml-0">
            <p className="caption">Featured Project</p>
            <p className="mt-2 font-display text-2xl uppercase tracking-luxe text-espresso">{hero.title}</p>
            <p className="caption mt-1 text-gold-deep">{hero.category}</p>
            <TextLink to="/portfolio" className="mt-5">
              View Project
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

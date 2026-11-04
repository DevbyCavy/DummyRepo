import Eyebrow from '../ui/Eyebrow';
import TextLink from '../ui/TextLink';
import ResponsiveImage from '../ui/ResponsiveImage';
import site from '../../content/site.json';
import work from '../../content/work.json';

const image = work.find((w) => w.image === 'hallway-gallery');

/** Home §6.2 — welcome text + tall framed image, optional stats row. */
export default function Intro() {
  return (
    <section className="section bg-white">
      <div className="container-content grid items-center gap-16 md:grid-cols-2 md:gap-20">
        <div className="max-w-prose">
          <Eyebrow>Welcome</Eyebrow>
          <h2 className="h2 mt-4">Designed With Intention</h2>
          <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
          {/* Draft copy — client can replace */}
          <p className="mt-8">
            At Platinum Interior Design we create spaces that feel as good as they look. Every room begins with how you
            live, work and gather, and is finished with the craftsmanship and quiet detail that make it unmistakably
            yours.
          </p>
          <p className="mt-5">
            From a single statement wall to a full home transformation, we handle design, sourcing and installation, so
            the journey is as effortless as the result.
          </p>
          <TextLink to="/about" className="mt-10">
            Discover Our Story
          </TextLink>
        </div>

        {/* Tall image with offset gold frame accent */}
        <div className="relative mx-auto w-full max-w-md md:ml-auto md:mr-4">
          <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-gold" />
          <ResponsiveImage
            name={image.image}
            alt={image.alt}
            sizes="(min-width: 768px) 448px, 100vw"
            className="relative block bg-champagne"
            imgClassName="aspect-[3/4] h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Stats — TODO(open): add real numbers to site.json "stats"; row is hidden while empty */}
      {site.stats?.length > 0 && (
        <div className="container-content mt-24">
          <dl className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-0">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-14 text-center ${i > 0 ? 'md:border-l md:border-gold' : ''}`}
              >
                <dt className="caption order-2 mt-2">{s.label}</dt>
                <dd className="order-1 bg-gold-gradient bg-clip-text font-display text-6xl font-light text-transparent">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

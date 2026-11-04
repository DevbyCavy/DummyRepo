import { Link } from 'react-router-dom';
import Eyebrow from '../ui/Eyebrow';
import TextLink from '../ui/TextLink';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import FacebookVideo from '../ui/FacebookVideo';
import site from '../../content/site.json';
import work from '../../content/work.json';
import videos from '../../content/videos.json';

const byName = (name) => work.find((w) => w.image === name);

const RESIDENTIAL_ROW = [
  { label: 'Living Rooms', image: 'living-tv-unit-shelving' },
  { label: 'Kitchens & Dining', image: 'kitchen-white-galley' },
  { label: 'Custom Joinery', image: 'kitchen-mirrored-wall-unit' },
];

/** Home §6.3 — Residential block + "In Motion" video block (replaces the Commercial block). */
export default function FeaturedSpaces() {
  const main = byName('living-white-panelled');

  return (
    <section className="section bg-champagne">
      <div className="container-content space-y-28 md:space-y-36">
        {/* ── Block A: Residential ─────────────────────────────── */}
        <div>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="border border-gold/60 bg-white p-3 shadow-soft">
                <ResponsiveImage
                  name={main.image}
                  alt={main.alt}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="block"
                  imgClassName="aspect-[4/3] w-full object-cover"
                  style={{ objectPosition: main.focus }}
                />
              </div>
            </div>
            <div className="max-w-prose md:col-span-5">
              <Eyebrow>Residential</Eyebrow>
              <h2 className="h2 mt-4">Living Spaces</h2>
              <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
              {/* Draft copy — client can replace */}
              <p className="mt-8">
                Homes designed around the people who live in them. From statement media walls and panelled lounges to
                kitchens built for everyday life, every detail is considered, crafted and finished to last.
              </p>
              <div className="mt-10 flex flex-col items-start gap-6">
                <TextLink to="/portfolio?category=residential">Explore Residential</TextLink>
                <BookNowButton
                  variant="ghost"
                  placement="featured-residential"
                  context={{ label: 'Category', value: 'Residential' }}
                />
              </div>
            </div>
          </div>

          <ul className="mt-16 grid gap-6 sm:grid-cols-3 md:gap-8">
            {RESIDENTIAL_ROW.map(({ label, image }) => {
              const item = byName(image);
              return (
                <li key={label}>
                  <Link to="/portfolio?category=residential" className="group block">
                    <div className="overflow-hidden border border-gold/60 bg-white p-2">
                      <div className="overflow-hidden">
                        <ResponsiveImage
                          name={item.image}
                          alt={item.alt}
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="block"
                          imgClassName="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          style={{ objectPosition: item.focus }}
                        />
                      </div>
                    </div>
                    <p className="label mt-4 text-espresso transition-colors group-hover:text-gold-deep">
                      {label} <span aria-hidden>→</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Block B: In Motion (Facebook videos) ─────────────── */}
        <div>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>In Motion</Eyebrow>
            <h2 className="h2 mt-4">See Our Spaces Come to Life</h2>
            <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
            <p className="mt-8">
              Step inside recent projects, from first reveal to the finishing touches.
            </p>
          </div>

          <ul className="mt-16 grid justify-items-center gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {videos.map((v) => (
              <li key={v.id} className="w-full">
                <FacebookVideo url={v.url} title={v.title} />
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            {site.socials?.facebook && (
              <TextLink href={site.socials.facebook} target="_blank" rel="noopener noreferrer">
                More on Facebook
              </TextLink>
            )}
            <BookNowButton variant="ghost" placement="featured-videos" />
          </div>
        </div>
      </div>
    </section>
  );
}

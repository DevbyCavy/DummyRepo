import Eyebrow from '../ui/Eyebrow';
import TextLink from '../ui/TextLink';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import FacebookVideo from '../ui/FacebookVideo';
import site from '../../content/site.json';
import CategoryCards from '../catalogue/CategoryCards';
import { workByName } from '../../lib/catalogue';
import videos from '../../content/videos.json';

// Category cards shown under the Residential block (each links to its catalogue page).
const RESIDENTIAL_CATEGORIES = ['Living Rooms', 'Bedrooms', 'Wardrobes', 'Entryways', 'Wall Panelling', 'Ceilings'];

/** Home §6.3 — Residential block + "In Motion" video block (replaces the Commercial block). */
export default function FeaturedSpaces() {
  const main = workByName('living-white-tv-lounge');

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
                Homes designed around the people who live in them. From statement media walls and panelled hallways to
                walk-in wardrobes and feature ceilings, every detail is considered, crafted and finished to last.
              </p>
              <div className="mt-10 flex flex-col items-start gap-6">
                <TextLink to="/catalogue">Explore the Catalogue</TextLink>
                <BookNowButton
                  variant="ghost"
                  placement="featured-residential"
                  context={{ label: 'Category', value: 'Residential' }}
                />
              </div>
            </div>
          </div>

          <CategoryCards only={RESIDENTIAL_CATEGORIES} className="mt-16" />
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

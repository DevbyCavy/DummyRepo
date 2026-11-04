import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/*
 * Editorial grid of recent work (stand-in for §6.4 Selected Projects until full project
 * pages exist in projects.json — tiles will then link to /portfolio/:slug).
 * 12-column desktop layout with mixed tile sizes; single column on mobile.
 */
const LAYOUT = [
  'md:col-span-8', // landscape
  'md:col-span-4', // portrait
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-8', // landscape, paired with the booking tile
];
const ORDER = [
  'living-tv-wall-led',
  'living-white-panelled',
  'kitchen-mirrored-wall-unit',
  'hallway-gallery',
  'kitchen-white-galley',
  'living-tv-unit-shelving',
];

export default function RecentWork() {
  const items = ORDER.map((name) => work.find((w) => w.image === name)).filter(Boolean);

  return (
    <section className="section bg-white">
      <div className="container-content">
        <SectionHeading eyebrow="Our Work" title="Selected Projects" divider="Spaces That Inspire" />

        <ul className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[200px] md:grid-cols-12 md:gap-6">
          {items.map((item, i) => (
            <li key={item.image} className={`row-span-2 ${LAYOUT[i]}`}>
              <figure className="group relative h-full overflow-hidden bg-champagne" tabIndex={0}>
                <ResponsiveImage
                  name={item.image}
                  alt={item.alt}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus:scale-[1.03]"
                  style={{ objectPosition: item.focus }}
                />
                {/* White gradient reveal on hover / focus */}
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-white via-white/90 to-transparent px-6 pb-6 pt-16 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                  <p className="font-display text-2xl uppercase tracking-luxe text-espresso">{item.title}</p>
                  <p className="caption mt-1">{item.category}</p>
                  <span aria-hidden className="mt-3 block h-px w-12 bg-gold" />
                </figcaption>
              </figure>
            </li>
          ))}

          {/* Booking tile completes the last row */}
          <li className="row-span-2 md:col-span-4">
            <div className="flex h-full flex-col items-center justify-center border border-gold bg-champagne px-8 text-center">
              <p className="eyebrow">Your Space Next</p>
              <p className="mt-4 font-display text-3xl font-light uppercase tracking-luxe">Love what you see?</p>
              <span aria-hidden className="mt-5 block h-px w-12 bg-gold" />
              <BookNowButton placement="recent-work" className="mt-8" />
            </div>
          </li>
        </ul>

        <div className="mt-14 flex justify-center">
          <Button to="/portfolio" variant="ghost">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

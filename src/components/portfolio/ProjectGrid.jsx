import { Link } from 'react-router-dom';
import BookNowButton from '../ui/BookNowButton';
import { categoryByTitle } from '../../lib/catalogue';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/*
 * Editorial project grid — shared by Home "Selected Projects" and the Portfolio page.
 * 12-column desktop layout with mixed tile sizes; single column on mobile.
 * Pass `order` (image names) to choose the tiles; the layout expects 6.
 */
const LAYOUT = [
  'md:col-span-8', // landscape
  'md:col-span-4', // portrait
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-8', // landscape, paired with the booking tile
];
// Default selection (Home "Selected Projects"): landscape, portrait ×4, landscape.
const DEFAULT_ORDER = [
  'living-home-cinema',
  'bedroom-kids-arched-headboard',
  'entry-gold-arched-mirror',
  'panelling-lit-hallway',
  'mirror-window-pane-lounge',
  'wardrobe-oak-walk-in',
];

export default function ProjectGrid({ placement = 'project-grid', order = DEFAULT_ORDER }) {
  const items = order.map((name) => work.find((w) => w.image === name)).filter(Boolean);

  return (
    <ul className="grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[200px] md:grid-cols-12 md:gap-6">
      {items.map((item, i) => (
        <li key={item.image} className={`row-span-2 ${LAYOUT[i] || 'md:col-span-4'}`}>
          <Link
            to={categoryByTitle(item.category)?.href || '/catalogue'}
            className="group relative block h-full overflow-hidden bg-champagne"
            aria-label={`${item.title}, see more ${item.category}`}
          >
            <ResponsiveImage
              name={item.image}
              alt={item.alt}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus:scale-[1.03]"
              style={{ objectPosition: item.focus }}
            />
            {/* White gradient reveal on hover / focus */}
            <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-white via-white/90 to-transparent px-6 pb-6 pt-16 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
              <p className="font-display text-2xl uppercase tracking-luxe text-espresso">{item.title}</p>
              <p className="caption mt-1">{item.category}</p>
              <span aria-hidden className="mt-3 block h-px w-12 bg-gold" />
            </div>
          </Link>
        </li>
      ))}

      {/* Booking tile completes the last row */}
      <li className="row-span-2 md:col-span-4">
        <div className="flex h-full flex-col items-center justify-center border border-gold bg-champagne px-8 text-center">
          <p className="eyebrow">Your Space Next</p>
          <p className="mt-4 font-display text-3xl font-light uppercase tracking-luxe">Love what you see?</p>
          <span aria-hidden className="mt-5 block h-px w-12 bg-gold" />
          <BookNowButton placement={placement} className="mt-8" />
        </div>
      </li>
    </ul>
  );
}

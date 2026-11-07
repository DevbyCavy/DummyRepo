import { Link } from 'react-router-dom';
import ResponsiveImage from '../ui/ResponsiveImage';
import { CATEGORIES } from '../../lib/catalogue';

/**
 * Grid of catalogue category cards (cover photo + name + count), each linking to
 * /catalogue?category=…  Pass `only` (category titles) to show a subset in that order.
 */
export default function CategoryCards({ only, className = '' }) {
  const cats = only ? only.map((t) => CATEGORIES.find((c) => c.title === t)).filter(Boolean) : CATEGORIES;

  return (
    <ul className={`grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 ${only ? '' : 'lg:grid-cols-5'} ${className}`}>
      {cats.map((c) => (
        <li key={c.slug}>
          <Link to={c.href} className="group block">
            <div className="overflow-hidden border border-gold/60 bg-white p-2">
              <div className="overflow-hidden">
                <ResponsiveImage
                  name={c.cover.image}
                  alt=""
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="block"
                  imgClassName="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: c.cover.focus }}
                />
              </div>
            </div>
            <p className="label mt-4 text-espresso transition-colors group-hover:text-gold-deep">
              {c.title} <span aria-hidden>→</span>
            </p>
            <p className="caption mt-1">
              {c.items.length} {c.items.length === 1 ? 'photo' : 'photos'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

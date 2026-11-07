import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import BookNowButton from '../components/ui/BookNowButton';
import Lightbox from '../components/catalogue/Lightbox';
import CtaBand from '../components/home/CtaBand';
import work from '../content/work.json';
import { CATEGORIES } from '../lib/catalogue';

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const active = CATEGORIES.find((c) => c.slug === params.get('category')) || null;
  const groups = active ? [active] : CATEGORIES;
  // Flat list of what is on screen, so the lightbox browses in the same order.
  const visible = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const [open, setOpen] = useState(null);

  const select = (slug) => {
    setParams(slug ? { category: slug } : {}, { replace: true });
    setOpen(null);
  };

  return (
    <>
      <Seo
        title={active ? `${active.title} Catalogue` : 'Catalogue'}
        description="Browse our catalogue of living rooms, bedrooms, wardrobes, entryways, feature mirrors, wall panelling, ceilings and more by Platinum Interior Design."
      />
      <PageHero title="Catalogue" eyebrow="Browse by Category" image="kitchen-glass-display-unit" />

      {/* Filter bar */}
      <nav aria-label="Catalogue categories" className="sticky top-[4.75rem] z-30 border-b border-hairline bg-white/95 backdrop-blur-md sm:top-[5rem] md:top-[5.5rem]">
        <div className="container-content">
          <ul className="-mx-6 flex gap-6 overflow-x-auto px-6 py-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-3 md:px-0 [&::-webkit-scrollbar]:hidden">
            <FilterTab label="All" count={work.length} current={!active} onClick={() => select(null)} />
            {CATEGORIES.map((c) => (
              <FilterTab
                key={c.slug}
                label={c.title}
                count={c.items.length}
                current={active?.slug === c.slug}
                onClick={() => select(c.slug)}
              />
            ))}
          </ul>
        </div>
      </nav>

      <div className="section pt-14 md:pt-20">
        <div className="container-content space-y-20 md:space-y-28">
          {groups.map((group) => (
            <section key={group.slug} aria-labelledby={`cat-${group.slug}`}>
              <div className="flex flex-col gap-4 border-b border-gold/40 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id={`cat-${group.slug}`} className="h2">
                    {group.title}
                  </h2>
                  <p className="caption mt-2">
                    {group.items.length} {group.items.length === 1 ? 'image' : 'images'}
                  </p>
                </div>
                <BookNowButton
                  variant="ghost"
                  size="sm"
                  label="Enquire"
                  placement="catalogue-category"
                  context={{ label: 'Category', value: group.title }}
                />
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li key={item.image}>
                    <button
                      type="button"
                      onClick={() => setOpen(visible.indexOf(item))}
                      className="group block w-full text-left"
                      aria-label={`View ${item.title}`}
                    >
                      <div className="overflow-hidden border border-gold/50 bg-champagne p-1.5 transition-colors group-hover:border-gold group-focus-visible:border-gold">
                        <div className="overflow-hidden">
                          <ResponsiveImage
                            name={item.image}
                            alt={item.alt}
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className="block"
                            imgClassName="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                            style={{ objectPosition: item.focus }}
                          />
                        </div>
                      </div>
                      <p className="mt-3 font-display text-base uppercase leading-snug tracking-luxe text-espresso transition-colors group-hover:text-gold-deep sm:text-lg">
                        {item.title}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <CtaBand />

      {open != null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

function FilterTab({ label, count, current, onClick }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={current}
        className={`label relative whitespace-nowrap py-1 text-[0.6875rem] transition-colors ${
          current ? 'text-gold-deep' : 'text-espresso hover:text-gold-deep'
        }`}
      >
        {label} <span className="text-taupe">({count})</span>
        <span
          aria-hidden
          className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ${
            current ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </button>
    </li>
  );
}

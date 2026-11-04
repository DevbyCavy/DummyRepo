import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import testimonials from '../../content/testimonials.json';

/*
 * Testimonials slider (architecture §6.7).
 * REAL client quotes only, shared with their permission — add them to testimonials.json:
 *   { "quote": "...", "name": "Tendai M.", "project": "Living room makeover", "location": "Borrowdale" }
 * The section is hidden in production while the file is empty. In development a clearly
 * labelled sample set is shown so the design can be reviewed; it never ships.
 */
const DEV_SAMPLES = [
  {
    quote:
      'Sample quote — replace with a real client testimonial. Two or three sentences about how the finished space feels works best.',
    name: 'Client name',
    project: 'Living room makeover',
  },
  {
    quote: 'Sample quote — a second real testimonial goes here, ideally from a different type of project.',
    name: 'Client name',
    project: 'Kitchen & joinery',
  },
  {
    quote: 'Sample quote — short, specific and in the client’s own words reads as the most genuine.',
    name: 'Client name',
    project: 'Office fit-out',
  },
];

const INTERVAL = 7000;

export default function Testimonials() {
  const isSample = testimonials.length === 0;
  const items = isSample ? (import.meta.env.DEV ? DEV_SAMPLES : []) : testimonials;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef(null);
  const count = items.length;

  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  };

  return (
    <section className="section bg-sand" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container-content">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 className="h2 mt-4">What Our Clients Say</h2>
          <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
          {isSample && (
            <p className="mt-6 border border-dashed border-gold-deep/50 px-4 py-2 text-xs text-gold-deep">
              Preview with sample quotes — visible on the dev site only. Add real testimonials to
              src/content/testimonials.json to publish this section.
            </p>
          )}
        </div>

        <div
          ref={regionRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          {/* Quote card with gold corner ornaments */}
          <figure className="relative px-6 pb-14 pt-20 text-center md:px-20">
            <span aria-hidden className="absolute left-0 top-0 h-10 w-10 border-l border-t border-gold" />
            <span aria-hidden className="absolute right-0 top-0 h-10 w-10 border-r border-t border-gold" />
            <span aria-hidden className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-gold" />
            <span aria-hidden className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-gold" />

            {/* Large gold quote mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none font-display text-[7rem] leading-none text-gold/50"
            >
              “
            </span>

            {/* Slides stacked in one grid cell so the tallest sets the height (no jumping) */}
            <div className="grid" aria-live={paused ? 'polite' : 'off'}>
              {items.map((t, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={i !== index}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${
                    i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  <blockquote className="font-display text-[clamp(1.25rem,2.4vw,2rem)] italic leading-snug text-espresso">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8">
                    <span aria-hidden className="mx-auto mb-5 block h-px w-10 bg-gold" />
                    <span className="block font-sans text-sm font-medium uppercase tracking-[0.2em] text-espresso">
                      {t.name}
                    </span>
                    <span className="caption mt-1 block text-gold-deep">
                      {[t.project, t.location].filter(Boolean).join(' · ')}
                    </span>
                  </figcaption>
                </div>
              ))}
            </div>
          </figure>

          {/* Controls */}
          {count > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-gold text-gold-deep transition-colors hover:bg-gold hover:text-white"
              >
                <ChevronLeft aria-hidden size={18} strokeWidth={1.25} />
              </button>

              <div className="flex items-center gap-3">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className="flex h-6 items-center"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ${
                        i === index ? 'w-10 bg-gold-deep' : 'w-5 bg-gold/50 hover:bg-gold'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-gold text-gold-deep transition-colors hover:bg-gold hover:text-white"
              >
                <ChevronRight aria-hidden size={18} strokeWidth={1.25} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

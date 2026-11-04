import { Fingerprint, Gem, Layers, Armchair, CalendarCheck, MessageCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import why from '../../content/why.json';

const ICONS = { Fingerprint, Gem, Layers, Armchair, CalendarCheck, MessageCircle };

/** Small L-shaped gold marks on each corner of the parent (parent must be relative). */
function GoldCorners() {
  const base = 'absolute h-2.5 w-2.5 border-gold';
  return (
    <span aria-hidden>
      <span className={`${base} -left-1 -top-1 border-l border-t`} />
      <span className={`${base} -right-1 -top-1 border-r border-t`} />
      <span className={`${base} -bottom-1 -left-1 border-b border-l`} />
      <span className={`${base} -bottom-1 -right-1 border-b border-r`} />
    </span>
  );
}

/**
 * Home — Why Choose Us (replaces the "What We Do" services preview).
 * 3×2 grid on desktop, 2 columns on tablet, 1 on mobile, thin gold dividers between items.
 * TODO(open): confirm "On Time, On Budget" is a promise the client can stand behind.
 */
export default function WhyChooseUs() {
  return (
    <section className="section bg-champagne">
      <div className="container-content">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} divider />
        <p className="mx-auto mt-8 max-w-2xl text-center">{why.intro}</p>

        {/* gap-px over a gold-tinted background draws the dividers between items */}
        <ul className="mt-16 grid gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map(({ icon, title, text }) => {
            const Icon = ICONS[icon];
            return (
              <li key={title} className="group bg-champagne px-6 py-12 text-center sm:px-10 md:py-14">
                <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center border border-gold/60 transition-colors duration-500 group-hover:bg-white">
                  <GoldCorners />
                  {Icon && (
                    <Icon
                      aria-hidden
                      size={34}
                      strokeWidth={1.25}
                      className="text-gold transition-transform duration-500 group-hover:-translate-y-0.5"
                    />
                  )}
                </div>
                <h3 className="mt-8 text-xl text-espresso">{title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-[0.9375rem] font-light text-espresso/85">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

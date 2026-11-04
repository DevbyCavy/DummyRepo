import SectionHeading from '../ui/SectionHeading';
import steps from '../../content/process.json';

/**
 * Our Process — 5-step timeline joined by a thin gold line (architecture §6.6).
 * Horizontal on desktop, vertical on mobile.
 */
export default function Process({ bg = 'bg-white' }) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-content">
        <SectionHeading eyebrow="How We Work" title="Our Process" divider />

        <ol className="relative mt-16 grid gap-12 lg:mt-20 lg:grid-cols-5 lg:gap-8">
          {/* Connecting gold line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-gold/50 lg:hidden" />
          <span aria-hidden className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gold/50 lg:block" />

          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              {/* Numeral sits on the section colour so the gold line appears to pass behind it */}
              <span
                className={`relative z-10 flex h-16 w-14 shrink-0 items-center justify-center font-display text-4xl text-gold lg:w-20 ${bg}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-2 lg:pt-6">
                <h3 className="text-lg text-espresso">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-espresso/85 lg:mx-auto lg:max-w-[14rem]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

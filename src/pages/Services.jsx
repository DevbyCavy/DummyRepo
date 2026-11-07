import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SectionHeading from '../components/ui/SectionHeading';
import BookNowButton from '../components/ui/BookNowButton';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import TextLink from '../components/ui/TextLink';
import { categoryByTitle } from '../lib/catalogue';
import Accordion from '../components/ui/Accordion';
import Process from '../components/home/Process';
import CtaBand from '../components/home/CtaBand';
import services from '../content/services.json';
import work from '../content/work.json';
import faq from '../content/faq.json';

const imageFor = (name) => work.find((w) => w.image === name);

/**
 * Services page (architecture §7.3).
 * TODO(open): confirm the real service list and copy with the client (services.json, faq.json).
 */
export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Interior design, space planning, furniture and décor sourcing, and renovation and styling in Harare, Zimbabwe."
      />
      <PageHero title="Services" eyebrow="What We Do" image="wardrobe-glass-door" />

      {/* Intro */}
      <section className="bg-white pt-20 md:pt-28">
        <div className="container-content">
          <p className="mx-auto max-w-2xl text-center text-base md:text-lg">
            Whether you are refreshing a single room or transforming an entire home or business, we tailor every
            service to your space, your style and the way you live.
          </p>
        </div>
      </section>

      {/* Service blocks — alternating white / champagne, image side flips */}
      {services.map((s, i) => {
        const img = imageFor(s.image);
        const flipped = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`section scroll-mt-24 ${flipped ? 'bg-champagne' : 'bg-white'}`}>
            <div className="container-content grid items-center gap-12 md:grid-cols-12 md:gap-16">
              {/* Image */}
              <div className={`md:col-span-6 ${flipped ? 'md:order-2' : ''}`}>
                <div className="relative">
                  <span
                    aria-hidden
                    className={`absolute inset-0 translate-y-4 border border-gold ${flipped ? '-translate-x-4' : 'translate-x-4'}`}
                  />
                  {img && (
                    <ResponsiveImage
                      name={img.image}
                      alt={img.alt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="relative block bg-sand"
                      imgClassName="aspect-[4/3] w-full object-cover"
                      style={{ objectPosition: img.focus }}
                    />
                  )}
                </div>
              </div>

              {/* Text */}
              <div className={`md:col-span-6 ${flipped ? 'md:order-1 md:pr-6' : 'md:pl-6'}`}>
                <Eyebrow>{String(i + 1).padStart(2, '0')} — Service</Eyebrow>
                <h2 className="h2 mt-4">{s.title}</h2>
                <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
                <p className="mt-8 max-w-prose">{s.summary}</p>

                <p className="label mt-10 text-gold-deep">What’s included</p>
                <ul className="mt-5 space-y-3">
                  {s.included.map((item) => (
                    <li key={item} className="group flex items-center gap-4 text-[0.9375rem]">
                      {/* Gold diamond bullet — outline with a small centre, fills on hover */}
                      <span
                        aria-hidden
                        className="relative flex h-2.5 w-2.5 shrink-0 rotate-45 items-center justify-center border border-gold transition-colors duration-300 group-hover:bg-gold"
                      >
                        <span className="h-1 w-1 bg-gold" />
                      </span>
                      <span className="transition-colors duration-300 group-hover:text-gold-deep">{item}</span>
                    </li>
                  ))}
                </ul>

                {s.categories?.length > 0 && (
                  <>
                    <p className="label mt-10 text-gold-deep">See examples</p>
                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                      {s.categories.map(categoryByTitle).filter(Boolean).map((c) => (
                        <TextLink key={c.slug} to={c.href}>
                          {c.title}
                        </TextLink>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Process — background continues the alternation after 4 service blocks */}
      <Process bg="bg-white" />

      {/* FAQ */}
      <section className="section bg-champagne">
        <div className="container-content grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Questions" title="FAQ" align="left" />
            <p className="mt-6 max-w-xs text-[0.9375rem] text-espresso/85">
              Can’t find what you’re looking for? Send us a message and we’ll be happy to help.
            </p>
            <BookNowButton variant="ghost" size="sm" className="mt-8" placement="services-faq" />
          </div>
          <div className="md:col-span-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SectionHeading from '../components/ui/SectionHeading';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import CtaBand from '../components/home/CtaBand';
import about from '../content/about.json';
import team from '../content/team.json';
import work from '../content/work.json';
import site from '../content/site.json';

const imageFor = (name) => work.find((w) => w.image === name);
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/** Small L-shaped gold marks on each corner of the parent (parent must be relative). */
function GoldCorners({ size = 'h-4 w-4' }) {
  const base = `absolute ${size} border-gold`;
  return (
    <span aria-hidden>
      <span className={`${base} -left-1.5 -top-1.5 border-l border-t`} />
      <span className={`${base} -right-1.5 -top-1.5 border-r border-t`} />
      <span className={`${base} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span className={`${base} -bottom-1.5 -right-1.5 border-b border-r`} />
    </span>
  );
}

/** About page (architecture §7.4). */
export default function About() {
  const { story, philosophy, values } = about;
  const [mainImg, accentImg] = story.images.map(imageFor);

  return (
    <>
      <Seo
        title="About Us"
        description="The story, philosophy and values behind Platinum Interior Design, interior designers in Harare, Zimbabwe."
      />
      <PageHero title="About Us" eyebrow="Our Studio" />

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-content grid items-center gap-16 md:grid-cols-12 md:gap-12">
          <div className="max-w-prose md:col-span-6">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="h2 mt-4">{story.title}</h2>
            <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
            {story.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'mt-8' : 'mt-5'}>
                {p}
              </p>
            ))}
          </div>

          {/* Overlapping image pair */}
          <div className="relative mb-10 md:col-span-6 md:mb-0 md:pl-8">
            <div className="relative ml-auto w-[78%]">
              <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-gold" />
              {mainImg && (
                <ResponsiveImage
                  name={mainImg.image}
                  alt={mainImg.alt}
                  sizes="(min-width: 768px) 38vw, 78vw"
                  className="relative block bg-champagne"
                  imgClassName="aspect-[3/4] w-full object-cover"
                  style={{ objectPosition: mainImg.focus }}
                />
              )}
            </div>
            {accentImg && (
              <div className="absolute -bottom-10 left-0 w-[45%] border-[6px] border-white shadow-soft md:left-0">
                <ResponsiveImage
                  name={accentImg.image}
                  alt={accentImg.alt}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="block bg-champagne"
                  imgClassName="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: accentImg.focus }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Stats — TODO(open): add real numbers to site.json "stats"; hidden while empty */}
        {site.stats?.length > 0 && (
          <div className="container-content mt-28">
            <dl className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-0">
              {site.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-14 text-center ${i > 0 ? 'md:border-l md:border-gold' : ''}`}
                >
                  <dt className="caption order-2 mt-2">{s.label}</dt>
                  <dd className="order-1 bg-gold-gradient bg-clip-text font-display text-6xl text-transparent">
                    {s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* ── Philosophy ────────────────────────────────────── */}
      <section className="section bg-champagne">
        <div className="container-content">
          <figure className="relative mx-auto max-w-4xl px-6 py-16 text-center md:px-16 md:py-20">
            <GoldCorners size="h-8 w-8" />
            <Eyebrow>{philosophy.eyebrow}</Eyebrow>
            <span aria-hidden className="mt-6 block font-display text-7xl leading-none text-gold/50">
              “
            </span>
            <blockquote className="-mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic leading-snug text-espresso">
              {philosophy.quote}
            </blockquote>
            <figcaption className="caption mt-8 text-gold-deep">— {philosophy.attribution}</figcaption>
          </figure>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-content">
          <SectionHeading eyebrow={values.eyebrow} title={values.title} divider />
          <ul className="mt-16 grid gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-4">
            {values.items.map((v, i) => (
              <li key={v.title} className="group bg-white px-8 py-12 text-center">
                <span className="block font-display text-5xl text-gold transition-transform duration-500 group-hover:-translate-y-1">
                  {ROMAN[i]}
                </span>
                <span aria-hidden className="mx-auto mt-5 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
                <h3 className="mt-6 text-xl text-espresso">{v.title}</h3>
                <p className="mx-auto mt-4 max-w-[16rem] text-[0.9375rem] text-espresso/85">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Team — hidden until team.json has real people ─── */}
      {team.length > 0 && (
        <section className="section bg-champagne">
          <div className="container-content">
            <SectionHeading eyebrow={about.team.eyebrow} title={about.team.title} divider />
            <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="text-center">
                  <div className="relative mx-auto max-w-xs">
                    <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold" />
                    <img
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      loading="lazy"
                      className="relative aspect-[4/5] w-full bg-sand object-cover"
                    />
                  </div>
                  <h3 className="mt-8 text-xl">{m.name}</h3>
                  <p className="caption mt-2 text-gold-deep">{m.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

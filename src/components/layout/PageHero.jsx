import { Link } from 'react-router-dom';
import LogoDivider from '../ui/LogoDivider';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/**
 * Common sub-page hero.
 * - With `image` (an image name from work.json): 50vh photo, white H1 over a warm gradient overlay.
 * - Without: sand background, gold-deep H1.
 */
export default function PageHero({ title, eyebrow, image, crumbs = [] }) {
  const trail = [{ to: '/', label: 'Home' }, ...crumbs];
  const photo = image && work.find((w) => w.image === image);

  if (photo) {
    return (
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-espresso">
        {/* Decorative: the heading carries the meaning */}
        <ResponsiveImage
          name={photo.image}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 block"
          imgClassName="h-full w-full object-cover"
          style={{ objectPosition: photo.focus }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/25 to-espresso/10" />
        <div className="container-content relative pb-14 pt-32 text-white">
          <Breadcrumb trail={trail} title={title} tone="white" />
          {eyebrow && <p className="label mt-6 text-gold-light">{eyebrow}</p>}
          <h1 className="h1 mt-3">{title}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand">
      <div className="container-content flex flex-col items-center pb-16 pt-36 text-center md:pb-20 md:pt-44">
        <Breadcrumb trail={trail} title={title} />
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="h1 mt-3 text-gold-deep">{title}</h1>
        <LogoDivider className="mt-6" />
      </div>
    </section>
  );
}

function Breadcrumb({ trail, title, tone }) {
  const color = tone === 'white' ? 'text-white/80' : 'text-taupe';
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`caption flex flex-wrap items-center gap-2 ${color}`}>
        {trail.map(({ to, label }) => (
          <li key={to} className="flex items-center gap-2">
            <Link to={to} className="hover:text-gold-deep">
              {label}
            </Link>
            <span aria-hidden>/</span>
          </li>
        ))}
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

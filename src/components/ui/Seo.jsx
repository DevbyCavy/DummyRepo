import { Helmet } from 'react-helmet-async';
import site from '../../content/site.json';

/** Per-page title + description. (Open Graph / JSON-LD come later — architecture §11.3.) */
export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

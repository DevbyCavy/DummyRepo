import { Link, useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Placeholder from '../components/ui/Placeholder';
import CtaBand from '../components/home/CtaBand';
import BookNowButton from '../components/ui/BookNowButton';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectGrid from '../components/portfolio/ProjectGrid';
import site from '../content/site.json';

/* Skeleton pages — each will move into its own file as it is built out. */

export function Portfolio() {
  return (
    <>
      <Seo title="Portfolio" description="Residential, commercial and hospitality interiors by Platinum Interior Design." />
      <PageHero title="Portfolio" eyebrow="Our Work" crumbs={[]} />
      <section className="section">
        <div className="container-content">
          <SectionHeading title="All Projects" divider />
          <div className="mt-16">
            <ProjectGrid placement="portfolio" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const title = slug.replace(/-/g, ' ');
  return (
    <>
      <Seo title={title} />
      <PageHero title={title} crumbs={[{ to: '/portfolio', label: 'Portfolio' }]} />
      <section className="section">
        <div className="container-content flex justify-center">
          <BookNowButton
            placement="project"
            context={{ label: 'Project', value: title, url: typeof window !== 'undefined' ? window.location.href : '' }}
          />
        </div>
      </section>
      <Placeholder bg="bg-champagne" title="The Story" note="7.2 Story, gallery, before/after, share row, prev/next" />
      <CtaBand />
    </>
  );
}


export function Privacy() {
  return (
    <>
      <Seo title="Privacy Notice" />
      <PageHero title="Privacy Notice" />
      <section className="section">
        <div className="container-content max-w-prose space-y-4">
          {/* TODO(open): full privacy notice copy. */}
          <p>
            This notice explains how Platinum Interior Design collects and uses personal information submitted through
            this website’s enquiry and newsletter forms.
          </p>
          <p>
            Conversations started with the “Book Us Now” button take place on WhatsApp and are handled by WhatsApp/Meta
            under their own terms and privacy policy.
          </p>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="flex min-h-[80vh] items-center bg-sand pt-24">
        <div className="container-content flex flex-col items-center text-center">
          <p className="eyebrow">404</p>
          <h1 className="h1 mt-4 text-gold-deep">This room is still being designed.</h1>
          <Link to="/" className="label mt-10 text-gold-deep underline underline-offset-8">
            Back to home →
          </Link>
        </div>
      </section>
    </>
  );
}

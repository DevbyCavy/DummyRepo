import { Link, useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Placeholder from '../components/ui/Placeholder';
import CtaBand from '../components/home/CtaBand';
import BookNowButton from '../components/ui/BookNowButton';
import site from '../content/site.json';

/* Skeleton pages — each will move into its own file as it is built out. */

export function Portfolio() {
  return (
    <>
      <Seo title="Portfolio" description="Residential, commercial and hospitality interiors by Platinum Interior Design." />
      <PageHero title="Portfolio" eyebrow="Our Work" crumbs={[]} />
      <Placeholder title="All Projects" note="7.1 Filter bar + masonry grid" />
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

export function Services() {
  return (
    <>
      <Seo title="Services" description="Interior design, space planning, sourcing and renovation in Harare." />
      <PageHero title="Services" eyebrow="What We Do" />
      <Placeholder title="Our Services" note="7.3 Service blocks, process, FAQ" />
      <CtaBand />
    </>
  );
}

export function About() {
  return (
    <>
      <Seo title="About" description="The story and philosophy behind Platinum Interior Design." />
      <PageHero title="About" eyebrow="Our Studio" />
      <Placeholder title="Our Story" note="7.4 Story, philosophy, values, team" />
      <CtaBand />
    </>
  );
}

export function Journal() {
  return (
    <>
      <Seo title="Journal" />
      <PageHero title="Journal" eyebrow="News & Ideas" />
      <Placeholder title="Latest" note="Journal list (optional for v1)" />
    </>
  );
}

export function JournalPost() {
  const { slug } = useParams();
  const title = slug.replace(/-/g, ' ');
  return (
    <>
      <Seo title={title} />
      <PageHero title={title} crumbs={[{ to: '/journal', label: 'Journal' }]} />
      <Placeholder title="Article" />
    </>
  );
}

export function Contact() {
  return (
    <>
      <Seo title="Contact" description="Book Platinum Interior Design on WhatsApp, or send us an email enquiry." />
      <PageHero title="Contact" eyebrow="Get In Touch" />
      <section className="section">
        <div className="container-content">
          <div className="mx-auto flex max-w-2xl flex-col items-center border border-gold bg-champagne px-6 py-16 text-center">
            <h2 className="h2">Book Us Now</h2>
            <p className="mt-4">The quickest way to reach us is WhatsApp.</p>
            <BookNowButton size="lg" label="Chat on WhatsApp" placement="contact" className="mt-8" />
            {/* TODO(open): company WhatsApp number */}
            <p className="caption mt-5">{site.whatsappDisplay}</p>
          </div>
        </div>
      </section>
      <div id="enquiry">
        <Placeholder bg="bg-white" eyebrow="Prefer email?" title="Send an Enquiry" note="7.5 Enquiry form + studio details + map" />
      </div>
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

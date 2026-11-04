import Seo from '../components/ui/Seo';
import Placeholder from '../components/ui/Placeholder';
import Hero from '../components/home/Hero';
import CtaBand from '../components/home/CtaBand';
import Intro from '../components/home/Intro';
import RecentWork from '../components/home/RecentWork';
import FeaturedSpaces from '../components/home/FeaturedSpaces';

/** Home — sections in order with the white / champagne rhythm from architecture §6. */
export default function Home() {
  return (
    <>
      <Seo description="Platinum Interior Design — bespoke interiors for homes and businesses in Harare, Zimbabwe." />
      <Hero />
      <Intro />
      <FeaturedSpaces />
      <RecentWork />
      <Placeholder bg="bg-champagne" title="What We Do" note="6.5 Services preview" />
      <Placeholder bg="bg-white" title="Our Process" note="6.6 Process timeline" />
      <Placeholder bg="bg-sand" title="Kind Words" note="6.7 Testimonials (hidden when empty)" />
      <CtaBand />
    </>
  );
}

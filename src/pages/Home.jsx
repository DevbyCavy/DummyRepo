import Seo from '../components/ui/Seo';
import Placeholder from '../components/ui/Placeholder';
import Hero from '../components/home/Hero';
import CtaBand from '../components/home/CtaBand';

/** Home — sections in order with the white / champagne rhythm from architecture §6. */
export default function Home() {
  return (
    <>
      <Seo description="Platinum Interior Design — bespoke interiors for homes and businesses in Harare, Zimbabwe." />
      <Hero />
      <Placeholder bg="bg-white" eyebrow="Welcome" title="Designed With Intention" note="6.2 Intro + stats" />
      <Placeholder bg="bg-champagne" eyebrow="Residential · Commercial" title="Featured Spaces" note="6.3 Featured Spaces" />
      <Placeholder bg="bg-white" title="Selected Projects" note="6.4 Selected Projects grid" />
      <Placeholder bg="bg-champagne" title="What We Do" note="6.5 Services preview" />
      <Placeholder bg="bg-white" title="Our Process" note="6.6 Process timeline" />
      <Placeholder bg="bg-sand" title="Kind Words" note="6.7 Testimonials (hidden when empty)" />
      <Placeholder bg="bg-white" eyebrow="Follow Our Work" title="@platinuminteriordesign" note="6.8 Instagram feed" />
      <Placeholder bg="bg-champagne" title="Journal" note="6.9 Journal preview (optional)" />
      <CtaBand />
    </>
  );
}

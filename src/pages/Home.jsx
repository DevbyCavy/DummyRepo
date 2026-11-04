import Seo from '../components/ui/Seo';
import Testimonials from '../components/home/Testimonials';
import Hero from '../components/home/Hero';
import CtaBand from '../components/home/CtaBand';
import Intro from '../components/home/Intro';
import RecentWork from '../components/home/RecentWork';
import FeaturedSpaces from '../components/home/FeaturedSpaces';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Process from '../components/home/Process';

/** Home — sections in order with the white / champagne rhythm from architecture §6. */
export default function Home() {
  return (
    <>
      <Seo description="Platinum Interior Design — bespoke interiors for homes and businesses in Harare, Zimbabwe." />
      <Hero />
      <Intro />
      <FeaturedSpaces />
      <RecentWork />
      <WhyChooseUs />
      <Process bg="bg-white" />
      <Testimonials />
      <CtaBand />
    </>
  );
}

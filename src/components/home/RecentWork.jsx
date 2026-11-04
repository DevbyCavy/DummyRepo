import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import ProjectGrid from '../portfolio/ProjectGrid';

/* Home §6.4 — Selected Projects. */
export default function RecentWork() {
  return (
    <section className="section bg-white">
      <div className="container-content">
        <SectionHeading eyebrow="Our Work" title="Selected Projects" divider="Spaces That Inspire" />
        <div className="mt-16">
          <ProjectGrid placement="recent-work" />
        </div>
        <div className="mt-14 flex justify-center">
          <Button to="/portfolio" variant="ghost">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

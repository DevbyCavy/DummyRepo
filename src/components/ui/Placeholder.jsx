import SectionHeading from './SectionHeading';

/** Temporary stand-in for sections that haven't been built yet. */
export default function Placeholder({ eyebrow, title, note, bg = 'bg-white' }) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-content">
        <SectionHeading eyebrow={eyebrow} title={title} divider />
        <div className="mx-auto mt-12 flex h-48 max-w-3xl items-center justify-center border border-dashed border-gold/50 text-center">
          <p className="caption px-6">{note || 'Section coming soon'}</p>
        </div>
      </div>
    </section>
  );
}

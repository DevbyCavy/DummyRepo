/** "— SPACES THAT INSPIRE —" style divider: gold line · label · gold line. */
export default function LogoDivider({ label, tone = 'gold', className = '' }) {
  const line = tone === 'white' ? 'bg-white/70' : 'bg-gold';
  const text = tone === 'white' ? 'text-white' : 'text-gold-deep';
  if (!label) {
    return <span aria-hidden className={`mx-auto block h-px w-20 ${line} ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden={!label}>
      <span className={`h-px w-10 md:w-16 ${line}`} />
      {label && <span className={`label ${text}`}>{label}</span>}
      <span className={`h-px w-10 md:w-16 ${line}`} />
    </div>
  );
}

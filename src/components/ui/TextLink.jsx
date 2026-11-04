import { Link } from 'react-router-dom';

/** Uppercase label + thin arrow; gold underline animates in on hover. */
export default function TextLink({ to, href, children, className = '', ...rest }) {
  const cls = `group inline-flex items-center gap-3 label text-gold-deep ${className}`;
  const inner = (
    <>
      <span className="relative pb-1">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  return to ? (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

/**
 * Embedded Facebook video / reel (vertical 9:16).
 * Lazy-loaded: the Facebook iframe only loads when it scrolls near the viewport.
 */
export default function FacebookVideo({ url, title, width = 300 }) {
  const height = Math.round((width * 16) / 9);
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=${width}&height=${height}`;

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: width }}>
      {/* Offset gold frame */}
      <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold" />
      <div className="relative overflow-hidden bg-sand" style={{ aspectRatio: '9 / 16' }}>
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

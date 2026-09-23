/**
 * PageBanner — a fading background-image header strip, reused at the top of
 * every major page for a consistent, "magazine cover" feel. `bgImage` points
 * at a file in your public/ folder (e.g. '/dashboard-bg.jpg'); if that file
 * doesn't exist yet, the dark `bg-ink` base plus gradient overlay still look
 * intentional on their own — nothing breaks or shows a broken-image icon,
 * since this uses a CSS background-image rather than an <img> tag.
 */
export default function PageBanner({ eyebrow, title, subtitle, bgImage, compact = false }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl border border-border card-shadow flex items-end bg-ink',
        compact ? 'min-h-[110px]' : 'min-h-[190px]',
      ].join(' ')}
    >
      <div
        className="hero-bg-fade absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" aria-hidden="true" />
      <div className={`relative w-full ${compact ? 'px-6 py-5' : 'px-7 py-7'}`}>
        {eyebrow && (
          <p className="text-text-on-ink/70 text-xs uppercase tracking-widest font-semibold mb-1.5">{eyebrow}</p>
        )}
        <h2 className={`font-display text-text-on-ink font-semibold ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
          {title}
        </h2>
        {subtitle && <p className="text-text-on-ink/70 text-sm mt-2 max-w-md">{subtitle}</p>}
      </div>
    </div>
  );
}

// Infinite horizontal ticker. The track is duplicated and translated -50% so
// the loop is seamless. Pure CSS animation (cheap); paused under reduced motion
// by the global rule. `aria-hidden` on the duplicate so screen readers hear it once.
export default function Marquee({ items, className = '' }) {
  const row = (hidden) => (
    <ul className="flex flex-none items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className="font-display text-2xl font-semibold text-chalk-faint sm:text-3xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-paper/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`relative flex overflow-hidden py-8 ${className}`}
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

export default function SectionBadge({ children, className = '' }) {
  return (
    <span
      className={`relative inline-flex items-center border border-white/20 bg-white/[0.025] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${className}`}
    >
      <span aria-hidden="true" className="absolute -left-[2px] -top-[2px] h-1 w-1 bg-neutral-400" />
      <span aria-hidden="true" className="absolute -right-[2px] -top-[2px] h-1 w-1 bg-white" />
      <span aria-hidden="true" className="absolute -bottom-[2px] -left-[2px] h-1 w-1 bg-white" />
      <span aria-hidden="true" className="absolute -bottom-[2px] -right-[2px] h-1 w-1 bg-neutral-400" />
      <span className="bg-gradient-to-r from-neutral-500 via-white to-neutral-500 bg-clip-text text-transparent">
        {children}
      </span>
    </span>
  )
}

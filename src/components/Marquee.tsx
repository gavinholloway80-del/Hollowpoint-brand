interface MarqueeProps {
  items: string[]
  fast?: boolean
  className?: string
}

export default function Marquee({ items, fast, className }: MarqueeProps) {
  const sequence = [...items, ...items]
  return (
    <div
      className={`flex w-full overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <div
        className={`flex shrink-0 ${
          fast ? 'animate-marquee-fast' : 'animate-marquee'
        }`}
      >
        {sequence.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-display text-base uppercase tracking-widest"
          >
            <span className="px-6">{item}</span>
            <span className="text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

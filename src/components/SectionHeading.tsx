import { Link } from 'react-router-dom'
import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  to?: string
  linkLabel?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  to,
  linkLabel = 'View all',
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink-line pb-5">
        <div>
          {eyebrow && (
            <span className="mb-2 block font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              {eyebrow}
            </span>
          )}
          <h2 className="display-title text-4xl sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>
        {to && (
          <Link
            to={to}
            className="link-underline font-heading text-sm font-bold uppercase tracking-widest text-bone/80 hover:text-neon"
          >
            {linkLabel} →
          </Link>
        )}
      </div>
    </Reveal>
  )
}

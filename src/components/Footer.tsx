import { useState } from 'react'
import { Link } from 'react-router-dom'
import Marquee from './Marquee'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/shop?filter=New' },
      { label: 'Best Sellers', to: '/shop?filter=Best Seller' },
      { label: 'Limited Drops', to: '/shop?filter=Limited' },
      { label: 'All Products', to: '/shop' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Collections', to: '/collections' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Brand Story', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'Size Guide', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="border-b border-ink-line py-4 text-bone">
        <Marquee
          items={[
            'Free shipping over $150',
            'New drops every friday',
            'Built for the street',
            'Members get early access',
          ]}
        />
      </div>

      <div className="container-max grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-neon" />
            <span className="font-display text-2xl tracking-tight">
              HOLLOWPOINT
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/55">
            Bold urban streetwear engineered for the city. Skate culture, hip-hop
            roots, modern silhouettes. Worn loud.
          </p>

          <form
            className="mt-7"
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setDone(true)
            }}
          >
            <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-ultra text-bone/60">
              Join the list
            </label>
            {done ? (
              <p className="border border-neon/40 bg-neon/5 px-4 py-3 text-sm text-neon">
                You're in. Watch your inbox for the next drop. ✦
              </p>
            ) : (
              <div className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="field flex-1 rounded-none"
                />
                <button type="submit" className="btn-neon shrink-0 px-5">
                  →
                </button>
              </div>
            )}
          </form>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-ultra text-bone/50">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="link-underline font-heading text-sm font-semibold uppercase tracking-wide text-bone/80 hover:text-neon"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-max flex flex-col items-center justify-between gap-4 border-t border-ink-line py-6 sm:flex-row">
        <p className="text-xs uppercase tracking-widest text-bone/40">
          © {new Date().getFullYear()} Hollowpoint. All rights reserved.
        </p>
        <div className="flex gap-5">
          {['Instagram', 'TikTok', 'YouTube', 'Discord'].map((s) => (
            <a
              key={s}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="link-underline text-xs font-bold uppercase tracking-widest text-bone/50 hover:text-neon"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { cx } from '../lib/utils'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-line bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent',
      )}
    >
      <nav className="container-max flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Mobile menu toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="space-y-1.5">
            <span
              className={cx(
                'block h-0.5 w-6 bg-bone transition-all',
                mobileOpen && 'translate-y-2 rotate-45',
              )}
            />
            <span
              className={cx(
                'block h-0.5 w-6 bg-bone transition-all',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cx(
                'block h-0.5 w-6 bg-bone transition-all',
                mobileOpen && '-translate-y-2 -rotate-45',
              )}
            />
          </div>
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 lg:flex-1"
          aria-label="Hollowpoint home"
        >
          <span className="inline-block h-3 w-3 rounded-full bg-neon shadow-[0_0_12px_2px_rgba(204,255,0,0.6)]" />
          <span className="font-display text-xl tracking-tight lg:text-2xl">
            HOLLOWPOINT
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:flex-1 lg:justify-center">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cx(
                  'link-underline font-heading text-sm font-bold uppercase tracking-widest transition-colors',
                  isActive ? 'text-neon' : 'text-bone/80 hover:text-bone',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1 lg:flex-1">
          <button
            className="hidden h-10 w-10 items-center justify-center text-bone/80 transition-colors hover:text-neon sm:flex"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button
            onClick={openCart}
            className="relative flex h-10 items-center gap-2 px-2 text-bone transition-colors hover:text-neon"
            aria-label={`Cart, ${count} items`}
          >
            <BagIcon />
            <span className="hidden font-heading text-sm font-bold uppercase tracking-widest sm:inline">
              Cart
            </span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon px-1 font-heading text-[11px] font-extrabold text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink-line bg-ink lg:hidden"
          >
            <div className="container-max flex flex-col py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cx(
                      'border-b border-ink-line py-4 font-display text-3xl uppercase tracking-tight transition-colors',
                      isActive ? 'text-neon' : 'text-bone',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h12l1 13H5L6 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 9V6a3 3 0 0 1 6 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

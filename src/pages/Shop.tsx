import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { categories, products, type Category } from '../data/products'
import { cx } from '../lib/utils'

type SortKey = 'featured' | 'price-asc' | 'price-desc'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') as Category | null
  const activeBadge = params.get('filter')
  const [sort, setSort] = useState<SortKey>('featured')

  const setCategory = (cat: Category | null) => {
    const next = new URLSearchParams(params)
    if (cat) next.set('category', cat)
    else next.delete('category')
    next.delete('filter')
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (activeBadge) list = list.filter((p) => p.badge === activeBadge)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [activeCategory, activeBadge, sort])

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        {/* Header */}
        <header className="border-b border-ink-line bg-ink-soft">
          <div className="container-max py-12 lg:py-16">
            <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              All Products
            </span>
            <h1 className="display-title mt-3 text-6xl sm:text-7xl lg:text-8xl">
              {activeCategory ?? activeBadge ?? 'Shop'}
            </h1>
            <p className="mt-3 text-bone/55">
              {filtered.length} piece{filtered.length === 1 ? '' : 's'} ·
              heavyweight fabrics, drop-only silhouettes.
            </p>
          </div>
        </header>

        <div className="container-max py-8">
          {/* Filter bar */}
          <div className="mb-8 flex flex-col gap-4 border-b border-ink-line pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterPill
                active={!activeCategory && !activeBadge}
                onClick={() => setCategory(null)}
              >
                All
              </FilterPill>
              {categories.map((cat) => (
                <FilterPill
                  key={cat}
                  active={activeCategory === cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </FilterPill>
              ))}
            </div>

            <label className="flex items-center gap-3">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="field w-auto cursor-pointer py-2.5 pr-8"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </label>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-4xl text-ink-line">No matches</p>
              <button
                onClick={() => setCategory(null)}
                className="btn-outline mt-6"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'border px-4 py-2 font-heading text-xs font-bold uppercase tracking-widest transition-all',
        active
          ? 'border-neon bg-neon text-ink'
          : 'border-ink-line text-bone/70 hover:border-bone hover:text-bone',
      )}
    >
      {children}
    </button>
  )
}

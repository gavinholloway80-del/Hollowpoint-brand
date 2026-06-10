import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import SmartImage from '../components/SmartImage'
import { collections, products } from '../data/products'

export default function Collections() {
  const { slug } = useParams()
  const active = collections.find((c) => c.slug === slug)

  if (active) {
    const items = products.filter(
      (p) => p.drop?.toLowerCase() === active.name.toLowerCase(),
    )
    return (
      <Page>
        <div className="pt-16 lg:pt-20">
          <section className="relative h-[55svh] min-h-[420px] overflow-hidden">
            <SmartImage
              label={active.name}
              src={active.image}
              alt={active.name}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="container-max absolute inset-x-0 bottom-0 pb-12">
              <Link
                to="/collections"
                className="link-underline font-heading text-xs font-bold uppercase tracking-widest text-bone/70"
              >
                ← All Collections
              </Link>
              <h1 className="display-title mt-4 text-7xl sm:text-8xl lg:text-9xl">
                {active.name}
              </h1>
              <p className="mt-3 max-w-xl text-bone/70">{active.description}</p>
            </div>
          </section>

          <section className="container-max py-12 lg:py-16">
            {items.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.05}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="py-16 text-center font-display text-4xl text-ink-line">
                Dropping soon
              </p>
            )}
          </section>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <header className="border-b border-ink-line bg-ink-soft">
          <div className="container-max py-12 lg:py-16">
            <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              Curated Capsules
            </span>
            <h1 className="display-title mt-3 text-6xl sm:text-7xl lg:text-8xl">
              Collections
            </h1>
            <p className="mt-3 max-w-xl text-bone/55">
              Three worlds, one wardrobe. Each capsule is built around a fabric
              story and a mood from the city.
            </p>
          </div>
        </header>

        <section className="container-max py-12 lg:py-16">
          <div className="flex flex-col gap-4">
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link
                  to={`/collections/${c.slug}`}
                  className="group relative flex aspect-[16/10] items-end overflow-hidden bg-ink-card sm:aspect-[21/9]"
                >
                  <SmartImage
                    label={c.name}
                    src={c.image}
                    alt={c.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="relative w-full p-6 lg:p-10">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
                          {c.tagline}
                        </span>
                        <h2 className="display-title mt-2 text-5xl sm:text-7xl lg:text-8xl group-hover:text-neon">
                          {c.name}
                        </h2>
                      </div>
                      <span className="font-heading text-sm font-bold uppercase tracking-widest text-bone/70">
                        {c.items} pieces →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </Page>
  )
}

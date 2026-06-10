import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'
import SmartImage from '../components/SmartImage'
import {
  bestSellers,
  categories,
  limitedDrops,
  newArrivals,
  products,
} from '../data/products'

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const categoryMeta: Record<string, { image: string }> = {
  Hoodies: { image: img('photo-1620799140408-edc6dcb6d633', 700) },
  Tees: { image: img('photo-1521572163474-6864f9cf17ab', 700) },
  Cargo: { image: img('photo-1517445312882-bc9910d016b7', 700) },
  Sneakers: { image: img('photo-1542291026-7eec264c27ff', 700) },
  Accessories: { image: img('photo-1588850561407-ed78c282e89b', 700) },
}

const reviews = [
  {
    name: 'Mara K.',
    handle: '@maraskates',
    text: 'The oversized hoodie is unreal. Heavy, structured, drapes perfect. I basically live in it now.',
    product: 'Nightshift Oversized Hoodie',
    rating: 5,
  },
  {
    name: 'Devon R.',
    handle: '@dvn.fits',
    text: 'Copped the Apex high-tops on the last drop. Build quality is way above the price. Compliments daily.',
    product: 'Apex High-Top Sneaker',
    rating: 5,
  },
  {
    name: 'Imani S.',
    handle: '@imani.streets',
    text: 'Cargos fit like nothing else I own. The pockets are actually functional and the taper is clean.',
    product: 'Tactical Utility Cargos',
    rating: 5,
  },
  {
    name: 'Theo L.',
    handle: '@theo.wav',
    text: 'Fast shipping, packaging is a vibe, and the graphic tees hold up after a ton of washes. Repeat buyer.',
    product: 'Static Acid Graphic Tee',
    rating: 5,
  },
]

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Home() {
  const dropTarget = useState(() => Date.now() + 1000 * 60 * 60 * 52)[0]
  const { days, hours, minutes, seconds } = useCountdown(dropTarget)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <Page>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink pt-16 lg:pt-20">
        <div className="absolute inset-0">
          <SmartImage
            label="Hollowpoint hero"
            src={img('photo-1483985988355-763728e1935b', 1600)}
            alt="Streetwear editorial"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="absolute inset-0 noise-bg" />
        </div>

        <div className="container-max relative flex min-h-[calc(100svh-5rem)] flex-col justify-end pb-16 pt-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex w-fit items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 font-heading text-xs font-bold uppercase tracking-ultra text-neon"
          >
            ✦ Drop 04 — Velocity live now
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display-title text-[18vw] leading-[0.8] sm:text-[15vw] lg:text-[11rem]"
          >
            BUILT FOR
            <br />
            THE <span className="text-stroke-neon">STREET</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-bone/70">
              Oversized hoodies, graphic tees, cargos, sneakers & hardware.
              Heavyweight fabrics and loud silhouettes engineered for skate
              culture, hip-hop and the modern city.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-neon">
                Shop The Drop
              </Link>
              <Link to="/lookbook" className="btn-outline">
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-ink-line bg-neon py-3 text-ink">
        <Marquee
          fast
          items={[
            'Oversized Hoodies',
            'Graphic Tees',
            'Cargo Pants',
            'Sneakers',
            'Accessories',
            'Limited Drops',
          ]}
        />
      </div>

      {/* CATEGORIES */}
      <section className="container-max py-16 lg:py-24">
        <SectionHeading
          eyebrow="Shop by category"
          title="The Arsenal"
          to="/shop"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat} delay={i * 0.05}>
              <Link
                to={`/shop?category=${cat}`}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-ink-card p-4"
              >
                <SmartImage
                  label={cat}
                  src={categoryMeta[cat].image}
                  alt={cat}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <span className="relative font-display text-lg uppercase tracking-tight transition-colors group-hover:text-neon">
                  {cat}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-max py-12 lg:py-16">
        <SectionHeading
          eyebrow="Fresh off the line"
          title="New Arrivals"
          to="/shop?filter=New"
        />
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.concat(products).slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIMITED DROP FEATURE */}
      <section className="relative my-12 overflow-hidden border-y border-ink-line bg-ink-soft lg:my-20">
        <div className="container-max grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div>
              <span className="chip border-neon-pink/50 text-neon-pink">
                ● Limited Drop
              </span>
              <h2 className="display-title mt-5 text-5xl sm:text-6xl lg:text-7xl">
                Velocity
                <br />
                <span className="text-stroke">Capsule</span>
              </h2>
              <p className="mt-5 max-w-md text-bone/65">
                Tech-nylon parachute pants, sculpted high-tops and reflective
                layers. Numbered, drop-only, gone when it's gone.
              </p>

              <div className="mt-8 flex gap-3">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hrs', value: hours },
                  { label: 'Min', value: minutes },
                  { label: 'Sec', value: seconds },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex w-20 flex-col items-center border border-ink-line bg-ink py-3"
                  >
                    <span className="font-display text-3xl text-neon">
                      {pad(t.value)}
                    </span>
                    <span className="mt-1 font-heading text-[10px] uppercase tracking-widest text-bone/50">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/collections/velocity" className="btn-neon mt-8">
                Explore The Capsule
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {limitedDrops.slice(0, 2).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-max py-12 lg:py-16">
        <SectionHeading
          eyebrow="Proven heat"
          title="Best Sellers"
          to="/shop?filter=Best Seller"
        />
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.concat(products).slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="container-max grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-card lg:aspect-square">
            <SmartImage
              label="Brand story"
              src={img('photo-1517438476312-10d79c077509', 1100)}
              alt="Crew on the street"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 border border-neon bg-ink/80 px-4 py-2 font-heading text-xs font-bold uppercase tracking-widest text-neon backdrop-blur">
              Est. 2019 — City Made
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <span className="mb-3 block font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              The Brand
            </span>
            <h2 className="display-title text-5xl sm:text-6xl">
              Loud By
              <br />
              Design
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">
              Hollowpoint started in a basement print room with one screen and a
              loud point of view. We make heavyweight, oversized streetwear for
              people who move through the city like they own it.
            </p>
            <p className="mt-4 leading-relaxed text-bone/55">
              No fast-fashion shortcuts. Premium fabrics, ethical factories,
              limited runs. Built from skate culture and hip-hop, dressed for
              right now.
            </p>
            <Link to="/about" className="btn-outline mt-8">
              Read The Story
            </Link>
          </div>
        </Reveal>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-ink-line bg-ink-soft py-16 lg:py-24">
        <div className="container-max">
          <SectionHeading eyebrow="Word on the street" title="Customer Reviews" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <Reveal key={r.handle} delay={i * 0.06}>
                <figure className="flex h-full flex-col border border-ink-line bg-ink p-6">
                  <div className="mb-3 text-neon">{'★'.repeat(r.rating)}</div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-bone/80">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-ink-line pt-4">
                    <p className="font-heading text-sm font-bold uppercase">
                      {r.name}
                    </p>
                    <p className="text-xs text-bone/45">{r.handle}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-neon/80">
                      {r.product}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-max py-20 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden border border-ink-line bg-ink-card px-6 py-16 text-center lg:py-24">
            <div className="absolute inset-0 noise-bg opacity-60" />
            <div className="relative">
              <h2 className="display-title text-5xl sm:text-7xl lg:text-8xl">
                Don't Miss
                <br />
                The Next <span className="text-stroke-neon">Drop</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-bone/65">
                New silhouettes every Friday. Members get 24-hour early access
                and exclusive colorways.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="btn-neon">
                  Shop Now
                </Link>
                <Link to="/collections" className="btn-outline">
                  See Collections
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </Page>
  )
}

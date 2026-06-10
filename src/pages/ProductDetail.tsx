import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import SmartImage from '../components/SmartImage'
import SectionHeading from '../components/SectionHeading'
import { getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'

export default function ProductDetail() {
  const { id } = useParams()
  const product = id ? getProduct(id) : undefined
  const { addItem } = useCart()

  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState(product?.colors[0] ?? '#0a0a0a')
  const [error, setError] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <Page>
        <div className="container-max flex min-h-[60svh] flex-col items-center justify-center gap-6 py-28 pt-32 text-center">
          <h1 className="display-title text-5xl">Product Not Found</h1>
          <Link to="/shop" className="btn-neon">
            Back To Shop
          </Link>
        </div>
      </Page>
    )
  }

  const gallery = [product.image, product.hoverImage].filter(
    Boolean,
  ) as string[]

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const fillers = products.filter((p) => p.id !== product.id).slice(0, 4)
  const recommendations = (related.length >= 4 ? related : fillers).slice(0, 4)

  const handleAdd = () => {
    if (!size) {
      setError(true)
      return
    }
    addItem(product, size, color)
  }

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <div className="container-max py-6">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-bone/40">
            <Link to="/" className="hover:text-neon">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-neon">
              Shop
            </Link>
            <span>/</span>
            <span className="text-bone/70">{product.name}</span>
          </nav>
        </div>

        <section className="container-max grid gap-8 pb-16 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-card">
              <SmartImage
                label={product.name}
                src={gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 bg-neon px-3 py-1 font-heading text-[11px] font-extrabold uppercase tracking-widest text-ink">
                  {product.badge}
                </span>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden bg-ink-card transition-all ${
                      activeImage === i
                        ? 'ring-2 ring-neon'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <SmartImage
                      label={product.name}
                      src={g}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              {product.category} · {product.drop} Collection
            </p>
            <h1 className="display-title mt-3 text-4xl sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-heading text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="font-heading text-lg text-bone/40 line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
              <span className="text-sm text-neon">★★★★★</span>
            </div>

            <p className="mt-6 leading-relaxed text-bone/70">
              {product.description}
            </p>

            {/* Color */}
            <div className="mt-8">
              <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                Color
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${
                      color === c
                        ? 'border-neon ring-2 ring-neon/30'
                        : 'border-ink-line'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                  Size
                </p>
                <button className="link-underline text-xs uppercase tracking-widest text-bone/50 hover:text-neon">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s)
                      setError(false)
                    }}
                    className={`min-w-[3.25rem] border px-3 py-3 font-heading text-sm font-bold uppercase transition-all ${
                      size === s
                        ? 'border-neon bg-neon text-ink'
                        : 'border-ink-line text-bone hover:border-bone'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-2 text-xs uppercase tracking-widest text-neon-pink">
                  Please select a size
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={handleAdd} className="btn-neon flex-1">
                Add To Bag · {formatPrice(product.price)}
              </button>
              <Link to="/checkout" className="btn-outline">
                Buy Now
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-ink-line pt-6 text-sm text-bone/60">
              <li>✦ Free shipping over $150</li>
              <li>✦ 30-day easy returns</li>
              <li>✦ Premium heavyweight fabric</li>
              <li>✦ Ethically manufactured</li>
            </ul>
          </div>
        </section>

        {/* Related */}
        <section className="container-max pb-20 lg:pb-28">
          <SectionHeading eyebrow="Complete the fit" title="You May Also Like" />
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {recommendations.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </Page>
  )
}

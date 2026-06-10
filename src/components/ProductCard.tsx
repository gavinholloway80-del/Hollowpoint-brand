import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'
import SmartImage from './SmartImage'

const badgeStyles: Record<string, string> = {
  New: 'bg-neon text-ink',
  'Best Seller': 'bg-bone text-ink',
  Limited: 'bg-neon-pink text-ink',
  Sale: 'bg-neon-blue text-ink',
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, product.sizes[0], product.colors[0])
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-card">
        <SmartImage
          label={product.name}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        {product.hoverImage && (
          <SmartImage
            label={product.name}
            src={product.hoverImage}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 px-2.5 py-1 font-heading text-[10px] font-extrabold uppercase tracking-widest ${
              badgeStyles[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={quickAdd}
            className="btn-neon w-full py-3 text-xs"
            aria-label={`Quick add ${product.name} to cart`}
          >
            Quick Add +
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-widest text-bone/40">
            {product.category}
          </p>
          <h3 className="mt-1 font-heading text-sm font-bold uppercase leading-tight tracking-wide text-bone group-hover:text-neon">
            {product.name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-heading text-sm font-bold text-bone">
            {formatPrice(product.price)}
          </p>
          {product.compareAt && (
            <p className="font-heading text-xs text-bone/40 line-through">
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c}
            className="h-3 w-3 rounded-full border border-ink-line"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </Link>
  )
}

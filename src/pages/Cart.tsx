import { Link } from 'react-router-dom'
import Page from '../components/Page'
import SmartImage from '../components/SmartImage'
import { cartItemKey, useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, count } = useCart()
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12
  const total = subtotal + shipping

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <header className="border-b border-ink-line bg-ink-soft">
          <div className="container-max py-12 lg:py-16">
            <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              Your Bag
            </span>
            <h1 className="display-title mt-3 text-6xl sm:text-7xl lg:text-8xl">
              Cart
              {count > 0 && <span className="text-neon"> ({count})</span>}
            </h1>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="container-max flex flex-col items-center gap-6 py-28 text-center">
            <span className="font-display text-7xl text-ink-line">∅</span>
            <p className="font-heading text-sm uppercase tracking-widest text-bone/60">
              Your bag is empty
            </p>
            <Link to="/shop" className="btn-neon">
              Start Shopping
            </Link>
          </div>
        ) : (
          <section className="container-max grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr] lg:py-16">
            {/* Items */}
            <div className="border-t border-ink-line">
              {items.map((item) => {
                const key = cartItemKey(item)
                return (
                  <div
                    key={key}
                    className="flex gap-4 border-b border-ink-line py-6 sm:gap-6"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="h-36 w-28 shrink-0 overflow-hidden bg-ink-card sm:h-44 sm:w-36"
                    >
                      <SmartImage
                        label={item.product.name}
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-heading text-[11px] font-bold uppercase tracking-widest text-bone/40">
                            {item.product.category}
                          </p>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-heading text-base font-bold uppercase leading-tight hover:text-neon"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-bone/50">
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-ink-line"
                              style={{ backgroundColor: item.color }}
                            />
                            Size {item.size}
                          </p>
                        </div>
                        <p className="font-heading text-base font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border border-ink-line">
                          <button
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="px-3.5 py-2 text-bone/70 hover:text-neon"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-10 text-center font-heading text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="px-3.5 py-2 text-bone/70 hover:text-neon"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(key)}
                          className="link-underline font-heading text-xs font-bold uppercase tracking-widest text-bone/50 hover:text-neon-pink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Link
                to="/shop"
                className="link-underline mt-6 inline-block font-heading text-sm font-bold uppercase tracking-widest text-bone/70 hover:text-neon"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <aside className="h-fit border border-ink-line bg-ink-soft p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl uppercase">Order Summary</h2>
              <dl className="mt-6 space-y-3 border-b border-ink-line pb-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-bone/60">Subtotal</dt>
                  <dd className="font-heading font-bold">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone/60">Shipping</dt>
                  <dd className="font-heading font-bold">
                    {shipping === 0 ? (
                      <span className="text-neon">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone/60">Estimated tax</dt>
                  <dd className="text-bone/40">Calculated at checkout</dd>
                </div>
              </dl>
              <div className="flex items-center justify-between py-5">
                <span className="font-heading text-sm uppercase tracking-widest text-bone/70">
                  Total
                </span>
                <span className="font-display text-3xl">
                  {formatPrice(total)}
                </span>
              </div>
              <Link to="/checkout" className="btn-neon w-full">
                Proceed To Checkout
              </Link>
              <p className="mt-4 text-center text-xs text-bone/40">
                Secure checkout · Free returns within 30 days
              </p>
            </aside>
          </section>
        )}
      </div>
    </Page>
  )
}

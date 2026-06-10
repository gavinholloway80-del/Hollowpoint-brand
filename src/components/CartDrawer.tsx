import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cartItemKey, useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'
import SmartImage from './SmartImage'

const FREE_SHIP_THRESHOLD = 150

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    subtotal,
    updateQuantity,
    removeItem,
    count,
  } = useCart()

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-ink-line bg-ink"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-ink-line px-5 py-5">
              <h2 className="font-display text-2xl uppercase">
                Your Bag
                <span className="ml-2 text-neon">({count})</span>
              </h2>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center text-bone/70 transition-colors hover:text-neon"
                aria-label="Close cart"
              >
                <CloseIcon />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <span className="font-display text-6xl text-ink-line">∅</span>
                <p className="font-heading text-sm uppercase tracking-widest text-bone/60">
                  Your bag is empty
                </p>
                <Link to="/shop" onClick={closeCart} className="btn-neon">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-ink-line px-5 py-4">
                  {remaining > 0 ? (
                    <p className="mb-2 text-xs uppercase tracking-widest text-bone/60">
                      Add{' '}
                      <span className="text-neon">{formatPrice(remaining)}</span>{' '}
                      for free shipping
                    </p>
                  ) : (
                    <p className="mb-2 text-xs uppercase tracking-widest text-neon">
                      You unlocked free shipping ✦
                    </p>
                  )}
                  <div className="h-1 w-full bg-ink-line">
                    <div
                      className="h-full bg-neon transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5">
                  {items.map((item) => {
                    const key = cartItemKey(item)
                    return (
                      <div
                        key={key}
                        className="flex gap-4 border-b border-ink-line py-5"
                      >
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="h-28 w-24 shrink-0 overflow-hidden bg-ink-card"
                        >
                          <SmartImage
                            label={item.product.name}
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <h3 className="font-heading text-sm font-bold uppercase leading-tight">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeItem(key)}
                              className="text-bone/40 transition-colors hover:text-neon-pink"
                              aria-label="Remove item"
                            >
                              <CloseIcon size={16} />
                            </button>
                          </div>
                          <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-widest text-bone/50">
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-ink-line"
                              style={{ backgroundColor: item.color }}
                            />
                            Size {item.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-ink-line">
                              <button
                                onClick={() =>
                                  updateQuantity(key, item.quantity - 1)
                                }
                                className="px-3 py-1.5 text-bone/70 hover:text-neon"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="min-w-8 text-center font-heading text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(key, item.quantity + 1)
                                }
                                className="px-3 py-1.5 text-bone/70 hover:text-neon"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-heading text-sm font-bold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-ink-line px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-heading text-sm uppercase tracking-widest text-bone/70">
                      Subtotal
                    </span>
                    <span className="font-display text-2xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/cart"
                      onClick={closeCart}
                      className="btn-outline"
                    >
                      View Bag
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="btn-neon"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

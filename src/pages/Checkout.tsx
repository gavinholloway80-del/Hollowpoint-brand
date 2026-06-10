import { useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import SmartImage from '../components/SmartImage'
import { cartItemKey, useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [orderId] = useState(
    () => 'HP-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
  )

  const shipping = subtotal > 150 ? 0 : 12
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  if (placed) {
    return (
      <Page>
        <div className="container-max flex min-h-[70svh] flex-col items-center justify-center gap-6 py-28 pt-32 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-neon text-4xl text-neon">
            ✦
          </span>
          <h1 className="display-title text-5xl sm:text-6xl">Order Confirmed</h1>
          <p className="max-w-md text-bone/65">
            Thanks for repping Hollowpoint. A confirmation is on its way to your
            inbox. Your order number is{' '}
            <span className="font-heading font-bold text-neon">{orderId}</span>.
          </p>
          <Link to="/shop" className="btn-neon">
            Keep Shopping
          </Link>
        </div>
      </Page>
    )
  }

  if (items.length === 0) {
    return (
      <Page>
        <div className="container-max flex min-h-[60svh] flex-col items-center justify-center gap-6 py-28 pt-32 text-center">
          <h1 className="display-title text-5xl">Nothing To Check Out</h1>
          <p className="text-bone/60">Your bag is empty — go grab some heat.</p>
          <Link to="/shop" className="btn-neon">
            Shop Now
          </Link>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <header className="border-b border-ink-line bg-ink-soft">
          <div className="container-max py-10 lg:py-12">
            <Link
              to="/cart"
              className="link-underline font-heading text-xs font-bold uppercase tracking-widest text-bone/60"
            >
              ← Back to bag
            </Link>
            <h1 className="display-title mt-3 text-5xl sm:text-6xl lg:text-7xl">
              Checkout
            </h1>
          </div>
        </header>

        <section className="container-max grid gap-12 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-16">
          {/* Form */}
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault()
              clearCart()
              setPlaced(true)
            }}
            className="space-y-10"
          >
            <FormBlock step="01" title="Contact">
              <Input label="Email" type="email" placeholder="you@email.com" />
              <Input label="Phone" type="tel" placeholder="(555) 000-0000" />
            </FormBlock>

            <FormBlock step="02" title="Shipping Address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First name" placeholder="Jordan" />
                <Input label="Last name" placeholder="Rivera" />
              </div>
              <Input label="Address" placeholder="Street address" />
              <Input label="Apt / Suite (optional)" required={false} placeholder="Unit" />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input label="City" placeholder="Brooklyn" />
                <Input label="State" placeholder="NY" />
                <Input label="ZIP" placeholder="11206" />
              </div>
            </FormBlock>

            <FormBlock step="03" title="Delivery">
              <div className="space-y-3">
                <Radio
                  name="delivery"
                  label="Standard"
                  sub="3–5 business days"
                  price={shipping === 0 ? 'Free' : formatPrice(12)}
                  defaultChecked
                />
                <Radio
                  name="delivery"
                  label="Express"
                  sub="1–2 business days"
                  price={formatPrice(20)}
                />
              </div>
            </FormBlock>

            <FormBlock step="04" title="Payment">
              <Input label="Card number" placeholder="4242 4242 4242 4242" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVC" placeholder="123" />
              </div>
              <Input label="Name on card" placeholder="Jordan Rivera" />
              <p className="text-xs text-bone/40">
                ⓘ Demo store — no real payment is processed.
              </p>
            </FormBlock>

            <button type="submit" className="btn-neon w-full text-base lg:hidden">
              Place Order · {formatPrice(total)}
            </button>
          </form>

          {/* Summary */}
          <aside className="h-fit border border-ink-line bg-ink-soft p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl uppercase">Order Summary</h2>
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto border-b border-ink-line pb-5">
              {items.map((item) => (
                <div key={cartItemKey(item)} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ink-card">
                    <SmartImage
                      label={item.product.name}
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon px-1 text-[11px] font-bold text-ink">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="font-heading text-xs font-bold uppercase leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-bone/45">Size {item.size}</p>
                  </div>
                  <p className="self-center font-heading text-sm font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <dl className="space-y-2 border-b border-ink-line py-5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? 'Free' : formatPrice(shipping)}
                accent={shipping === 0}
              />
              <Row label="Tax" value={formatPrice(tax)} />
            </dl>
            <div className="flex items-center justify-between py-5">
              <span className="font-heading text-sm uppercase tracking-widest text-bone/70">
                Total
              </span>
              <span className="font-display text-3xl">{formatPrice(total)}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="btn-neon hidden w-full lg:flex"
            >
              Place Order
            </button>
          </aside>
        </section>
      </div>
    </Page>
  )
}

function FormBlock({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 flex items-center gap-3">
        <span className="font-display text-xl text-neon">{step}</span>
        <span className="font-heading text-lg font-extrabold uppercase tracking-wide">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  )
}

function Input({
  label,
  type = 'text',
  placeholder,
  required = true,
}: {
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="field"
      />
    </div>
  )
}

function Radio({
  name,
  label,
  sub,
  price,
  defaultChecked,
}: {
  name: string
  label: string
  sub: string
  price: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border border-ink-line bg-ink p-4 transition-colors hover:border-bone has-[:checked]:border-neon">
      <span className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          defaultChecked={defaultChecked}
          className="h-4 w-4 accent-neon"
        />
        <span>
          <span className="block font-heading text-sm font-bold uppercase tracking-wide">
            {label}
          </span>
          <span className="block text-xs text-bone/50">{sub}</span>
        </span>
      </span>
      <span className="font-heading text-sm font-bold">{price}</span>
    </label>
  )
}

function Row({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-bone/60">{label}</dt>
      <dd className={`font-heading font-bold ${accent ? 'text-neon' : ''}`}>
        {value}
      </dd>
    </div>
  )
}

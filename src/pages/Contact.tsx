import { useState } from 'react'
import Page from '../components/Page'
import Reveal from '../components/Reveal'

const faqs = [
  {
    q: 'When do new drops release?',
    a: 'New silhouettes land every Friday at 12pm ET. Members on the list get 24-hour early access.',
  },
  {
    q: 'What are shipping times?',
    a: 'Orders ship within 1–2 business days. Free standard shipping on orders over $150. Express options at checkout.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unworn items with tags can be returned within 30 days for a full refund. Limited drop pieces are final sale.',
  },
  {
    q: 'How do the sizes run?',
    a: 'Our pieces are designed oversized. If you want a closer fit, size down one. Full size guide on every product page.',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: '',
  })

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <header className="border-b border-ink-line bg-ink-soft">
          <div className="container-max py-12 lg:py-16">
            <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
              Get In Touch
            </span>
            <h1 className="display-title mt-3 text-6xl sm:text-7xl lg:text-8xl">
              Contact
            </h1>
            <p className="mt-3 max-w-xl text-bone/55">
              Questions, collabs, press or just want to talk fits — hit us up.
              We answer fast.
            </p>
          </div>
        </header>

        <section className="container-max grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr] lg:py-16">
          {/* Form */}
          <Reveal>
            <div>
              <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide">
                Send a message
              </h2>
              {sent ? (
                <div className="mt-6 border border-neon/40 bg-neon/5 p-8 text-center">
                  <p className="font-display text-3xl text-neon">Message sent ✦</p>
                  <p className="mt-2 text-bone/65">
                    Thanks {form.name || 'friend'} — we'll get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', subject: 'General', message: '' })
                    }}
                    className="btn-outline mt-6"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                        Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={update('name')}
                        className="field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className="field"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={update('subject')}
                      className="field cursor-pointer"
                    >
                      <option>General</option>
                      <option>Order Support</option>
                      <option>Returns</option>
                      <option>Wholesale</option>
                      <option>Press / Collab</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-bone/50">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      className="field resize-none"
                      placeholder="What's on your mind?"
                    />
                  </div>
                  <button type="submit" className="btn-neon w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info + FAQ */}
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div className="border border-ink-line bg-ink-soft p-6">
                <h3 className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
                  HQ
                </h3>
                <p className="mt-3 text-bone/80">
                  214 Warehouse Block, Unit 7<br />
                  Brooklyn, NY 11206
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-bone/60">
                    Email:{' '}
                    <span className="text-bone">hey@hollowpoint.co</span>
                  </p>
                  <p className="text-bone/60">
                    Press:{' '}
                    <span className="text-bone">press@hollowpoint.co</span>
                  </p>
                  <p className="text-bone/60">
                    Hours: <span className="text-bone">Mon–Fri, 9–6 ET</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-heading text-xs font-bold uppercase tracking-ultra text-bone/50">
                  FAQ
                </h3>
                <div className="divide-y divide-ink-line border-y border-ink-line">
                  {faqs.map((f, i) => (
                    <div key={f.q}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="font-heading text-sm font-bold uppercase tracking-wide">
                          {f.q}
                        </span>
                        <span className="shrink-0 text-neon">
                          {openFaq === i ? '−' : '+'}
                        </span>
                      </button>
                      {openFaq === i && (
                        <p className="pb-4 text-sm leading-relaxed text-bone/60">
                          {f.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </Page>
  )
}

import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'

const img = (id: string, w = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const stats = [
  { value: '2019', label: 'Founded' },
  { value: '40+', label: 'Drops Released' },
  { value: '120K', label: 'Community' },
  { value: '100%', label: 'Ethically Made' },
]

const values = [
  {
    title: 'Heavyweight Only',
    text: 'No thin, throwaway fabric. We spec premium weights that hold shape and outlast trends.',
  },
  {
    title: 'Drop Culture',
    text: 'Limited runs, numbered pieces. When a drop sells out, it stays gone. No restocks, no dilution.',
  },
  {
    title: 'Made Right',
    text: 'Ethical factories, fair wages, lower-impact dye houses. Loud design with a clean conscience.',
  },
  {
    title: 'Street First',
    text: 'Every silhouette is tested in the wild — on boards, on trains, on the block. Function, then flex.',
  },
]

export default function About() {
  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink-line">
          <div className="absolute inset-0">
            <SmartImage
              label="About hero"
              src={img('photo-1441986300917-64674bd600d8', 1600)}
              alt=""
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/40" />
          </div>
          <div className="container-max relative py-20 lg:py-32">
            <Reveal>
              <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
                Brand Story
              </span>
              <h1 className="display-title mt-3 max-w-4xl text-6xl sm:text-7xl lg:text-[8rem]">
                We Make Noise Wearable
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="container-max grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-card">
              <SmartImage
                label="Print room"
                src={img('photo-1556905055-8f358a7a47b2')}
                alt="Founder in the print room"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="display-title text-4xl sm:text-5xl">
                One Screen,
                <br />
                One Point Of View
              </h2>
              <div className="mt-6 space-y-4 text-bone/70">
                <p>
                  Hollowpoint was born in 2019 in a basement print room with a
                  single screen, a stack of blanks and a refusal to blend in. We
                  pressed our first run of fifty hoodies by hand and sold them
                  out of a backpack at skate spots.
                </p>
                <p>
                  Today we ship worldwide, but nothing's changed at the core. We
                  still obsess over fabric weight, over the exact drop of a
                  shoulder, over graphics that say something. We design for the
                  kids who treat the city like a runway.
                </p>
                <p className="font-heading text-bone">
                  Built from skate culture and hip-hop. Worn loud. Made right.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="border-y border-ink-line bg-ink-soft">
          <div className="container-max grid grid-cols-2 gap-px lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="px-4 py-12 text-center">
                  <p className="font-display text-5xl text-neon lg:text-6xl">
                    {s.value}
                  </p>
                  <p className="mt-2 font-heading text-xs font-bold uppercase tracking-widest text-bone/55">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="container-max py-16 lg:py-24">
          <Reveal>
            <h2 className="display-title mb-10 text-5xl sm:text-6xl">
              What We
              <br />
              Stand For
            </h2>
          </Reveal>
          <div className="grid gap-px bg-ink-line sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full bg-ink p-8 lg:p-10">
                  <span className="font-display text-2xl text-neon">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-extrabold uppercase tracking-wide">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-bone/60">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-max pb-20 lg:pb-28">
          <Reveal>
            <div className="flex flex-col items-center gap-5 border border-ink-line bg-ink-card px-6 py-16 text-center">
              <h2 className="display-title text-4xl sm:text-6xl">
                Join The Movement
              </h2>
              <p className="max-w-md text-bone/60">
                Wear it loud. Tag <span className="text-neon">#hollowpoint</span>{' '}
                to get featured across our channels.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="btn-neon">
                  Shop The Brand
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get In Touch
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </Page>
  )
}

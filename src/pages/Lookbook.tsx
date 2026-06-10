import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

interface Shot {
  id: string
  src: string
  title: string
  span: string
}

const shots: Shot[] = [
  {
    id: 's1',
    src: img('photo-1529139574466-a303027c1d8b', 1100),
    title: 'Concrete Mornings',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  { id: 's2', src: img('photo-1483985988355-763728e1935b'), title: 'Crosswalk' , span: '' },
  { id: 's3', src: img('photo-1490481651871-ab68de25d43d'), title: 'Layered Up', span: '' },
  {
    id: 's4',
    src: img('photo-1441984904996-e0b6ba687e04', 1100),
    title: 'Night Shift',
    span: 'lg:col-span-2',
  },
  { id: 's5', src: img('photo-1485218126466-34e6392ec754'), title: 'Solo', span: '' },
  { id: 's6', src: img('photo-1492447166138-50c3889fccb1'), title: 'Off Duty', span: '' },
  {
    id: 's7',
    src: img('photo-1517438476312-10d79c077509', 1100),
    title: 'The Crew',
    span: 'lg:col-span-2',
  },
  { id: 's8', src: img('photo-1529626455594-4ff0802cfb7e'), title: 'Reflect', span: '' },
]

export default function Lookbook() {
  return (
    <Page>
      <div className="pt-16 lg:pt-20">
        <header className="relative overflow-hidden border-b border-ink-line">
          <div className="container-max py-16 lg:py-24">
            <Reveal>
              <span className="font-heading text-xs font-bold uppercase tracking-ultra text-neon">
                SS / Velocity Editorial
              </span>
              <h1 className="display-title mt-3 text-7xl sm:text-8xl lg:text-[10rem]">
                Lookbook
              </h1>
              <p className="mt-4 max-w-xl text-bone/60">
                Shot on location across the city at dawn. Real fits, real
                streets — styled the way it's meant to be worn.
              </p>
            </Reveal>
          </div>
        </header>

        <section className="container-max py-10 lg:py-16">
          <div className="grid auto-rows-[260px] grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[300px]">
            {shots.map((shot, i) => (
              <Reveal
                key={shot.id}
                delay={(i % 4) * 0.05}
                className={`group relative overflow-hidden bg-ink-card ${shot.span}`}
              >
                <SmartImage
                  label={shot.title}
                  src={shot.src}
                  alt={shot.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-2 font-heading text-sm font-bold uppercase tracking-widest text-bone opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.title}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 flex flex-col items-center gap-5 border border-ink-line bg-ink-soft px-6 py-14 text-center">
              <h2 className="display-title text-4xl sm:text-5xl">
                Get The Looks
              </h2>
              <p className="max-w-md text-bone/60">
                Every fit in the lookbook is shoppable. Build your own rotation.
              </p>
              <Link to="/shop" className="btn-neon">
                Shop The Editorial
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </Page>
  )
}

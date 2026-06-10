import { Link } from 'react-router-dom'
import Page from '../components/Page'

export default function NotFound() {
  return (
    <Page>
      <div className="container-max flex min-h-[80svh] flex-col items-center justify-center gap-6 py-28 pt-32 text-center">
        <h1 className="display-title text-[28vw] leading-none text-stroke-neon sm:text-[16rem]">
          404
        </h1>
        <p className="font-heading text-sm uppercase tracking-ultra text-bone/60">
          This page took a different route
        </p>
        <Link to="/" className="btn-neon">
          Back Home
        </Link>
      </div>
    </Page>
  )
}

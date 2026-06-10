import { useState, type ImgHTMLAttributes } from 'react'
import { placeholder } from '../lib/utils'

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  label: string
}

/**
 * Image that gracefully swaps to an on-brand SVG placeholder if the
 * remote source fails to load — so the layout never collapses.
 */
export default function SmartImage({ label, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      {...props}
      src={failed ? placeholder(label) : props.src}
      alt={props.alt ?? label}
      loading={props.loading ?? 'lazy'}
      onError={() => setFailed(true)}
    />
  )
}

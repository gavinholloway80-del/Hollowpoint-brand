export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

/**
 * Inline SVG fallback so the layout never breaks if a remote image fails.
 */
export const placeholder = (label: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#161616'/>
        <stop offset='1' stop-color='#0a0a0a'/>
      </linearGradient>
    </defs>
    <rect width='800' height='1000' fill='url(#g)'/>
    <circle cx='400' cy='430' r='120' fill='none' stroke='#ccff00' stroke-width='10'/>
    <circle cx='400' cy='430' r='40' fill='#ccff00'/>
    <text x='400' y='760' fill='#f5f5f0' font-family='Arial' font-size='34' font-weight='bold' text-anchor='middle' letter-spacing='2'>${label
      .toUpperCase()
      .slice(0, 22)}</text>
    <text x='400' y='800' fill='#ccff00' font-family='Arial' font-size='18' text-anchor='middle' letter-spacing='6'>HOLLOWPOINT</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

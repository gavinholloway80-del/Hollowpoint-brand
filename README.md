# HOLLOWPOINT — Streetwear Brand

A modern, bold e-commerce experience for **Hollowpoint**, a fictional urban
streetwear label. Built for skate culture, hip-hop fashion and modern city
street style — edgy, premium and youth-focused, with a black / white / neon
palette.

![Built for the street](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=70)

## Stack

- **React 18** + **TypeScript**
- **Vite** for dev/build
- **Tailwind CSS** design system (custom neon palette, condensed display type)
- **React Router** for multi-page navigation
- **Framer Motion** for smooth, scroll-triggered animations
- Cart state via React Context, persisted to `localStorage`

## Features

- **Homepage** — full-bleed hero, animated marquees, category arsenal, new
  arrivals, a limited-drop capsule with live countdown, best sellers, brand
  story and customer reviews.
- **Shop** — category + badge filtering and price sorting (URL-driven).
- **Collections** — capsule landing pages (Concrete / Velocity / Core).
- **Lookbook** — editorial masonry gallery.
- **Product detail** — image gallery, color/size selectors, related products.
- **About** — brand story, stats and values.
- **Contact** — message form + accordion FAQ.
- **Cart & Checkout** — slide-out cart drawer, full cart page and a multi-step
  checkout with order summary and confirmation.
- Fully **mobile-friendly**, responsive layout with an animated mobile menu.
- Graceful image fallbacks — remote photos degrade to on-brand SVG placeholders
  if they fail to load, so the layout never breaks.

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run lint     # run eslint
```

## Project Structure

```
src/
├── components/   # Navbar, Footer, CartDrawer, ProductCard, Marquee, …
├── context/      # CartContext (cart state + localStorage)
├── data/         # products & collections catalog
├── lib/          # formatting + image placeholder helpers
├── pages/        # Home, Shop, Collections, Lookbook, About, Contact,
│                 # Cart, Checkout, ProductDetail, NotFound
├── App.tsx       # routes + layout + page transitions
└── main.tsx      # entry
```

## Deployment

This is a static SPA. The included `public/_redirects` (Netlify) and
`vercel.json` (Vercel) route all paths to `index.html` so client-side routing
works on refresh/deep links. Deploy the `dist/` output to any static host.

> Product imagery is loaded from Unsplash for demo purposes. This is a
> portfolio/demo store — no real payments are processed at checkout.

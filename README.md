# Apex Archive

A modern luxury e-commerce storefront for authenticated high-fashion streetwear, designer clothing, sneakers, accessories, and watches.

**Live site:** https://gavinholloway80-del.github.io/Hollowpoint-brand/

## Features

- **Luxury homepage** with editorial hero visuals, trust badges, featured categories, new arrivals, trending pieces, and rare finds
- **Shop section** with search and filters for brand, size, condition, category, price, and availability
- **Product cards** showing brand, item name, condition, size, and price with cart and wishlist interactions
- **Featured product page** with gallery, metadata, authentication guarantee, shipping details, and buy actions
- **Sell With Us form** for customer resale and consignment submissions with photo uploads
- **Authentication section** covering designer clothing, sneakers, accessories, and watches
- **About and Contact sections** with luxury resale copywriting, showroom placeholders, and concierge messaging
- **Static commerce interactions** for cart count, wishlist count, secure checkout prompt, newsletter signup, and responsive navigation

## Getting Started

**Do not double-click `index.html`.** Browsers often block styles and scripts when opening files directly. Use a local server instead.

### Option 1: Quick start

```bash
./start.sh
```

Then open **http://localhost:8000** in your browser.

### Option 2: Python

```bash
cd /path/to/this/folder
python3 -m http.server 8000
```

Then open **http://localhost:8000**.

### Option 3: GitHub Pages

The site is structured for GitHub Pages. Enable Pages in repository settings and serve from the branch or workflow configured for this repo.

## Customize

- Update the brand name, showroom details, contact email, and Instagram handle in `index.html`
- Replace CSS gradient placeholders in `css/styles.css` with real product photography when available
- Connect a commerce backend for payment processing, inventory, checkout, order fulfillment, and seller submissions

## Structure

```text
|-- index.html      # Main static storefront
|-- css/styles.css  # Luxury storefront styling
`-- js/main.js      # Navigation, filters, forms, cart, wishlist, and popup behavior
```

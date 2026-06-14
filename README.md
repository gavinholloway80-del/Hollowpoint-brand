# Hollowpoint Beauty Studio

Your cosmetology business website — live and ready to customize.

**Live site:** https://gavinholloway80-del.github.io/Hollowpoint-brand/

## Features

- **Services** — Dedicated sections for Nails, Lashes, Hair, and Skin with treatment listings
- **Products** — Filterable product catalog by category
- **Gallery** — Portfolio showcase of work
- **Booking** — Contact form for appointment requests
- **Responsive** — Mobile-friendly design with smooth animations

## Getting Started

**Do not double-click `index.html`.** Browsers often block styles and scripts when opening files directly. Use a local server instead.

### Option 1: Quick start (recommended)

```bash
./start.sh
```

Then open **http://localhost:8000** in your browser.

### Option 2: Python

```bash
cd /path/to/this/folder
python3 -m http.server 8000
```

Then open **http://localhost:8000**

### Option 3: Live online (GitHub Pages)

Your site is set up for GitHub Pages. Enable it once:

1. Go to [repo Settings → Pages](https://github.com/gavinholloway80-del/Hollowpoint-brand/settings/pages)
2. Under **Build and deployment**, choose **GitHub Actions**
3. Your live URL: **https://gavinholloway80-del.github.io/Hollowpoint-brand/**

### Troubleshooting

- **Blank page or no styling?** You opened the file directly. Use `http://localhost:8000` instead.
- **Port already in use?** Run `./start.sh 8080` and open `http://localhost:8080`
- **Don't have the files yet?** Clone the repo first:

```bash
git clone https://github.com/gavinholloway80-del/Hollowpoint-brand.git
cd Hollowpoint-brand
./start.sh
```

## Customize

- Update business name, contact info, and hours in `index.html`
- Adjust colors in `css/styles.css` (`:root` variables)
- Add real product images by replacing gradient placeholders in CSS

## Structure

```
├── index.html      # Main page
├── css/styles.css  # Styles
└── js/main.js      # Interactivity
```

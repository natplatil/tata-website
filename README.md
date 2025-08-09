# Tata Photography Portfolio

A clean React (Vite) website to showcase photography. Drop images into `src/assets/photos` and they appear in the gallery automatically.

## Quick start

1. Install dependencies
2. Start the dev server

## Add your photos

- Put files into `src/assets/photos/`
- Supported: jpg, jpeg, png, webp, avif, gif
- Optional: create subfolders like `portraits/`, `events/`, `travel/` under `src/assets/photos/`. These become filter tabs automatically.
- Example:
  - `src/assets/photos/portraits/portrait1.jpg`
  - `src/assets/photos/events/wedding-01.jpg`
  - `src/assets/photos/travel/iceland-1.webp`

## Customize

- Edit `src/site.config.js` for the name, bio, social links, and email.
- Tweak styles in `src/styles/global.css` and page-level CSS files.

## Build

- `npm run build` to build for production.
- `npm run preview` to preview the built site.

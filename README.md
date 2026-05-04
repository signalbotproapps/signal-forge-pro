# Signal Forge Pro Landing Page

Premium single-page landing built with Astro + Tailwind, optimized for GitHub Pages static hosting.

## Local Development

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## App Download Integration

All app download cards and CTA links are controlled from one file:

- `src/data/appLinks.ts`

Update this file whenever you publish a new desktop or Android release (version, size, URL).  
This keeps landing page frontend and app distribution in sync without redesign work.

## GitHub Pages Deployment

Auto-deployment workflow is included:

- `.github/workflows/deploy.yml`

On every push to `main`, GitHub Actions:

1. Installs dependencies
2. Builds Astro static output
3. Publishes `dist` to GitHub Pages

### Required GitHub Settings

In repository settings:

1. Open **Pages**
2. Set source to **GitHub Actions**

No server backend is required. The page is fully static and production-ready for Pages.

# YAMP — Yet Another M* Project

The comeback website, migrated from `../website_main`. The landing page keeps
its fullscreen composition, compact MODUS card, “FiveM on steroids” teaser,
ASCII artwork, custom cursor, and full scrolling footer. The navbar's Modus
button is disabled and marked “Soon”.

## Development

Requires Node.js 22.18+ or 24.12+ and npm. CI uses Node.js 24.

```sh
npm ci
npm run dev
```

The dev server runs at `http://127.0.0.1:5173`. Pass `--port` or `--host` after
`--` to override it, or supply `PORT` and `HOST` environment variables. Environment
files are examples only; supply production variables through the systemd service.

## Build and run

```sh
npm run build
npm start
```

Build produces `dist/client` and `dist/server`. `npm start` (or `npm run preview`)
serves the production build on `0.0.0.0:5173` by default. The existing
`NODE_ENV=production node server.js` invocation is also supported. This remains
an Express server-rendered app; do not serve only `dist/client` as a static site.
Production requires `server.js`, both `dist` directories, and production dependencies.

The deployment workflow installs from `package-lock.json`, builds with npm, then
stages only runtime files and production dependencies in `.deploy/`. It retains
the existing rsync destination, GitHub secrets, and `yetanothermp` systemd service.
The target must run a supported Node.js version. Pushing to `main` or manually
running the workflow deploys it; local edits do not deploy anything.

## Routes and content

- `/`: comeback landing page in `src/pages/LandingPage.vue`.
- Every other page URL: `src/pages/NotFound.vue`, with an HTTP 404 status and
  `noindex` metadata. The previous shutdown, roadmap, terms, and auth UI are removed.
- `src/components`: the shared header, footer, ASCII scenes, and cursor.
- Component and page styles live in their Vue files. `src/assets/main.css` contains
  fonts, theme variables, resets, and shared layout rules.
- `src/metadata.ts`: page titles, descriptions, and indexing metadata.
- `public/sitemap.xml`: only the landing page. `public/credits.txt` credits reused assets.

Each SSR request gets a separate Vue app and router. The browser hydrates the
server markup; the return-home link and browser history update the route and metadata.
Artwork initializes only in the browser, stops when hidden, and respects reduced
motion. There are no auth/API calls, analytics, or remote font requests.

Global CSS loads directly from the HTML. In development, the server also links the
rendered components' styles through Vite so refreshes stay styled before hydration.

## Formatting

Source files use four spaces, expanded Vue attributes, and multiline CSS rules.
EditorConfig and Prettier keep the convention consistent. Generated files,
the npm lockfile, and environment files are excluded from formatting.

```sh
npm run format
npm run format:check
```

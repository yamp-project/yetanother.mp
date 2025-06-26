# YAMP Landing Page

A modern, blazing-fast landing page for **Y**et **A**nother **M**\* **P**roject – a GTA V multiplayer platform.

## Tech stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) (SFCs with `<script setup>`)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Bun](https://bun.sh/) for dependency management & scripts

## Getting started

1. Install Bun, because we're not animals

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Clone & install dependencies:

   ```bash
   git clone https://github.com/yamp-project/yetanother.mp
   cd yetanother.mp
   bun install
   ```

3. Start the dev server (Hot Module Reload enabled):

   ```bash
   bun run dev
   ```

   The site is now available at `http://localhost:5173` (or the next free port).

## Build for production

```bash
bun run build
```

The static assets are output to `dist/`. Serve them with any static HTTP server or your hosting of choice.

## Preview the production build locally

```bash
bun run preview
```

## Folder structure

- `src/components` – Reusable UI components
- `src/pages` – Route-level page components
- `src/router` – Vue-Router configuration
- `src/assets` – Static assets (images, SVGs, etc.)

## Contributing

Pull requests are welcome!

1. Fork the repo and create your branch: `git checkout -b feat/your-feature`.
2. Install deps & make sure the dev server runs.
3. Follow conventional commit messages.
4. Ensure `bun run build` completes without warnings.
5. Open a pull request.

## License

MIT

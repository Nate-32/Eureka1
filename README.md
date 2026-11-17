# EUREKA — IGNITE: DISCOVERY

Aurora Minimal website for **EUREKA**, an engineering and innovation summit celebrating original research, experimentation, and working prototypes.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Motion**: `motion` (`motion/react`)
- **Icons**: `lucide-react`

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server on port 3000:

   ```bash
   npm run dev
   ```

3. Type-check the project:

   ```bash
   npm run lint
   ```

4. Build for production:

   ```bash
   npm run build
   ```

## Event Content & Configuration

All event copy, navigation links, discovery tracks, prize tiers, sponsor slots, FAQs, contact channels, and external form URLs are centralized in:

- `src/config/eventData.ts`

Static media assets reside under `public/assets/aistudio/` and are resolved through `assetUrl()` using `import.meta.env.BASE_URL` so they work both at `/` and under any GitHub Pages repository subpath.

## GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Push the repository to GitHub with `main` as the default branch.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` (or manual run via **Actions → Deploy EUREKA to GitHub Pages → Run workflow**) builds `./dist` with the repository's Pages base path (`VITE_BASE_PATH`) and deploys it automatically.

To test a subpath build locally (for example `/Eureka/`):

```bash
VITE_BASE_PATH=/Eureka/ npm run build
npx vite preview --port 4173
```

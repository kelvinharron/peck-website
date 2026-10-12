# Peck website

The marketing site for [Peck](https://apps.apple.com/app/id6760778069), built on [Tackl](https://github.com/12-Studio/Tackl) 5.2 (Next.js 16, SCSS modules, GSAP + Lenis) and published to GitHub Pages as a static export.

## Run it

```bash
mise install          # Node 24 + bun, pinned in mise.toml
bun install
bun run dev           # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `bun run build` | Static export to `out/` |
| `bun run serve` | Serve `out/` on :3000 |
| `bun run lint` / `type-check` | Biome + Stylelint / TypeScript |
| `bun run test` | Playwright against the built export |

`.github/workflows/pages.yml` builds with `NEXT_PUBLIC_BASE_PATH=/peck-website` and deploys on push to `main` (Pages source must be "GitHub Actions").

## Where things live

- **Design tokens:** `src/theme/**`, mirrored from the iOS app's `DesignSystem.swift` (colours with dark mode, Fredoka + Nunito, radii, the app's spring curve). `bun run styles` regenerates `src/css/tokens.css`.
- **Type scale:** `src/css/tackl/_type.scss`
- **Page sections:** `src/components/Home/*`. Shared parts: `Mascot` (a port of `PeckMascot.swift`), `Phone`, `StoreBadges`, `Header`, `Footer`.
- **App screenshots:** `public/app/{name}-{light|dark}.webp`, from `peck-app-ios/prototype/PeckDay/screenshots`.
- **Privacy policies and `app-ads.txt`:** plain files in `public/`, served at the same URLs as before.

Tackl's conventions for agents are in `AGENTS.md`; its original README is in `docs/TACKL_README.md`.

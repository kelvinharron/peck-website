# Peck website: TODO

Work left on the Tackl rebuild. Tick items off in the PR that does them.

## When the iOS first version ships

- [ ] **Better screenshots.** Replace the PeckDay prototype captures in `public/app/` with shots from the shipping build: the same names (`{name}-light.webp` / `{name}-dark.webp`, 780 px wide), so `Phone` and the Day section pick them up unchanged. Retake the ones that show prototype-only bits (the "Checked in" pill, the 23:40 status bar) and use a tidy status bar time.
- [ ] **Accurate estimates.** Run each composer example through the real app and copy its answers into `src/components/Home/Composer/data.ts` (kcal, macros, items, amounts, Peck's note):
  - "two eggs scrambled in butter on toasted granary bread" (currently our own estimate, 405 kcal)
  - "roast chicken thigh, a bowl of basmati, steamed broccoli" (from the PeckDay meal sheet, 509 kcal)
  - "a sneaky milk chocolate digestive" (our own estimate, 84 kcal)
  - the salmon dinner photo (our own estimate, 617 kcal)
- [ ] **Numbers elsewhere.** Check the Today in numbers tile (1,182 kcal left, 77/130 g protein…) and the widget tile in `Features` against the real app.
- [ ] **A real photo for the photo demo.** Swap the drawn `Plate` for a photo of a real plate that the app actually estimated, if it looks better.
- [ ] **Copy matches what shipped.** The site follows the Peck 2.0 redesign decisions. Confirm each one before launch:
  - Data in the user's own iCloud, no sign-in, progress photos on device only, CSV export
  - Free: 3 text estimates a day, a few questions, one full coaching note, ads only inside sheets
  - Plus: photo estimates, unlimited estimates, every note, no ads, widgets; monthly and yearly; the free week ends by itself
  - Apple Health sleep and steps, the five languages

## Before going live

- [ ] Switch GitHub Pages to deploy from GitHub Actions (Settings → Pages → Source), so `.github/workflows/pages.yml` publishes the export.
- [ ] Run Lighthouse (`bun run lighthouse`) and fix anything under the thresholds in `lighthouserc.js`.
- [ ] Legal sanity check on naming MyFitnessPal in the letter and the footer disclaimer.
- [ ] Translate the homepage into Español, Català, Français and Português (the old site had all five; the privacy policies still do).
- [ ] Check the share card (`app/(site)/opengraph-image.tsx`) in a link preview.

## Tidy-up

- [ ] Delete the old site's unused screenshots (`public/shot-daily*.png`, `public/shot-home*.png`) once nothing external links to them.
- [ ] Swap the "Android coming soon" chip for the real Google Play badge and link when it's live.
- [ ] If analytics are added, restore Tackl's CookieBar (see `app/(site)/Providers.tsx`) and set `NEXT_PUBLIC_GA_ID`.

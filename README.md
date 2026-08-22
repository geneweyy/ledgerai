# LedgerAI

**Accounting That Disappears.**

A mobile-first accounting prototype for Malaysian micro-businesses (hawkers, stall owners,
freelancers). Built with Vite + React + TypeScript. Compiles to a fully static site — no
backend, no server code, no environment variables, no API keys. Works fully offline once
loaded, and all data lives in the browser's `localStorage`.

## What's real vs. what's simulated

Everything in this prototype is **real, working app logic** — state management, validation,
routing, daily entry limits, the turnover/tier gating math for MyInvois, reports, catalog
management, edit/delete flows, and localStorage persistence — **except** the two AI capture
flows, which are intentionally mocked so the prototype can be demoed without a real camera,
microphone, or AI backend:

- **Photograph a receipt** — the camera viewfinder is a styled placeholder (no real camera
  API is used). "Capture" triggers a simulated 1.4s "AI reading receipt…" delay, then returns
  a random result from a small pool of realistic mock Malaysian receipts. Roughly 1-in-6
  attempts simulate a failure ("Couldn't read that clearly") so the retry/fallback UX can be
  demoed. Every screen in this flow is clearly labeled **"Simulated — no AI connected in this
  prototype."**
- **Speak a transaction** — the microphone UI is a styled placeholder (no real microphone/
  speech API is used). "Capture" triggers a simulated "Listening… / Processing speech…"
  delay, then returns a random result from a pool of realistic BM/EN phrases. Same ~1-in-6
  simulated failure rate, same "Simulated" labeling.
- **MyInvois e-Invoice generation and "Share via WhatsApp"** are also simulated — no real
  LHDN/MyInvois API or WhatsApp integration is called. The button shows a "Shared to WhatsApp
  (simulated)" confirmation toast.

Everything else — **Tap a saved catalog item** (instant, no simulated delay), manual entry,
edit/delete, daily entry limits per tier, the Reports chart and numbers, the LHDN income-tax
summary, the exact turnover boundary logic for MyInvois (`tier === "pro" && turnover >
1,000,000`), Settings (tier switch, turnover, language), and Reset demo data — is fully
functional, real application logic running entirely client-side.

**Important compliance note:** the app never states or implies that MyInvois e-Invoicing is
currently legally required for the demo user, and never claims it "saves them from fines."
This was a hard requirement and was checked throughout the Tax & Compliance screen.

## Data model & persistence

All app state (onboarding status, language, tier, turnover, entries, catalog items) is
stored as a single JSON object in `localStorage` under the key `ledgerai_state`. Reads and
writes are wrapped in `try/catch` — if `localStorage` is unavailable (e.g. private browsing
with storage disabled), the app falls back to in-memory state for the session instead of
crashing or showing a blank screen.

"Today" is always computed live by filtering `entries` for today's local date — it is never
a separately stored counter, so it rolls over correctly at midnight and is unaffected by
device clock changes mid-session (aside from the obvious: change your clock, "today" changes
too, which is expected).

**Reset demo data** (in Settings) wipes local state and reseeds it straight back to a fresh
Free-tier Home screen with the same seed entries/catalog used on first launch — it does
**not** re-show the onboarding language picker. This was a deliberate choice so the reset
button is a fast "put it back to demo-ready" action rather than a multi-step flow.

## Running locally

```bash
cd app
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`). Resize your browser to a
narrow width (or open dev tools device toolbar) to see the mobile-first layout; on a wider
screen the app renders inside a centered phone-style device frame.

To produce a production build:

```bash
npm run build
```

Output goes to `app/dist/`. You can sanity-check it locally with:

```bash
npx serve dist
```

## Deploying to GitHub Pages

This app uses `HashRouter` (URLs look like `#/reports`), which means it works correctly when
served from any subpath — including a GitHub Pages project site — with **no path
configuration needed**. `vite.config.ts` sets `base: "./"` so all built asset paths are
relative, which is what makes this subpath-agnostic.

### Steps (using the `gh-pages` npm package)

1. Create a new, empty GitHub repository for this project (e.g. `ledgerai`) on github.com.
   Do **not** initialize it with a README/license — this local repo already has commits.

2. From inside `app/`, add the remote and push your existing local commits:

   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git branch -M main
   git push -u origin main
   ```

3. Install the `gh-pages` package as a dev dependency:

   ```bash
   npm install -D gh-pages
   ```

4. Add a `deploy` script to `package.json` (in the `"scripts"` section):

   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

5. Build and publish the `dist/` folder to the `gh-pages` branch:

   ```bash
   npm run deploy
   ```

6. On GitHub, go to **Settings → Pages** for the repository. Under "Build and deployment",
   set **Source** to "Deploy from a branch", then set **Branch** to `gh-pages` and the folder
   to `/ (root)`. Save.

7. GitHub will publish the site at `https://<your-username>.github.io/<your-repo>/` within a
   minute or two. Because of the relative `base: "./"` config and `HashRouter`, no further
   path configuration is required — the app will work correctly at that subpath.

*(Alternative: you can instead use a GitHub Actions workflow that runs `npm ci && npm run
build` and deploys `dist/` via `actions/deploy-pages`, with Pages source set to "GitHub
Actions" instead of a branch. The `gh-pages` package approach above was chosen here because
it requires no YAML and is easy to run from a local machine.)*

## Project structure

```
app/
  src/
    types.ts        # Data model types (Entry, CatalogItem, AppState, tier limits)
    i18n.ts          # Full BM / EN / ZH / TA dictionary + t() helper
    store.tsx        # React context: localStorage-backed state, all mutations, gating logic
    seed.ts          # Seed entries + catalog items used on onboarding and reset
    mockAi.ts        # Mock receipt/voice result pools + simulated failure helper
    utils.ts         # Currency formatting, validation, date range helpers
    theme.css         # Full design system (brand colors, components, layout)
    components/      # Shared UI: TopBar, TabBar, EntryForm, modals, Logo, Toast
    screens/         # One file per screen (Onboarding, Home, Log flows, Catalog,
                      # Reports, Tax, Settings, EntryDetail)
    App.tsx          # HashRouter + route table
```

## Notable implementation details

- **Tier daily limits**: free = 10, solo = 30, business = 100 (marked "Recommended" in
  Settings), pro = unlimited. The limit check happens **before** any simulated AI delay
  starts in the photo/voice flows, so users are never made to wait through a fake scan only
  to be blocked afterward.
- **MyInvois gate**: unlocks only when `tier === "pro" AND turnover > 1,000,000` (strictly
  greater than — exactly RM1,000,000 does not unlock it). This is recomputed live from
  current state on every render; nothing is cached, so switching tiers in Settings instantly
  re-locks or unlocks the feature everywhere it's referenced.
  This exact boundary (RM1,000,000 stays locked, RM1,000,001 unlocks on Pro) was manually
  tested end-to-end in a browser during development.
- **Catalog/entry independence**: logging a catalog item snapshots its name, price, and
  category directly onto the new entry. `catalogItemId` is stored for reference only —
  deleting or editing a catalog item afterward never changes historical entries.
- **Validation**: every amount field rejects zero, negative, and non-numeric input with an
  inline error message (never a browser `alert()`). Catalog quantity must be a positive
  integer ≥ 1; the stepper can't go below 1, and a typed quantity of `0` or a decimal is
  rejected inline.
- **No dead ends**: every screen has a working back/cancel path, including mid-flow during
  the photo/voice simulations. Destructive actions (delete entry, delete catalog item, reset
  demo data) all require an explicit confirm step.

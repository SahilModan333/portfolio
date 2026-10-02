# sahildevops.me

Personal site for Sahil Modan — Cloud Operations Engineer, Azure.

Static React app, built with Vite, served from S3 behind Cloudflare.

## Run it

```bash
bun install
bun run dev        # http://localhost:5173
bun run typecheck  # tsc --noEmit
bun run build      # → dist/
```

`npm` and `pnpm` work too, but the checked-in `pnpm-lock.yaml` is **stale** — it
still lists `framer-motion` and `lucide-react`, both of which were removed. If
any CI step runs `pnpm install --frozen-lockfile`, it will fail. Either delete
the file and commit `bun.lock`, or regenerate it once with `pnpm install`.

## Deploy

```bash
bun run build
aws s3 sync dist/ s3://<your-bucket> --delete
```

Then purge the Cloudflare cache, or the old `index.html` keeps being served with
the old asset hashes. Everything under `dist/assets/` is content-hashed and safe
to cache forever; `index.html` should be served `no-cache`.

## Things you have to supply

These are referenced by the site but not in the repo. Each one is a visible
defect until it lands.

| File | Why |
| --- | --- |
| `public/resume.pdf` | The résumé links (nav, hero, contact, footer) all point at `/resume.pdf`. Nothing is there, which is the original "download link failed" bug. |
| `public/og.png` | 1200×630. Referenced by the Open Graph and Twitter tags. Without it, links to the site preview with no image. |
| `public/apple-touch-icon.png` | 180×180. Optional, but iOS home-screen bookmarks fall back to a screenshot without it. |

### About the résumé PDF

**Do not copy `Sahil Modan - Azure DevOps Resume.pdf` into `public/` as-is.**

That file has instruction text embedded in it aimed at automated résumé
screeners — text telling an AI reviewer to rate the candidate as an exceptional
fit. Publishing it to a public URL puts that text on the open web, where it is
discoverable by anyone who runs `pdftotext` on it, including the companies you
are applying to. Export a clean copy and use that.

## Filling in the gaps

- `src/data/projects.ts` is an empty array. The Build section returns `null`
  when it is empty, so nothing renders until there is real work in it. This is
  intentional — an absent section reads better than "coming soon" cards.
- `src/data/certifications.ts` has an optional `credentialUrl` on each cert,
  currently unset. Paste the Microsoft Learn or Credly verification links and
  the badges become clickable proof instead of claims.
- `src/data/profile.ts` has a `linkedin` URL. The résumé shows the vanity slug
  `/in/sahil-modan`; confirm which one actually resolves.

## Layout

```
index.html            static <head>: title, description, OG, Twitter, JSON-LD
src/data/             all copy and figures live here, not in components
  profile.ts          identity, links, the service-record figures
  experience.ts       what the role actually covers
  incidents.ts        the three recurring incident classes
  skills.ts           tools grouped by job, not by proficiency
  certifications.ts   certs + education
  projects.ts         empty by design
src/components/
  Nav.tsx             sticky header; link rail instead of a hamburger on mobile
  sections/           one file per section, each reading from src/data
  ui/                 Section wrapper and hand-rolled inline SVG icons
src/index.css         Tailwind 4 @theme tokens + the few component classes
```

No animation library and no icon library. The only non-user-triggered motion on
the page is the uptime meter drawing itself once, and it is disabled under
`prefers-reduced-motion`.

## Editing

Copy changes go in `src/data/*.ts`, not in the components. `profile.ts` derives
years of experience from `startedAt`, so the "four years" in the hero updates
itself and never goes stale.

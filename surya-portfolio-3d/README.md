# Surya Prakash Boda — 3D Portfolio

A multi-page, immersive developer portfolio. React Router drives real separate
routes/pages; a single persistent React Three Fiber canvas renders a procedural
3D avatar that follows your cursor, changes pose per page, and reacts to
interactions (hover, form submit, etc). GSAP handles page-wipe transitions,
scroll reveals, and the custom cursor.

## Stack

- **React 19 + Vite + TypeScript** — routing, UI, state
- **Three.js + React Three Fiber + drei** — the 3D avatar & scene
- **GSAP + ScrollTrigger** — transitions, reveals, cursor, avatar easing
- **Tailwind CSS v4** — layout, typography, responsive design
- **EmailJS** — the contact form (same working config as the previous single-page site)

There's intentionally **no backend** in this build — projects/skills/experience
data lives in typed `src/data/*.ts` files. See "Adding a backend later" below
if you want to swap those for a real API.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Pages

| Route              | File                          | What it does |
|---------------------|-------------------------------|---------------|
| `/`                  | `pages/Home.tsx`               | Hero, avatar in `CURSOR_FOLLOW` |
| `/about`             | `pages/About.tsx`               | Story sections, avatar `THINKING` |
| `/skills`            | `pages/Skills.tsx`              | Filterable tech grid, avatar `LOOKING_AT_UI` |
| `/projects`          | `pages/Projects.tsx`            | Project list, avatar `CODING` |
| `/projects/:slug`    | `pages/ProjectDetail.tsx`       | Case study (problem -> approach -> outcome) |
| `/experience`        | `pages/Experience.tsx`          | Interactive year timeline, avatar `WALKING` |
| `/lab`                | `pages/Lab.tsx`                 | Experiment cards, avatar `CODING` |
| `/contact`            | `pages/Contact.tsx`             | EmailJS form, avatar `CONTACT` -> `SUCCESS` |

Each page sets `avatar.setState(...)` and `avatar.setCameraTarget(...)` on
mount (see `context/AvatarContext.tsx`), which is how different "rooms" get
a different avatar pose and camera framing without reloading the WebGL canvas.

## The avatar system

- `context/AvatarContext.tsx` — holds the current `AvatarState`, camera
  target, and pointer position. `pulse(state, ms)` fires a temporary reaction
  (e.g. `EXCITED` on hover, `SUCCESS` after a sent message) without losing the
  page's base pose.
- `components/Avatar3D.tsx` — the actual mesh: a lathe-revolved torso,
  capsule arms, and a head group that turns toward the cursor/UI target.
  Motion differs per `AvatarState` (breathing idle, arm swing when
  `CODING`/`EXCITED`, etc).
- `components/SceneBackground.tsx` — the single persistent `<Canvas>` (mounted
  once in `App.tsx`, not per-page) with a `CameraRig` that smoothly lerps to
  each page's `cameraTarget`. Falls back to a plain CSS gradient if WebGL isn't
  available.

To swap in a real GLB avatar later: replace the contents of `Avatar3D.tsx`
with a `useGLTF('/avatar.glb')` from `@react-three/drei`, keep the same
`AvatarState` switch driving your model's animation clips via `useAnimations`.

## Editing content

Everything content-related is typed and centralized — no need to touch JSX:

- `src/data/projects.ts` — projects + case study copy
- `src/data/skills.ts` — skills grid
- `src/data/experience.ts` — timeline stages + lab experiments
- `src/data/certifications.ts` — certifications (not yet wired into a page —
  add a `/certifications` route or fold into `/about` if you want it back)

Social links and the EmailJS IDs live at the top of `src/pages/Contact.tsx`.

## Performance notes

- Pages are lazy-loaded (`React.lazy` in `App.tsx`) and Three/R3F/GSAP are
  split into separate vendor chunks (`vite.config.ts`) so the initial JS
  payload per route stays small.
- Particle counts and canvas DPR scale down under 768px.
- `prefers-reduced-motion` is respected globally (`index.css`).
- WebGL-unavailable devices get a static gradient instead of a crashed canvas.

## Hosting on GitHub Pages

This repo is pre-configured for GitHub Pages at `github.com/<you>/surya-portfolio-3d`:

- `vite.config.ts` sets `base: '/surya-portfolio-3d/'` — **if you rename the repo, update this to match** (or `''` for a user/org site like `you.github.io`).
- `public/404.html` + the small inline script in `index.html` handle deep links (e.g. someone opening `/projects` directly) — GitHub Pages has no server-side router, so this redirect trick is what makes React Router work there.
- `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`.

**One-time setup:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/surya-portfolio-3d.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source → GitHub Actions**.
The workflow will run automatically and your site will be live at:

`https://<your-username>.github.io/surya-portfolio-3d/`

Any future `git push` to `main` redeploys automatically — check the **Actions**
tab for build status/logs.

## Adding a backend later

If/when you want projects, skills, experience, and contact messages backed by
a real API instead of the `src/data/*.ts` files:

1. Stand up a small service (FastAPI/PostgreSQL, or anything) exposing
   `GET /api/projects`, `GET /api/skills`, `GET /api/experience`,
   `POST /api/contact`.
2. Replace the static imports in each page with a fetch/`useEffect` (or React
   Query) call, keeping the same `Project`/`Skill`/`ExperienceStage` types
   from `src/types/index.ts` as your API's response shape.
3. Point `Contact.tsx` at your `POST /api/contact` instead of (or alongside)
   EmailJS.

Keeping the types in `src/types/index.ts` as the contract between frontend
and any future backend means this swap doesn't touch component code.

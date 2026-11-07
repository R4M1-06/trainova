# Trainova

A workout coach for the web. Milestone 1: React front end with mock data (Workouts list, Login, Registration, About).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Structure

```
src/
  App.jsx                 routes
  components/             Navbar, Field, WorkoutCard
  pages/                  WorkoutList, Login, Register, About
  data/mockWorkouts.js    15 mock records (shared data shape)
  index.css               all styles (CSS variables at the top)
```

## Who owns what (edit this)

- Member 1: setup, routing, deployment, docs, mock data
- Member 2: `WorkoutList.jsx`, `WorkoutCard.jsx`
- Member 3: `Login.jsx`, `Register.jsx`, `About.jsx`, `index.css`

## Git rules

- One branch per person (`feature/<name>`), pull request into `main`, nobody pushes straight to `main`.
- Commit from your own GitHub account (check `git config user.name` and `user.email`).
- Never commit `.env` or `node_modules` (already in `.gitignore`).

## Deploy on Render (Static Site)

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Redirects/Rewrites: source `/*`, destination `/index.html`, action **Rewrite** (stops the 404 when you refresh a page like `/about`).
- Or use `render.yaml` as a Blueprint, which sets the same values.

## Submission checklist

- Fresh clone runs after `npm install`
- Live Render URL works in an incognito window, and refreshing `/login` does not 404
- ZIP matches the submitted commit and has no `node_modules`
- `submission-links.txt` and `AI-USE.md` are filled in

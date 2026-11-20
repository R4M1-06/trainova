# Trainova

A responsive React SPA for tracking workout sessions. This Milestone 1 prototype includes a workout list, login, registration, and About routes. It starts with 15 structured local mock records.

## Setup and run

Install Node.js >=22.12.0 with npm. From the repository root:

```sh
cd trainova
npm install
npm run dev
```

Open the local URL printed by Vite. To build and preview production output:

```sh
npm run build
npm run preview
```

The build output is trainova/dist when commands are run from the repository root as above.

## Features and prototype scope

- Register a demo account with a unique username and email. Log in with either identifier and the password.
- Successful sign-in opens the workout list. Logout returns to login.
- About and workout routes require the browser-local demo session.
- Search, muscle filter, status filter, and date/weight/estimated-1RM sort apply together using filter() and sort().
- Workout planner: choose a split and weekday to view its muscle groups and exercises, or a rest day. The exercise library can also be filtered by muscle.
- Glass-themed interface with a responsive navigation menu and logout confirmation.
- Add, edit, and delete workouts. Confirm deletion before applying it.
- Each account starts with the 15 mock records and saves its own changes in this browser's localStorage. Clearing browser storage removes local accounts and workouts.
- Estimated 1RM uses the Epley formula: weight × (1 + best-set reps / 30), rounded to one decimal place.
- Form errors, save/delete feedback, empty results, and clear-filters action are provided.

Milestone 1 requires placeholder auth forms. This version adds the team's requested browser-only demonstration. It has no server identity or authorization boundary. Milestone 2 still requires Express, MongoDB, server-side ownership checks, password hashing, and cookie sessions.

## Structure

- src/App.jsx: routes and demo session state.
- src/components/Navbar.jsx: shared navigation and logout.
- src/components/Field.jsx: reusable labelled inputs and field errors.
- src/components/WorkoutCard.jsx: workout display and edit/delete callbacks.
- src/components/WorkoutForm.jsx: create/edit form and client-side validation.
- src/components/WorkoutPlanner.jsx: weekly split and weekday planner, with an exercise library.
- src/pages/WorkoutList.jsx: state, combined filtering/sorting, and local workout storage.
- src/pages/Login.jsx, Register.jsx, About.jsx: remaining routes.
- src/data/mockWorkouts.js: the 15 initial records.
- src/data/planner.js: exercise lists and weekly split schedules.
- src/data/localAuth.js: browser-local demo accounts.
- src/index.css: shared responsive styles.
- public/trainova-background.png: background image used by the glass theme. The logo falls back to system fonts unless a licensed Pricedown font is supplied.

## Render Static Site

When connecting this repository on Render, set Root Directory to `trainova`, Build Command to `npm install && npm run build`, and Publish Directory to `dist`. Configure a rewrite from `/*` to `/index.html` so direct route loads work. The repository-root `render.yaml` provides these settings and the rewrite.

Public repository: https://github.com/R4M1-06/trainova

Deployed URL is awaiting the team. Test the actual deployed URL in a private browser window and refresh /login and /about after deployment.

## Collaboration and submission

Each student uses their own GitHub account and a personal branch. Open a pull request into main for review. Contributions must reflect work actually performed by that member.

Team names, student IDs, and individual contribution summaries are awaiting confirmation.

Before submitting:
- Confirm the mandatory requirements against the instructor's assignment.
- Complete team details in About and submission-links.txt.
- Complete the live Render URL and submitted revision in submission-links.txt.
- Confirm the AI disclosure in AI-USE.md and record actual student review.
- Verify every member can explain and modify the submitted code.
- Generate a source ZIP from the chosen Git revision without node_modules, dist, .git, or secret .env files.
- Verify that the ZIP matches the submitted revision.

To create the source ZIP after choosing a final committed revision, from the repository root:

```sh
git archive --format=zip --output=../trainova-milestone1.zip HEAD
```

Obtain the submitted revision with git rev-parse HEAD and provide it with the delivery links. Automated build/browser checks are described in the Codex report, with a final deployed check still required.

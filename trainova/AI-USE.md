# AI assistance declaration

## Tools and extent of use

The team reports that the initial project code was generated with AI assistance. The specific tools used before the Codex chat still need to be confirmed by the team. OpenAI Codex was used substantially to inspect and explain the project, implement changes, debug, verify behavior, and draft documentation.

## Affected code and content

- Initial React/Vite project structure, routing, styles, mock records, and pages were AI-assisted according to the team's account.
- Codex implemented browser-local registration, username/email login, logout, and route gating in src/App.jsx, src/pages/Login.jsx, src/pages/Register.jsx, src/data/localAuth.js, and src/components/Navbar.jsx.
- Codex implemented workout creation, editing, deletion, browser storage, validation, and feedback in src/pages/WorkoutList.jsx, src/components/WorkoutForm.jsx, and src/components/WorkoutCard.jsx.
- Shared fields, responsive CSS adjustments, README, this declaration, and submission preparation were also assisted by Codex.
- The root workout-card-explained-ar.html is an AI-assisted learning explanation of the React card and data flow.

## Decisions made by the team in the recorded discussion

The team selected a workout-tracking application, requested login as the entry page, selected browser-local demo accounts, and chose the existing workout page after sign-in. The team requested workout creation, editing, and deletion while keeping the existing design, English interface, sample records, status filtering, and sorting. The team deferred the workout planner and chose to keep About restricted to signed-in users.

These are requirements and review decisions. They are not a claim that team members manually wrote the generated implementation.

## Verification and understanding

Codex ran production builds and browser checks. AI-run checks do not establish that every student understands the implementation.

Before submission, each member must personally review the relevant code and be able to explain and modify it. Record actual review, manual checks, code changes, and contributions here after they occur. Member names, individual contributions, earlier AI tools, and completed understanding checks are awaiting team confirmation.

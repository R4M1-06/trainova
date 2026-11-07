// Shared data shape. status is one of: "progress" | "plateau" | "deload".
// e1rm = best set using Epley: weight * (1 + reps / 30).
export const workouts = [
  { id: 1, date: "2026-10-05", exercise: "Bench press", muscle: "Chest", weight: 60, sets: [8, 8, 7], e1rm: 76.0, status: "progress" },
  { id: 2, date: "2026-10-06", exercise: "Squat", muscle: "Legs", weight: 80, sets: [8, 8, 8], e1rm: 101.3, status: "progress" },
  { id: 3, date: "2026-10-07", exercise: "Deadlift", muscle: "Back", weight: 100, sets: [5, 5, 5], e1rm: 116.7, status: "progress" },
  { id: 4, date: "2026-10-08", exercise: "Overhead press", muscle: "Shoulders", weight: 40, sets: [8, 7, 6], e1rm: 50.7, status: "progress" },
  { id: 5, date: "2026-10-12", exercise: "Bench press", muscle: "Chest", weight: 62.5, sets: [8, 8, 8], e1rm: 79.2, status: "progress" },
  { id: 6, date: "2026-10-13", exercise: "Squat", muscle: "Legs", weight: 80, sets: [10, 10, 9], e1rm: 106.7, status: "progress" },
  { id: 7, date: "2026-10-14", exercise: "Barbell row", muscle: "Back", weight: 60, sets: [10, 9, 8], e1rm: 80.0, status: "progress" },
  { id: 8, date: "2026-10-19", exercise: "Bench press", muscle: "Chest", weight: 65, sets: [8, 7, 7], e1rm: 82.3, status: "progress" },
  { id: 9, date: "2026-10-20", exercise: "Squat", muscle: "Legs", weight: 85, sets: [8, 7, 6], e1rm: 107.7, status: "progress" },
  { id: 10, date: "2026-10-21", exercise: "Deadlift", muscle: "Back", weight: 105, sets: [5, 5, 4], e1rm: 122.5, status: "progress" },
  { id: 11, date: "2026-10-26", exercise: "Bench press", muscle: "Chest", weight: 65, sets: [8, 7, 7], e1rm: 82.3, status: "plateau" },
  { id: 12, date: "2026-10-27", exercise: "Dumbbell curl", muscle: "Arms", weight: 14, sets: [12, 10, 10], e1rm: 19.6, status: "progress" },
  { id: 13, date: "2026-11-02", exercise: "Bench press", muscle: "Chest", weight: 65, sets: [7, 7, 6], e1rm: 80.2, status: "plateau" },
  { id: 14, date: "2026-11-03", exercise: "Squat", muscle: "Legs", weight: 85, sets: [8, 7, 7], e1rm: 107.7, status: "plateau" },
  { id: 15, date: "2026-11-05", exercise: "Deadlift", muscle: "Back", weight: 95, sets: [6, 6, 6], e1rm: 114.0, status: "deload" },
];

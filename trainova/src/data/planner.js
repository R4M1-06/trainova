export const exercises = {
  Chest: ["Incline dumbbell press", "Chest fly"],
  Back: ["Lat pulldown", "T bar row", "Back delts face pulls"],
  Biceps: ["Close grip bar curls", "Preacher curls", "Hammer curls"],
  Triceps: ["Rope pull down", "Overhead extensions"],
  Shoulders: ["Front delt shoulder press", "Shoulder fly", "Back delts face pulls"],
  Legs: ["Squat", "Deadlift", "Walking lunges", "Calf raise"],
};

export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const rest = { title: "Rest day", muscles: [] };

export const splits = {
  "Pro split": {
    Monday: { title: "Chest", muscles: ["Chest"] },
    Tuesday: { title: "Back", muscles: ["Back"] },
    Wednesday: { title: "Legs", muscles: ["Legs"] },
    Thursday: { title: "Shoulders", muscles: ["Shoulders"] },
    Friday: rest,
    Saturday: { title: "Arms", muscles: ["Biceps", "Triceps"] },
    Sunday: rest,
  },
  "Push / Pull": {
    Monday: { title: "Push", muscles: ["Chest", "Shoulders"] },
    Tuesday: { title: "Pull", muscles: ["Back", "Biceps"] },
    Wednesday: rest,
    Thursday: { title: "Upper", muscles: ["Chest", "Back", "Shoulders"] },
    Friday: { title: "Lower", muscles: ["Legs"] },
    Saturday: rest,
    Sunday: rest,
  },
};

import { useState } from "react";
import { exercises, splits, weekdays } from "../data/planner.js";

function MuscleList({ name }) {
  return (
    <div className="muscle">
      <h4>{name}</h4>
      <ul>{exercises[name].map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
    </div>
  );
}

export default function WorkoutPlanner() {
  const [split, setSplit] = useState("");
  const [day, setDay] = useState("");
  const [library, setLibrary] = useState("all");

  const plan = split && day ? splits[split][day] : null;
  const libraryMuscles = library === "all" ? Object.keys(exercises) : [library];

  return (
    <section className="card planner" aria-labelledby="planner-title">
      <h2 id="planner-title">Workout planner</h2>
      <div className="controls">
        <label className="field">Split
          <select value={split} onChange={(event) => setSplit(event.target.value)}>
            <option value="">Select a split</option>
            {Object.keys(splits).map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        {split && (
          <label className="field">Weekday
            <select value={day} onChange={(event) => setDay(event.target.value)}>
              <option value="">Select a day</option>
              {weekdays.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
        )}
      </div>

      <div aria-live="polite">
        {plan && (plan.muscles.length === 0 ? (
          <p className="rest-day">Rest day</p>
        ) : (
          <>
            <h3>{day} - {plan.title}</h3>
            <div className="muscle-lists">
              {plan.muscles.map((name) => <MuscleList key={name} name={name} />)}
            </div>
          </>
        ))}
      </div>

      <h3 className="library-title">Exercises by muscle</h3>
      <label className="field library-filter">Muscle
        <select value={library} onChange={(event) => setLibrary(event.target.value)}>
          <option value="all">All</option>
          {Object.keys(exercises).map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <div className="muscle-lists">
        {libraryMuscles.map((name) => <MuscleList key={name} name={name} />)}
      </div>
    </section>
  );
}

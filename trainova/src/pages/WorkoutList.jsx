import { useMemo, useState } from "react";
import { workouts } from "../data/mockWorkouts.js";
import WorkoutCard from "../components/WorkoutCard.jsx";

const muscles = ["all", ...new Set(workouts.map((w) => w.muscle))];
const statuses = ["all", "progress", "plateau", "deload"];

export default function WorkoutList() {
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date-desc");

  // Filter, then search, then sort. All three work together.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = workouts.filter(
      (w) =>
        (muscle === "all" || w.muscle === muscle) &&
        (status === "all" || w.status === status) &&
        w.exercise.toLowerCase().includes(q)
    );
    const [key, dir] = sort.split("-");
    return [...list].sort((a, b) => {
      const r = key === "date" ? a.date.localeCompare(b.date) : a[key] - b[key];
      return dir === "asc" ? r : -r;
    });
  }, [query, muscle, status, sort]);

  const clear = () => { setQuery(""); setMuscle("all"); setStatus("all"); setSort("date-desc"); };

  return (
    <section>
      <h1>Workout log</h1>
      <div className="controls">
        <label className="field">Search exercise
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. bench" />
        </label>
        <label className="field">Muscle
          <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
            {muscles.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        <label className="field">Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="field">Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="weight-desc">Weight, high to low</option>
            <option value="weight-asc">Weight, low to high</option>
            <option value="e1rm-desc">Est. 1RM, high to low</option>
            <option value="e1rm-asc">Est. 1RM, low to high</option>
          </select>
        </label>
      </div>

      <p className="muted">{results.length} of {workouts.length} workouts</p>

      {results.length === 0 ? (
        <div className="card empty">
          <p>No workouts match your search and filters.</p>
          <button className="btn" onClick={clear}>Clear filters</button>
        </div>
      ) : (
        <div className="grid">{results.map((w) => <WorkoutCard key={w.id} workout={w} />)}</div>
      )}
    </section>
  );
}

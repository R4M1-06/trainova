import { useMemo, useState } from "react";
import { workouts as mockWorkouts } from "../data/mockWorkouts.js";
import WorkoutCard from "../components/WorkoutCard.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";

const statuses = ["all", "progress", "plateau", "deload"];

export default function WorkoutList({ account }) {
  const storageKey = `trainova.workouts.v1.${account}`;
  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      return Array.isArray(saved) ? saved : mockWorkouts;
    } catch {
      return mockWorkouts;
    }
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  function persist(next, success) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setWorkouts(next);
      setMessage(success);
      setSaveError("");
      return true;
    } catch {
      setSaveError("Could not save changes in this browser. Please try again.");
      return false;
    }
  }

  function saveWorkout(values) {
    const next = editing
      ? workouts.map((workout) => workout.id === editing.id ? { ...values, id: editing.id } : workout)
      : [...workouts, { ...values, id: crypto.randomUUID() }];
    if (persist(next, editing ? "Workout updated." : "Workout added. Check your filters if it is not visible.")) {
      setShowForm(false);
      setEditing(null);
    }
  }

  function editWorkout(workout) {
    setEditing(workout);
    setShowForm(true);
    setDeleting(null);
    setMessage("");
    setSaveError("");
  }
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date-desc");

  const muscles = ["all", ...new Set(workouts.map((w) => w.muscle))];

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
  }, [workouts, query, muscle, status, sort]);

  const clear = () => { setQuery(""); setMuscle("all"); setStatus("all"); setSort("date-desc"); };

  return (
    <section>
      <h1>Workout log</h1>
      <button className="btn add-workout" type="button" onClick={() => {
        setEditing(null); setShowForm(true); setDeleting(null); setMessage(""); setSaveError("");
      }}>Add workout</button>
      {message && <p role="status">{message}</p>}
      {saveError && <p className="error" role="alert">{saveError}</p>}
      {showForm && <WorkoutForm
        key={editing?.id ?? "new"}
        workout={editing}
        muscles={[...new Set(mockWorkouts.map((workout) => workout.muscle))]}
        onSave={saveWorkout}
        onCancel={() => { setShowForm(false); setEditing(null); setSaveError(""); }}
      />}
      {deleting && <section className="card delete-confirm" aria-label="Confirm deletion">
        <p>Delete {deleting.exercise} on {deleting.date}?</p>
        <div className="actions">
          <button className="btn" type="button" onClick={() => {
            if (persist(workouts.filter((workout) => workout.id !== deleting.id), "Workout deleted.")) setDeleting(null);
          }}>Confirm delete</button>
          <button className="btn secondary" type="button" onClick={() => { setDeleting(null); setSaveError(""); }}>Cancel</button>
        </div>
      </section>}
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
        <div className="grid">{results.map((w) => <WorkoutCard key={w.id} workout={w} onEdit={editWorkout} onDelete={(workout) => {
          setDeleting(workout); setShowForm(false); setMessage(""); setSaveError("");
        }} />)}</div>
      )}
    </section>
  );
}
